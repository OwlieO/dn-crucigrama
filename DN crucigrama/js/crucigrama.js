// Configuración del crucigrama
const GRID_SIZE = 20
const WORDS = [
  {
    id: 1,
    word: "INDEPENDENCIA",
    clue: "Autonomía política y territorial completa",
    direction: "horizontal",
    startRow: 1,
    startCol: 1,
    length: 13,
  },
  {
    id: 2,
    word: "MINFAR",
    clue: "Ministerio de las Fuerzas Armadas Revolucionarias (siglas)",
    direction: "horizontal",
    startRow: 3,
    startCol: 5,
    length: 6,
  },
  {
    id: 3,
    word: "DEFENSA",
    clue: "Protección del territorio nacional",
    direction: "vertical",
    startRow: 2,
    startCol: 8,
    length: 7,
  },
  {
    id: 4,
    word: "MILICIA",
    clue: "Fuerzas populares de defensa civil",
    direction: "horizontal",
    startRow: 6,
    startCol: 3,
    length: 7,
  },
  {
    id: 5,
    word: "PATRIA",
    clue: "Tierra natal que se defiende",
    direction: "vertical",
    startRow: 4,
    startCol: 2,
    length: 6,
  },
  {
    id: 6,
    word: "SOBERANIA",
    clue: "Independencia y autonomía nacional",
    direction: "horizontal",
    startRow: 9,
    startCol: 4,
    length: 9,
  },
  {
    id: 7,
    word: "REVOLUCION",
    clue: "Proceso de transformación social iniciado en 1959",
    direction: "vertical",
    startRow: 5,
    startCol: 12,
    length: 10,
  },
  {
    id: 8,
    word: "SEGURIDAD",
    clue: "Estado de protección ante amenazas",
    direction: "horizontal",
    startRow: 12,
    startCol: 2,
    length: 9,
  },
  {
    id: 9,
    word: "EJERCITO",
    clue: "Institución militar organizada",
    direction: "vertical",
    startRow: 7,
    startCol: 6,
    length: 8,
  },
  {
    id: 10,
    word: "MARINA",
    clue: "Fuerza naval de defensa",
    direction: "horizontal",
    startRow: 11,
    startCol: 14,
    length: 6,
  },
  {
    id: 11,
    word: "AVIACION",
    clue: "Fuerza aérea militar",
    direction: "vertical",
    startRow: 3,
    startCol: 16,
    length: 8,
  },
  {
    id: 12,
    word: "FRONTERA",
    clue: "Límite territorial que se protege",
    direction: "horizontal",
    startRow: 15,
    startCol: 6,
    length: 8,
  },
  {
    id: 13,
    word: "TERRITORIO",
    clue: "Espacio geográfico nacional",
    direction: "vertical",
    startRow: 10,
    startCol: 18,
    length: 10,
  },
  {
    id: 14,
    word: "COMANDANTE",
    clue: "Rango militar superior",
    direction: "horizontal",
    startRow: 17,
    startCol: 3,
    length: 10,
  },
  {
    id: 15,
    word: "ESTRATEGIA",
    clue: "Planificación militar y de defensa",
    direction: "vertical",
    startRow: 2,
    startCol: 14,
    length: 10,
  },
  {
    id: 16,
    word: "RESISTENCIA",
    clue: "Capacidad de oposición ante agresiones",
    direction: "horizontal",
    startRow: 19,
    startCol: 5,
    length: 11,
  },
  {
    id: 17,
    word: "PUEBLO",
    clue: "Población que participa en la defensa",
    direction: "vertical",
    startRow: 13,
    startCol: 4,
    length: 6,
  },
  {
    id: 18,
    word: "NACION",
    clue: "Comunidad política organizada",
    direction: "horizontal",
    startRow: 7,
    startCol: 16,
    length: 6,
  },
  {
    id: 19,
    word: "LIBERTAD",
    clue: "Valor fundamental que se defiende",
    direction: "vertical",
    startRow: 9,
    startCol: 10,
    length: 8,
  },
  {
    id: 20,
    word: "HEROISMO",
    clue: "Valor y coraje en la defensa",
    direction: "vertical",
    startRow: 14,
    startCol: 17,
    length: 8,
  },
  {
    id: 21,
    word: "GUARDIA",
    clue: "Servicio de vigilancia y protección",
    direction: "horizontal",
    startRow: 5,
    startCol: 7,
    length: 7,
  },
  {
    id: 22,
    word: "OFICIAL",
    clue: "Miembro del cuerpo de mando militar",
    direction: "vertical",
    startRow: 16,
    startCol: 12,
    length: 7,
  },
  {
    id: 23,
    word: "DISCIPLINA",
    clue: "Orden y obediencia militar",
    direction: "horizontal",
    startRow: 13,
    startCol: 9,
    length: 10,
  },
  {
    id: 24,
    word: "HONOR",
    clue: "Valor moral del militar",
    direction: "vertical",
    startRow: 8,
    startCol: 19,
    length: 5,
  },
]

// Variables globales del juego
let grid = []
let completedWords = new Set()
let selectedCell = null
let structure = []
let createConfetti
let generatePDF

// Inicializar el juego
function initGame() {
  console.log("Inicializando crucigrama...")

  // Inicializar grid vacío
  grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""))
  completedWords = new Set()
  selectedCell = null

  // Crear estructura del crucigrama
  structure = createCrosswordStructure()

  // Crear elementos del DOM
  createGrid()
  createClues()
  updateUI()

  console.log("Crucigrama inicializado correctamente")
}

// Crear estructura del crucigrama
function createCrosswordStructure() {
  console.log("Creando estructura del crucigrama...")

  const newStructure = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(false))

  WORDS.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      if (word.direction === "horizontal" && word.startCol + i < GRID_SIZE) {
        newStructure[word.startRow][word.startCol + i] = true
      } else if (word.direction === "vertical" && word.startRow + i < GRID_SIZE) {
        newStructure[word.startRow + i][word.startCol] = true
      }
    }
  })

  console.log("Estructura creada")
  return newStructure
}

// Verificar si una palabra está completa
function checkWordCompletion(wordData) {
  let wordFromGrid = ""

  for (let i = 0; i < wordData.length; i++) {
    if (wordData.direction === "horizontal" && wordData.startCol + i < GRID_SIZE) {
      wordFromGrid += grid[wordData.startRow][wordData.startCol + i]
    } else if (wordData.direction === "vertical" && wordData.startRow + i < GRID_SIZE) {
      wordFromGrid += grid[wordData.startRow + i][wordData.startCol]
    }
  }

  return wordFromGrid.toUpperCase() === wordData.word
}

// Actualizar palabras completadas
function updateCompletedWords() {
  const newCompletedWords = new Set()

  WORDS.forEach((word) => {
    if (checkWordCompletion(word)) {
      newCompletedWords.add(word.id)
    }
  })

  // Verificar si se completaron nuevas palabras
  const previousSize = completedWords.size
  completedWords = newCompletedWords

  if (completedWords.size > previousSize) {
    console.log(`Nueva palabra completada! Total: ${completedWords.size}/${WORDS.length}`)
  }

  updateUI()
}

// Obtener número de palabra para una celda
function getWordNumber(row, col) {
  const word = WORDS.find((w) => w.startRow === row && w.startCol === col)
  return word?.id
}

// Manejar entrada de texto en celda
function handleCellChange(row, col, value) {
  if (value.length > 1) return

  grid[row][col] = value.toUpperCase()
  updateCompletedWords()
}

// Crear la cuadrícula HTML
function createGrid() {
  console.log("Creando cuadrícula...")

  const gridContainer = document.getElementById("crossword-grid")
  if (!gridContainer) {
    console.error("No se encontró el contenedor de la cuadrícula")
    return
  }

  gridContainer.innerHTML = ""

  for (let row = 0; row < GRID_SIZE; row++) {
    const rowDiv = document.createElement("div")
    rowDiv.className = "grid-row"

    for (let col = 0; col < GRID_SIZE; col++) {
      const cellDiv = document.createElement("div")
      const isActive = structure[row][col]
      const wordNumber = getWordNumber(row, col)

      cellDiv.className = `grid-cell ${isActive ? "active" : "inactive"}`

      if (isActive) {
        // Agregar número de palabra si existe
        if (wordNumber) {
          const numberSpan = document.createElement("span")
          numberSpan.className = "cell-number"
          numberSpan.textContent = wordNumber
          cellDiv.appendChild(numberSpan)
        }

        // Crear input para la celda
        const input = document.createElement("input")
        input.className = "cell-input"
        input.type = "text"
        input.maxLength = 1
        input.value = grid[row][col]

        // Event listeners
        input.addEventListener("input", (e) => {
          handleCellChange(row, col, e.target.value)
        })

        input.addEventListener("focus", () => {
          if (selectedCell) {
            selectedCell.classList.remove("selected")
          }
          cellDiv.classList.add("selected")
          selectedCell = cellDiv
        })

        input.addEventListener("blur", () => {
          cellDiv.classList.remove("selected")
        })

        cellDiv.appendChild(input)
      }

      rowDiv.appendChild(cellDiv)
    }

    gridContainer.appendChild(rowDiv)
  }

  console.log("Cuadrícula creada")
}

// Crear las pistas
function createClues() {
  console.log("Creando pistas...")

  const horizontalClues = WORDS.filter((w) => w.direction === "horizontal")
  const verticalClues = WORDS.filter((w) => w.direction === "vertical")

  const horizontalContainer = document.getElementById("horizontal-clues")
  const verticalContainer = document.getElementById("vertical-clues")
  const horizontalCount = document.getElementById("horizontal-count")
  const verticalCount = document.getElementById("vertical-count")

  if (!horizontalContainer || !verticalContainer) {
    console.error("No se encontraron los contenedores de pistas")
    return
  }

  // Limpiar contenedores
  horizontalContainer.innerHTML = ""
  verticalContainer.innerHTML = ""

  // Actualizar contadores
  const completedHorizontal = horizontalClues.filter((w) => completedWords.has(w.id)).length
  const completedVertical = verticalClues.filter((w) => completedWords.has(w.id)).length

  if (horizontalCount) horizontalCount.textContent = `${completedHorizontal}/${horizontalClues.length}`
  if (verticalCount) verticalCount.textContent = `${completedVertical}/${verticalClues.length}`

  // Crear pistas horizontales
  horizontalClues.forEach((word) => {
    const clueDiv = createClueElement(word)
    horizontalContainer.appendChild(clueDiv)
  })

  // Crear pistas verticales
  verticalClues.forEach((word) => {
    const clueDiv = createClueElement(word)
    verticalContainer.appendChild(clueDiv)
  })

  console.log("Pistas creadas")
}

// Crear elemento de pista individual
function createClueElement(word) {
  const clueDiv = document.createElement("div")
  clueDiv.className = "clue-item"

  const numberDiv = document.createElement("div")
  numberDiv.className = `clue-number ${completedWords.has(word.id) ? "completed" : ""}`
  numberDiv.textContent = completedWords.has(word.id) ? "✓" : word.id

  const textDiv = document.createElement("div")
  textDiv.className = `clue-text ${completedWords.has(word.id) ? "completed" : ""}`
  textDiv.textContent = word.clue

  clueDiv.appendChild(numberDiv)
  clueDiv.appendChild(textDiv)

  return clueDiv
}

// Actualizar interfaz de usuario
function updateUI() {
  const progressBadge = document.getElementById("progress-badge")
  const successMessage = document.getElementById("success-message")

  if (!progressBadge) {
    console.error("No se encontró el badge de progreso")
    return
  }

  const completionPercentage = Math.round((completedWords.size / WORDS.length) * 100)

  // Actualizar badge de progreso
  progressBadge.textContent = `Palabras completadas: ${completedWords.size}/${WORDS.length} (${completionPercentage}%)`
  progressBadge.className = completedWords.size === WORDS.length ? "badge completed" : "badge"

  // Mostrar mensaje de éxito si está completo
  if (successMessage) {
    if (completedWords.size === WORDS.length) {
      successMessage.classList.add("show")
      // Activar confeti
      setTimeout(() => {
        if (typeof createConfetti === "function") {
          for (let i = 0; i < 50; i++) {
            createConfetti()
          }
        }
      }, 500)
    } else {
      successMessage.classList.remove("show")
    }
  }

  // Actualizar pistas
  createClues()
}

// Reiniciar juego
function resetGame() {
  console.log("Reiniciando juego...")

  grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""))
  completedWords = new Set()
  selectedCell = null

  createGrid()
  updateUI()

  console.log("Juego reiniciado")
}

// Configurar event listeners
function setupEventListeners() {
  console.log("Configurando event listeners...")

  const resetBtn = document.getElementById("reset-btn")
  const pdfBtn = document.getElementById("pdf-btn")
  const createPdfBtn = document.getElementById("create-pdf-btn")
  const cancelPdfBtn = document.getElementById("cancel-pdf-btn")

  if (resetBtn) {
    resetBtn.addEventListener("click", resetGame)
  }

  if (pdfBtn) {
    pdfBtn.addEventListener("click", showNameInput)
  }

  if (createPdfBtn) {
    createPdfBtn.addEventListener("click", generatePDF)
  }

  if (cancelPdfBtn) {
    cancelPdfBtn.addEventListener("click", hideNameInput)
  }

  console.log("Event listeners configurados")
}

// Mostrar input de nombre
function showNameInput() {
  const nameInputSection = document.getElementById("name-input-section")
  const authorNameInput = document.getElementById("author-name")

  if (nameInputSection) {
    nameInputSection.classList.add("show")
  }

  if (authorNameInput) {
    authorNameInput.focus()
  }
}

// Ocultar input de nombre
function hideNameInput() {
  const nameInputSection = document.getElementById("name-input-section")
  const authorNameInput = document.getElementById("author-name")

  if (nameInputSection) {
    nameInputSection.classList.remove("show")
  }

  if (authorNameInput) {
    authorNameInput.value = ""
  }
}

// Exportar funciones para uso global
window.initGame = initGame
window.resetGame = resetGame
window.setupEventListeners = setupEventListeners
window.showNameInput = showNameInput
window.hideNameInput = hideNameInput
window.WORDS = WORDS
window.GRID_SIZE = GRID_SIZE
window.grid = grid
window.completedWords = completedWords
window.structure = structure
window.getWordNumber = getWordNumber
