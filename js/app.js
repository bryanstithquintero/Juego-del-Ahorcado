let palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT"];
let tablero = document.getElementById("horca").getContext("2d");
let palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];

let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none"
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");

//eventos
document.getElementById("iniciar-juego").onclick = () => {
    iniciarJuego();
}

document.getElementById("btn-guardar").onclick = () => {
    guardarPalabra();
}

btnNuevoJuego.addEventListener("click", function () {
    location.reload();
});

btnSalir.addEventListener("click", function () {
    location.reload();
});

btnCancelar.addEventListener("click", function () {
    location.reload();
});

// palabra secreta

function escojerPalabraSecreta() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
    console.log(palabraSecreta)
    return palabra
}

function verificarLetraClicada(key) {
    if (letras.length < 1 || letras.indexOf(key) < 0) {
        letras.push(key)
        return false

    }
    else {
        letras.push(key)
        return true
    }
}

function adicionarLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter) <= 0) {
        errores -= 1
    }
}

function verificarFinJuego(letra) {
    //checa si la letra ha sido incluída en el array de  las letras correctas o incorrectas
    if (letraElegida.length < palabraSecreta.length) {
        //incluye las letras ya digitadas en el arrau
        letrasIncorrectas.push(letra);


        //valida se el usuário cometió el numero maximo de errores
        if (letrasIncorrectas.length > numeroDeErrores) {
            perdiste()
        }
        else if (letraElegida.length < palabraSecreta.length) {
            adicionarLetraIncorrecta(letra)
            escribirLetraIncorrecta(letra, errores)
        }
    }
}

//Verifica si el usuario ha ganado
function verificarVencedor(letra) {
    letraElegida.push(letra.toUpperCase());
    if (letraElegida.length == palabraSecreta.length) {
        ganaste()
    }
}

//impide que teclas como shift y otras, sean consideradas errores y sean escritas
function verificarLetra(keyCode) {
    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
        return true;
    } else {
        return false;
    }
}

//haz con que los botones de la pantalla de home desaparezcan y los de la de agregar palabra aparezcan
function ensenarPantallaDeAgregarPalabra() {
    document.getElementById("div-desaparece").style.display = 'none';
    document.getElementById("agregar-palabra").style.display = "block";

}

// guarda la palabra que el usuario quiere agregar
function guardarPalabra() {

    //captura lo que el usuario ha digitado
    let nuevaPalabra = document.getElementById('input-nueva-palabra').value;

    // incluye la palabra que el usuario digitó en el array de las palabras a seren sorteadas
    if (nuevaPalabra !== "") {
        palabras.push(nuevaPalabra.toUpperCase());
        alert('La palabra fue guardada')


        // haz con que los componentes de la pantalla de agregar palabra desaparezcan
        document.getElementById("agregar-palabra").style.display = "none";
        iniciarJuego();
    }
    else {
        alert("Ninguna palabra ha sido digitada")
    }

}

//inicia el juego
function iniciarJuego() {

    // hace con que los de iniciar juego e agregar palabra desaparezcan
    document.getElementById("div-desaparece").style.display = 'none';

    //llama la función que dibuja el tablero del ahorcado
    dibujarTablero();

    //llama la función que sortea la palabra  
    escojerPalabraSecreta();

    //llama la función que dibuja las líneas donde el usuario escribirá
    dibujarLineas();

    // hace con que los botones de nuevo juego e salir aparezcan
    document.getElementById("btn-nuevo-juego").style.display = "block"
    document.getElementById("btn-salir").style.display = "block"

    // captura la letra que el usuario escribió
    document.onkeydown = (e) => {
        // pone la letra en letra mayuscula
        let letra = e.key.toUpperCase()
        //verifica si el usuario todavia no ha perdido
        if (letrasIncorrectas.length <= numeroDeErrores) {
            if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
                if (palabraSecreta.includes(letra)) {
                    adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
                    for (let i = 0; i < palabraSecreta.length; i++) {
                        if (palabraSecreta[i] === letra) {
                            escrribirLetraCorrecta(i)
                            verificarVencedor(letra)

                        }
                    }

                }
                // si el usuario cometió más errores de los que son permitidos, 
                //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
                else {
                    if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
                    dibujarAhorcado(errores)
                    verificarFinJuego(letra)
                }
            }
        }
        else {
            alert('has alcanzado el límite de letras incorrectas')
        }

    };
}




