import type { drawOptions } from '../types'
import type Point from './point'

class Segment {
  p1: Point
  p2: Point

  constructor(p1: Point, p2: Point) {
    this.p1 = p1
    this.p2 = p2
  }

  draw(ctx: CanvasRenderingContext2D, options?: drawOptions) {
    ctx.beginPath()
    ctx.lineWidth = options?.width ?? 2
    ctx.strokeStyle = options?.color ?? 'transparent'
    ctx.setLineDash(options?.dash ?? [])
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
