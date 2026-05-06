function accessPage(path) {
    let url = new URL(window.location.href)
    window.open(url.origin + "/" + path, "_top")
}

function redFill(sketch) {
    if (sketch !== undefined)
        sketch.fill(159, 30, 55);
    else
        fill(159, 30, 55);
}

function dist([x1, y1, z1], [x2, y2, z2]) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)
}

function lineDash3D(p5, [x1, y1, z1], [x2, y2, z2], delta) {
    // delta is both the length of a dash, the distance between 2 dots/dashes, and the diameter of a round
    let distance = dist([x1, y1, z1], [x2, y2, z2]);
    let dashNumber = distance/delta;
    let xDelta = (x2-x1)/dashNumber;
    let yDelta = (y2-y1)/dashNumber;
    let zDelta = (z2-z1)/dashNumber;

    for (let i = 0; i < dashNumber; i+= 2) {
        let xi1 = i*xDelta + x1;
        let yi1 = i*yDelta + y1;
        let zi1 = i*zDelta + z1;
        let xi2 = (i+1)*xDelta + x1;
        let yi2 = (i+1)*yDelta + y1;
        let zi2 = (i+1)*zDelta + z1;

        p5.line(xi1, yi1, zi1, xi2, yi2, zi2);
    }
}

const RED_LIGHT_FILL = [255, 0, 0, 60]
const GREEN_LIGHT_FILL = [0, 200, 0, 60]
const BLUE_LIGHT_FILL = [0, 0, 255, 60]
const RED_DARKER_FILL = [255, 0, 0, 200]
const GREEN_DARKER_FILL = [0, 200, 0, 200]
const BLUE_DARKER_FILL = [0, 0, 255, 200]

/******************
 *   COMPONENTS   *
 ******************/

let dom
let axisRadius

function setCoords(sketch) {
    dom = window.height * 0.04;
    axisRadius = 1;
    red = sketch.color(255, 0, 0);
    green = sketch.color(0, 255, 0);
    blue = sketch.color(0, 0, 255);
}

function drawAxis(sketch,x,y,z,axSize) {
    setCoords(sketch);
    sketch.push();
    sketch.noStroke();

    // Place axis in origin of cube
    sketch.translate(x,y,z);

    // X-axis (red)
    sketch.push();
    sketch.rotateZ(sketch.HALF_PI);
    sketch.translate(0, -axSize*0.75, 0);
    sketch.fill(red);
    sketch.cylinder(axisRadius, axSize*1.5);
    sketch.translate(0, -axSize*0.75, 0);
    sketch.cone(axisRadius*2, -axisRadius*6);
    sketch.pop();

    // Y-axis (green)
    sketch.push();
    sketch.translate(0, -axSize*0.75, 0);
    sketch.fill(green);
    sketch.cylinder(axisRadius, axSize*1.5);
    sketch.translate(0, -axSize*0.75, 0);
    sketch.cone(axisRadius*2, -axisRadius*6);
    sketch.pop();

    // Z-axis (blue)
    sketch.push();
    sketch.rotateX(sketch.HALF_PI);
    sketch.translate(0, axSize*0.75, 0);
    sketch.fill(blue);
    sketch.cylinder(axisRadius, axSize*1.5);
    sketch.translate(0, axSize*0.75, 0);
    sketch.cone(axisRadius*2, axisRadius*6);
    sketch.pop();

    sketch.pop();
}

function drawCube(sketch, size) {
    sketch.push();
    sketch.translate(size/2,-size/2,size/2)
    sketch.fill(255, 0);
    sketch.box(size);
    sketch.pop();
}

function drawVertex(sketch, [x, y, z], sketchSize, sphereSize, opacityOn = false, color) {
    if (color === undefined) {
        color = [159, 30, 55]
    }
    sketch.push()
    sketch.noStroke()
    if (opacityOn) {
        sketch.fill(...color)
        sketch.pointLight(color[0] + 50, color[1] + 50, color[2] + 50, 3000, -2000, 1000);
        sketch.shininess(40);
        sketch.ambientLight(color[0], color[1], color[2], 255);
    }
    else
        sketch.fill(0, 0, 0, 150)

    sketch.translate(x * sketchSize, -y * sketchSize, z * sketchSize)
    if (sphereSize === undefined)
        sphereSize = sketchSize/25
    sketch.sphere(sphereSize, 20, 20)
    sketch.pop()
}

function drawMainButton(sketch, x, y, width, height, text) {
    sketch.rectMode(sketch.CENTER)
    sketch.textAlign(sketch.CENTER, sketch.CENTER)
    sketch.textFont("Times");

    redFill(sketch)
    sketch.stroke(0)
    sketch.strokeWeight(1)
    sketch.rect(x, y, width, height, 20);

    sketch.textSize(25)
    sketch.fill(255);
    sketch.text(text, x, y);
}

function collapseStructures() {
    document.querySelector("#threedCanvas1").style.visibility = "collapse"
    document.querySelector("#threedCanvas2").style.visibility = "collapse"
    document.querySelector("#buttonCanvas").style.visibility = "collapse"
    document.querySelector("#planeCanvas").style.visibility = "collapse"
    document.querySelector("#optionsCanvas").style.visibility = "collapse"
    document.querySelector("#backButtonCanvas").style.visibility = "collapse"
    document.querySelector("#POFImageCanvas").style.visibility = "collapse"
    document.querySelector("#IDistImageCanvas").style.visibility = "collapse"
}

function visibleStructures() {
    document.querySelector("#threedCanvas1").style.visibility = "visible"
    document.querySelector("#threedCanvas2").style.visibility = "visible"
    document.querySelector("#buttonCanvas").style.visibility = "visible"
    document.querySelector("#planeCanvas").style.visibility = "visible"
    document.querySelector("#optionsCanvas").style.visibility = "visible"
    document.querySelector("#backButtonCanvas").style.visibility = "visible"
}


