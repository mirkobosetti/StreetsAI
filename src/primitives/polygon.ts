import { average, getIntersection, getRandomColor } from '../utils/utils'
import type { drawOptions } from '../types'
import Point from './point'
import Segment from './segment'

class Polygon {
  points: Point[]
  segments: Segment[]

  /**
   * Creates a polygon from the given points.
   * @param points The points that define the polygon.
   */
  constructor(points: Point[]) {
    this.points = points
    this.segments = []

    for (let i = 1; i <= points.length; i++) {
      this.segments.push(new Segment(points[i - 1], points[i % points.length]))
    }
  }

  /**
   * Computes the union of multiple polygons, returning the outer segments only.
   * @param polys Array of polygons to compute the union of.
   * @returns Array of outer segments.
   */
  static union(polys: Polygon[]): Segment[] {
    Polygon.multiBreak(polys)
    const keptSegments = []
    for (let i = 0; i < polys.length; i++) {
      for (const seg of polys[i].segments) {
        let keep = true
        for (let j = 0; j < polys.length; j++) {
          if (i != j) {
            if (polys[j].containsSegment(seg)) {
              keep = false
              break
            }
          }
        }
        if (keep) {
          keptSegments.push(seg)
        }
      }
    }
    return keptSegments
  }

  /**
   * Breaks two polygons at their intersections.
   * @param poly1 The first polygon.
   * @param poly2 The second polygon.
   */
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

  /**
   * Breaks all polygons in the array at their intersections.
   * @param polys Array of polygons to break.
   */
  static multiBreak(polys: Polygon[]) {
    for (let i = 0; i < polys.length - 1; i++) {
      for (let j = i + 1; j < polys.length; j++) {
        Polygon.break(polys[i], polys[j])
      }
    }
  }

  /**
   * Checks if the polygon contains the given segment by testing its midpoint.
   * @param seg The segment to check.
   * @returns True if the polygon contains the segment, false otherwise.
   */
  containsSegment(seg: Segment): boolean {
    const midpoint = average(seg.p1, seg.p2)
    return this.containsPoint(midpoint)
  }

  /**
   * Checks if the polygon contains the given point.
   * @param point The point to check.
   * @returns True if the polygon contains the point, false otherwise.
   */
  containsPoint(point: Point): boolean {
    const outerPoint = new Point(-1000, -1000) // maxsafeint
    let intersectionCount = 0
    for (const seg of this.segments) {
      const int = getIntersection(outerPoint, point, seg.p1, seg.p2)
      if (int) {
        intersectionCount++
      }
    }
    return intersectionCount % 2 == 1
  }

  /**
   * Draws the segments of the polygon.
   * @param ctx The canvas rendering context.
   */
  drawSegments(ctx: CanvasRenderingContext2D) {
    for (const seg of this.segments) {
      seg.draw(ctx, { color: getRandomColor(), width: 5 })
    }
  }

  /**
   * Checks if this polygon intersects with another polygon.
   * @param poly The other polygon.
   * @returns True if the polygons intersect, false otherwise.
   */
  intersectsPoly(poly: Polygon): boolean {
    for (const seg1 of this.segments) {
      for (const seg2 of poly.segments) {
        if (getIntersection(seg1.p1, seg1.p2, seg2.p1, seg2.p2)) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Calculates the minimum distance from the polygon to a given point.
   * @param point The point to measure the distance to.
   * @returns The minimum distance from the polygon to the point.
   */
  distanceToPoint(point: Point): number {
    return Math.min(...this.segments.map((s) => s.distanceToPoint(point)))
  }

  /**
   * Calculates the minimum distance from the polygon to another polygon.
   * @param poly The other polygon.
   * @returns The minimum distance from this polygon to the other polygon.
   */
  distanceToPoly(poly: Polygon): number {
    return Math.min(...poly.points.map((p) => this.distanceToPoint(p)))
  }

  /**
   * Draws the polygon on the canvas.
   * @param ctx The canvas rendering context.
   * @param options The drawing options.
   */
  draw(ctx: CanvasRenderingContext2D, options?: drawOptions) {
    if (!ctx) return

    ctx.beginPath()

    ctx.fillStyle = options?.fill ?? 'rgba(0,0,255,0.3)'
    ctx.strokeStyle = options?.stroke ?? 'blue'
    ctx.lineWidth = options?.lineWidth ?? 2
    ctx.lineJoin = options?.join ?? 'miter'
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
