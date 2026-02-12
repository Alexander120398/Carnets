/**
 * APP.JS
 * Lógica principal de la aplicación
 */

// Inicialización del canvas
const cardCanvas = new CardCanvas('idCanvas');

// Referencias a todos los inputs
const inputs = {
  // Archivos
  template: document.getElementById('templateInput'),
  photo: document.getElementById('photoInput'),
  logo: document.getElementById('logoInput'),
  
  // Textos
  name: document.getElementById('nameInput'),
  position: document.getElementById('positionInput'),
  department: document.getElementById('departmentInput'),
  idNumber: document.getElementById('idNumberInput'),
  
  // Posiciones - Nombre
  nameX: document.getElementById('nameX'),
  nameY: document.getElementById('nameY'),
  
  // Posiciones - Puesto
  positionX: document.getElementById('positionX'),
  positionY: document.getElementById('positionY'),
  
  // Posiciones - Foto
  photoX: document.getElementById('photoX'),
  photoY: document.getElementById('photoY'),
  photoSize: document.getElementById('photoSize'),
  
  // Posiciones - Logo
  logoX: document.getElementById('logoX'),
  logoY: document.getElementById('logoY'),
  logoSize: document.getElementById('logoSize'),
  
  // Estilos
  textColor: document.getElementById('textColor'),
  fontSize: document.getElementById('fontSize'),
  
  // Botones
  download: document.getElementById('downloadBtn'),
  reset: document.getElementById('resetBtn')
};

/**
 * Renderiza el canvas con los valores actuales
 */
function render() {
  const values = getInputValues(inputs);
  cardCanvas.render(values);
}

/**
 * Configura los event listeners para carga de imágenes
 */
function setupImageLoaders() {
  // Plantilla
  inputs.template.addEventListener('change', () => {
    loadImage(inputs.template, cardCanvas.templateImg, render);
  });

  // Foto
  inputs.photo.addEventListener('change', () => {
    loadImage(inputs.photo, cardCanvas.photoImg, render);
  });

  // Logo
  inputs.logo.addEventListener('change', () => {
    loadImage(inputs.logo, cardCanvas.logoImg, render);
  });
}

/**
 * Configura los event listeners para inputs de texto y número
 */
function setupInputListeners() {
  Object.values(inputs).forEach(input => {
    if (input && (input.type === 'text' || input.type === 'number' || input.type === 'color')) {
      input.addEventListener('input', render);
    }
  });

  // Actualizar display del tamaño de fuente
  if (inputs.fontSize) {
    const fontSizeValue = document.getElementById('fontSizeValue');
    inputs.fontSize.addEventListener('input', (e) => {
      if (fontSizeValue) {
        fontSizeValue.textContent = e.target.value + 'px';
      }
      render();
    });
  }
}

/**
 * Configura los botones de acción
 */
function setupButtons() {
  // Botón de descarga
  if (inputs.download) {
    inputs.download.addEventListener('click', () => {
      const filename = inputs.name.value 
        ? `carnet-${inputs.name.value.replace(/\s+/g, '-').toLowerCase()}.png`
        : 'carnet.png';
      downloadCanvas(cardCanvas.canvas, filename);
    });
  }

  // Botón de reinicio
  if (inputs.reset) {
    inputs.reset.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres reiniciar todos los valores?')) {
        // Limpiar file inputs
        if (inputs.template) inputs.template.value = '';
        if (inputs.photo) inputs.photo.value = '';
        if (inputs.logo) inputs.logo.value = '';
        
        // Limpiar imágenes
        cardCanvas.templateImg = new Image();
        cardCanvas.photoImg = new Image();
        cardCanvas.logoImg = new Image();
        
        // Resetear inputs
        resetInputs(inputs);
        
        // Re-renderizar
        render();
        
        console.log('Editor reiniciado');
      }
    });
  }
}

/**
 * Genera un carné de ejemplo
 */
function loadExampleData() {
  inputs.name.value = 'Juan Pérez García';
  inputs.position.value = 'Desarrollador Senior';
  inputs.department.value = 'Tecnología';
  inputs.idNumber.value = generateUniqueId();
  render();
}

/**
 * Inicializa la aplicación
 */
function init() {
  console.log('🚀 Iniciando Workshop de Carnés Corporativos...');
  
  // Configurar todos los listeners
  setupImageLoaders();
  setupInputListeners();
  setupButtons();
  
  // Renderizar canvas inicial
  render();
  
  // Cargar datos de ejemplo (opcional)
  // loadExampleData();
  
  console.log('✅ Aplicación lista');
  
  // Mensaje de bienvenida
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   Workshop - Editor de Carnés         ║
  ║   HTML5 Canvas + JavaScript           ║
  ╚═══════════════════════════════════════╝
  
  Instrucciones:
  1. Carga una plantilla de carné
  2. Agrega tu foto y logo
  3. Completa la información
  4. Ajusta las posiciones
  5. Descarga tu carné
  `);
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
