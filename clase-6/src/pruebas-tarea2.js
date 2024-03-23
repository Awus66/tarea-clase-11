probarAgregarFamiliar();
probarBorrarFamiliar();
probarCrearMensajeDeError();
probarBorrarMensajesDeError();
probarLimpiarMarcosDeError();
probarOcultarBotones();
probarOcultarResultados();
probarLimpiarFamiliares();
probarCalcularPromedio();
probarValidarSueldos();
probarMostrar();
probarOcultar();


function probarValidarSueldos(){
    const $nuevoSueldo = document.createElement('div');
    $nuevoSueldo.classList.add('sueldo');
    document.body.appendChild($nuevoSueldo);

    $nuevoSueldo.value = '';
    validarSueldos();
    console.assert(
        $nuevoSueldo.classList.contains('error'), 'La función validarSueldos no validó que el sueldo no pueda ser vacío'
    );

    $nuevoSueldo.value = 0;
    validarSueldos();
    console.assert(
        $nuevoSueldo.classList.contains('error'), 'La función validarSueldos no validó que el sueldo no pueda tener decimales'
    );

    $nuevoSueldo.value = -3;
    validarSueldos();
    console.assert(
        $nuevoSueldo.classList.contains('error'), 'La función validarSueldos no validó que el sueldo no pueda ser un número negativo'
    );

    $nuevoSueldo.value = 3;
    validarSueldos();
    console.assert(
        $nuevoSueldo.classList.contains('error'), 'La función validarSueldos no funcionó con un input valido.'
    );

    $nuevoSueldo.value = 'asdf';
    validarSueldos();
    console.assert(
        $nuevoSueldo.classList.contains('error'), 'La función validarSueldos no validó que el sueldo no pueda contener caracteres.'
    );
    $nuevoSueldo.remove();
    resetear();
}


function probarCalcularPromedio(){
    const sueldos = [2,3,4];
    const promedio = calcularPromedio(sueldos);

    console.assert(
        promedio === 3, 'La función calcularPromedio no calculó el promedio correctamente.'
    );

}


function probarAgregarFamiliar(){
    let cantidadFamiliares = document.getElementsByClassName('familiar').length;
    agregarFamiliar();
    const nuevaCantidad = document.getElementsByClassName('familiar').length;

    console.assert(
        cantidadFamiliares === nuevaCantidad - 1, 'La función agregarFamiliar no agregó un nuevo familiar correctamente.'
    );

    const $familiares = document.querySelectorAll('.familiar');
    const index = document.getElementsByClassName('familiar').length - 1;
    $familiares[index].remove();

    if (document.getElementsByClassName('familiar').length === 0){  
        document.querySelector('#boton-resetear').style.display = 'none';
        document.querySelector('#boton-calcular').style.display = 'none';
    }
}


function probarBorrarFamiliar(){
    const $nuevoFamiliar = document.createElement('div');
    $nuevoFamiliar.classList.add('familiar');
    document.querySelector('#familiares').appendChild($nuevoFamiliar);

    let cantidadFamiliares = document.getElementsByClassName('familiar').length;
    borrarFamiliar();
    const nuevaCantidad = document.getElementsByClassName('familiar').length;

    console.assert(
        cantidadFamiliares === nuevaCantidad + 1, 'La función borrarFamiliar borró el último familiar correctamente.'
    );

    if (document.getElementsByClassName('familiar').length === 0){  
        document.querySelector('#boton-resetear').style.display = 'none';
        document.querySelector('#boton-calcular').style.display = 'none';
    }
}


function probarBorrarMensajesDeError(){
    let cantidadErrores = 0;
    const $prueba = document.createElement('div');
    $prueba.id = "errores";
    $prueba.innerText = "Mensaje de error";
    document.body.appendChild($prueba);
    borrarMensajesDeError();
    document.querySelectorAll('#errores').forEach(function($error) {
        if ($error.innerHTML !== ""){
            cantidadErrores++;
        }
    });
    const hayErrores = cantidadErrores !== 0;
    console.assert(
        !hayErrores, 'La función borrarMensajesDeError no borró los mensajes de error correctamente.'
    );
    $prueba.remove();
}


function probarCrearMensajeDeError(){
    const $errorInnerHTML = document.querySelectorAll('#errores').innerHTML;
    const $prueba = document.createElement('div');
    $prueba.id = "errores";
    document.body.appendChild($prueba);
    crearMensajeDeError();
    console.assert(
        $errorInnerHTML !== "", 'La función crearMensajeDeError no creó el mensaje de error correctamente.'
    );
    $prueba.remove();
    borrarMensajesDeError();
}


function probarLimpiarMarcosDeError(){
    const $prueba = document.createElement('div');
    $prueba.id = "prueba";
    $prueba.classList.add('error');
    document.body.appendChild($prueba);
    limpiarMarcosDeError('#prueba');
    console.assert(
        !($prueba.classList.contains('error')), 'La función limpiarMarcosDeError no limpió los marcos rojos de error correctamente.'
    );
}


function probarLimpiarFamiliares(){
    let cantidadFamiliares = 0;
    const $prueba = document.createElement('div');
    $prueba.classList.add('familiar');
    document.body.appendChild($prueba);
    limpiarFamiliares();
    document.querySelectorAll('.familiar').forEach(function (){
        cantidadFamiliares++;
    });
    const hayFamiliares = cantidadFamiliares !== 0;
    console.assert(
        !hayFamiliares, 'La función limpiarFamiliares no borró los familiares correctamente.'
    );
    $prueba.remove();
}


function probarOcultarBotones(){
    const $botonCalculo = document.createElement('button');
    $botonCalculo.id = "boton-calcular";
    document.body.appendChild($botonCalculo);
    const $botonResetear = document.createElement('button');
    $botonResetear.id = "boton-resetear";
    document.body.appendChild($botonResetear);
    const $botonQuitar = document.createElement('button');
    $botonQuitar.id = "boton-quitar";
    document.body.appendChild($botonQuitar);
    ocultarBotones();
    console.assert(
        $botonCalculo.style.display === 'none' && $botonResetear.style.display === 'none' && $botonQuitar.style.display === 'none'
        , 'ocultarBotones no ocultó los botones correctamente.'
    );
    $botonCalculo.remove();
    $botonResetear.remove();
    $botonQuitar.remove();

}


function probarOcultarResultados(){
    const $prueba = document.createElement('div');
    $prueba.id = "resultados";
    document.body.appendChild($prueba);
    ocultarResultados();
    console.assert(
        $prueba.style.display === 'none', 'ocultarResultados no ocultó los resultados correctamente.'
    );
    $prueba.remove();   
}


function probarOcultar(){
    const $prueba = document.createElement('div');
    $prueba.id = "prueba";
    $prueba.style.display = '';
    document.body.appendChild($prueba);
    ocultar('#prueba');
    console.assert(
        $prueba.style.display === 'none', 'La función "ocultar" no ocultó el elemento correctamente.'
    );
    $prueba.remove();
}


function probarMostrar(){
    const $prueba = document.createElement('div');
    $prueba.id = "prueba";
    $prueba.style.display = 'none';
    document.body.appendChild($prueba);
    mostrar('#prueba');
    console.assert(
        $prueba.style.display === '', 'La función "mostrar" no mostró el elemento correctamente.'
    );
    $prueba.remove();
}
