import Point from '../primitives/point'
import Polygon from '../primitives/polygon'
import { add, lerp, lerp2D, scale, subtract, translate } from '../utils'

class Tree {
  center: Point
  size: number
  heightCoef: number
  base: Polygon

  constructor(center: Point, size: number, heightCoef = 0.3) {
    this.center = center
    this.size = size
    this.heightCoef = heightCoef
    this.base = this.generateLevel(this.center, this.size)
  }

  draw(ctx: CanvasRenderingContext2D, viewPoint: Point) {
    if (!ctx) return

    const diff = subtract(this.center, viewPoint)

    const top = add(this.center, scale(diff, this.heightCoef))

    const levelCount = 7
    for (let level = 0; level < levelCount; level++) {
      const t = level / (levelCount - 1)
      const point = lerp2D(this.center, top, t)
      const color = `rgb(30,${lerp(50, 200, t)}, 70)`
      const size = lerp(this.size, 40, t)
      const poly = this.generateLevel(point, size)
      poly.draw(ctx, { fill: color, stroke: 'transparent' })
    }

    // debug colliders
    // this.base.draw(ctx, { fill: 'rgba(30, 50, 70, 0.38)', stroke: 'red' })
  }

  private generateLevel(point: Point, size: number): Polygon {
    const points = []
    const rad = size / 2
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
      const kindOfRandom = Math.cos(((a + this.center.x) * size) % 17) ** 2
      const noisyRadius = rad * lerp(0.5, 1, kindOfRandom)
      points.push(translate(point, a, noisyRadius))
    }
    return new Polygon(points)
  }
}

export default Tree
