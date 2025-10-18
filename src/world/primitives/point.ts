import type { drawOptions } from '../types'

class Point {
  x: number
  y: number
  id?: string

  constructor(x: number, y: number, id?: string) {
    this.x = x
    this.y = y
    if (id) this.id = id
  }

  draw(ctx: CanvasRenderingContext2D, options?: drawOptions) {
    const radius = options?.size ? options.size / 2 : 9
    ctx.beginPath()
    ctx.fillStyle = options?.color ?? 'black'
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fill()
    if (options?.outline) {
      ctx.beginPath()
      ctx.strokeStyle = 'yellow'
      ctx.lineWidth = 2
      ctx.arc(this.x, this.y, radius * 0.6, 0, Math.PI * 2)
      ctx.stroke()
    }
    if (options?.fill) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, radius * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = 'yellow'
      ctx.fill()
    }
    // ctx.closePath()
  }

  equals(point: Point) {
    return this.x === point.x && this.y === point.y
  }
}

export default Point
