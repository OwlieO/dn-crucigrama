// Sistema de efectos de confeti para celebración

function createConfetti() {
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"]
  const shapes = ["circle", "square", "triangle"]

  const confetti = document.createElement("div")
  const color = colors[Math.floor(Math.random() * colors.length)]
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  const size = Math.random() * 10 + 5

  // Posición inicial
  confetti.style.position = "fixed"
  confetti.style.left = Math.random() * 100 + "vw"
  confetti.style.top = "-10px"
  confetti.style.width = size + "px"
  confetti.style.height = size + "px"
  confetti.style.backgroundColor = color
  confetti.style.zIndex = "1000"
  confetti.style.pointerEvents = "none"

  // Forma del confeti
  switch (shape) {
    case "circle":
      confetti.style.borderRadius = "50%"
      break
    case "square":
      confetti.style.borderRadius = "0"
      break
    case "triangle":
      confetti.style.width = "0"
      confetti.style.height = "0"
      confetti.style.backgroundColor = "transparent"
      confetti.style.borderLeft = size / 2 + "px solid transparent"
      confetti.style.borderRight = size / 2 + "px solid transparent"
      confetti.style.borderBottom = size + "px solid " + color
      break
  }

  document.body.appendChild(confetti)

  // Animación de caída
  const fallDuration = Math.random() * 3000 + 2000 // 2-5 segundos
  const horizontalMovement = (Math.random() - 0.5) * 200 // Movimiento lateral
  const rotation = Math.random() * 720 // Rotación

  const animation = confetti.animate(
    [
      {
        transform: "translateY(0) translateX(0) rotate(0deg)",
        opacity: 1,
      },
      {
        transform: `translateY(100vh) translateX(${horizontalMovement}px) rotate(${rotation}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: fallDuration,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  )

  // Eliminar el confeti cuando termine la animación
  animation.onfinish = () => {
    if (confetti.parentNode) {
      confetti.remove()
    }
  }
}

// Crear múltiples confetis
function createConfettiBurst(count = 50) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createConfetti()
    }, i * 50) // Crear confetis con pequeño retraso entre ellos
  }
}

// Crear efecto de fuegos artificiales
function createFireworks() {
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"]

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const centerX = Math.random() * window.innerWidth
      const centerY = Math.random() * (window.innerHeight / 2) + 100

      // Crear explosión desde el centro
      for (let j = 0; j < 15; j++) {
        const firework = document.createElement("div")
        const color = colors[Math.floor(Math.random() * colors.length)]
        const angle = (j / 15) * Math.PI * 2
        const distance = Math.random() * 150 + 50

        firework.style.position = "fixed"
        firework.style.left = centerX + "px"
        firework.style.top = centerY + "px"
        firework.style.width = "4px"
        firework.style.height = "4px"
        firework.style.backgroundColor = color
        firework.style.borderRadius = "50%"
        firework.style.zIndex = "1000"
        firework.style.pointerEvents = "none"

        document.body.appendChild(firework)

        const endX = centerX + Math.cos(angle) * distance
        const endY = centerY + Math.sin(angle) * distance

        const animation = firework.animate(
          [
            {
              transform: "translate(0, 0) scale(1)",
              opacity: 1,
            },
            {
              transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
              opacity: 0,
            },
          ],
          {
            duration: 1000,
            easing: "ease-out",
          },
        )

        animation.onfinish = () => {
          if (firework.parentNode) {
            firework.remove()
          }
        }
      }
    }, i * 300)
  }
}

// Celebración completa
function celebrate() {
  console.log("¡Iniciando celebración!")

  // Confeti inicial
  createConfettiBurst(30)

  // Fuegos artificiales después de un momento
  setTimeout(() => {
    createFireworks()
  }, 500)

  // Más confeti
  setTimeout(() => {
    createConfettiBurst(20)
  }, 1500)
}

// Exportar funciones para uso global
window.createConfetti = createConfetti
window.createConfettiBurst = createConfettiBurst
window.createFireworks = createFireworks
window.celebrate = celebrate
