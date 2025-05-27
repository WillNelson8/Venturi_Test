"use client"

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Cloud class
    class Cloud {
      x: number = 0
      y: number = 0
      width: number = 0
      height: number = 0
      speed: number = 0
      opacity: number = 0
      color: string = ''
      angle: number = 0
      points: { x: number; y: number }[] = []
      segments: number = 0
      noise: number = 0

      constructor() {
        if (!canvas) return
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.width = Math.random() * 400 + 300 // Wider clouds
        this.height = Math.random() * 120 + 80 // Taller clouds
        this.speed = Math.random() * 0.2 + 0.05 // Slower, more gentle movement
        this.opacity = Math.random() * 0.3 + 0.1 // More subtle opacity
        this.color = `rgba(255, 16, 240, ${this.opacity})`
        this.angle = Math.random() * Math.PI * 2
        this.segments = Math.floor(Math.random() * 3) + 3 // 3-5 segments per cloud
        this.noise = Math.random() * 0.2 + 0.1 // Random noise for organic feel
        this.points = this.generatePoints()
      }

      generatePoints() {
        const points = []
        const numPoints = 20 // More points for smoother curves
        const segmentWidth = this.width / this.segments

        for (let segment = 0; segment < this.segments; segment++) {
          const segmentStart = segment * segmentWidth
          const segmentEnd = (segment + 1) * segmentWidth
          
          for (let i = 0; i < numPoints; i++) {
            const t = i / (numPoints - 1)
            const x = segmentStart + t * segmentWidth
            const baseY = Math.sin(t * Math.PI * 2) * this.height * 0.3
            const noise = Math.sin(t * Math.PI * 4 + segment) * this.noise * this.height
            points.push({
              x,
              y: baseY + noise
            })
          }
        }
        return points
      }

      update() {
        if (!canvas) return
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Wrap around screen
        if (this.x > canvas.width + this.width) this.x = -this.width
        if (this.x < -this.width) this.x = canvas.width + this.width
        if (this.y > canvas.height + this.height) this.y = -this.height
        if (this.y < -this.height) this.y = canvas.height + this.height

        // Subtle vertical movement
        this.y += Math.sin(Date.now() * 0.001) * 0.1
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        // Create gradient with softer edges
        const gradient = ctx.createLinearGradient(0, -this.height / 2, 0, this.height / 2)
        gradient.addColorStop(0, 'rgba(255, 16, 240, 0)')
        gradient.addColorStop(0.3, this.color)
        gradient.addColorStop(0.7, this.color)
        gradient.addColorStop(1, 'rgba(255, 16, 240, 0)')

        // Draw cloud segments
        for (let segment = 0; segment < this.segments; segment++) {
          const segmentStart = segment * (this.width / this.segments)
          const segmentEnd = (segment + 1) * (this.width / this.segments)
          const segmentPoints = this.points.filter(p => p.x >= segmentStart && p.x <= segmentEnd)

          ctx.beginPath()
          ctx.moveTo(segmentPoints[0].x, segmentPoints[0].y)
          
          for (let i = 1; i < segmentPoints.length; i++) {
            const xc = (segmentPoints[i].x + segmentPoints[i - 1].x) / 2
            const yc = (segmentPoints[i].y + segmentPoints[i - 1].y) / 2
            ctx.quadraticCurveTo(segmentPoints[i - 1].x, segmentPoints[i - 1].y, xc, yc)
          }

          ctx.strokeStyle = gradient
          ctx.lineWidth = this.height
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.stroke()
        }

        ctx.restore()
      }
    }

    // Create clouds
    const clouds: Cloud[] = []
    for (let i = 0; i < 15; i++) { // Fewer, larger clouds
      clouds.push(new Cloud())
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw clouds
      clouds.forEach(cloud => {
        cloud.update()
        cloud.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.3 }} // Adjusted for softer look
    />
  )
} 