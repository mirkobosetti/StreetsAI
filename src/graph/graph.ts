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
}

export default Graph
