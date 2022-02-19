let width = 500;
let height = width;

let n = 2;

let input = document.getElementById("triangleInput");
let btn = document.getElementById("triangleButton");

btn.onclick = function (){
    n = input.value;
}


function setup() {
    createCanvas(width, height);
}

function draw() {
    background(200);
    translate(0, height);

    drawBackgroundTriangle()
    drawTriangle(0, 0, width, 0, width/2, -((Math.sqrt(3) / 2) * width), n);
}

function drawTriangle(x1, y1, x2, y2, x3, y3, step){
    if (step == 0){
        return;
    }

    fill("white");

    // Punkt zwischen (x1,y1) und (x3,y3)
    let p1_x = (x1+x3) / 2;
    let p1_y = (y1+y3) / 2;

    //Punkt zwischen (x3,y3) und (x2,y2)
    let p2_x = (x3+x2) / 2;
    let p2_y = (y3+y2) / 2;

    //Punkt zwischen (x1,y1) und (x2,y2)
    let p3_x = (x1+x2) / 2;
    let p3_y = (y1+y2) / 2;

    triangle(p1_x, p1_y, p2_x, p2_y, p3_x, p3_y);

    drawTriangle(x1, y1, p1_x, p1_y, p3_x, p3_y, step-1);
    drawTriangle(p1_x, p1_y, x3, y3, p2_x, p2_y, step-1);
    drawTriangle(p3_x, p3_y, p2_x, p2_y, x2, y2, step-1);

}

function drawBackgroundTriangle(){
    fill("black");
    let h = (Math.sqrt(3) / 2) * width;
    triangle(0, 0, width, 0, width/2, -h);
}