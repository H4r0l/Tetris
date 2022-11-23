
function start(){
    const panel = document.getElementById("panel");
	const context = panel.getContext("2d");

}
var velocidad=50000; //velocidad del juego 
var fpi, cpi, rot; //Fila, columna y rotación 
var tablero; //matriz con el tablero 
var piezas=0; //pieza
var record=0; //almacena la mejor puntuación 
var lineas=0; //almacena la puntuación actual 
var pos=[ //Valores referencia de coordenadas relativas
    [0,0]
    [0,1]
    [-1,0]
    [1, 0]
    [-1, -1]
    [0, -1]
    [1, -1]
    [0, -2]

];
var piezas=[
    [4,0,1,2,3]
    [4,0,1,5,6]
    [4,0,1,5,4]
    [2,0,1,5,7]
    [2,0,2,5,6]
    [2,0,3,5,4]
    [1,0,5,6,3]
];
//
class Tetromino{
     constructor(rotation){
        this.rotations = rotations;
        this.rotationsIndex = 0;
        this.points = this.rotations[this.rotationIndex];
        const randomColor = Utils.getRandomColor();
        this.rotations.forEach(points => {
            points.forEach(point =>{
                point.color=randomColor;
            });
        });
   this.incremenRotationIndex();

     }
}
//
function nuevaPartida() {
    velocidad=50000;
    tablero=new Array(20);
    for(var n=0;n < 20;n++){
        tablero[n]=new Array(9);
        for (var m=0;m < 9;m++){
            tablero[n] [m]=0;
        }
                  
        }
        lineas=0;
           nuevaPieza();
    }
//
function cuadroNoDisponible(f,c) {
     if (f < 0) return false;
     return (c < 0 || c >=9 || f >=20 || tablero [f] [c] >0);
}
//
function colisionaPieza() {
    for (var v = 1; v < 5; v++) {
        var des = piezas[pieza][v];
        var pos2 = rotarCasilla(pos[des]);
        if (cuadroNoDisponible(pos2[0] + fpi, pos2[1] + cpi)) {
            return true;
        }
    }
    return false;
}
//
function detectarLineas() {
    for (var f = 0; f < 20; f++) {
        var contarCuadros = 0;
        for (var c = 0; c < 9; c++) {
            if (tablero[f][c] > 0) {
                contarCuadros++;
            }
        }
        if (contarCuadros == 9) {
            for (var f2 = f; f2 > 0; f2--) {
                for (var c2 = 0; c2 < 9; c2++) {
                    tablero[f2][c2] = tablero[f2 - 1][c2];
                }
            }
            lineas++;
        }
    }
}
//
function bajarPieza() {
    fpi = fpi + 1;
    if (colisionaPieza()) {
        fpi = fpi - 1;
        for (v = 1; v < 5; v++) {
            des = piezas[pieza][v];
            var pos2 = rotarCasilla(pos[des]);
            if (pos2[0] + fpi >= 0 && pos2[0] + fpi < 20 &&
                pos2[1] + cpi >= 0 && pos2[1] + cpi < 9) {
                tablero[pos2[0] + fpi][pos2[1] + cpi] = pieza + 1;
            }
        }
        detectarLineas();
        //Si hay algun cuadro en la fila 0 reinicia el juego
        var reiniciar = 0;
        for (var c = 0; c < 9; c++) {
            if (tablero[0][c] != 0) {
                reiniciar = 1;
            }
        }
        if (reiniciar == 1) {
            if (lineas > record) {
                record = lineas;
            }
            nuevaPartida();
        } else {
            nuevaPieza();
        }
    }
}
//
function moverPieza(des) {
    cpi = cpi + des;
    if (colisionaPieza()) {
        cpi = cpi - des;
    }
}
//
function rotarPieza() {
    rot = rot + 1;
    if (rot == piezas[pieza][0]) {
        rot = 0;
    }
    if (colisionaPieza()) {
        rot = rot - 1;
        if (rot == -1) {
            rot = piezas[pieza][0] - 1;
        }
    }
}
//
function rotarCasilla(celda) {
    var pos2 = [celda[0], celda[1]];
    for (var n = 0; n < rot; n++) {
        var f = pos2[1];
        var c = -pos2[0];
        pos2[0] = f;
        pos2[1] = c;
    }
    return pos2;
}
//
function nuevaPieza() {
    cpi = 3;
    fpi = 0;
    rot = 0;
    pieza = Math.floor(Math.random() * 7);
}
//
function tick() {
    bajarPieza();
    pintar();
    setTimeout('tick()', velocidad / 100);
}
//
function eventoCargar() {
    nuevaPartida();
    setTimeout('tick()', 1);
}
//
function tecla(e) {
    var characterCode = (e && e.which) ? e.which : e.keyCode;
    switch (characterCode) {
        case 37:
            moverPieza(-1);
            break;
        case 38:
            rotarPieza();
            break;
        case 39:
            moverPieza(1);
            break;
        case 40:
            bajarPieza();
            break;
    }
    pintar();
}


