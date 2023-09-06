import validarCantidad from "./validaciones/validarCantidad";
import validarNombre from "./validaciones/validarNombre";
import validarCorreo from "./validaciones/validarCorreo";
import marcarPaso from "./marcarPaso";
import siguientePaso from "./siguientePaso";
import lineaPasos from "./lineaPasos";

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
    };
  };
});

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
    };

  } else if (pasoActual === 'datos'){
    if (validarNombre() && validarCorreo()){

      // Nos valdiara el paso
      marcarPaso('datos');
      siguientePaso();
    };
  } else if (pasoActual === 'metodo'){
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
  };
});
