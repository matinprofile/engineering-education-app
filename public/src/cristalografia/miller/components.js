let vectorHeight

function setCoords(sketch) {
    dom = sketch.height * 0.3;
    cylinderRadius = 3;
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
    sketch.cylinder(cylinderRadius, axSize*1.5);
    sketch.translate(0, -axSize*0.75, 0);
    sketch.cone(cylinderRadius*2, -cylinderRadius*6);
    sketch.pop();

    // Y-axis (green)
    sketch.push();
    sketch.translate(0, -axSize*0.75, 0);
    sketch.fill(green);
    sketch.cylinder(cylinderRadius, axSize*1.5);
    sketch.translate(0, -axSize*0.75, 0);
    sketch.cone(cylinderRadius*2, -cylinderRadius*6);
    sketch.pop();

    // Z-axis (blue)
    sketch.push();
    sketch.rotateX(sketch.HALF_PI);
    sketch.translate(0, axSize*0.75, 0);
    sketch.fill(blue);
    sketch.cylinder(cylinderRadius, axSize*1.5);
    sketch.translate(0, axSize*0.75, 0);
    sketch.cone(cylinderRadius*2, cylinderRadius*6);
    sketch.pop();

    sketch.pop();
}

function drawCube(sketch,size) {
    sketch.push();
    sketch.translate(size/2,-size/2,size/2)
    sketch.fill(255, 255, 255, 0);
    sketch.box(size);
    sketch.pop();
}

function vectorNorm(x, y, z) {
    return Math.sqrt(x**2 + y**2 + z**2)
}

function scalarProduct(sketch, v1, v2) {
    let result = 0
    for (let i = 0; i < v1.length; i++) {
        result += v1[i] * v2[i]
    }
    return result
}

function rotations(sketch,alpha,beta,finalPoint) {
    if(finalPoint[0] > 0 && finalPoint[2] > 0) {
        sketch.rotateY(-alpha);
        sketch.rotateZ(sketch.HALF_PI - beta);
    }
    else if(finalPoint[0] <= 0 && finalPoint[2] >=0) {
        sketch.rotateY(alpha);
        sketch.rotateZ(sketch.HALF_PI - beta);
    }
    else if(finalPoint[0] >= 0 && finalPoint[2] <= 0) {
        sketch.rotateY(-alpha);
        sketch.rotateZ(sketch.HALF_PI + beta);
    }
    else if(finalPoint[0] <= 0 && finalPoint[2] <= 0) {
        sketch.rotateY(alpha);
        sketch.rotateZ(sketch.HALF_PI + beta);
    }
}

function drawVector(sketch,origin,final,size) {
    let x1,y1,z1,x2,y2,z2;
    x1 = origin[0];
    y1 = origin[1];
    z1 = origin[2];
    x2 = final[0];
    y2 = final[1];
    z2 = final[2];
    let vectorYAxis = [0, 1, 0]
    let vectorXYPlane = [x2-x1, y2-y1, 0]
    let vector = [x2-x1, y2-y1, z2-z1]

    vectorHeight = vectorNorm(...vector) * size;

    let alpha = Math.acos(scalarProduct(sketch,vectorYAxis, vectorXYPlane) / (vectorNorm(...vectorYAxis) * vectorNorm(...vectorXYPlane)));

    let beta = Math.acos(scalarProduct(sketch,vectorXYPlane, vector) / (vectorNorm(...vectorXYPlane) * vectorNorm(...vector)))

    if(isNaN(alpha))
        alpha = 0

    if(isNaN(beta))
        beta = sketch.HALF_PI

    sketch.push();
    sketch.translate(y1*size,-z1*size,x1*size)
    rotations(sketch,alpha,beta,vector)
    sketch.translate(0,(-vectorHeight/2),0);
    sketch.fill(0);
    sketch.cylinder(cylinderRadius, vectorHeight-cylinderRadius*6);
    sketch.translate(0, -vectorHeight*0.5+cylinderRadius*3,0);
    sketch.cone(cylinderRadius*2, -cylinderRadius*6);
    sketch.pop();
}

function validMiller(sketch,finalPoint) {
    if(finalPoint[0] < 0 || finalPoint[0] > 1)
        return false;
    if(finalPoint[1] < 0 || finalPoint[1] > 1)
        return false;
    if(finalPoint[2] < 0 || finalPoint[2] > 1)
        return false;
    return true;
}

function calcFinalPoint(sketch,vertex,vx,vy,vz) {
    let max = Math.max(Math.abs(vx), Math.abs(vy), Math.abs(vz))
    let x2,y2,z2;
    x2 = vertex[0] + vx/max;
    y2 = vertex[1] + vy/max;
    z2 = vertex[2] + vz/max;
    return [x2,y2,z2];
}

function drawMillerPlane(sketch,vx,vy,vz,size) {
    let max = Math.max(Math.abs(vx), Math.abs(vy), Math.abs(vz))

    if(vx==0){
        vx=0
    }
    else{
        vx = 1/vx;
    }
    if(vy==0){
        vy=0
    }
    else{
        vy = 1/vy;
    }
    if(vz==0){
        vz=0
    }
    else{
        vz = 1/vz;
    }
    //vx = vx/max;
    //vy = vy/max;
    //vz = vz/max;

    sketch.push()
    if (vx < 0)
        sketch.translate(0, 0, size)
    if (vy < 0)
        sketch.translate(size, 0, 0)
    if (vz < 0)
        sketch.translate(0, -size, 0)

    if (vx < 0 || vy < 0 || vz < 0)
        drawAxis(sketch, 0, 0, 0, dom)

    sketch.fill(220)
    sketch.beginShape()

    if (vx === 0 && vy != 0 && vz != 0){
        sketch.vertex(vy * size, 0, size)
        sketch.vertex(vy * size, 0, 0)
        sketch.vertex(0, -vz * size, 0)
        sketch.vertex(0, -vz * size, size)
    }
    else if (vx != 0 && vy === 0 && vz != 0) {
        sketch.vertex(0, -vz * size, 0)
        sketch.vertex(size, -vz * size, 0)
        sketch.vertex(size, 0, vx * size)
        sketch.vertex(0, 0, vx * size)
    }
    else if (vx != 0 && vy != 0 && vz === 0) {
        sketch.vertex(0, 0, vx * size)
        sketch.vertex(0, -size, vx * size)
        sketch.vertex(vy * size, -size, 0)
        sketch.vertex(vy * size, 0, 0)
    }
    else if (vx === 0 && vy === 0 && vz != 0){
        sketch.vertex(0, -vz * size, size)
        sketch.vertex(0, -vz * size, 0)
        sketch.vertex(size, -vz * size, 0)
        sketch.vertex(size, -vz * size, size)
    }
    else if (vx === 0 && vy != 0 && vz === 0){
        sketch.vertex(vy * size, -size, 0)
        sketch.vertex(vy * size, 0, 0)
        sketch.vertex(vy * size, 0, size)
        sketch.vertex(vy * size, -size, size)
    }
    else if (vx != 0 && vy === 0 && vz === 0){
        sketch.vertex(size, 0, vx * size)
        sketch.vertex(0, 0, vx * size)
        sketch.vertex(0, -size, vx * size)
        sketch.vertex(size, -size, vx * size)
    }
    else {
        sketch.vertex(vy * size, 0, 0)
        sketch.vertex(0, -vz * size, 0)
        sketch.vertex(0, 0, vx * size)
    }
    sketch.endShape(sketch.CLOSE)
    sketch.pop()

    return [vx,vy,vz];
}

function drawMillerVector(sketch,vx,vy,vz,ix,iy,iz,size) {
    setCoords(sketch);
    let vertices = [[0,0,0],[1,0,0],[1,0,1],[0,0,1],[0,1,0],[1,1,0],[1,1,1],[0,1,1]];
    let vxNormal = vx/vectorNorm(vx,vy,vz)
    let vyNormal = vy/vectorNorm(vx,vy,vz)
    let vzNormal = vz/vectorNorm(vx,vy,vz)
    let finalPoint
   
    if (ix === 0 && iy === 0 && iz === 0){
        for (i of vertices) {
            finalPoint = calcFinalPoint(sketch,i,vxNormal,vyNormal,vzNormal);
            if (validMiller(sketch,finalPoint)) {
                calcFinalPoint(sketch,i,vxNormal,vyNormal,vzNormal, true);
                if (i[0] === 0 && i[1] === 0 && i[2] === 0) {
                }
                else
                    drawAxis(sketch, i[1]*size, -i[2]*size, i[0]*size, dom)
                drawVector(sketch,i, finalPoint, size);
                break;
            }
        }
    } else {
        finalPoint = calcFinalPoint(sketch,[ix,iy,iz],vxNormal,vyNormal,vzNormal)
        drawVector(sketch,[ix,iy,iz],finalPoint,size)
    }
    
    return finalPoint
}

const RED_LIGHT_FILL = [255, 0, 0, 60]
const GREEN_LIGHT_FILL = [0, 255, 0, 60]
const BLUE_LIGHT_FILL = [0, 0, 255, 60]
const RED_DARKER_FILL = [255, 0, 0, 200]
const GREEN_DARKER_FILL = [0, 255, 0, 200]
const BLUE_DARKER_FILL = [0, 0, 255, 200]


