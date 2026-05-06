let inputX, inputY, inputZ
let inputInitialX, inputInitialY, inputInitialZ, initialCheckbox;
let rect
let elem
let buttonDraw
let number = 0;
let vx = 0, vy = 0, vz = 0;
let ix = 0, iy = 0, iz = 0;
let originOn = false
let subtabPlane = 1
let final;

function drawComponents(sketch, size) {
    if(subtabPlane)
        final = drawMillerPlane(sketch,vx,vy,vz,size);
    else {
        final = drawMillerVector(sketch, vx, vy, vz, ix, iy, iz, size);
    }
    drawCube(sketch,size);
}

function drawCoordinates(sketch) {
    if (isNaN(final[0])){
        drawTitle(sketch, 680, 320, "x: " + 0, 15)
        drawTitle(sketch, 680, 350, "y: " + 0, 15)
        drawTitle(sketch, 680, 380, "z: " + 0, 15)
    } else {
        drawTitle(sketch, 680, 320, "x: " + final[0], 15)
        drawTitle(sketch, 680, 350, "y: " + final[1], 15)
        drawTitle(sketch, 680, 380, "z: " + final[2], 15)
    }
}

const creator3d = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(500, 500, sketch.WEBGL);

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

        let size = 500;
        drawAxis(sketch,0,0,0,size);
        drawComponents(sketch,size);
    }
}

let p53d = new p5(creator3d)

/*---------------------------
|        2D - Title         |
---------------------------*/

function redFill(sketch) {
    sketch.fill(159, 30, 55);
}

function drawTitle(sketch,x,y,text,textSize) {
    sketch.rectMode(sketch.CENTER)
    sketch.textAlign(sketch.CENTER, sketch.CENTER)
    sketch.textFont("Times")

    sketch.textSize(textSize)
    redFill(sketch)
    sketch.text(text, x, y);
}


/*-----------------------------
|        2D - BUTTONS         |
-----------------------------*/
let firstInputX = 0
let firstInputY = 200

let firstTitleX = 100
let firstTitleY = 55

let centerXButtonPlane1 = 350
let centerYButtonPlane1 = 350
let widthButtonPlane1 = 200
let heightButtonPlane1 = 75

let checkboxX = 465
let checkboxY = 200

function createOneInput(sketch, x, y, sizeX, sizeY, defaultValue=1){
    let input = sketch.createInput(defaultValue);
    input.position(x, y);
    input.size(sizeX,sizeY)

    return input;
}

function myCheckboxChanged() {
    if (initialCheckbox.checked()) {
        originOn = true
    } else {
        originOn = false
    }
}

function createInputs(sketch){
    // elem = document.querySelector('#buttonCanvas')
    // rect = elem.getBoundingClientRect()
    inputX = createOneInput(sketch,firstInputX, firstInputY, 300, 25)
    inputY = createOneInput(sketch,firstInputX, firstInputY+50, 300, 25)
    inputZ = createOneInput(sketch,firstInputX, firstInputY+100, 300, 25)

    inputInitialX = createOneInput(sketch, firstInputX + 400, firstInputY, 300, 25, 0)
    inputInitialY = createOneInput(sketch, firstInputX + 400, firstInputY + 50, 300, 25, 0)
    inputInitialZ = createOneInput(sketch, firstInputX + 400, firstInputY + 100, 300, 25, 0)

    initialCheckbox = sketch.createCheckbox('', false);
    initialCheckbox.position(firstInputX+410, firstInputY-55);
    initialCheckbox.changed(myCheckboxChanged)

    let inputs = [
        inputX,
        inputY,
        inputZ,
        inputInitialX,
        inputInitialY,
        inputInitialZ,
        initialCheckbox,
    ]

    for (let input of inputs) {
        input.parent("#mainCanvas")
    }
}

function drawButton(sketch, x, y) {
    sketch.rectMode(sketch.CENTER)
    sketch.textAlign(sketch.CENTER, sketch.CENTER)
    sketch.textFont("Times");

    sketch.rect(x, y, widthButtonPlane1, heightButtonPlane1, 20);

    sketch.textSize(25)
    sketch.fill(255);
    sketch.text('Draw', x, y);
}

function drawClicked() {
    vx = parseFloat(inputX.value());
    vy = parseFloat(inputY.value());
    vz = parseFloat(inputZ.value());
    if (isNaN(vx))
        vx = 0
    if (isNaN(vy))
        vy = 0
    if (isNaN(vz))
        vz = 0
    if(originOn){
        ix = parseFloat(inputInitialX.value());
        iy = parseFloat(inputInitialY.value());
        iz = parseFloat(inputInitialZ.value());
        if (isNaN(ix))
            ix = 0
        if (isNaN(iy))
            iy = 0
        if (isNaN(iz))
            iz = 0
    } else {
        ix = 0
        iy = 0
        iz = 0
    }
}

const creatorButtons = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(800, 400);
        cnv.parent("#buttonCanvas")

        createInputs(sketch);
    }

    sketch.mouseClicked = () => {
        if (sketch.mouseX < centerXButtonPlane1 + widthButtonPlane1 / 2 && sketch.mouseX > centerXButtonPlane1 - widthButtonPlane1 / 2) {
            if (sketch.mouseY < centerYButtonPlane1 + heightButtonPlane1 / 2 && sketch.mouseY >  centerYButtonPlane1 - heightButtonPlane1 / 2) {
                drawClicked();
            }
        }
    }

    sketch.draw = () => {
        sketch.background(255);
        // rect = elem.getBoundingClientRect();

        drawTitle(sketch, firstTitleX, firstTitleY, 'Miller indices', 30);

        if(!subtabPlane) {
            drawTitle(sketch, firstTitleX+430, firstTitleY, 'Initial Point', 30);
        }

        if (subtabPlane){
            inputInitialX.hide()
            inputInitialY.hide()
            inputInitialZ.hide()
            initialCheckbox.hide()
        }
        else if (!originOn && !subtabPlane) {
            initialCheckbox.show()
            inputInitialX.hide()
            inputInitialY.hide()
            inputInitialZ.hide()
            drawCoordinates(sketch)
        }
        else if (originOn && !subtabPlane) {
            initialCheckbox.show()
            inputInitialX.show()
            inputInitialY.show()
            inputInitialZ.show()
            drawCoordinates(sketch)
        }

        drawButton(sketch, centerXButtonPlane1, centerYButtonPlane1);
    }
}


let p5Buttons = new p5(creatorButtons)


/*****************
 *   INTERFACE   *
 *****************/


function tabSelector(selected) {}

function subtabSelector(selected) {
    console.log(selected)
    if(selected === "Plane")
        subtabPlane = 1;
    else
        subtabPlane = 0;
}

let currentModule
const outSketch = p5 => {
    p5.setup = () => {
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        centerSketch()
        currentModule = new Module({
            "name": "Miller",
            "tabSelector": tabSelector,
            "width": 1500,
            "height": 600,
            "tabs": [
                {
                    "name": "Cubic",
                    "subtabSelector": subtabSelector,
                    "subtabs": [
                        {
                            "name": "Plane",
                            "width": 150,
                            "height": 50
                        },
                        {
                            "name": "Direction",
                            "width": 150,
                            "height": 50
                        }
                    ],
                    "width": 120,
                    "height": 50,
                    "selectedSubtab": "Plane"
                }
            ],
            "selectedTab": "Cubic"
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