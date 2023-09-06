const formulario = document.getElementById('formulario');

const validarNombre = () => {
  // Puede incluir letras, espacios, acentos, ñ y sin caracteres especiales.
  const expRegularNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
  const inputNombre = formulario['nombre-receptor'];

  if (expRegularNombre.test(inputNombre.value)){
    inputNombre.classList.remove('formulario__input--error')
    return true;
  } else {
    inputNombre.classList.add('formulario__input--error')
    return false;
  };

};

export default validarNombre;
