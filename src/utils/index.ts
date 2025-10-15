import Point from '../primitives/point'
import type Segment from '../primitives/segment'
import type { Intersection } from '../types'

export function getNearestPoint(loc: Point, points: Point[], threshold = Number.MAX_SAFE_INTEGER) {
  let minDist = Number.MAX_SAFE_INTEGER
  let nearest = null
  for (const point of points) {
    const dist = distance(point, loc)
    if (dist < minDist && dist < threshold) {
      minDist = dist
      nearest = point
    }
  }
  return nearest
}

export function getNearestSegment(
  loc: Point,
  segments: Segment[],
  threshold = Number.MAX_SAFE_INTEGER
): Segment | null {
  let minDist = Number.MAX_SAFE_INTEGER
  let nearest = null
  for (const seg of segments) {
    const dist = seg.distanceToPoint(loc)
    if (dist < minDist && dist < threshold) {
      minDist = dist
      nearest = seg
    }
  }
  return nearest
}

export function distance(p1: Point, p2: Point): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

export function average(p1: Point, p2: Point): Point {
  return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
}

export function add(p1: Point, p2: Point): Point {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

export function dot(p1: Point, p2: Point): number {
  return p1.x * p2.x + p1.y * p2.y
}

export function subtract(p1: Point, p2: Point): Point {
  return new Point(p1.x - p2.x, p1.y - p2.y)
}

export function scale(p: Point, factor: number): Point {
  return new Point(p.x * factor, p.y * factor)
}

export function translate(p: Point, angle: number, distance: number): Point {
  return new Point(p.x + Math.cos(angle) * distance, p.y + Math.sin(angle) * distance)
}

export function angle(point: Point): number {
  return Math.atan2(point.y, point.x)
}

export function getIntersection(A: Point, B: Point, C: Point, D: Point): Intersection | null {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)

  const eps = 0.001

  if (Math.abs(bottom) > eps) {
    const t = tTop / bottom
    const u = uTop / bottom
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
      }
    }
  }

  return null
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function lerp2D(p1: Point, p2: Point, t: number): Point {
  return new Point(lerp(p1.x, p2.x, t), lerp(p1.y, p2.y, t))
}

export function getRandomColor(): string {
  const hue = 290 + Math.random() * 260
  return 'hsl(' + hue + ', 100%, 60%)'
}

export function normalize(p: Point): Point {
  return scale(p, 1 / magnitude(p))
}

export function magnitude(p: Point): number {
  return Math.hypot(p.x, p.y)
}

export function getFake3dPoint(point: Point, viewPoint: Point, height: number): Point {
  const dir = normalize(subtract(point, viewPoint))
  const dist = distance(point, viewPoint)
  const scaler = Math.atan(dist / 900) / (Math.PI / 2)
  return add(point, scale(dir, height * scaler))
}

export function perpendicular(p: Point): Point {
  return new Point(-p.y, p.x)
}
