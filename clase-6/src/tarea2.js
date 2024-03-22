document.querySelector('#boton-agregar').onclick = agregarFamiliar;
document.querySelector('#boton-quitar').onclick = borrarFamiliar;
document.querySelector('#boton-calcular').onclick = validarSueldos;
document.querySelector('#boton-resetear').onclick = resetear;

function agregarFamiliar() {
    const $nuevoFamiliar = document.createElement('div');
    $nuevoFamiliar.classList.add('familiar');

    const $nuevoLabel = document.createElement('label');
    index = (document.getElementsByClassName('familiar').length)+1
    $nuevoLabel.for = 'integrante' + index;
    $nuevoLabel.textContent = `Sueldo del familiar numero ${index}:`;

    const $nuevoInput = document.createElement('input');
    $nuevoInput.classList.add('sueldo');
    $nuevoInput.classList.add('m-2');
    $nuevoInput.id = 'integrante' + (index);
    $nuevoInput.placeholder = 'Sueldo';

    $nuevoFamiliar.appendChild($nuevoLabel);
    $nuevoFamiliar.appendChild($nuevoInput);
    document.querySelector('#familiares').appendChild($nuevoFamiliar);
    
    mostrar('#boton-resetear');
    mostrar('#boton-calcular');
    mostrar('#boton-quitar');
}


function borrarFamiliar() {
    //Quito el último miembro familiar de la lista
    const $familiares = document.querySelectorAll('.familiar');
    const index = document.getElementsByClassName('familiar').length - 1;
    $familiares[index].remove();

    //Evaluo si quedaron integrantes o no para esconder el boton de calcular, resetear y quitar
    if (document.getElementsByClassName('familiar').length === 0){  
        ocultar('#boton-resetear');
        ocultar('#boton-calcular');
        ocultar('#boton-quitar');
        borrarMensajesDeError();
    }
}


function validarSueldos() {
    let sueldos = [];
    let cantidadErrores = 0;

    document.querySelectorAll('.sueldo').forEach(function (sueldo){
        const valorSueldo = Number(sueldo.value);
        if(Number.isInteger(valorSueldo) && valorSueldo > 0 && /^[0-9]+$/.test(valorSueldo)){
            sueldos.push(valorSueldo); 
        }
        else{
            sueldo.classList.add('error');
            crearMensajeDeError();
            cantidadErrores++;
        }
    });

    const hayError = cantidadErrores !== 0;
    if (!hayError){
        const mayorSueldo = Math.max(...sueldos);
        const menorSueldo = Math.min(...sueldos);
        const promedioSueldos = calcularPromedio(sueldos);
        document.querySelector('#promedio-sueldo').textContent = 'El promedio de sueldo es ' + promedioSueldos;
        document.querySelector('#mayor-sueldo').textContent = 'El mayor sueldo es ' + mayorSueldo;
        document.querySelector('#menor-sueldo').textContent = 'El menor sueldo es ' + menorSueldo;

        mostrar('#resultados');  
    }
}


function calcularPromedio(sueldos){
    let promedio = 0;
    for (let i = 0; i < sueldos.length; i++)
    {
        promedio += sueldos[i];
    }

    return (promedio / sueldos.length);
}


function ocultar(id){
    document.querySelectorAll(`${id}`).forEach($elemento => $elemento.style.display = 'none');
}


function mostrar(id){
    document.querySelectorAll(`${id}`).forEach($elemento => $elemento.style.display = '');
}


function limpiarFamiliares(){
    document.querySelectorAll('.familiar').forEach($familiar => $familiar.remove());
}


function ocultarBotones(){
    document.querySelectorAll('#boton-calcular').forEach($botonCalcular => $botonCalcular.style.display = 'none');
    document.querySelectorAll('#boton-resetear').forEach($botonResetear => $botonResetear.style.display = 'none');
    document.querySelectorAll('#boton-quitar').forEach($botonQuitar => $botonQuitar.style.display = 'none');
}


function ocultarResultados(){
    document.querySelectorAll('#resultados').forEach($resultados => $resultados.style.display = 'none');
}


function resetear(){
    limpiarFamiliares();
    ocultarBotones();
    ocultarResultados();
    borrarMensajesDeError();
    limpiarMarcosDeError('.sueldo');
}


function crearMensajeDeError(){
    const $error = document.querySelector('#errores');
    $error.innerHTML = "";

    const $nuevoMensajeError = document.createElement('li');
    $nuevoMensajeError.id = "mensaje-error";
    $nuevoMensajeError.innerText = 'El sueldo debe ser un número positivo.';
    $error.appendChild($nuevoMensajeError);
}


function borrarMensajesDeError(){
    document.querySelectorAll('#errores').forEach($error => $error.innerHTML = "");
}


function limpiarMarcosDeError(identificador){
    document.querySelectorAll(`${identificador}`).forEach($sueldo => $sueldo.classList.remove('error'));
}
