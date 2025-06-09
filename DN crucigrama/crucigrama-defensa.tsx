"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, RotateCcw, Trophy, Download, FileText } from "lucide-react"

// Definición del crucigrama expandido
const GRID_SIZE = 20
const WORDS = [
  {
    id: 1,
    word: "MINFAR",
    clue: "Ministerio de las Fuerzas Armadas Revolucionarias (siglas)",
    direction: "horizontal",
    startRow: 2,
    startCol: 4,
    length: 6,
  },
  {
    id: 2,
    word: "DEFENSA",
    clue: "Protección del territorio nacional",
    direction: "vertical",
    startRow: 1,
    startCol: 7,
    length: 7,
  },
  {
    id: 3,
    word: "MILICIA",
    clue: "Fuerzas populares de defensa civil",
    direction: "horizontal",
    startRow: 5,
    startCol: 2,
    length: 7,
  },
  {
    id: 4,
    word: "PATRIA",
    clue: "Tierra natal que se defiende",
    direction: "vertical",
    startRow: 3,
    startCol: 1,
    length: 6,
  },
  {
    id: 5,
    word: "SOBERANIA",
    clue: "Independencia y autonomía nacional",
    direction: "horizontal",
    startRow: 8,
    startCol: 3,
    length: 9,
  },
  {
    id: 6,
    word: "REVOLUCION",
    clue: "Proceso de transformación social iniciado en 1959",
    direction: "vertical",
    startRow: 4,
    startCol: 11,
    length: 10,
  },
  {
    id: 7,
    word: "SEGURIDAD",
    clue: "Estado de protección ante amenazas",
    direction: "horizontal",
    startRow: 11,
    startCol: 1,
    length: 9,
  },
  {
    id: 8,
    word: "EJERCITO",
    clue: "Institución militar organizada",
    direction: "vertical",
    startRow: 6,
    startCol: 5,
    length: 8,
  },
  {
    id: 9,
    word: "MARINA",
    clue: "Fuerza naval de defensa",
    direction: "horizontal",
    startRow: 10,
    startCol: 13,
    length: 6,
  },
  {
    id: 10,
    word: "AVIACION",
    clue: "Fuerza aérea militar",
    direction: "vertical",
    startRow: 2,
    startCol: 15,
    length: 8,
  },
  {
    id: 11,
    word: "FRONTERA",
    clue: "Límite territorial que se protege",
    direction: "horizontal",
    startRow: 14,
    startCol: 5,
    length: 8,
  },
  {
    id: 12,
    word: "TERRITORIO",
    clue: "Espacio geográfico nacional",
    direction: "vertical",
    startRow: 9,
    startCol: 18,
    length: 10,
  },
  {
    id: 13,
    word: "COMANDANTE",
    clue: "Rango militar superior",
    direction: "horizontal",
    startRow: 16,
    startCol: 2,
    length: 10,
  },
  {
    id: 14,
    word: "ESTRATEGIA",
    clue: "Planificación militar y de defensa",
    direction: "vertical",
    startRow: 1,
    startCol: 13,
    length: 10,
  },
  {
    id: 15,
    word: "RESISTENCIA",
    clue: "Capacidad de oposición ante agresiones",
    direction: "horizontal",
    startRow: 18,
    startCol: 4,
    length: 11,
  },
  {
    id: 16,
    word: "PUEBLO",
    clue: "Población que participa en la defensa",
    direction: "vertical",
    startRow: 12,
    startCol: 3,
    length: 6,
  },
  {
    id: 17,
    word: "NACION",
    clue: "Comunidad política organizada",
    direction: "horizontal",
    startRow: 6,
    startCol: 15,
    length: 6,
  },
  {
    id: 18,
    word: "LIBERTAD",
    clue: "Valor fundamental que se defiende",
    direction: "vertical",
    startRow: 8,
    startCol: 9,
    length: 8,
  },
  {
    id: 19,
    word: "INDEPENDENCIA",
    clue: "Autonomía política y territorial",
    direction: "horizontal",
    startRow: 1,
    startCol: 1,
    length: 13,
  },
  {
    id: 20,
    word: "HEROISMO",
    clue: "Valor y coraje en la defensa",
    direction: "vertical",
    startRow: 13,
    startCol: 16,
    length: 8,
  },
  {
    id: 21,
    word: "GUARDIA",
    clue: "Servicio de vigilancia y protección",
    direction: "horizontal",
    startRow: 4,
    startCol: 6,
    length: 7,
  },
  {
    id: 22,
    word: "OFICIAL",
    clue: "Miembro del cuerpo de mando militar",
    direction: "vertical",
    startRow: 15,
    startCol: 11,
    length: 7,
  },
  {
    id: 23,
    word: "DISCIPLINA",
    clue: "Orden y obediencia militar",
    direction: "horizontal",
    startRow: 12,
    startCol: 8,
    length: 10,
  },
  {
    id: 24,
    word: "HONOR",
    clue: "Valor moral del militar",
    direction: "vertical",
    startRow: 7,
    startCol: 19,
    length: 5,
  },
]

export default function Component() {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill("")),
  )
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set())
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [authorName, setAuthorName] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)

  // Crear la estructura del crucigrama
  const createCrosswordStructure = () => {
    const structure = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(false))

    WORDS.forEach((word) => {
      for (let i = 0; i < word.length; i++) {
        if (word.direction === "horizontal") {
          if (word.startCol + i < GRID_SIZE) {
            structure[word.startRow][word.startCol + i] = true
          }
        } else {
          if (word.startRow + i < GRID_SIZE) {
            structure[word.startRow + i][word.startCol] = true
          }
        }
      }
    })

    return structure
  }

  const structure = createCrosswordStructure()

  // Verificar si una palabra está completa
  const checkWordCompletion = (wordData: (typeof WORDS)[0]) => {
    let wordFromGrid = ""

    for (let i = 0; i < wordData.length; i++) {
      if (wordData.direction === "horizontal") {
        if (wordData.startCol + i < GRID_SIZE) {
          wordFromGrid += grid[wordData.startRow][wordData.startCol + i]
        }
      } else {
        if (wordData.startRow + i < GRID_SIZE) {
          wordFromGrid += grid[wordData.startRow + i][wordData.startCol]
        }
      }
    }

    return wordFromGrid.toUpperCase() === wordData.word
  }

  // Actualizar palabras completadas
  useEffect(() => {
    const newCompletedWords = new Set<number>()
    WORDS.forEach((word) => {
      if (checkWordCompletion(word)) {
        newCompletedWords.add(word.id)
      }
    })
    setCompletedWords(newCompletedWords)
  }, [grid])

  // Manejar entrada de texto
  const handleCellChange = (row: number, col: number, value: string) => {
    if (value.length > 1) return

    const newGrid = [...grid]
    newGrid[row][col] = value.toUpperCase()
    setGrid(newGrid)
  }

  // Reiniciar crucigrama
  const resetCrossword = () => {
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill("")),
    )
    setCompletedWords(new Set())
    setSelectedCell(null)
  }

  // Obtener número de palabra para una celda
  const getWordNumber = (row: number, col: number) => {
    const word = WORDS.find((w) => w.startRow === row && w.startCol === col)
    return word?.id
  }

  // Generar PDF
  const generatePDF = () => {
    if (!authorName.trim()) {
      setShowNameInput(true)
      return
    }

    // Crear contenido HTML para el PDF
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Crucigrama: Defensa Nacional de Cuba</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            background: white;
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
          }
          .author { 
            color: #059669; 
            font-size: 18px; 
            font-weight: bold; 
            margin-top: 15px;
          }
          .grid-container { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 30px; 
          }
          .crossword-grid { 
            border: 2px solid #334155; 
            display: inline-block; 
          }
          .grid-row { 
            display: flex; 
          }
          .grid-cell { 
            width: 25px; 
            height: 25px; 
            border: 1px solid #cbd5e1; 
            position: relative; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-weight: bold; 
            font-size: 12px;
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
            font-size: 8px; 
            color: #3b82f6; 
            font-weight: bold; 
          }
          .clues-container { 
            width: 45%; 
            margin-left: 20px; 
          }
          .clues-section { 
            margin-bottom: 25px; 
          }
          .clues-title { 
            font-size: 16px; 
            font-weight: bold; 
            color: #1e40af; 
            margin-bottom: 10px; 
            border-bottom: 1px solid #e2e8f0; 
            padding-bottom: 5px; 
          }
          .clue-item { 
            display: flex; 
            margin-bottom: 8px; 
            font-size: 12px; 
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
          .clue-text { 
            color: #374151; 
            line-height: 1.4; 
          }
          .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 2px solid #e2e8f0; 
            color: #64748b; 
            font-size: 12px; 
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🇨🇺 Crucigrama: Defensa Nacional de Cuba</h1>
          <p>Crucigrama educativo con 24 términos sobre la defensa nacional cubana</p>
          <div class="author">Elaborado por: ${authorName}</div>
        </div>
        
        <div class="grid-container">
          <div class="crossword-grid">
            ${Array.from(
              { length: GRID_SIZE },
              (_, rowIndex) => `
              <div class="grid-row">
                ${Array.from({ length: GRID_SIZE }, (_, colIndex) => {
                  const isActive = structure[rowIndex][colIndex]
                  const wordNumber = getWordNumber(rowIndex, colIndex)
                  const cellValue = grid[rowIndex][colIndex]

                  return `
                    <div class="grid-cell ${isActive ? "active" : "inactive"}">
                      ${wordNumber ? `<span class="cell-number">${wordNumber}</span>` : ""}
                      ${isActive ? cellValue : ""}
                    </div>
                  `
                }).join("")}
              </div>
            `,
            ).join("")}
          </div>
          
          <div class="clues-container">
            <div class="clues-section">
              <h3 class="clues-title">Horizontales →</h3>
              ${WORDS.filter((w) => w.direction === "horizontal")
                .map(
                  (word) => `
                <div class="clue-item">
                  <div class="clue-number">${word.id}</div>
                  <div class="clue-text">${word.clue}</div>
                </div>
              `,
                )
                .join("")}
            </div>
            
            <div class="clues-section">
              <h3 class="clues-title">Verticales ↓</h3>
              ${WORDS.filter((w) => w.direction === "vertical")
                .map(
                  (word) => `
                <div class="clue-item">
                  <div class="clue-number">${word.id}</div>
                  <div class="clue-text">${word.clue}</div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Crucigrama sobre Defensa Nacional de Cuba - ${new Date().toLocaleDateString()}</p>
          <p>Total de palabras: 24 | Completadas: ${completedWords.size}</p>
        </div>
      </body>
      </html>
    `

    // Crear ventana para imprimir
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()

      // Esperar a que se cargue y luego imprimir
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }

  const horizontalClues = WORDS.filter((w) => w.direction === "horizontal")
  const verticalClues = WORDS.filter((w) => w.direction === "vertical")
  const completionPercentage = Math.round((completedWords.size / WORDS.length) * 100)

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-800">🇨🇺 Crucigrama: Defensa Nacional de Cuba</CardTitle>
          <CardDescription className="text-lg">
            Crucigrama completo con 24 términos sobre la defensa nacional cubana
          </CardDescription>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Progreso: {completedWords.size}/{WORDS.length} ({completionPercentage}%)
            </Badge>
            {completedWords.size === WORDS.length && (
              <Badge variant="default" className="text-lg px-4 py-2 bg-green-600">
                <Trophy className="w-4 h-4 mr-2" />
                ¡Completado!
              </Badge>
            )}
            <Button onClick={resetCrossword} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
            <Button
              onClick={() => setShowNameInput(true)}
              variant="default"
              size="sm"
              className="bg-red-600 hover:bg-red-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generar PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showNameInput && (
            <Card className="mb-6 border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Generar PDF del Crucigrama</CardTitle>
                <CardDescription>Ingresa tu nombre para incluirlo en el PDF del crucigrama</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="author-name">Tu nombre completo:</Label>
                    <Input
                      id="author-name"
                      type="text"
                      placeholder="Ej: María García Rodríguez"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={generatePDF}
                    disabled={!authorName.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Crear PDF
                  </Button>
                  <Button onClick={() => setShowNameInput(false)} variant="outline">
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Crucigrama */}
            <div className="xl:col-span-3">
              <div className="inline-block border-2 border-gray-300 bg-white overflow-auto max-w-full">
                <div className="min-w-max">
                  {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {row.map((cell, colIndex) => {
                        const isActive = structure[rowIndex][colIndex]
                        const wordNumber = getWordNumber(rowIndex, colIndex)
                        const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex

                        return (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`
                              w-7 h-7 border border-gray-200 relative flex items-center justify-center text-xs font-medium
                              ${isActive ? "bg-white cursor-text hover:bg-blue-50" : "bg-gray-800"}
                              ${isSelected ? "ring-2 ring-blue-500" : ""}
                            `}
                            onClick={() => isActive && setSelectedCell({ row: rowIndex, col: colIndex })}
                          >
                            {isActive && (
                              <>
                                {wordNumber && (
                                  <span className="absolute top-0 left-0 text-[10px] text-blue-600 font-bold leading-none">
                                    {wordNumber}
                                  </span>
                                )}
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                                  className="w-full h-full text-center border-none outline-none bg-transparent text-black font-bold text-xs"
                                  maxLength={1}
                                  onFocus={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                                />
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pistas */}
            <div className="space-y-6 max-h-[600px] overflow-y-auto">
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center text-blue-700">
                  Horizontales →
                  <Badge variant="outline" className="ml-2">
                    {horizontalClues.filter((w) => completedWords.has(w.id)).length}/{horizontalClues.length}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {horizontalClues.map((word) => (
                    <div key={word.id} className="flex items-start gap-3">
                      <Badge
                        variant={completedWords.has(word.id) ? "default" : "outline"}
                        className="min-w-[28px] h-7 flex items-center justify-center text-sm"
                      >
                        {completedWords.has(word.id) ? <CheckCircle className="w-3 h-3" /> : word.id}
                      </Badge>
                      <p
                        className={`text-sm leading-relaxed ${completedWords.has(word.id) ? "text-green-700 font-medium line-through" : ""}`}
                      >
                        {word.clue}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center text-blue-700">
                  Verticales ↓
                  <Badge variant="outline" className="ml-2">
                    {verticalClues.filter((w) => completedWords.has(w.id)).length}/{verticalClues.length}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {verticalClues.map((word) => (
                    <div key={word.id} className="flex items-start gap-3">
                      <Badge
                        variant={completedWords.has(word.id) ? "default" : "outline"}
                        className="min-w-[28px] h-7 flex items-center justify-center text-sm"
                      >
                        {completedWords.has(word.id) ? <CheckCircle className="w-3 h-3" /> : word.id}
                      </Badge>
                      <p
                        className={`text-sm leading-relaxed ${completedWords.has(word.id) ? "text-green-700 font-medium line-through" : ""}`}
                      >
                        {word.clue}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {completedWords.size === WORDS.length && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg text-center">
                  <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">¡Excelente trabajo!</h3>
                  <p className="text-green-700">
                    Has completado exitosamente el crucigrama sobre la defensa nacional de Cuba
                  </p>
                  <p className="text-sm text-gray-600 mt-2">24/24 palabras completadas</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
