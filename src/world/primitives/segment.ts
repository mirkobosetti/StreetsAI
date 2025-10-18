import type { drawOptions } from '../types'
import { add, distance, dot, magnitude, normalize, scale, subtract } from '../utils'
import type Point from './point'

class Segment {
  p1: Point
  p2: Point
  oneWay: boolean

  constructor(p1: Point, p2: Point, oneWay: boolean = false) {
    this.p1 = p1
    this.p2 = p2
    this.oneWay = oneWay
  }

  draw(ctx: CanvasRenderingContext2D, options?: drawOptions) {
    ctx.beginPath()
    ctx.lineWidth = options?.width ?? 2
    ctx.strokeStyle = options?.color ?? 'black'
    ctx.lineCap = options?.cap ?? 'butt'
    ctx.setLineDash(this.oneWay ? [4, 4] : options?.dash ?? [])
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
    ctx.stroke()
    ctx.setLineDash([])
  }

  distanceToPoint(point: Point): number {
    const proj = this.projectPoint(point)
    if (proj.offset > 0 && proj.offset < 1) {
      return distance(point, proj.point)
    }
    const distToP1 = distance(point, this.p1)
    const distToP2 = distance(point, this.p2)
    return Math.min(distToP1, distToP2)
  }

  projectPoint(point: Point): { point: Point; offset: number } {
    const a = subtract(point, this.p1)
    const b = subtract(this.p2, this.p1)
    const normB = normalize(b)
    const scaler = dot(a, normB)
    const proj = {
      point: add(this.p1, scale(normB, scaler)),
      offset: scaler / magnitude(b)
    }
    return proj
  }

  /** Get the direction vector of the segment */
  directionVector = () => normalize(subtract(this.p2, this.p1))

  /** Get the length of the segment */
  length = () => distance(this.p1, this.p2)

  /** Check if two segments are equal (i.e., have the same endpoints) */
  equals = (segment: Segment) => this.includes(segment.p1) && this.includes(segment.p2)

  /** Check if the segment includes the given point */
  includes = (point: Point) => this.p1.equals(point) || this.p2.equals(point)
}

export default Segment
