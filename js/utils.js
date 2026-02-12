/**
 * UTILS.JS
 * Funciones utilitarias para el editor de carnés
 */

/**
 * Carga una imagen desde un input file
 * @param {HTMLInputElement} input - Input de tipo file
 * @param {Image} imgObj - Objeto Image donde se cargará la imagen
 * @param {Function} callback - Función a ejecutar después de cargar
 */
function loadImage(input, imgObj, callback) {
  const file = input.files[0];
  
  if (!file) {
    console.warn('No se seleccionó ningún archivo');
    return;
  }

  // Validar que sea una imagen
  if (!file.type.startsWith('image/')) {
    alert('Por favor, selecciona un archivo de imagen válido');
    return;
  }

  const reader = new FileReader();
  
  reader.onload = (e) => {
    imgObj.src = e.target.result;
    imgObj.onload = () => {
      console.log('Imagen cargada correctamente:', file.name);
      if (callback) callback();
    };
    imgObj.onerror = () => {
      console.error('Error al cargar la imagen');
      alert('No se pudo cargar la imagen. Intenta con otro archivo.');
    };
  };

  reader.onerror = () => {
    console.error('Error al leer el archivo');
    alert('Error al leer el archivo');
  };

  reader.readAsDataURL(file);
}

/**
 * Descarga el canvas como imagen PNG
 * @param {HTMLCanvasElement} canvas - Canvas a descargar
 * @param {string} filename - Nombre del archivo
 */
function downloadCanvas(canvas, filename = 'carnet.png') {
  try {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    console.log('Carné descargado:', filename);
  } catch (error) {
    console.error('Error al descargar:', error);
    alert('Error al descargar el carné');
  }
}

/**
 * Valida que un valor numérico esté dentro de un rango
 * @param {number} value - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Valor ajustado al rango
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Obtiene todos los valores de los inputs
 * @param {Object} inputs - Objeto con referencias a los inputs
 * @returns {Object} - Objeto con los valores actuales
 */
function getInputValues(inputs) {
  return {
    name: inputs.name.value || '',
    position: inputs.position.value || '',
    department: inputs.department?.value || '',
    idNumber: inputs.idNumber?.value || '',
    nameX: parseInt(inputs.nameX.value) || 0,
    nameY: parseInt(inputs.nameY.value) || 0,
    positionX: parseInt(inputs.positionX.value) || 0,
    positionY: parseInt(inputs.positionY.value) || 0,
    photoX: parseInt(inputs.photoX.value) || 0,
    photoY: parseInt(inputs.photoY.value) || 0,
    photoSize: parseInt(inputs.photoSize.value) || 0,
    logoX: parseInt(inputs.logoX.value) || 0,
    logoY: parseInt(inputs.logoY.value) || 0,
    logoSize: parseInt(inputs.logoSize.value) || 0,
    textColor: inputs.textColor?.value || '#000000',
    fontSize: parseInt(inputs.fontSize?.value) || 18
  };
}

/**
 * Reinicia todos los valores a sus defaults
 * @param {Object} inputs - Objeto con referencias a los inputs
 */
function resetInputs(inputs) {
  if (inputs.name) inputs.name.value = '';
  if (inputs.position) inputs.position.value = '';
  if (inputs.department) inputs.department.value = '';
  if (inputs.idNumber) inputs.idNumber.value = '';
  if (inputs.nameX) inputs.nameX.value = '100';
  if (inputs.nameY) inputs.nameY.value = '250';
  if (inputs.positionX) inputs.positionX.value = '100';
  if (inputs.positionY) inputs.positionY.value = '280';
  if (inputs.photoX) inputs.photoX.value = '30';
  if (inputs.photoY) inputs.photoY.value = '100';
  if (inputs.photoSize) inputs.photoSize.value = '100';
  if (inputs.logoX) inputs.logoX.value = '200';
  if (inputs.logoY) inputs.logoY.value = '30';
  if (inputs.logoSize) inputs.logoSize.value = '60';
  if (inputs.textColor) inputs.textColor.value = '#000000';
  if (inputs.fontSize) inputs.fontSize.value = '18';
}

/**
 * Formatea la fecha actual
 * @returns {string} - Fecha formateada
 */
function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Genera un ID único
 * @returns {string} - ID único
 */
function generateUniqueId() {
  return 'ID-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
}
