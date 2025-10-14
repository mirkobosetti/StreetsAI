import Point from '../primitives/point'

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

export function add(p1: Point, p2: Point): Point {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

export function subtract(p1: Point, p2: Point): Point {
  return new Point(p1.x - p2.x, p1.y - p2.y)
}

export function scale(p: Point, factor: number): Point {
  return new Point(p.x * factor, p.y * factor)
}
