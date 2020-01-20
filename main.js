//Declaración obligatoria de variables
"use strict";

//Variables
var labelX, labelO;//Atributo label de cada jugador.
var contadorX; //Para temporizador del jugadorX.
var contadorO; //Para temporizador del jugadorO.
var estaJugando;//Para controlar quien está jugando. Se utilizará cuando haya que colocar una ficha
var casilla; //Para las casillas.
var num = 0;//Para el id de las casillas.
var segundos = 15;
var intervalo;//Para parar la cuenta atrás.
var aFichasColocadas = new Array();
var capa;//Capa jugadores
var juegoEnCurso = false;

//Al cargar la página
window.addEventListener("load", function () {
    let empezar;

    //Llamo a las funciones
    imprimeTitulo();
    creaTablero();
    capaJugadores();
    //Establezco el objeto a variable.
    empezar = document.getElementById("comenzar");
    //Establezco el evento.
    empezar.addEventListener("click", comenzar);

});

//------------------------------TITULO-----------------------------
//Función para imprimir el título.
function imprimeTitulo() {
    //Declaración de variables.
    let titulo; //Para crear la etiqueta H1 en el HTML.
    let texto; //Para escribir Tres en Raya.

    //Creo el elemento H1.
    titulo = document.createElement("div");
    //Le asigno un id para enlazarlo con el css.
    titulo.setAttribute("id", "titulo");
    //Creo el texto.
    texto = document.createTextNode("Tres en Raya");
    //Inserto el texto en la etiqueta.
    titulo.appendChild(texto);
    //Inserto la etiqueta en la capa.
    document.body.appendChild(titulo);
}

//--------------------------------TABLERO----------------------------
//Función para crear el tablero
function creaTablero() {

    //Declaración de variables.
    let capa; //Para crear la capa.
    let tablero; //Para pintar el tablero.
    let filaCasillas; //Para fila de 3 casillas. 


    //Creo la capa div.
    capa = document.createElement("div");
    //Creo el elemento table que alojará al tablero.
    tablero = document.createElement("table");

    //Bucle para introducir el grupo de casillas en la variable casillero.
    for (let i = 0; i <= 2; i++) {
        //Creo el elemento tr que alojará las filas de casillas.
        filaCasillas = document.createElement("tr");
        for (let j = 0; j <= 2; j++) {
            //Creo el elemento td que alojará a las casillas.
            casilla = document.createElement("td");
            //Le asigno la clase numeroCasillas para hacer un array que me permita enumerar las casillas.
            casilla.setAttribute("class", "numeroCasilla");
            //Le asigno un número de id.
            casilla.setAttribute("id", num);
            //Inserto el elemento casilla dentro del elemento filaCasillas.
            filaCasillas.appendChild(casilla);
            //Establezco el evento click
            casilla.addEventListener("click", ficha);
            //Array
            aFichasColocadas[num];
            //Incremento num.
            num++;

        }
        //Inserto el elemento filaCasillas en el tablero.
        tablero.appendChild(filaCasillas);

    }
    //Inserto el tablero en el body.
    document.body.appendChild(tablero);


}

//------------------------------CAPA JUGADORES-------------------------------
//Función para crear la capa que contiene los turnos y el botón comenzar
function capaJugadores() {

    //Variables.
    let boton;
    let jugadorX;
    let jugadorO;

    //Creo la capa div.
    capa = document.createElement("div");
    //Le asigno un id a la capa.
    capa.setAttribute("id", "capaJugadores");
    //Creo el elemento label.
    labelX = document.createElement("label");
    labelO = document.createElement("label");
    //Creo el elemento input para el text.
    contadorX = document.createElement("input");
    //Le asigno el tipo text al elemento input.
    contadorX.setAttribute("type", "text");
    //Le doy un tamaño al elemento input.
    contadorX.setAttribute("size", "2");
    //Le doy un id al elemento input.
    contadorX.setAttribute("id", "contadorX");
    //Creo el elemento input para el text.
    contadorO = document.createElement("input");
    //Le asigno el tipo text al elemento input.
    contadorO.setAttribute("type", "text");
    //Le doy un tamaño al elemento input.
    contadorO.setAttribute("size", "2");
    //Le doy un id al elemento input.
    contadorO.setAttribute("id", "contadorO");
    //Creo el elemento input para el botón.
    boton = document.createElement("input");
    //Le asigno el tipo button al elemento input.
    boton.setAttribute("type", "button");
    //Le asigno el nombre al botón.
    boton.setAttribute("value", "Comenzar");
    //Le doy un id al botón.
    boton.setAttribute("id", "comenzar");

    //Creo el texto Turno Jugador X:.
    jugadorX = document.createTextNode("Turno Jugador X:");
    labelX.appendChild(jugadorX); //Inserto el texto en el elemento label.
    capa.appendChild(labelX); //Inserto el elemento label en la capa div.
    capa.appendChild(contadorX);//Inserto el contador en la capa div.
    document.body.appendChild(capa); //Inserto la capa div en el body del HTML.

    //Creo el texto Turno Jugador O:.
    jugadorO = document.createTextNode("Turno Jugador O:");
    labelO.appendChild(jugadorO);//Inserto el texto en el elemento label.
    capa.appendChild(labelO); //Inserto el elemento label en la capa div.
    capa.appendChild(contadorO);//Inserto el contador en la capa div.
    document.body.appendChild(capa); //Inserto la capa div en el body del HTML.

    //Inserto el botón.
    capa.appendChild(boton);
    document.body.appendChild(capa);
}

//------------------------FUNCIONES PARA EL JUEGO-----------------------------

//Funciones que se llaman al pulsar el botón comenzar
function comenzar() {
    juegoEnCurso = true;
    //Resalta el jugador que ha salido en el sorteo
    resaltado();
    cuentaAtras(estaJugando);
    desComenzar();
}

//Inhabilito el botón comenzar
function desComenzar(){
    document.getElementById("comenzar").removeEventListener("click", comenzar);
}

/*Función para escoger el jugador que empieza. 
    Devuelve 1 si el jugador que empieza es X
    Devuelve 2 si el jugador que empieza es O
*/
function sorteo() {
    let num;
    num = Math.floor((Math.random() * (2 - 1 + 1)) + 1);//Valor 1 ó 2
    return num;
}

//Función para resaltar el texto del jugador que tiene el turno.
function resaltado() {
    let jugadorResaltado = sorteo();
    let turno;

    turno = jugadorResaltado % 2;//Realizo la división entre 2 y le asigno el resto a la variable turno
    if (turno != 0) {//Empieza jugadorX.
        color(labelX, labelO);//Llamo a la función color
        jugandoX();//Llamo a la función para que el jugadorX pueda poner ficha

    } else {//Empieza jugadorO.
        color(labelO, labelX);//Llamo a la función color
        jugandoO();//Llamo a la función para que el jugadorO pueda poner ficha

    }

}

//Función para asignar el color al texto del jugador
function color(tieneTurno, quitaTurno) {
    tieneTurno.setAttribute("class", "turnojugador");//Le asigno la clase turnojugador para que se resalte el texto.
    quitaTurno.removeAttribute("class");//Le retiro la clase turnoJugador para que no se resalte el texto.
}

//*****FUNCIONES PARA LOS JUGADORES****
//Función para que juegue X
function jugandoX() {
    estaJugando = "X";
    color(labelX, labelO);//Resaltado del texto


}

//Función para que juegue O
function jugandoO() {
    estaJugando = "O";
    color(labelO, labelX);//Resaltado del texto


}
//**************************************

//Función para la cuenta atrás
function cuentaAtras(estaJugando) {
    let contador;

    if (estaJugando == "X") {//Si está jugando X
        contador = document.getElementById("contadorX");//Imprimo los segundos en el contadorX
    } else {//Si está jugando O
        contador = document.getElementById("contadorO");//Imprimo los segundos en el contadorO
    }
    intervalo = setInterval(function () {
        segundos--;//Resto los segundos
        contador.value = segundos;//Imprimo los segundos

        if (segundos == 0) {//Si se acaba el tiempo
            clearInterval(intervalo);
            if (estaJugando == "X") {//Si está jugando X
                contador = document.getElementById("contadorX").value = "";//Vacío el contador
                jugandoO();//Juega O
                segundos = 15;//Restablezco los segundos
                cuentaAtras("O");//Le paso el parámetro O a la función cuentaAtras
            } else {
                contador = document.getElementById("contadorO").value = "";//Vacío el contador
                jugandoX();//Juega X
                segundos = 15;//Restablezco los segundos
                cuentaAtras("X");//Le paso el parámetro X a la función cuentaAtras
            }
        }
    }, 1000);
}

//Función para poner ficha
function ficha() {
    if (juegoEnCurso) {
        //Si está jugando X, se colocará en la casilla la imagen de X y se insertará en la posición correspondiente del array una X
        if (estaJugando == "X") {

            let imagenX;

            imagenX = document.createElement("img");
            imagenX.setAttribute("src", "imagen/imagenX.png");//Establezco la imagen de X a la variable imagenX
            this.appendChild(imagenX);//Introduzco la imagen en la casilla
            aFichasColocadas[this.id] = "X";
            desCasilla(this.id);

            combinacionGanadora();

        }
        //Si está jugando O, se colocará en la casilla la imagen de O y se insertará en la posición correspodiente del array una O
        else {

            let imagenO;

            imagenO = document.createElement("img");
            imagenO.setAttribute("src", "imagen/imagen0.png");//Establezco la imagen de X a la variable imagenO
            this.appendChild(imagenO);//Introduzco la imagen en la casilla
            aFichasColocadas[this.id] = "O";
            desCasilla(this.id);

            combinacionGanadora();
        }
    }
}

//Función para deshabilitar casilla
function desCasilla(id) {
    document.getElementById(id).removeEventListener("click", ficha);
}

//Función para comprobar la combinación ganadora
function combinacionGanadora() {
    let letra = estaJugando;//Almacena la letra.

    //Condiciones que se pueden dar para ganar la partida o quedar en tablas.
    if ((aFichasColocadas[0] == aFichasColocadas[1] && aFichasColocadas[0] == aFichasColocadas[2]) && (aFichasColocadas[0] != null || aFichasColocadas[1] != null || aFichasColocadas[2] != null)) {
        letra = aFichasColocadas[0];
        mensaje(letra);

    } else if ((aFichasColocadas[3] == aFichasColocadas[4] && aFichasColocadas[3] == aFichasColocadas[5]) && (aFichasColocadas[3] != null || aFichasColocadas[4] != null || aFichasColocadas[5] != null)) {
        letra = aFichasColocadas[3];
        mensaje(letra);

    } else if ((aFichasColocadas[6] == aFichasColocadas[7] && aFichasColocadas[6] == aFichasColocadas[8]) && (aFichasColocadas[6] != null || aFichasColocadas[7] != null || aFichasColocadas[8] != null)) {
        letra = aFichasColocadas[6];
        mensaje(letra);

    } else if ((aFichasColocadas[0] == aFichasColocadas[3] && aFichasColocadas[0] == aFichasColocadas[6]) && (aFichasColocadas[0] != null || aFichasColocadas[3] != null || aFichasColocadas[6] != null)) {
        letra = aFichasColocadas[0];
        mensaje(letra);

    } else if ((aFichasColocadas[1] == aFichasColocadas[4] && aFichasColocadas[1] == aFichasColocadas[7]) && (aFichasColocadas[1] != null || aFichasColocadas[4] != null || aFichasColocadas[7] != null)) {
        letra = aFichasColocadas[1];
        mensaje(letra);

    } else if ((aFichasColocadas[2] == aFichasColocadas[5] && aFichasColocadas[2] == aFichasColocadas[8]) && (aFichasColocadas[2] != null || aFichasColocadas[5] != null || aFichasColocadas[8] != null)) {
        letra = aFichasColocadas[2];
        mensaje(letra);

    } else if ((aFichasColocadas[0] == aFichasColocadas[4] && aFichasColocadas[0] == aFichasColocadas[8]) && (aFichasColocadas[0] != null || aFichasColocadas[4] != null || aFichasColocadas[8] != null)) {
        letra = aFichasColocadas[0];
        mensaje(letra);

    } else if ((aFichasColocadas[2] == aFichasColocadas[4] && aFichasColocadas[2] == aFichasColocadas[6]) && (aFichasColocadas[2] != null || aFichasColocadas[4] != null || aFichasColocadas[6] != null)) {
        letra = aFichasColocadas[2];
        mensaje(letra);

    } else if (aFichasColocadas[0] != null && aFichasColocadas[1] != null && aFichasColocadas[2] != null && aFichasColocadas[3] != null && aFichasColocadas[4] != null && aFichasColocadas[5] != null && aFichasColocadas[6] != null && aFichasColocadas[7] != null && aFichasColocadas[8] != null) {
        let empezar;

        //Paro el tiempo y vacío los campos
        clearInterval(intervalo);
        document.getElementById("contadorO").value = "";
        document.getElementById("contadorX").value = "";

        capa = document.createElement("div");//Creo la capa.
        capa.setAttribute("id", "mensajeFinal");//Le asocio el id.
        mensaje = document.createTextNode("Tablas");//Creo el mensaje.
        capa.appendChild(mensaje);//Inserto el mensaje en la capa div.
        document.body.appendChild(capa);//Inserto la capa div en el body del html.

        //Establezco el objeto a variable.
        empezar = document.getElementById("comenzar");
        //Establezco el evento.
        empezar.addEventListener("click", reiniciarJuego);
    } else {
        if (estaJugando == "X") {
            clearInterval(intervalo);
            document.getElementById("contadorX").value = "";
            segundos = 15;//Establezco los segundos a 15
            jugandoO();//Cambio el turno al jugadorO
            cuentaAtras("O");
        } else {
            clearInterval(intervalo);
            document.getElementById("contadorO").value = "";
            segundos = 15;//Establezco los segundos a 15
            jugandoX();//Cambio el turno al jugadorX
            cuentaAtras("X");

        }
    }

    //Función para mostrar el mensaje del ganador
    function mensaje(letra) {
        let capa;//Div que va a alojar el mensaje.
        let mensaje;//Para emitir el mensaje con el ganador.
        let empezar;

        //Paro el tiempo y vacío los campos
        clearInterval(intervalo);
        document.getElementById("contadorO").value = "";
        document.getElementById("contadorX").value = "";

        capa = document.createElement("div");//Creo la capa.
        capa.setAttribute("id", "mensajeFinal");//Le asocio el id.
        mensaje = document.createTextNode("Ha ganado la partida el jugador " + letra);//Creo el mensaje.
        capa.appendChild(mensaje);//Inserto el mensaje en la capa div.
        document.body.appendChild(capa);//Inserto la capa div en el body del html.

        //Establezco el objeto a variable.
        empezar = document.getElementById("comenzar");
        //Establezco el evento.
        empezar.addEventListener("click", reiniciarJuego);
    }

    //Función para recargar la página y poder iniciar el juego
    function reiniciarJuego() {
        window.location.reload();
    }
}