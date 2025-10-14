import type Point from '../primitives/point'
import Polygon from '../primitives/polygon'
import { add, scale, subtract } from '../utils/utils'

class Building {
  base: Polygon
  height: number

  constructor(poly: Polygon, height = 0.15) {
    this.base = poly
    this.height = height
  }

  draw(ctx: CanvasRenderingContext2D, viewPoint: Point) {
    const topPoints = this.base.points.map((p) =>
      add(p, scale(subtract(p, viewPoint), this.height))
    )
    const ceiling = new Polygon(topPoints)

    const sides = []
    for (let i = 0; i < this.base.points.length; i++) {
      const nextIndex = (i + 1) % this.base.points.length
      const poly = new Polygon([
        this.base.points[i],
        this.base.points[nextIndex],
        topPoints[nextIndex],
        topPoints[i]
      ])
      sides.push(poly)
    }

    sides.sort((a, b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint))

    this.base.draw(ctx, { fill: 'white', width: 4 })
    for (const side of sides) {
      side.draw(ctx, { fill: 'white', width: 4 })
    }
    ceiling.draw(ctx, { fill: 'white', width: 4 })
  }
}

export default Building
