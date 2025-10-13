import type Point from '../primitives/point'
import type Segment from '../primitives/segment'

class Graph {
  points: Point[]
  segments: Segment[]

  constructor(points: Point[], segments: Segment[]) {
    this.points = points
    this.segments = segments
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) return

    for (const segment of this.segments) {
      segment.draw(ctx)
    }

    for (const point of this.points) {
      point.draw(ctx)
    }
  }

  addPoint(point: Point) {
    this.points.push(point)
  }

  tryAddPoint(point: Point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point)
      return true
    }
    return false
  }

  containsPoint(point: Point): boolean {
    return this.points.some((p) => p.equals(point))
  }

  addSegment(segment: Segment) {
    this.segments.push(segment)
  }

  tryAddSegment(segment: Segment) {
    if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.addSegment(segment)
      return true
    }
    return false
  }

  removeSegment(segment: Segment) {
    this.segments.splice(this.segments.indexOf(segment), 1)
  }

  containsSegment(segment: Segment): boolean {
    return this.segments.some((s) => s.equals(segment))
  }
}

export default Graph
