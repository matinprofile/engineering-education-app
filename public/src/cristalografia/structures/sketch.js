let cam
let structure
let mainPlanes = true

const structureTypes = {
    BCC: "BCC",
    FCC: "FCC",
}

const structurePaths = {
    BCC: "./structureFiles/BCC.json",
    FCC: "./structureFiles/FCC.json",
}

const structurePlanes = {
    none: -1,
    "(1 0 0)": 0,
    "(1 1 0)": 1,
    "(1 1 1)": 2
}

const structureInfos = {
    none: -1,
    coordNum: 0,
    numAtoms: 1,
    edgeVol: 2,
    AOF: 3,
    planes: 4
}

const structureOptions = {
    none: 0,
    POF: 1,
    interplanarDistance: 2
}

let selectedStructureType
let selectedStructurePlane = structurePlanes.none
let selectedInfo = structureInfos.none
let selectedStructureOption = structureOptions.none

/************
 *   INFO   *
 ************/

let centerXInfoButtons = 175

let centerYInfoButton1 = 75
let centerYInfoButton2 = 150
let centerYInfoButton3 = 225
let centerYInfoButton4 = 300
let centerYInfoPlanes = 400

let buttonsInfoWidth = 300
let buttonsInfoHeight = 50

function drawInfo(sketch) {
    sketch.background(255);

    sketch.rectMode(sketch.CENTER)
    sketch.textAlign(sketch.CENTER, sketch.CENTER)
    sketch.textFont("Times")

    sketch.fill(255)
    sketch.stroke(0)
    sketch.strokeWeight(1)
    sketch.rect(centerXInfoButtons, centerYInfoButton1, buttonsInfoWidth, buttonsInfoHeight, 20);
    sketch.rect(centerXInfoButtons, centerYInfoButton2, buttonsInfoWidth, buttonsInfoHeight, 20);
    sketch.rect(centerXInfoButtons, centerYInfoButton3, buttonsInfoWidth, buttonsInfoHeight, 20);
    sketch.rect(centerXInfoButtons, centerYInfoButton4, buttonsInfoWidth, buttonsInfoHeight, 20);

    sketch.textSize(25)
    sketch.strokeWeight(0)
    sketch.fill(0);
    sketch.text('Coordination number', centerXInfoButtons, centerYInfoButton1);
    sketch.text('Number of atoms', centerXInfoButtons, centerYInfoButton2);
    sketch.text('Edge/Volume', centerXInfoButtons, centerYInfoButton3);
    sketch.text('Atomic Occupation Factor', centerXInfoButtons, centerYInfoButton4);

    drawMainButton(sketch, centerXInfoButtons, centerYInfoPlanes, buttonsInfoWidth, buttonsInfoHeight, "Planes")
}

const creatorInfo = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(400, 500);
        cnv.parent("#initialInfoCanvas")
    }

    sketch.mouseClicked = () => {
        if (sketch.mouseX < centerXInfoButtons + buttonsInfoWidth / 2 && sketch.mouseX > centerXInfoButtons - buttonsInfoWidth / 2) {
            if (sketch.mouseY < centerYInfoButton1 + buttonsInfoHeight / 2 && sketch.mouseY > centerYInfoButton1 - buttonsInfoHeight / 2) {
                if (selectedInfo === structureInfos.coordNum) selectedInfo = structureInfos.none
                else selectedInfo = structureInfos.coordNum
            }
            if (sketch.mouseY < centerYInfoButton2 + buttonsInfoHeight / 2 && sketch.mouseY > centerYInfoButton2 - buttonsInfoHeight / 2) {
                if (selectedInfo === structureInfos.numAtoms) selectedInfo = structureInfos.none
                else selectedInfo = structureInfos.numAtoms
            }
            if (sketch.mouseY < centerYInfoButton3 + buttonsInfoHeight / 2 && sketch.mouseY > centerYInfoButton3 - buttonsInfoHeight / 2) {
                if (selectedInfo === structureInfos.edgeVol) selectedInfo = structureInfos.none
                else selectedInfo = structureInfos.edgeVol
            }
            if (sketch.mouseY < centerYInfoButton4 + buttonsInfoHeight / 2 && sketch.mouseY > centerYInfoButton4 - buttonsInfoHeight / 2) {
                if (selectedInfo === structureInfos.AOF) selectedInfo = structureInfos.none
                else selectedInfo = structureInfos.AOF
            }
            if (sketch.mouseY < centerYInfoPlanes + buttonsInfoHeight / 2 && sketch.mouseY > centerYInfoPlanes - buttonsInfoHeight / 2) {
                selectedInfo = structureInfos.planes
                document.querySelector("#initialInfoCanvas").style.visibility = "collapse"
                document.querySelector("#initial3DCanvas").style.visibility = "collapse"
                document.querySelector("#initialInfoFormulasCanvas").style.visibility = "collapse"
                document.querySelector("#threedCanvas1").style.visibility = "visible"
                document.querySelector("#threedCanvas2").style.visibility = "visible"
                document.querySelector("#buttonCanvas").style.visibility = "visible"
                document.querySelector("#planeCanvas").style.visibility = "visible"
                document.querySelector("#optionsCanvas").style.visibility = "visible"
                document.querySelector("#backButtonCanvas").style.visibility = "visible"
            }
        }
    }

    sketch.draw = () => {
        drawInfo(sketch)
    }
}

let p5InitialInfo = new p5(creatorInfo)

/*******************
 *   Initial 3D    *
 *******************/

const creatorInitial3D = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(400, 400, sketch.WEBGL);

        cnv.parent('#initial3DCanvas')
        cam = sketch.createCamera()
        cam.eyeX = 800
        cam.eyeY = -600
        cam.eyeZ = 800
        cam.lookAt(0, 0, 0)
    }

    sketch.draw = () => {
        sketch.background(255);
        sketch.orbitControl();

        drawAxis(sketch, 0, 0, 0, size)

        switch (selectedInfo) {
            case structureInfos.none:
            case structureInfos.numAtoms:
            case structureInfos.AOF:
                if (selectedStructureType === structureTypes.BCC)
                    loadVertices(sketch, size, 178)
                else if (selectedStructureType === structureTypes.FCC)
                    loadVertices(sketch, size, 145)
                break;
            case structureInfos.coordNum:
                if (selectedStructureType === structureTypes.BCC) {
                    drawVertex(sketch, [0.5, 0.5, 0.5], size, 25, true, [0, 150, 0])
                    loadStructureSelectedView(sketch, size, -1)
                } else if (selectedStructureType === structureTypes.FCC) {
                    sketch.push()
                    sketch.scale(0.75, 0.75, 0.75)
                    drawVertex(sketch, [0, 0, 0], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [1, 0, 0], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [0, 0, 1], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [1, 0, 1], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [0.5, 0, 0.5], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [0, 2, 0], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [1, 2, 0], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [0, 2, 1], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [1, 2, 1], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [0.5, 2, 0.5], size, 25, true, [200, 50, 100])
                    drawVertex(sketch, [0.5, 1, 0.5], size, 25, true, [0, 0, 0])

                    loadStructureSelectedView(sketch, size, -2)
                    sketch.push()
                    sketch.translate(0, -size, 0)
                    loadStructureSelectedView(sketch, size, -2)
                    sketch.pop()
                    sketch.pop()
                }
                break;
            case structureInfos.edgeVol:
                if (selectedStructureType === structureTypes.BCC)
                    loadStructureSelectedView(sketch, size, 1)
                else if (selectedStructureType === structureTypes.FCC)
                    loadStructureSelectedView(sketch, size, 2)
                break;
        }
    }
}

let p5Initial3D = new p5(creatorInitial3D)

/*******************
 *  INFO FORMULAS  *
 *******************/

let coordNumImage
let numAtomsImage
let edgeVolumeImage
let AOFImage
let formulasLoaded = false
let structureChanged = false

const creatorInfoFormulas = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(400, 200);
        cnv.parent("#initialInfoFormulasCanvas")
        sketch.rectMode(sketch.CENTER)

        if (structure !== undefined) {
            coordNumImage = sketch.loadImage(structure.idCardImages.coordNum)
            numAtomsImage = sketch.loadImage(structure.idCardImages.numAtoms)
            edgeVolumeImage = sketch.loadImage(structure.idCardImages.edgeVol)
            AOFImage = sketch.loadImage(structure.idCardImages.AOF)
            formulasLoaded = true
        }
    }

    sketch.draw = () => {
        if (!formulasLoaded && structure !== undefined || structureChanged) {
            coordNumImage = sketch.loadImage(structure.idCardImages.coordNum)
            numAtomsImage = sketch.loadImage(structure.idCardImages.numAtoms)
            edgeVolumeImage = sketch.loadImage(structure.idCardImages.edgeVol)
            AOFImage = sketch.loadImage(structure.idCardImages.AOF)
            formulasLoaded = true
            structureChanged = false
        }

        sketch.background(255)

        if (structure !== undefined) {
            switch (selectedInfo) {
                case -1:
                    break
                case 0:
                    sketch.image(coordNumImage, 0, sketch.height / 2 - Math.min(sketch.height / 2, coordNumImage.height / 2), 400, Math.min(200, coordNumImage.height))
                    break
                case 1:
                    sketch.image(numAtomsImage, 0, sketch.height / 2 - Math.min(sketch.height / 2, numAtomsImage.height / 2), 400, Math.min(200, numAtomsImage.height))
                    break
                case 2:
                    sketch.image(edgeVolumeImage, 0, sketch.height / 2 - Math.min(sketch.height / 2, edgeVolumeImage.height / 2), 400, Math.min(200, edgeVolumeImage.height))
                    break
                case 3:
                    sketch.image(AOFImage, 0, sketch.height / 2 - Math.min(sketch.height / 2, AOFImage.height / 2), 400, Math.min(200, AOFImage.height))
                    break
            }
        }
    }
}

let p5InitialInfoFormulas = new p5(creatorInfoFormulas)


/**********
 *   3D   *
 ***********/

function choosePlaneSketchMode(sketch, i) {
    if (selectedStructurePlane === i) {
        i += 3
    }
    switch (i) {
        case structurePlanes["(1 0 0)"]:
            sketch.fill(...RED_LIGHT_FILL)
            break
        case structurePlanes["(1 1 0)"]:
            sketch.fill(...GREEN_LIGHT_FILL)
            break
        case structurePlanes["(1 1 1)"]:
            sketch.fill(...BLUE_LIGHT_FILL)
            break
        case structurePlanes["(1 0 0)"] + 3:
            sketch.fill(...RED_DARKER_FILL)
            break
        case structurePlanes["(1 1 0)"] + 3:
            sketch.fill(...GREEN_DARKER_FILL)
            break
        case structurePlanes["(1 1 1)"] + 3:
            sketch.fill(...BLUE_DARKER_FILL)
            break
    }
}

function choosePlaneButtonsSketchMode(sketch, i) {
    if (selectedStructurePlane === i) {
        i += 3
    }
    sketch.fill(255)

    switch (i) {
        case structurePlanes["(1 0 0)"]:
            sketch.strokeWeight(1)
            sketch.stroke(...RED_DARKER_FILL)
            break
        case structurePlanes["(1 1 0)"]:
            sketch.strokeWeight(1)
            sketch.stroke(...GREEN_DARKER_FILL)
            break
        case structurePlanes["(1 1 1)"]:
            sketch.strokeWeight(1)
            sketch.stroke(...BLUE_DARKER_FILL)
            break
        case structurePlanes["(1 0 0)"] + 3:
            sketch.strokeWeight(4)
            sketch.stroke(...RED_DARKER_FILL)
            break
        case structurePlanes["(1 1 0)"] + 3:
            sketch.strokeWeight(4)
            sketch.stroke(...GREEN_DARKER_FILL)
            break
        case structurePlanes["(1 1 1)"] + 3:
            sketch.strokeWeight(4)
            sketch.stroke(...BLUE_DARKER_FILL)
            break
    }
}

function choosePlaneButtonsTextSketchMode(sketch, i) {
    if (selectedStructurePlane === i) {
        i += 3
    }
    sketch.fill(0)
    switch (i) {
        case structurePlanes["(1 0 0)"]:
        case structurePlanes["(1 1 0)"]:
        case structurePlanes["(1 1 1)"]:
            sketch.strokeWeight(0.5)
            sketch.stroke(0)
            break
        case structurePlanes["(1 0 0)"] + 3:
            sketch.strokeWeight(3)
            sketch.fill(...RED_DARKER_FILL)
            sketch.stroke(...RED_DARKER_FILL)
            break
        case structurePlanes["(1 1 0)"] + 3:
            sketch.strokeWeight(3)
            sketch.fill(...GREEN_DARKER_FILL)
            sketch.stroke(...GREEN_DARKER_FILL)
            break
        case structurePlanes["(1 1 1)"] + 3:
            sketch.strokeWeight(3)
            sketch.fill(...BLUE_DARKER_FILL)
            sketch.stroke(...BLUE_DARKER_FILL)
            break
    }
}

function draw3DPlane(sketch, planeIdx) {
    let planePoints = structure.planes[planeIdx].outlineVertices
    choosePlaneSketchMode(sketch, planeIdx)

    let p1 = structure.vertices[planePoints[0]]
    let p2 = structure.vertices[planePoints[1]]
    let p3 = structure.vertices[planePoints[2]]
    if (planePoints.length === 3) {
        sketch.beginShape(sketch.TRIANGLES)
        sketch.vertex(p1[0] * size, -p1[1] * size, p1[2] * size)
        sketch.vertex(p2[0] * size, -p2[1] * size, p2[2] * size)
        sketch.vertex(p3[0] * size, -p3[1] * size, p3[2] * size)
        sketch.endShape(sketch.CLOSE)
    } else if (planePoints.length === 4) {
        let p4 = structure.vertices[planePoints[3]]
        sketch.beginShape()
        sketch.vertex(p1[0] * size, -p1[1] * size, p1[2] * size)
        sketch.vertex(p2[0] * size, -p2[1] * size, p2[2] * size)
        sketch.vertex(p3[0] * size, -p3[1] * size, p3[2] * size)
        sketch.vertex(p4[0] * size, -p4[1] * size, p4[2] * size)
        sketch.vertex(p1[0] * size, -p1[1] * size, p1[2] * size)
        sketch.endShape(sketch.CLOSE)
    }
}


function loadStructure(sketch, size) {
    if (structure !== undefined) {
        let i = 0
        for (let vertex of structure.vertices) {
            if (selectedStructurePlane > structurePlanes.none) {
                if (structure.planes[selectedStructurePlane].inlineVertices.indexOf(i++) !== -1)
                    continue
                drawVertex(sketch, vertex, size)
            }
        }

        if (structure.lines !== undefined) {
            sketch.strokeWeight(4)
            for (let linesVertices of structure.lines) {
                let startPoint = [structure.vertices[linesVertices[0]][0] * size, -structure.vertices[linesVertices[0]][1] * size, structure.vertices[linesVertices[0]][2] * size]
                let endPoint = [structure.vertices[linesVertices[1]][0] * size, -structure.vertices[linesVertices[1]][1] * size, structure.vertices[linesVertices[1]][2] * size]

                lineDash3D(sketch, startPoint, endPoint, 10)
            }
            sketch.strokeWeight(1)
        }

        for (let i = structure.planes.length - 1; i >= 0; i--) {
            draw3DPlane(sketch, i)
        }

        for (let vertex of structure.vertices) {
            drawVertex(sketch, vertex, size)
        }

        if (!structure.isHexagonal)
            drawCube(sketch, size)
    }
}

function loadStructureSelectedView(sketch, size, selectedStructurePlane) {
    if (structure !== undefined) {
        let i = 0
        if (selectedStructurePlane > structurePlanes.none) {
            for (let vertex of structure.vertices) {
                if (structure.planes[selectedStructurePlane].inlineVertices.indexOf(i++) !== -1)
                    continue
                drawVertex(sketch, vertex, size)
            }
        }

        if (structure.lines !== undefined && selectedStructurePlane !== -2 && structure.name === structureTypes.FCC) {
            sketch.strokeWeight(4)
            for (let linesVertices of structure.lines) {
                let startPoint = [structure.vertices[linesVertices[0]][0] * size, -structure.vertices[linesVertices[0]][1] * size, structure.vertices[linesVertices[0]][2] * size]
                let endPoint = [structure.vertices[linesVertices[1]][0] * size, -structure.vertices[linesVertices[1]][1] * size, structure.vertices[linesVertices[1]][2] * size]

                lineDash3D(sketch, startPoint, endPoint, 10)
            }
            sketch.strokeWeight(1)
        }

        if (selectedStructurePlane > structurePlanes.none)
            draw3DPlane(sketch, selectedStructurePlane)

        for (let vertex of structure.vertices) {
            drawVertex(sketch, vertex, size)
        }

        if (!structure.isHexagonal)
            drawCube(sketch, size)
    }
}

function loadVertices(sketch, size, sphereSize) {
    if (structure !== undefined) {
        for (let vertex of structure.vertices) {
            drawVertex(sketch, vertex, size, sphereSize, selectedInfo !== structureInfos.planes)
        }
    }
}

let size = 400

const creator3d1 = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(400, 400, sketch.WEBGL);

        cnv.parent('#threedCanvas1')
        cam = sketch.createCamera()
        cam.eyeX = 800
        cam.eyeY = -600
        cam.eyeZ = 800
        cam.lookAt(0, 0, 0)
    }

    sketch.draw = () => {
        sketch.background(255);
        sketch.orbitControl();

        drawAxis(sketch, 0, 0, 0, size)
        loadStructure(sketch, size)
    }
}

const creator3d2 = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(400, 400, sketch.WEBGL);

        cnv.parent('#threedCanvas2')
        cam = sketch.createCamera()
        cam.eyeX = 800
        cam.eyeY = -600
        cam.eyeZ = 800
        cam.lookAt(0, 0, 0)
    }

    sketch.draw = () => {
        sketch.background(255);
        sketch.orbitControl();

        drawAxis(sketch, 0, 0, 0, size)
        loadStructureSelectedView(sketch, size, selectedStructurePlane)
    }
}

let p53d1
let p53d2

/*-----------------------------
|        2D - BUTTONS         |
-----------------------------*/

let buttonsPlaneWidth = 100
let buttonsPlaneHeight = 50

let centerXButtonsPlane = 75

let centerYButtonPlane1 = 100
let centerYButtonPlane2 = 200
let centerYButtonPlane3 = 300

function drawButtons(sketch) {
    sketch.background(255);

    sketch.rectMode(sketch.CENTER)
    sketch.textAlign(sketch.CENTER, sketch.CENTER)
    sketch.textFont("Times")

    choosePlaneButtonsSketchMode(sketch, 0)
    sketch.rect(centerXButtonsPlane, centerYButtonPlane1, buttonsPlaneWidth, buttonsPlaneHeight, 20);
    choosePlaneButtonsSketchMode(sketch, 1)
    sketch.rect(centerXButtonsPlane, centerYButtonPlane2, buttonsPlaneWidth, buttonsPlaneHeight, 20);
    choosePlaneButtonsSketchMode(sketch, 2)
    sketch.rect(centerXButtonsPlane, centerYButtonPlane3, buttonsPlaneWidth, buttonsPlaneHeight, 20);

    sketch.textSize(25)
    sketch.fill(255);
    choosePlaneButtonsTextSketchMode(sketch, 0)
    sketch.text('{1 0 0}', centerXButtonsPlane, centerYButtonPlane1);
    choosePlaneButtonsTextSketchMode(sketch, 1)
    sketch.text('{1 1 0}', centerXButtonsPlane, centerYButtonPlane2);
    choosePlaneButtonsTextSketchMode(sketch, 2)
    sketch.text('{1 1 1}', centerXButtonsPlane, centerYButtonPlane3);
}

const creatorButtons = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(150, 400);
        cnv.parent("#buttonCanvas")
    }

    sketch.mouseClicked = () => {
        if (sketch.mouseX < centerXButtonsPlane + buttonsPlaneWidth / 2 && sketch.mouseX > centerXButtonsPlane - buttonsPlaneWidth / 2) {
            if (sketch.mouseY < centerYButtonPlane1 + buttonsPlaneHeight / 2 && sketch.mouseY > centerYButtonPlane1 - buttonsPlaneHeight / 2) {
                if (selectedStructurePlane === structurePlanes["(1 0 0)"]) selectedStructurePlane = structurePlanes.none
                else selectedStructurePlane = structurePlanes["(1 0 0)"]
            }
        }
        if (sketch.mouseX < centerXButtonsPlane + buttonsPlaneWidth / 2 && sketch.mouseX > centerXButtonsPlane - buttonsPlaneWidth / 2) {
            if (sketch.mouseY < centerYButtonPlane2 + buttonsPlaneHeight / 2 && sketch.mouseY > centerYButtonPlane2 - buttonsPlaneHeight / 2) {
                if (selectedStructurePlane === structurePlanes["(1 1 0)"]) selectedStructurePlane = structurePlanes.none
                else selectedStructurePlane = structurePlanes["(1 1 0)"]
            }
        }
        if (sketch.mouseX < centerXButtonsPlane + buttonsPlaneWidth / 2 && sketch.mouseX > centerXButtonsPlane - buttonsPlaneWidth / 2) {
            if (sketch.mouseY < centerYButtonPlane3 + buttonsPlaneHeight / 2 && sketch.mouseY > centerYButtonPlane3 - buttonsPlaneHeight / 2) {
                if (selectedStructurePlane === structurePlanes["(1 1 1)"]) selectedStructurePlane = structurePlanes.none
                else selectedStructurePlane = structurePlanes["(1 1 1)"]
            }
        }
    }

    sketch.draw = () => {
        drawButtons(sketch)
    }
}

let p5Buttons

/*----------------------------
|        2D - PLANES         |
----------------------------*/

function interpretPlaneProjVertex(vertex, size) {
    let result = [0, 0]
    for (let i = 0; i < 2; i++) {
        if (vertex[i] === "sqrt(3)/2")
            result[i] = Math.sqrt(3) / 2
        else if (vertex[i] === "sqrt(2)")
            result[i] = Math.sqrt(2)
        else if (vertex[i] === "sqrt(2)/2")
            result[i] = Math.sqrt(2) / 2
        else if (vertex[i] === "sqrt(3)/3")
            result[i] = Math.sqrt(3) / 3
        else if (vertex[i] === "2*sqrt(3)/3")
            result[i] = Math.sqrt(3) / 3 * 2
        else if (vertex[i] === "sqrt(6)/3")
            result[i] = Math.sqrt(6) / 3
        else if (vertex[i] === "2/3*sqrt(6)")
            result[i] = Math.sqrt(6) * 2 / 3
        else if (vertex[i] === "sqrt(6)/2")
            result[i] = Math.sqrt(6) / 2
        else if (vertex[i] === "sqrt(6)/4")
            result[i] = Math.sqrt(6) / 4
        else if (vertex[i] === "sqrt(2)/4")
            result[i] = Math.sqrt(2) / 4
        else if (vertex[i] === "sqrt(2)-sqrt(2)/4")
            result[i] = Math.sqrt(2) - Math.sqrt(2) / 4
        else
            result[i] = vertex[i]

        result[i] = result[i] * size * 0.75 + size * 0.2

        if (i === 1) {
            result[i] = size - result[i]
        }
    }
    return result
}

function drawPlane(sketch, size) {
    sketch.background(255);

    if (selectedStructurePlane !== structurePlanes.none) {

        let planeVertices = structure.planes[selectedStructurePlane].projection.vertices
        let planePoints = structure.planes[selectedStructurePlane].projection.points

        sketch.translate(100, 150)
        sketch.scale(0.5, 0.5)

        sketch.fill(110)
        for (let point of planePoints) {
            let [x, y] = interpretPlaneProjVertex(point, size)
            sketch.circle(x, y, structure.atomSize)
        }

        choosePlaneSketchMode(sketch, selectedStructurePlane)
        sketch.beginShape()
        for (let vertex of planeVertices) {
            let [x, y] = interpretPlaneProjVertex(vertex, size)
            sketch.vertex(x, y)
        }
        sketch.endShape(sketch.CLOSE)
    }
}

const creatorPlane = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(450, 400);
        cnv.parent("#planeCanvas")
    }

    sketch.draw = () => {
        let size = 400
        drawPlane(sketch, size)
    }
}

let p5Plane


p53d1 = new p5(creator3d1)
p53d2 = new p5(creator3d2)
p5Buttons = new p5(creatorButtons)
p5Plane = new p5(creatorPlane)

/*****************
 *    OPTIONS    *
 *****************/

let optionsPlaneWidth = 250
let optionsPlaneHeight = 75

let centerXPOF = 525
let centerYPOF = 125

let centerXIDist = 875
let centerYIDist = 125

const creatorOptions = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(1000, 200);
        cnv.parent("#optionsCanvas")
    }

    sketch.mouseClicked = () => {
        if (sketch.mouseX < centerXPOF + optionsPlaneWidth / 2 && sketch.mouseX > centerXPOF - optionsPlaneWidth / 2) {
            if (sketch.mouseY < centerYPOF + optionsPlaneHeight / 2 && sketch.mouseY > centerYPOF - optionsPlaneHeight / 2) {
                document.querySelector("#threedCanvas1").style.visibility = "collapse"
                document.querySelector("#threedCanvas2").style.visibility = "collapse"
                document.querySelector("#buttonCanvas").style.visibility = "visible"
                document.querySelector("#planeCanvas").style.visibility = "collapse"
                document.querySelector("#optionsCanvas").style.visibility = "collapse"
                document.querySelector("#backButtonCanvas").style.visibility = "visible"
                document.querySelector("#POFImageCanvas").style.visibility = "visible"
                mainPlanes = false
            }
        }
        if (sketch.mouseX < centerXIDist + optionsPlaneWidth / 2 && sketch.mouseX > centerXIDist - optionsPlaneWidth / 2) {
            if (sketch.mouseY < centerYIDist + optionsPlaneHeight / 2 && sketch.mouseY > centerYIDist - optionsPlaneHeight / 2) {
                document.querySelector("#threedCanvas1").style.visibility = "visible"
                document.querySelector("#threedCanvas2").style.visibility = "collapse"
                document.querySelector("#buttonCanvas").style.visibility = "visible"
                document.querySelector("#planeCanvas").style.visibility = "collapse"
                document.querySelector("#optionsCanvas").style.visibility = "collapse"
                document.querySelector("#backButtonCanvas").style.visibility = "visible"
                document.querySelector("#IDistImageCanvas").style.visibility = "visible"
                mainPlanes = false
            }
        }
    }

    sketch.draw = () => {
        drawMainButton(sketch, centerXPOF, centerYPOF, optionsPlaneWidth, optionsPlaneHeight, "POF");
        drawMainButton(sketch, centerXIDist, centerYIDist, optionsPlaneWidth, optionsPlaneHeight, "Interplanar Distance");
    }
}

// let p5Options = new p5(creatorOptions)

/*****************
 *  BACK BUTTON  *
 *****************/

let backPlaneWidth = 100
let backPlaneHeight = 50

let centerXBack = 300
let centerYBack = 125

function drawBack(sketch) {
    sketch.background(255);

    sketch.rectMode(sketch.CENTER)
    sketch.textAlign(sketch.CENTER, sketch.CENTER)
    sketch.textFont("Times")

    redFill(sketch)
    sketch.stroke(0)
    sketch.strokeWeight(1)
    sketch.rect(centerXBack, centerYBack, backPlaneWidth, backPlaneHeight, 20);

    sketch.textSize(25)
    sketch.fill(255);
    sketch.text('Back', centerXBack, centerYBack);
}

const creatorBackButton = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(400, 200);
        cnv.parent("#backButtonCanvas")
    }

    sketch.mouseClicked = () => {
        if (sketch.mouseX < centerXBack + backPlaneWidth / 2 && sketch.mouseX > centerXBack - backPlaneWidth / 2) {
            if (sketch.mouseY < centerYBack + backPlaneHeight / 2 && sketch.mouseY > centerYBack - backPlaneHeight / 2) {
                if(mainPlanes) {
                    selectedInfo = structureInfos.none;
                    document.querySelector("#initialInfoCanvas").style.visibility = "visible"
                    document.querySelector("#initial3DCanvas").style.visibility = "visible"
                    document.querySelector("#initialInfoFormulasCanvas").style.visibility = "visible"
                    collapseStructures();
                } else {
                    mainPlanes = true
                    document.querySelector("#POFImageCanvas").style.visibility = "collapse"
                    document.querySelector("#IDistImageCanvas").style.visibility = "collapse"
                    visibleStructures();
                }
            }
        }
    }

    sketch.draw = () => {
        drawBack(sketch)
    }
}

let p5BackButton = new p5(creatorBackButton)


/*****************
 *   POF IMAGE   *
 *****************/

let imageBCCPOF100
let imageBCCPOF110
let imageBCCPOF111
let imageFCCPOF100
let imageFCCPOF110
let imageFCCPOF111
let imagesPOFWidth = 900

const creatorPOFImage = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(imagesPOFWidth, 400);
        cnv.parent("#POFImageCanvas")
        sketch.rectMode(sketch.CENTER)

        imageBCCPOF100 = sketch.loadImage("structureImages/POF/BCCPOF100.png")
        imageBCCPOF110 = sketch.loadImage("structureImages/POF/BCCPOF110.png")
        imageBCCPOF111 = sketch.loadImage("structureImages/POF/BCCPOF111.png")
        imageFCCPOF100 = sketch.loadImage("structureImages/POF/FCCPOF100.png")
        imageFCCPOF110 = sketch.loadImage("structureImages/POF/FCCPOF110.png")
        imageFCCPOF111 = sketch.loadImage("structureImages/POF/FCCPOF111.png")
    }

    sketch.draw = () => {
        sketch.background(255)
        if(!mainPlanes) {
            switch (selectedStructureType) {
                case structureTypes.BCC:
                    switch (selectedStructurePlane) {
                        case structurePlanes["(1 0 0)"]:
                            sketch.image(imageBCCPOF100, 0, 0, imagesPOFWidth, imageBCCPOF100.height/imageBCCPOF100.width * imagesPOFWidth)
                            break
                        case structurePlanes["(1 1 0)"]:
                            sketch.image(imageBCCPOF110, 0, 0, imagesPOFWidth, imageBCCPOF110.height/imageBCCPOF110.width * imagesPOFWidth)
                            break
                        case structurePlanes["(1 1 1)"]:
                            sketch.image(imageBCCPOF111, 0, 0, imagesPOFWidth, imageBCCPOF111.height/imageBCCPOF111.width * imagesPOFWidth)
                            break
                    }
                    break
                case structureTypes.FCC:
                    switch (selectedStructurePlane) {
                        case structurePlanes["(1 0 0)"]:
                            sketch.image(imageFCCPOF100, 0, 0, imagesPOFWidth, imageFCCPOF100.height/imageFCCPOF100.width * imagesPOFWidth)
                            break
                        case structurePlanes["(1 1 0)"]:
                            sketch.image(imageFCCPOF110, 0, 0, imagesPOFWidth, imageFCCPOF110.height/imageFCCPOF110.width * imagesPOFWidth)
                            break
                        case structurePlanes["(1 1 1)"]:
                            sketch.image(imageFCCPOF111, 0, 0, imagesPOFWidth, imageFCCPOF111.height/imageFCCPOF111.width * imagesPOFWidth)
                            break
                    }
                    break
            }


        }
    }
}

let p5POFImage = new p5(creatorPOFImage)

/*************************
 *   Interplanar IMAGE   *
 ************************/

let imageBCCIDist100
let imageBCCIDist110
let imageBCCIDist111
let imageFCCIDist100
let imageFCCIDist110
let imageFCCIDist111
let imagesIDistWidth = 700

const creatorIDistImage = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(imagesIDistWidth, 400);
        cnv.parent("#IDistImageCanvas")
        sketch.rectMode(sketch.CENTER)

        imageBCCIDist100 = sketch.loadImage("structureImages/IDist/BCCIDist100.png")
        imageBCCIDist110 = sketch.loadImage("structureImages/IDist/BCCIDist110.png")
        imageBCCIDist111 = sketch.loadImage("structureImages/IDist/BCCIDist111.png")
        imageFCCIDist100 = sketch.loadImage("structureImages/IDist/FCCIDist100.png")
        imageFCCIDist110 = sketch.loadImage("structureImages/IDist/FCCIDist110.png")
        imageFCCIDist111 = sketch.loadImage("structureImages/IDist/FCCIDist111.png")
    }

    sketch.draw = () => {
        sketch.background(255)
        if (!mainPlanes) {
            switch (selectedStructureType) {
                case structureTypes.BCC:
                    switch (selectedStructurePlane) {
                        case structurePlanes["(1 0 0)"]:
                            sketch.image(imageBCCIDist100, 0, 0, imagesIDistWidth, imageBCCIDist100.height / imageBCCIDist100.width * imagesIDistWidth)
                            break
                        case structurePlanes["(1 1 0)"]:
                            sketch.image(imageBCCIDist110, 0, 0, imagesIDistWidth, imageBCCIDist110.height / imageBCCIDist110.width * imagesIDistWidth)
                            break
                        case structurePlanes["(1 1 1)"]:
                            sketch.image(imageBCCIDist111, 0, 0, imagesIDistWidth, imageBCCIDist111.height / imageBCCIDist111.width * imagesIDistWidth)
                            break
                    }
                    break
                case structureTypes.FCC:
                    switch (selectedStructurePlane) {
                        case structurePlanes["(1 0 0)"]:
                            sketch.image(imageFCCIDist100, 0, 0, imagesIDistWidth, imageFCCIDist100.height / imageFCCIDist100.width * imagesIDistWidth)
                            break
                        case structurePlanes["(1 1 0)"]:
                            sketch.image(imageFCCIDist110, 0, 0, imagesIDistWidth, imageFCCIDist110.height / imageFCCIDist110.width * imagesIDistWidth)
                            break
                        case structurePlanes["(1 1 1)"]:
                            sketch.image(imageFCCIDist111, 0, 0, imagesIDistWidth, imageFCCIDist111.height / imageFCCIDist111.width * imagesIDistWidth)
                            break
                    }
                    break
            }
        }
    }
}

let p5IDistImage = new p5(creatorIDistImage)

/*****************
 *   INTERFACE   *
 *****************/


function tabSelector(selected) {
    selectedStructureType = selected
    formulasLoaded = false
    fetch(structurePaths[selectedStructureType])
        .then(response => {
            return response.json();
        }).then(data => {
        structure = data
        structureChanged = true

    })
}

function subtabSelector(selected) {
}

tabSelector(structureTypes.BCC)

let currentModule
const outSketch = p5 => {
    p5.setup = () => {
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        centerSketch()
        currentModule = new Module({
            "name": "Structures",
            "tabSelector": tabSelector,
            "width": 1500,
            "height": 700,
            "tabs": [
                {
                    "name": "BCC",
                    "subtabs": [
                        {
                            "name": undefined
                        }
                    ],
                    "width": 120,
                    "height": 50
                },
                {
                    "name": "FCC",
                    "subtabs": [
                        {
                            "name": undefined
                        }
                    ],
                    "width": 120,
                    "height": 50
                },
            ],
            "selectedTab": "BCC"
        })
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        centerSketch()
    }

    p5.draw = () => {
        currentModule.display(p5)
    }

    p5.mouseClicked = () => {
        currentModule.clicked(p5)
    }
};

new p5(outSketch);

collapseStructures();