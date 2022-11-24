let velocidad = 50000;
let fpi, cpi, rot;
let tablero;
let pieza = 0;

let keyRight = document.getElementById('button-right');
let keyLeft = document.getElementById('button-left');
let keyDown = document.getElementById('button-down');
let keyRotate = document.getElementById('button-rotate')

let record = 0;
let lineas = 0;  
let pos=[  //Valores referencia de coordenadas relativas
              [0,0],
              [0,1],
              [-1,0],
              [1,0],
              [-1,-1],
              [0,-1],
              [1,-1],
              [0,-2]
        ];
        let piezas=[  //Diseño de las piezas, el primer valor de cada fila corresponde con el número de rotaciones posibles
              [4,0,1,2,3],
              [4,0,1,5,6],
              [4,0,1,5,4],
              [2,0,1,5,7],
              [2,0,2,5,6],
              [2,0,3,5,4],
              [1,0,5,6,3]
    ];

    keyRight.onclick = function(){
        moverPieza(1);
    }
    keyLeft.onclick = function(){
        moverPieza(-1);
    }
    keyDown.onclick = function(){
        bajarPieza();
    }
    keyRotate.onclick = function(){
        rotarPieza();
    }

    function nuevaPartida(){
                velocidad = 50000;
                tablero=new Array(20);
                for (n=0;n < 20;n++){
                     tablero[n]=new Array(9);
                     for (m=0;m < 9;m++){
                          tablero[n][m]=0;
                     }
                }
        lineas=0;
        nuevaPieza();
    }
    function nuevaPieza(){
        cpi=3;
        fpi=0;
        rot=0;
        pieza=Math.floor(Math.random()*7);
        }
   
    
        function cuadroNoDisponible(f,c){
        if (f < 0) return false;
        return (c < 0 || c >= 9 || f >= 20 || tablero[f][c] > 0);
    }
    
        function colisionaPieza(){
        for (v=1;v < 5;v++){
            des=piezas[pieza][v];
            pos2=rotarCasilla(pos[des]);
            if (cuadroNoDisponible(pos2 [ 0 ] +fpi, pos2 [ 1 ]+cpi)){
                return true;
            }
        }


        return false;
        }
        function detectarLineas(){
        for (f=0;f < 20;f++){
            contarCuadros=0;
            for (c=0;c < 9;c++){
                if (tablero[f][c]>0){
                    contarCuadros++;
                }
            }
            if (contarCuadros==9){
                for (f2=f;f2 > 0;f2--){
                    for (c2=0;c2 < 9;c2++){
                        tablero[f2][c2]=tablero[f2-1][c2];
                    }
                }
                lineas++;
            }
        }
    }
    
        function bajarPieza(){
        fpi=fpi+1;
        if (colisionaPieza()){
            fpi=fpi-1;
            for (v=1;v < 5;v++){
                des=piezas[pieza][v];
                pos2=rotarCasilla(pos[des]);
                if (pos2 [ 0 ] +fpi >= 0 && pos2 [ 0 ] +fpi < 20 &&
                    pos2 [ 1 ] +cpi >=0 && pos2 [ 1 ] +cpi < 9){
                    tablero[pos2 [ 0 ] +fpi][pos2 [ 1 ] +cpi]=pieza+1;
                }
            }
            detectarLineas();
            //Si hay algun cuadro en la fila 0 reinicia el juego
            let reiniciar=0;
            for (c=0;c < 9;c++){
                if (tablero [ 0 ] [ c ] !=0){
                    reiniciar=1;
                }
            }
            if (reiniciar==1){
                if (lineas > record){
                    record=lineas;
                }
                nuevaPartida();
            }else{
                nuevaPieza();
            }
        }
        }
    //Mueve la pieza lateralmente
    function moverPieza(des){
        cpi=cpi+des;
        if (colisionaPieza()){
            cpi=cpi-des;
        }
    }

    function rotarPieza(){
                rot=rot+1;
                if (rot==piezas[pieza] [ 0 ] ){
            rot=0;
        }
        if (colisionaPieza()){
            rot=rot-1;
                    if (rot==-1){
                rot=piezas[pieza] [ 0 ] -1;
            }
        }
    }
    //Obtiene unas coordenadas f,c y las rota 90 grados
    function rotarCasilla(celda){
        let pos2=[celda [ 0 ] , celda [ 1 ] ];
        for (n=0;n < rot ;n++){
            let f=pos2 [ 1 ];
            let c=-pos2 [ 0 ] ;
            pos2 [ 0 ] =f;
            pos2 [ 1 ] =c;
        }
        return pos2;
    }
    //Genera una nueva pieza aleatoriamente

    //Pinta el tablero (lo genera con html) y lo plasma en un div.
    function pintar(){
        let lt=" <";
        let des;
        let html="<table class='tetris'>"
        for (f=0;f < 20;f++){
            html+="<tr>";f
            for (c=0;c < 9;c++){
                let color=tablero[f][c];
                if (color==0){
                    for (v=1;v < 5;v++){
                        des=piezas[pieza][v];
                        let pos2=rotarCasilla(pos[des]);
                        if (f==fpi+pos2 [ 0 ]   && c==cpi+pos2 [ 1 ] ){
                            color=pieza+1;
                        }
                    }
                }
                html+="<td class='celda" + color + "'/>";
                    }
            html+=lt+"/tr>";
                }
        html+=lt+"/table>";
        html+="<br />Lineas : " + lineas;
        html+="<br />Record : " + record;
        document.getElementById('tetris').innerHTML=html;
                velocidad=Math.max(velocidad-1,500);
    }
    function tick(){
        bajarPieza();
        pintar();
        setTimeout('tick()', velocidad/100);
        }
    //Funcion principal
    function start(){
            nuevaPartida();
            setTimeout('tick()', 1);
        }
    //Al pulsar una tecla
    function tecla(e){
        let characterCode = (e && e.which)? e.which: e.keyCode;
        switch (characterCode){
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
