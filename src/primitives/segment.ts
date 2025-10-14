import type Point from './point'

class Segment {
  p1: Point
  p2: Point

  constructor(p1: Point, p2: Point) {
    this.p1 = p1
    this.p2 = p2
  }

  draw(
    ctx: CanvasRenderingContext2D,
    {
      color = 'black',
      lineWidth = 2,
      dash = []
    }: { color?: string; lineWidth?: number; dash?: [number, number] | [] } = {}
  ) {
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.setLineDash(dash)
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
    ctx.stroke()
    ctx.setLineDash([])
  }

  /** Check if two segments are equal (i.e., have the same endpoints) */
  equals = (segment: Segment) => this.includes(segment.p1) && this.includes(segment.p2)

  /** Check if the segment includes the given point */
  includes = (point: Point) => this.p1.equals(point) || this.p2.equals(point)
}

export default Segment
