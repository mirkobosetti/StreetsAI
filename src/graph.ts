import Point from './primitives/point'
import Segment from './primitives/segment'

class Graph {
  points: Point[]
  segments: Segment[]

  constructor(points: Point[], segments: Segment[]) {
    this.points = points
    this.segments = segments
  }

  static load(info: {
    points: { x: number; y: number }[]
    segments: { p1: { x: number; y: number }; p2: { x: number; y: number } }[]
  }) {
    const points = info.points.map((p) => new Point(p.x, p.y))
    const segments = info.segments.map(
      (s) =>
        new Segment(
          points.find((p) => p.equals(s.p1 as Point)) as Point,
          points.find((p) => p.equals(s.p2 as Point)) as Point
        )
    )

    return new Graph(points, segments)
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

  removePoint(point: Point) {
    const segmentsToRemove = this.getSegmentsWithPoint(point)
    for (const segment of segmentsToRemove) {
      this.removeSegment(segment)
    }

    this.points.splice(this.points.indexOf(point), 1)
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

  getSegmentsWithPoint(point: Point): Segment[] {
    const s = []
    for (const segment of this.segments) {
      if (segment.includes(point)) {
        s.push(segment)
      }
    }
    return s
  }

  dispose() {
    this.points.length = 0
    this.segments.length = 0
  }

  hash = (): string => JSON.stringify(this)
}

export default Graph
