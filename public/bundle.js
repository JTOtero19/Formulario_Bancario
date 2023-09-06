'use strict';

require('../../../../../../../.lineaPasos');

const formulario$3 = document.getElementById('formulario');

const validarCantidad = () => {
  // Aceptamos cualquier digito del 0-9 y un punto con decimales.
  const expRegularCantidad = /^\d+(\.\d+)?$/;

  // Acceder al inpiut de cantidad
  const inputCantidad = formulario$3.cantidad;

  if (expRegularCantidad.test(inputCantidad.value)){
    inputCantidad.classList.remove('formulario__input--error');
    return true;
  } else {
    inputCantidad.classList.add('formulario__input--error');
    return false;
  }
};

const formulario$2 = document.getElementById('formulario');

const validarNombre = () => {
  // Puede incluir letras, espacios, acentos, ñ y sin caracteres especiales.
  const expRegularNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
  const inputNombre = formulario$2['nombre-receptor'];

  if (expRegularNombre.test(inputNombre.value)){
    inputNombre.classList.remove('formulario__input--error');
    return true;
  } else {
    inputNombre.classList.add('formulario__input--error');
    return false;
  }
};

const formulario$1 = document.getElementById('formulario');

const validarCorreo = () => {
  // Puede incluir letras, espacios, acentos, ñ y sin caracteres especiales.
  const expRegularCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const inputCorreo = formulario$1['correo-receptor'];

  if (expRegularCorreo.test(inputCorreo.value)){
    inputCorreo.classList.remove('formulario__input--error');
    return true;
  } else {
    inputCorreo.classList.add('formulario__input--error');
    return false;
  }
};

const marcarPaso = (paso) => {
  document
    .querySelector(`.linea-pasos [data-paso="${paso}"] .linea-pasos__paso-check`)
    .classList.add('linea-pasos__paso-check--cheked');
};

const siguientePaso = () => {

  // Array donde guardaremos la posicion del index
  const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

  // Obtener el paso activo donde nos encotnramos
  const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

  // Obtener el index del paso activo
  const indexPasoActivo = pasos.indexOf(pasoActivo);

  // Le restamos el 1 ya que estamos trabajando con index, es decir parte en 0, no en 1
  if (indexPasoActivo < pasos.length - 1){
    // Eliminamos la clase de paso activo
    pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');

    // Ponemos la clase de paso activo al siguiente elemento
    pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');

    const id = pasos[indexPasoActivo + 1].dataset.paso;
    document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
      inline: 'start',
      behavior: 'smooth',
    });

  }
};


/**
 * Funcion que navega al siguiente paso.
 */
// const siguientePaso = () => {
// 	// Creamos un arreglo con los pasos.
// 	const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

// 	// Obtenemos el paso activo.
// 	const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

// 	// Obtenemos el index del paso activo.
// 	const indexPasoActivo = pasos.indexOf(pasoActivo);

// 	// Comprobamos si hay mas pasos.
// 	if (indexPasoActivo < pasos.length - 1) {
// 		// Eliminamos la clase de paso activo.
// 		pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');
// 		// Ponemos la clase de paso activo al siguiente elemento.
// 		pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');

// 		// Mostramos el siguiente elemento.
// 		const id = pasos[indexPasoActivo + 1].dataset.paso;

// 		document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
// 			inline: 'start',
// 			behavior: 'smooth',
// 		});
// 	}
// };

const linea = document.getElementById('linea-pasos');
linea.addEventListener('click', (e) => {
  if (!e.target.closest('.linea-pasos__paso')){

    // Detectar paso actual
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    // Validamos el campo actual
    if (pasoActual === 'cantidad'){
        if (!validarCantidad()) return false;
    } else if(pasoActual === 'datos') {
      if (!validarNombre() || !validarCorreo()) return false;
    }    }
    // Saber si hace click en el span o svg, cual tiene tal clase.
    // Paso al que queremos navegar
    const pasoANavegar = e.target.closest('.linea-pasos__paso');

    // Solo queremos poder dar click a los que tienen palomita
    if (pasoANavegar.querySelector('.linea-pasos__paso-check--checked')){
      const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
      pasoActual.classList.remove('linea-pasos__paso-check--active');

      // Obtenemos el identificador del paso a navegar
      const id = pasoANavegar.dataset.paso;

      // Agregamos la clase active al nuevo paso
      linea.querySelector(`[data-paso="${id}"] span`).classList.add('linea-pasos__paso-check--active');

      // Cambiamos el texto del boton a 'siguiente'
      const btnFormulario = document.querySelector('#formulario__btn');
      btnFormulario.querySelector('span').innerText = 'Siguiente';

      // Nos aseguramos de msotrar el icono del siguiente
      btnFormulario.querySelector('[data-icono="banco"]').classList.remove('formulario__btn-contenedor-icono--active');

      // Nos aseguramos de que no tenga la clase de disabled
      btnFormulario.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');

      //Navegamos al paso
      btnFormulario.querySelector('[data-icono="siguiente"]').classList.remove('formulario__btn--disabled');

      // Navegar al paso.
      documentQuerySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
        inLine: 'start',
        behavior: 'smooth',
      });
    }

    // Si el navegador lee esta linea, saldra de la ejecucion del boton, por ende el codigo no se ejecutara
    return false;
});

const formulario = document.getElementById('formulario');

// reiniciando el scroll al cargar el formulario
formulario.querySelector('.formulario__body').scrollLeft = 0;

// Primera valdiacion, cuando el usuario escribe
formulario.addEventListener('keyup', (e) => {
  // Quiero asegurarme que el elemento que tecleamos sea un input
  if (e.target.tagName === 'INPUT'){
    if (e.target.id === 'cantidad'){
      validarCantidad();
    } else if (e.target.input === 'nombre-receptor'){
      validarNombre();
    } else if (e.target.input === 'correo-receptor'){
      validarCorreo();
    }  }});

// Segunda validacion, al apretar el boton de enviar.
const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
  e.preventDefault();

  // Detectar en que paso nos detectamos
  const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

  if (pasoActual === 'cantidad'){
    // Tenemos que agregar un condicional
    if (validarCantidad()){

      // Nos valdiara el paso
      marcarPaso('cantidad');
      siguientePaso();
    }
  } else if (pasoActual === 'datos'){
    if (validarNombre() && validarCorreo()){

      // Nos valdiara el paso
      marcarPaso('datos');
      siguientePaso();
    }  } else if (pasoActual === 'metodo'){
    marcarPaso('metodo');

    // Formato de moneda
    const opciones = {style: 'currency', currency: 'CLP'};
    const formatoMoneda = new Intl.NumberFormat('es-MX', opciones);

    // Haciendo que se vean los datos en la ultma pantalla
    document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(formulario.cantidad.value);
    document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
    document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
    document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
    document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;

    // Cambiamos el texto del btn a 'transferir'
    btnFormulario.querySelector('span').innerHTML = 'Transferir';

    // Agregamos la clase que deshabilita el boton
    btnFormulario.classList.add('formulario__btn--disabled');

    // Ocultamos icono siguiente
    btnFormulario.querySelector('[data-icono="siguiente"]').classList.remove('formulario__btn-contenedor-icono--active');

    // QUeremos mostrar icono banco
    btnFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');

    siguientePaso();

    // Despues de la espera de 4s, quiero volver a activar el boton
    setTimeout(() => {
      btnFormulario.classList.remove('formulario__btn--disabled');
    }, 4000);

  } else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')){
    // Aqui se haria una petcion al servidor, una redireccion, etc

    // cambiar texto de transferir a transfiriendo
    btnFormulario.querySelector('span').innerText = 'Transfiriendo';

    // Agregamos la clase que deshabilita el boton
    btnFormulario.classList.add('formulario__btn--disabled');

    setTimeout(() => {
      formulario.classList.add('formulario--hidden');
      document.getElementById('alerta').classList.add('alerta--active');
    }, 4000);
  }});
//# sourceMappingURL=bundle.js.map
