import Point from '../primitives/point'
import type { Intersection } from '../types'

export function getNearestPoint(
  mouse: Point,
  points: Point[],
  threshold = Number.MAX_SAFE_INTEGER
): Point | null {
  let nearestPoint: Point | null = null
  let minDistance = threshold

  for (const point of points) {
    const dist = distance(point, mouse)
    if (dist < minDistance) {
      minDistance = dist
      nearestPoint = point
    }
  }

  return nearestPoint
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
