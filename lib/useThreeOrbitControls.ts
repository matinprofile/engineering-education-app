import * as THREE from "three";

const ROTATE_SPEED = 0.01;
const ZOOM_MIN = 5;
const ZOOM_MAX = 30;
const PHI_MIN = 0.1;
const PHI_MAX = Math.PI / 2 - 0.1;

/**
 * Attaches mouse + touch orbit/zoom controls to a Three.js camera and returns a cleanup function.
 * Supports: mouse drag (rotate), scroll wheel (zoom), one-finger drag (rotate), pinch (zoom).
 */
export function setupOrbitControls(
  canvas: HTMLElement,
  camera: THREE.PerspectiveCamera,
  target = new THREE.Vector3()
): () => void {
  const spherical = new THREE.Spherical();
  spherical.setFromVector3(new THREE.Vector3().copy(camera.position).sub(target));

  let isDragging = false;
  let prevMouse = { x: 0, y: 0 };
  let prevTouch: { x: number; y: number } | null = null;
  let prevPinchDist: number | null = null;

  const clampAndApply = () => {
    spherical.phi = Math.max(PHI_MIN, Math.min(PHI_MAX, spherical.phi));
    camera.position.copy(target).add(new THREE.Vector3().setFromSpherical(spherical));
    camera.lookAt(target);
  };

  const zoom = (delta: number) => {
    const dir = new THREE.Vector3().copy(camera.position).sub(target);
    const d = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, dir.length() + delta));
    camera.position.copy(target).add(dir.normalize().multiplyScalar(d));
  };

  const onMouseDown = () => { isDragging = true; };
  const onMouseUp = () => { isDragging = false; };
  const onMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      spherical.theta -= (e.offsetX - prevMouse.x) * ROTATE_SPEED;
      spherical.phi -= (e.offsetY - prevMouse.y) * ROTATE_SPEED;
      clampAndApply();
    }
    prevMouse = { x: e.offsetX, y: e.offsetY };
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    zoom(e.deltaY * ROTATE_SPEED);
  };

  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      prevPinchDist = null;
    } else if (e.touches.length === 2) {
      prevPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      prevTouch = null;
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && prevTouch) {
      spherical.theta -= (e.touches[0].clientX - prevTouch.x) * ROTATE_SPEED;
      spherical.phi -= (e.touches[0].clientY - prevTouch.y) * ROTATE_SPEED;
      clampAndApply();
      prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2 && prevPinchDist !== null) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      zoom((prevPinchDist - d) * 0.05);
      prevPinchDist = d;
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (e.touches.length === 0) {
      prevTouch = null;
      prevPinchDist = null;
    } else if (e.touches.length === 1) {
      prevPinchDist = null;
      prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("wheel", onWheel, { passive: false });
  canvas.addEventListener("touchstart", onTouchStart, { passive: false });
  canvas.addEventListener("touchmove", onTouchMove, { passive: false });
  canvas.addEventListener("touchend", onTouchEnd);

  return () => {
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("wheel", onWheel);
    canvas.removeEventListener("touchstart", onTouchStart);
    canvas.removeEventListener("touchmove", onTouchMove);
    canvas.removeEventListener("touchend", onTouchEnd);
  };
}
