// Generador de PDF del crucigrama

function generatePDF() {
  console.log("Generando PDF...")

  const authorNameInput = document.getElementById("author-name")

  if (!authorNameInput) {
    console.error("No se encontró el input del nombre del autor")
    return
  }

  const authorName = authorNameInput.value.trim()

  if (!authorName) {
    alert("Por favor, ingresa tu nombre para generar el PDF.")
    authorNameInput.focus()
    return
  }

  // Crear contenido HTML para el PDF
  const printContent = generatePDFContent(authorName)

  // Crear ventana para imprimir
  const printWindow = window.open("", "_blank", "width=800,height=600")

  if (!printWindow) {
    alert("No se pudo abrir la ventana de impresión. Verifica que no esté bloqueada por el navegador.")
    return
  }

  try {
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()

    // Esperar a que se cargue y luego imprimir
    setTimeout(() => {
      printWindow.print()

      // Ocultar el formulario de nombre después de generar
      hideNameInput()
    }, 1000)

    console.log("PDF generado exitosamente")
  } catch (error) {
    console.error("Error al generar PDF:", error)
    alert("Hubo un error al generar el PDF. Por favor, intenta de nuevo.")
    printWindow.close()
  }
}

function generatePDFContent(authorName) {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  const completionPercentage = Math.round((completedWords.size / WORDS.length) * 100)

  return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Crucigrama: Defensa Nacional de Cuba - ${authorName}</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }

                body { 
                    font-family: 'Arial', sans-serif; 
                    margin: 20px; 
                    background: white;
                    color: #333;
                    line-height: 1.4;
                }
                
                .header { 
                    text-align: center; 
                    margin-bottom: 30px; 
                    border-bottom: 3px solid #1e40af;
                    padding-bottom: 20px;
                }
                
                .header h1 { 
                    color: #1e40af; 
                    font-size: 28px; 
                    margin-bottom: 10px; 
                    font-weight: bold;
                }
                
                .header p {
                    color: #64748b;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                
                .author-info { 
                    background: #f0fdf4;
                    border: 2px solid #059669;
                    border-radius: 8px;
                    padding: 15px;
                    margin: 20px 0;
                    text-align: center;
                }
                
                .author-name { 
                    color: #059669; 
                    font-size: 18px; 
                    font-weight: bold; 
                    margin-bottom: 5px;
                }
                
                .pdf-date {
                    color: #64748b;
                    font-size: 14px;
                }
                
                .stats-section {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 15px;
                    margin: 20px 0;
                }
                
                .stats-section h3 {
                    color: #1e40af;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }
                
                .stat-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 5px 0;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .stat-label {
                    font-weight: 600;
                    color: #374151;
                }
                
                .stat-value {
                    color: #059669;
                    font-weight: bold;
                }
                
                .grid-container { 
                    display: flex; 
                    justify-content: space-between; 
                    margin-bottom: 30px; 
                    gap: 20px;
                }
                
                .crossword-section {
                    flex: 1.2;
                }
                
                .crossword-grid { 
                    border: 2px solid #1e293b; 
                    display: inline-block; 
                    margin-bottom: 20px;
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .grid-row { 
                    display: flex; 
                }
                
                .grid-cell { 
                    width: 22px; 
                    height: 22px; 
                    border: 1px solid #cbd5e1; 
                    position: relative; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-weight: bold; 
                    font-size: 11px;
                }
                
                .grid-cell.active { 
                    background: white; 
                }
                
                .grid-cell.inactive { 
                    background: #1e293b; 
                }
                
                .cell-number { 
                    position: absolute; 
                    top: 1px; 
                    left: 2px; 
                    font-size: 7px; 
                    color: #3b82f6; 
                    font-weight: bold; 
                }
                
                .clues-container { 
                    flex: 1;
                    margin-left: 20px; 
                }
                
                .clues-section { 
                    margin-bottom: 25px; 
                    page-break-inside: avoid;
                }
                
                .clues-title { 
                    font-size: 16px; 
                    font-weight: bold; 
                    color: #1e40af; 
                    margin-bottom: 12px; 
                    border-bottom: 2px solid #e2e8f0; 
                    padding-bottom: 5px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .clue-count-badge {
                    background: #8b5cf6;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: bold;
                }
                
                .clue-item { 
                    display: flex; 
                    margin-bottom: 8px; 
                    font-size: 12px; 
                    align-items: flex-start;
                    page-break-inside: avoid;
                }
                
                .clue-number { 
                    background: #e2e8f0; 
                    color: #475569; 
                    width: 20px; 
                    height: 20px; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 10px; 
                    font-weight: bold; 
                    margin-right: 8px; 
                    flex-shrink: 0; 
                }
                
                .clue-number.completed {
                    background: #10b981;
                    color: white;
                }
                
                .clue-text { 
                    color: #374151; 
                    line-height: 1.4; 
                    flex: 1;
                }
                
                .clue-text.completed {
                    color: #059669;
                    font-weight: bold;
                    text-decoration: line-through;
                }
                
                .footer { 
                    text-align: center; 
                    margin-top: 30px; 
                    padding-top: 20px; 
                    border-top: 2px solid #e2e8f0; 
                    color: #64748b; 
                    font-size: 12px; 
                    page-break-inside: avoid;
                }
                
                .footer p {
                    margin: 5px 0;
                }
                
                .completion-badge {
                    display: inline-block;
                    background: ${completedWords.size === WORDS.length ? "#10b981" : "#f59e0b"};
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-weight: bold;
                    margin: 10px 0;
                }
                
                /* Ajustes para impresión */
                @media print {
                    body {
                        margin: 0;
                        padding: 15px;
                    }
                    
                    .grid-container {
                        page-break-inside: avoid;
                    }
                    
                    .clues-section {
                        page-break-inside: avoid;
                    }
                    
                    @page {
                        margin: 1cm;
                        size: A4;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🇨🇺 Crucigrama: Defensa Nacional de Cuba</h1>
                <p>Crucigrama educativo con 24 términos sobre la defensa nacional cubana</p>
                
                <div class="author-info">
                    <div class="author-name">📝 Elaborado por: ${authorName}</div>
                    <div class="pdf-date">📅 Generado el ${currentDate}</div>
                </div>
            </div>
            
            <div class="stats-section">
                <h3>📊 Estadísticas del Crucigrama</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Total de palabras:</span>
                        <span class="stat-value">${WORDS.length}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Palabras completadas:</span>
                        <span class="stat-value">${completedWords.size}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Progreso:</span>
                        <span class="stat-value">${completionPercentage}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Estado:</span>
                        <span class="stat-value">${completedWords.size === WORDS.length ? "Completado" : "En progreso"}</span>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 10px;">
                    <span class="completion-badge">
                        ${completedWords.size === WORDS.length ? "🏆 ¡Crucigrama Completado!" : "⏳ En Progreso"}
                    </span>
                </div>
            </div>
            
            <div class="grid-container">
                <div class="crossword-section">
                    <div class="crossword-grid">
                        ${generateGridHTML()}
                    </div>
                </div>
                
                <div class="clues-container">
                    ${generateCluesHTML()}
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Crucigrama sobre Defensa Nacional de Cuba</strong></p>
                <p>Generado el ${currentDate} por ${authorName}</p>
                <p>Este crucigrama contiene términos educativos sobre la defensa nacional cubana</p>
                <p>Proyecto educativo - Uso académico</p>
            </div>
        </body>
        </html>
    `
}

function generateGridHTML() {
  let gridHTML = ""

  for (let row = 0; row < GRID_SIZE; row++) {
    gridHTML += '<div class="grid-row">'

    for (let col = 0; col < GRID_SIZE; col++) {
      const isActive = structure[row][col]
      const wordNumber = getWordNumber(row, col)
      const cellValue = grid[row][col]

      gridHTML += `
                <div class="grid-cell ${isActive ? "active" : "inactive"}">
                    ${wordNumber ? `<span class="cell-number">${wordNumber}</span>` : ""}
                    ${isActive ? cellValue : ""}
                </div>
            `
    }

    gridHTML += "</div>"
  }

  return gridHTML
}

function generateCluesHTML() {
  const horizontalClues = WORDS.filter((w) => w.direction === "horizontal")
  const verticalClues = WORDS.filter((w) => w.direction === "vertical")

  const completedHorizontal = horizontalClues.filter((w) => completedWords.has(w.id)).length
  const completedVertical = verticalClues.filter((w) => completedWords.has(w.id)).length

  const cluesHTML = `
        <div class="clues-section">
            <h3 class="clues-title">
                Horizontales →
                <span class="clue-count-badge">${completedHorizontal}/${horizontalClues.length}</span>
            </h3>
            ${horizontalClues
              .map(
                (word) => `
                <div class="clue-item">
                    <div class="clue-number ${completedWords.has(word.id) ? "completed" : ""}">${completedWords.has(word.id) ? "✓" : word.id}</div>
                    <div class="clue-text ${completedWords.has(word.id) ? "completed" : ""}">${word.clue}</div>
                </div>
            `,
              )
              .join("")}
        </div>
        
        <div class="clues-section">
            <h3 class="clues-title">
                Verticales ↓
                <span class="clue-count-badge">${completedVertical}/${verticalClues.length}</span>
            </h3>
            ${verticalClues
              .map(
                (word) => `
                <div class="clue-item">
                    <div class="clue-number ${completedWords.has(word.id) ? "completed" : ""}">${completedWords.has(word.id) ? "✓" : word.id}</div>
                    <div class="clue-text ${completedWords.has(word.id) ? "completed" : ""}">${word.clue}</div>
                </div>
            `,
              )
              .join("")}
        </div>
    `

  return cluesHTML
}

// Exportar función para uso global
window.generatePDF = generatePDF
