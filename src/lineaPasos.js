import validarCantidad from "./validaciones/validarCantidad";
import validarCorreo from "./validaciones/validarCorreo";
import validarNombre from "./validaciones/validarNombre";


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
    };
    };

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
    };


    // Si el navegador lee esta linea, saldra de la ejecucion del boton, por ende el codigo no se ejecutara
    return false;
});

