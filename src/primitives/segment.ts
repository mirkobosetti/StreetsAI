import type Point from './point'

class Segment {
  p1: Point
  p2: Point

  constructor(p1: Point, p2: Point) {
    this.p1 = p1
    this.p2 = p2
  }

  draw(ctx: CanvasRenderingContext2D, color = 'black', lineWidth = 2) {
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
    ctx.stroke()
    // ctx.closePath()
  }
}

export default Segment
