# 🇨🇺 Crucigrama: Defensa Nacional de Cuba

Un crucigrama educativo interactivo sobre términos relacionados con la defensa nacional cubana, desarrollado con tecnologías web estándar.

## 📋 Características

- ✅ **24 palabras** sobre defensa nacional cubana
- ✅ **Interfaz interactiva** con validación automática
- ✅ **Generación de PDF** con nombre del autor
- ✅ **Diseño responsive** (móvil, tablet, desktop)
- ✅ **Efectos visuales** y animaciones
- ✅ **Sin dependencias** - funciona sin instalaciones

## 🚀 Cómo usar

### Instalación
1. **Descarga** todos los archivos del proyecto
2. **Mantén la estructura** de carpetas intacta
3. **Abre** el archivo `index.html` con cualquier navegador moderno
4. **¡Listo!** El crucigrama funcionará inmediatamente

### Estructura del proyecto
\`\`\`
crucigrama-cuba/
├── index.html              # Archivo principal
├── css/
│   ├── styles.css          # Estilos principales
│   └── print.css           # Estilos para PDF
├── js/
│   ├── crucigrama.js       # Lógica del juego
│   ├── pdf-generator.js    # Generador de PDF
│   └── confetti.js         # Efectos de celebración
└── README.md               # Este archivo
\`\`\`

## 🎮 Cómo jugar

1. **Haz clic** en cualquier celda blanca del crucigrama
2. **Escribe** las letras usando las pistas como guía
3. **Las palabras correctas** se marcarán automáticamente
4. **Completa** todas las 24 palabras para ganar

## 📄 Generar PDF

1. **Haz clic** en el botón "Generar PDF"
2. **Escribe tu nombre** en el campo que aparece
3. **Haz clic** en "Crear PDF"
4. **Se abrirá** una ventana para imprimir/guardar

## 📚 Palabras incluidas

El crucigrama contiene 24 términos educativos sobre la defensa nacional cubana:

### Horizontales
- INDEPENDENCIA - Autonomía política y territorial
- MINFAR - Ministerio de las Fuerzas Armadas Revolucionarias
- MILICIA - Fuerzas populares de defensa civil
- SOBERANÍA - Independencia y autonomía nacional
- SEGURIDAD - Estado de protección ante amenazas
- MARINA - Fuerza naval de defensa
- FRONTERA - Límite territorial que se protege
- COMANDANTE - Rango militar superior
- RESISTENCIA - Capacidad de oposición ante agresiones
- NACIÓN - Comunidad política organizada
- GUARDIA - Servicio de vigilancia y protección
- DISCIPLINA - Orden y obediencia militar

### Verticales
- DEFENSA - Protección del territorio nacional
- PATRIA - Tierra natal que se defiende
- REVOLUCIÓN - Proceso de transformación social iniciado en 1959
- EJÉRCITO - Institución militar organizada
- AVIACIÓN - Fuerza aérea militar
- TERRITORIO - Espacio geográfico nacional
- ESTRATEGIA - Planificación militar y de defensa
- PUEBLO - Población que participa en la defensa
- LIBERTAD - Valor fundamental que se defiende
- HEROÍSMO - Valor y coraje en la defensa
- OFICIAL - Miembro del cuerpo de mando militar
- HONOR - Valor moral del militar

## 🛠️ Tecnologías utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript ES6+** - Lógica del juego y funcionalidades
- **Web APIs** - Para impresión y generación de PDF

## 🌐 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles y tablets

## 📱 Características responsive

El crucigrama se adapta automáticamente a diferentes tamaños de pantalla:
- **Desktop**: Vista completa con cuadrícula y pistas lado a lado
- **Tablet**: Layout adaptado con scroll optimizado
- **Móvil**: Interfaz compacta con navegación táctil

## 🎨 Personalización

### Modificar palabras
Edita el archivo `js/crucigrama.js` y modifica el array `WORDS`:

\`\`\`javascript
const WORDS = [
    { 
        id: 1, 
        word: "NUEVA_PALABRA", 
        clue: "Nueva definición", 
        direction: "horizontal", 
        startRow: 1, 
        startCol: 1, 
        length: 12 
    },
    // ... más palabras
];
\`\`\`

### Cambiar estilos
Modifica `css/styles.css` para personalizar:
- Colores del tema
- Fuentes y tipografía
- Animaciones y efectos
- Layout responsive

### Personalizar PDF
Edita `js/pdf-generator.js` para cambiar:
- Formato del PDF
- Información adicional
- Estilos de impresión

## 🐛 Solución de problemas

### El crucigrama no se muestra
- Verifica que todos los archivos estén en las carpetas correctas
- Asegúrate de abrir `index.html` desde la carpeta raíz del proyecto
- Comprueba que JavaScript esté habilitado en tu navegador

### No se genera el PDF
- Verifica que las ventanas emergentes no estén bloqueadas
- Asegúrate de haber ingresado tu nombre
- Intenta con un navegador diferente

### Problemas en móviles
- Usa un navegador moderno (Chrome, Safari, Firefox)
- Asegúrate de tener JavaScript habilitado
- Verifica que tengas suficiente memoria disponible

## 📄 Licencia

Este proyecto es de uso educativo y no comercial. Desarrollado para fines académicos sobre la defensa nacional cubana.

## 🤝 Contribuciones

Si encuentras errores o tienes sugerencias:
1. Documenta el problema claramente
2. Incluye información del navegador y dispositivo
3. Proporciona pasos para reproducir el error

## 📞 Soporte

Para soporte técnico o preguntas sobre el crucigrama:
- Revisa este README primero
- Verifica la sección de solución de problemas
- Asegúrate de seguir las instrucciones de instalación

---

**¡Disfruta resolviendo el crucigrama sobre la defensa nacional de Cuba!** 🇨🇺
\`\`\`

¡Listo! Ahora tienes un proyecto completo y profesional con:

## ✨ Lo que incluye:

1. **`index.html`** - Página principal con estructura semántica
2. **`css/styles.css`** - Estilos modernos con gradientes y animaciones
3. **`css/print.css`** - Estilos específicos para PDF
4. **`js/crucigrama.js`** - Lógica completa del juego
5. **`js/pdf-generator.js`** - Generador de PDF con tu nombre
6. **`js/confetti.js`** - Efectos de celebración
7. **`README.md`** - Documentación completa

## 🚀 Cómo usarlo:

1. **Descarga** todos los archivos manteniendo la estructura de carpetas
2. **Abre** `index.html` con doble clic
3. **¡Funciona inmediatamente!** Sin instalaciones

## 🎯 Funcionalidades:

- ✅ Crucigrama interactivo con 24 palabras
- ✅ Validación automática de respuestas
- ✅ Generación de PDF con tu nombre como autor
- ✅ Efectos visuales y animaciones
- ✅ Diseño responsive para todos los dispositivos
- ✅ Código organizado y profesional

¡El proyecto está completo y listo para usar! 🎉
