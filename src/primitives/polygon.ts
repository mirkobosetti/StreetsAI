import { average, getIntersection, getRandomColor } from '../graph/utils'
import type { drawOptions } from '../types'
import Point from './point'
import Segment from './segment'

class Polygon {
  points: Point[]
  segments: Segment[]

  constructor(points: Point[]) {
    this.points = points
    this.segments = []

    for (let i = 1; i <= points.length; i++) {
      this.segments.push(new Segment(points[i - 1], points[i % points.length]))
    }
  }

  static union(polys: Polygon[]): Segment[] {
    Polygon.multiBreak(polys)
    const keptSegs: Segment[] = []

    for (let i = 0; i < polys.length; i++) {
      for (const seg of polys[i].segments) {
        let keep = true

        for (let j = 0; j < polys.length; j++) {
          if (i !== j) {
            if (polys[j].containsSegment(seg)) {
              keep = false
              break
            }
          }
        }

        if (keep) {
          keptSegs.push(seg)
        }
      }
    }

    return keptSegs
  }

  static break(poly1: Polygon, poly2: Polygon) {
    const segs1 = poly1.segments
    const segs2 = poly2.segments

    for (let i = 0; i < segs1.length; i++) {
      for (let j = 0; j < segs2.length; j++) {
        const int = getIntersection(segs1[i].p1, segs1[i].p2, segs2[j].p1, segs2[j].p2)
        if (int && int.offset != 1 && int.offset != 0) {
          const point = new Point(int.x, int.y)

          let aux = segs1[i].p2
          segs1[i].p2 = point
          segs1.splice(i + 1, 0, new Segment(point, aux))

          aux = segs2[j].p2
          segs2[j].p2 = point
          segs2.splice(j + 1, 0, new Segment(point, aux))
        }
      }
    }
  }

  static multiBreak(polygons: Polygon[]) {
    for (let i = 0; i < polygons.length - 1; i++) {
      for (let j = i + 1; j < polygons.length; j++) {
        Polygon.break(polygons[i], polygons[j])
      }
    }
  }

  containsSegment(seg: Segment): boolean {
    const midpoint = average(seg.p1, seg.p2)
    return this.containsPoint(midpoint)
  }

  containsPoint(p: Point): boolean {
    const outerPoint = new Point(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
    let intersections = 0

    for (const seg of this.segments) {
      const int = getIntersection(p, outerPoint, seg.p1, seg.p2)
      if (int) {
        intersections++
      }
    }

    return intersections % 2 == 1
  }

  drawSegments(ctx: CanvasRenderingContext2D) {
    for (const seg of this.segments) {
      seg.draw(ctx, { color: getRandomColor(), width: 5 })
    }
  }

  draw(ctx: CanvasRenderingContext2D, options?: drawOptions) {
    if (!ctx) return

    ctx.beginPath()

    ctx.fillStyle = options?.fill ?? 'rgba(0,0,255,0.3)'
    ctx.strokeStyle = options?.stroke ?? 'blue'
    ctx.lineWidth = options?.lineWidth ?? 2

    ctx.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
}

export default Polygon
