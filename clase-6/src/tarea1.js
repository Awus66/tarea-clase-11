document.querySelector('#boton-enviar').onclick = validarCantidadFamiliares;
document.querySelector('#boton-calcular').onclick = validarEdades;
document.querySelector('#boton-resetear').onclick = resetear;

function validarEdades(){
    let cantidadErrores = 0;
    let edadInputs = document.getElementsByClassName('edad');

    //Creo un array de edades para hacer los cálculos finales más facilmente
    let edades = [];

    document.querySelectorAll('.edad').forEach(function(edad){
    const maxEdad = 120;
    const soloNumeros = /^[0-9]+$/.test(edad.value);
    const valorEdad = Number(edad.value);

    if ( valorEdad >= 0 && valorEdad <= maxEdad && soloNumeros && Number.isInteger(valorEdad)){
        edades.push(valorEdad);
        edad.classList.remove('error');
    }
    else{
        edad.classList.add('error');
    }
    });

    //Cuento la cantidad de edades que tienen la clase "error"
    for (let i = 0; i < edadInputs.length; i++){
        if (edadInputs[i].classList.contains('error')){
            cantidadErrores++;
        }
    }

    if(cantidadErrores === 0){
        borrarMensajesDeError();
        const mayorEdad = Math.max(...edades);
        const menorEdad = Math.min(...edades);
    
        //Algoritmo para promedio
        let promedio = 0;
        for (let i = 0; i < edades.length; i++)
        {   
        promedio += edades[i];
        }
        const promedioEdad = promedio / edades.length;
    
        document.querySelector('#mayor-edad').textContent = 'La mayor edad es ' + mayorEdad;
        document.querySelector('#menor-edad').textContent = 'La menor edad es ' + menorEdad;
        document.querySelector('#promedio-edad').textContent = 'El promedio de edad es ' + promedioEdad;
    
        document.querySelector('#resultados').style.display = '';   
    }
    else{
        crearMensajeDeError()
    }
}

function validarCantidadFamiliares(){
    const cantidadFamiliares = Number(document.querySelector('#cantidad-familiares').value);
    const soloNumeros = /^[0-9]+$/.test(cantidadFamiliares);
    const $error = document.querySelector('#errores');
    const $inputFamiliares = document.querySelector('#cantidad-familiares');

    if(!(soloNumeros && cantidadFamiliares > 0 && cantidadFamiliares < 100 && Number.isInteger(cantidadFamiliares))){
        $inputFamiliares.className = 'error';
        $error.innerText = 'La cantidad de familiares debe ser un número entero entre 1 y 99';
    }
    else{
        limpiarMarcosDeError('#cantidad-familiares');
        deshabilitarInput('#cantidad-familiares');
        $inputFamiliares.className = '';
        limpiarFamiliares();
        $error.innerHTML = "";
        mostrar('#familiares');

        for (let i = 1; i <= cantidadFamiliares; i++) {
            const $nuevoLabel = document.createElement('label');
    
            //Creo un div para poder manejar de manera libre a cada familiar
            const $nuevoDiv = document.createElement('div');
            $nuevoDiv.className = 'familiar m-2';
    
            //$nuevoLabel.propiedad....
            $nuevoLabel.for = 'integrante' + i;
            $nuevoLabel.textContent = `Edad del familiar numero ${i}: `;
            const $nuevoInput = document.createElement('input');
            //nuevoInput.propiedad...
            $nuevoInput.classList.add('edad');
            $nuevoInput.classList.add('m-2');
            $nuevoInput.id = 'integrante' + (i);
            $nuevoInput.placeholder = 'Edad';
    
    
            $nuevoDiv.appendChild($nuevoLabel);
            $nuevoDiv.appendChild($nuevoInput);
            document.querySelector('#familiares').appendChild($nuevoDiv);
        }
        ocultar('#boton-enviar');
        mostrar('#boton-calcular');
        mostrar('#boton-resetear');
    }
}


function limpiarFamiliares(){
    document.querySelectorAll('.familiar').forEach($familiar => $familiar.remove());
}


function ocultar(id){
    document.querySelectorAll(`${id}`).forEach($elemento => $elemento.style.display = 'none');
}


function mostrar(id){
    document.querySelectorAll(`${id}`).forEach($elemento => $elemento.style.display = '');
}


function resetear(){
    limpiarFamiliares();
    mostrar('#boton-enviar');
    ocultar('#boton-calcular');
    ocultar('#boton-resetear');
    ocultar('#resultados');
    ocultar('#familiares');
    habilitarInput('#cantidad-familiares')
    borrarMensajesDeError();
}


function crearMensajeDeError(){
    const $error = document.querySelector('#errores');
    $error.innerHTML = "";

    const $nuevoMensajeError = document.createElement('li');
    $nuevoMensajeError.id = "mensaje-error";
    $nuevoMensajeError.innerText = 'La edad debe ser un número entero entre 0 y 120.';
    $error.appendChild($nuevoMensajeError);
}


function limpiarMarcosDeError(id){
    document.querySelectorAll(`${id}`).forEach($elemento => $elemento.classList.remove('error'));
}


function borrarMensajesDeError(){
    document.querySelectorAll('#errores').forEach($error => $error.innerHTML = "");
}


function deshabilitarInput(idInput){
    document.querySelector(`${idInput}`).toggleAttribute('readonly', true);
}

function habilitarInput(idInput){
    document.querySelector(`${idInput}`).toggleAttribute('readonly', false);
}
