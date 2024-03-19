let turnos = 0;
let $primerCuadro = null;
const $tablero = document.querySelector('#tablero');
const $cuadros = $tablero.querySelectorAll('.cuadro');
const $mensajeFinJuego = document.querySelector('#fin-juego');

configurarJuego();


// Funcion que inicia el juego (Prepara el array de clases)
function configurarJuego (){
    let clases = ['javascript', 'bootstrap', 'css', 'react', 'nextjs', 'html'];

    // Duplico los elementos del array
    clases = clases.concat(clases);

    // Doy un orden aleatorio al array y les asigno sus respectivas clases a los cuadros del tablero
    randomizarCuadros($cuadros, clases);

    $tablero.onclick = manejarEleccion;
}


// Funcion para manejar las acciones del usuario (click en target)
function manejarEleccion(e){
    const $cuadroActual = e.target;
    if($cuadroActual.classList.contains('cuadro')){
        destaparCuadro($cuadroActual);

        // Evaluo si el cuadro que el usuario clickeó es el primero o el segundo
        if ($primerCuadro === null){
            $primerCuadro = $cuadroActual;
        }
        else {
            // Evaluo si tocó dos veces el mismo cuadro
            if ($primerCuadro === $cuadroActual){
                return;
            }

            turnos++;
            $mensajeFinJuego.querySelector('#turnos').textContent = turnos.toString();

            if ($primerCuadro.className === $cuadroActual.className){
                eliminar($primerCuadro);
                eliminar($cuadroActual);
            }
            else {
                taparCuadro($primerCuadro);
                taparCuadro($cuadroActual);
            }
            $primerCuadro = null;
        }
    }
}


// Funcion para hacer shuffle a array y randomizar cuadros
function randomizarCuadros($cuadros, clases){

    // Algoritmo de Fisher-Yates para hacer shuffle a un array
    for (let i=0; i < clases.length; i++){
        let temp = clases[i];
        let indexRandom = Math.floor( Math.random() * clases.length)
        clases[i] = clases[indexRandom];
        clases[indexRandom] = temp;
    }

    // Añade las clases a los cuadros
    clases.forEach((clase, index) => {
        $cuadros[index].classList.add(clase);
    });
}


function eliminar($elemento){
    setTimeout(() => {
        $elemento.parentElement.classList.add('correcto');
        $elemento.parentElement.classList.remove('oculto');
        $elemento.remove();
        evaluarFinDeJuego();
    }, 500);
}


function taparCuadro($cuadro) {
    setTimeout(() => { 
        $cuadro.classList.add('oculto');
        $cuadro.style.opacity = '0';
    }, 500);
}


function destaparCuadro($cuadro) {
    $cuadro.classList.remove('oculto');
    $cuadro.style.opacity = '1';
}


function evaluarFinDeJuego() {
    if (document.querySelectorAll('.cuadro').length === 0) {
        $tablero.style.display = 'none';
        $mensajeFinJuego.style.display = 'block';
    }
}
