
let number = 2; // Anzahl an Iterationen
let l = 0.34; // Lamda aus calculatePoints()


let button = document.getElementById("kochCurveButton");
let input= document.getElementById("kochCurveInput");
button.onclick = function (){
    number = input.value;
}

let width = 500;
let height = 500;


function setup() {
    createCanvas(width, height);
}

function draw() {
    background(200);
    translate(0, height);

    let p2 = [100,350];
    let p1 = [350,100];


    //let cData = integrateArrays([[p1],  calculatePoints(p1, p2, number, -1) ,[p2]]);

    let cData = getCurvePoints();

    for (let i=0; i < cData.length-1; i++)
    {
        line(cData[i][0], -1*cData[i][1], cData[i+1][0], -1*cData[i+1][1]);
    }

    line(cData[cData.length-1][0], -1*cData[cData.length-1][1], cData[0][0], -1*cData[0][1]);


}

function getCurvePoints(){

    //Die folgenden Punkte beschreiben die 3 Ecken des Grunddreiecks
    let d1 = [width/3 - width/6, height/3]; //untere linke Ecke
    let d2 = [width*(2/3) + width/6, height/3]; //untere rechte Ecke
    let d3 = [width/2, height*(2/3) + height/6]; //obere Ecke



    let a1 = calculatePoints(d1, d2, number);
    let a2 = calculatePoints(d2, d3, number);
    let a3 = calculatePoints(d3, d1, number);

    let res = integrateArrays([[d1], a1, [d2], a2, [d3], a3]);


    return res;
}

function calculatePoints(p1, p2, steps){

    if ((steps - 1) <= 0)
        return [];

    let uv;
    let xy

    //Input: 2 Punkte (u,v) und (x,y), die die Gerade definieren
    uv = p1;
    xy = p2;

    // 0. Berechne (a,b) mit (u,v) - (x,y)
    let ab = [uv[0]-xy[0], uv[1]-xy[1]];

    // 1. Berechne weitere 2 Punkte (d,e) und (j,k), die die gegebene Gerade in 3 Teile teilt.
    let de = getThird(uv, xy)[0];
    let jk = getThird(uv, xy)[1];

    // 2. Berechne die Normale der Geraden. (wenn (a,b) dann ist normale=(-b,a))
    let normale = [-ab[1], ab[0]];

    // 3. Berechne den Punkt (m,n) der in der Mitte von (u,v) und (x,y) liegt.
    let mn = getMiddle(uv, xy);

    // 4. Berechne (q, r) = (m,n) + lamda*normale. Lamda bestimmt, wie weit der Punkt von der Gerade entfernt liegt.
    let qr = [mn[0]+(l)*normale[0], mn[1]+(l)*normale[1]];

    let array1 = calculatePoints(uv, de, steps-1);

    // 5. Berechne array2 = calculatePoints((d,e), (q, r), steps-1)
    let array2 = calculatePoints(de, qr, steps-1);

    // 6. Berechne array3 = calculatePoints((q, r), (j,k), steps-1)
    let array3 = calculatePoints(qr, jk, steps-1);

    let array4 = calculatePoints(jk, xy, steps-1);

    return integrateArrays([array1, [de] , array2, [qr], array3, [jk], array4]);
}

function getThird(p1, p2){
    let nP1_x;
    let nP1_y;
    let nP2_x;
    let nP2_y;

    let x1 = p1[0];
    let y1 = p1[1];

    let x2 = p2[0];
    let y2 = p2[1];

    let d;
    let fac1 = 1;
    let fac2 = 1;

    if (x1 > x2)
        fac1 = -1;

    if (y1 > y2)
        fac2 = -1;

    d = Math.abs(x1-x2) * (1/3);
    nP1_x = x1 + fac1 * d;

    d = Math.abs(y1-y2) * (1/3);
    nP1_y = y1 + fac2*d;


    d = Math.abs(x1-x2) * (2/3);
    nP2_x = x1 + fac1*d;

    d = Math.abs(y1-y2) * (2/3);
    nP2_y = y1 + fac2*d;


    return [[nP1_x, nP1_y], [nP2_x, nP2_y]];
}


function getMiddle(p1, p2){
    return [(p1[0]+p2[0])/2, (p1[1]+p2[1])/2];
}

function integrateArrays(arrays){
    let res = [];

    for (let i=0; i<arrays.length; i++){
        for (let j=0; j<arrays[i].length; j++){
            res.push(arrays[i][j]);
        }
    }

    return res;

}