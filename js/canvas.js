/**
 * CANVAS.JS
 * Funciones para manipulación del canvas
 */

/**
 * Clase para gestionar el canvas del carné
 */
class CardCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    // Imágenes
    this.templateImg = new Image();
    this.photoImg = new Image();
    this.logoImg = new Image();
    
    // Estado
    this.values = null;
  }

  /**
   * Limpia el canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Dibuja la plantilla de fondo
   */
  drawTemplate() {
    if (this.templateImg.src && this.templateImg.complete) {
      this.ctx.drawImage(
        this.templateImg,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    } else {
      // Fondo por defecto si no hay plantilla
      this.ctx.fillStyle = '#f0f0f0';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Borde decorativo
      this.ctx.strokeStyle = '#007bff';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
    }
  }

  /**
   * Dibuja una imagen (foto o logo) con recorte opcional
   */
  drawImage(img, x, y, size, circular = false) {
    if (!img.src || !img.complete) return;

    this.ctx.save();

    if (circular) {
      // Crear máscara circular
      this.ctx.beginPath();
      this.ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.clip();
    }

    // Dibujar imagen
    this.ctx.drawImage(img, x, y, size, size);

    if (circular) {
      // Borde circular
      this.ctx.beginPath();
      this.ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  /**
   * Dibuja la foto de perfil
   */
  drawPhoto() {
    if (this.values) {
      this.drawImage(
        this.photoImg,
        this.values.photoX,
        this.values.photoY,
        this.values.photoSize,
        true // Circular
      );
    }
  }

  /**
   * Dibuja el logo corporativo
   */
  drawLogo() {
    if (this.values) {
      this.drawImage(
        this.logoImg,
        this.values.logoX,
        this.values.logoY,
        this.values.logoSize,
        false // Rectangular
      );
    }
  }

  /**
   * Dibuja texto en el canvas
   */
  drawText(text, x, y, fontSize, bold = false, color = '#000000') {
    this.ctx.fillStyle = color;
    this.ctx.font = `${bold ? 'bold ' : ''}${fontSize}px Arial, sans-serif`;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    
    // Sombra para mejor legibilidad
    this.ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    this.ctx.shadowBlur = 3;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 1;
    
    this.ctx.fillText(text, x, y);
    
    // Resetear sombra
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
  }

  /**
   * Dibuja todos los campos de texto
   */
  drawTexts() {
    if (!this.values) return;

    const color = this.values.textColor || '#000000';
    const baseFontSize = this.values.fontSize || 18;

    // Nombre
    if (this.values.name) {
      this.drawText(
        this.values.name,
        this.values.nameX,
        this.values.nameY,
        baseFontSize + 2,
        true,
        color
      );
    }

    // Puesto
    if (this.values.position) {
      this.drawText(
        this.values.position,
        this.values.positionX,
        this.values.positionY,
        baseFontSize - 2,
        false,
        color
      );
    }

    // Departamento (si existe)
    if (this.values.department) {
      this.drawText(
        this.values.department,
        this.values.positionX,
        this.values.positionY + 30,
        baseFontSize - 4,
        false,
        color
      );
    }

    // ID (si existe)
    if (this.values.idNumber) {
      this.drawText(
        `ID: ${this.values.idNumber}`,
        30,
        this.canvas.height - 40,
        baseFontSize - 6,
        true,
        color
      );
    }
  }

  /**
   * Renderiza todo el canvas
   */
  render(values) {
    this.values = values;
    
    this.clear();
    this.drawTemplate();
    this.drawPhoto();
    this.drawLogo();
    this.drawTexts();
  }

  /**
   * Actualiza una imagen específica
   */
  updateImage(type, img) {
    switch (type) {
      case 'template':
        this.templateImg = img;
        break;
      case 'photo':
        this.photoImg = img;
        break;
      case 'logo':
        this.logoImg = img;
        break;
    }
  }
}
