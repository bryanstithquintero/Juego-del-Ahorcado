let palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT"];
let tablero = document.getElementById("forca").getContext("2d");
let palabraSecreta = "";

// palabra secreta

function escojerPalabraSecreta() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
    console.log(palabraSecreta)
}

// iniciar juego
function iniciarJuego() {
    document.getElementById("iniciarJuego").style.display = "none";

    escojerPalabraSecreta()
    dibujarCanvas();
    dibujarLinea();
}



