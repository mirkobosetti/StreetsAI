import Envelope from '../primitives/envelope'
import type Point from '../primitives/point'
import type Polygon from '../primitives/polygon'
import Segment from '../primitives/segment'
import { add, angle, perpendicular, scale, translate } from '../utils'

class Crossing {
  center: Point
  directionVector: Point
  width: number
  height: number
  support: Segment
  poly: Polygon
  borders: Segment[] // use by cars to detect the crossing

  constructor(center: Point, directionVector: Point, width: number, height: number) {
    this.center = center
    this.directionVector = directionVector
    this.width = width
    this.height = height
    this.support = new Segment(
      translate(center, angle(directionVector), height / 2),
      translate(center, angle(directionVector), -height / 2)
    )
    this.poly = new Envelope(this.support, width, 0).poly
    this.borders = [this.poly.segments[0], this.poly.segments[2]]
  }

  draw(ctx: CanvasRenderingContext2D) {
    const perp = perpendicular(this.directionVector)
    const line = new Segment(
      add(this.center, scale(perp, this.width / 2)),
      add(this.center, scale(perp, -this.width / 2))
    )
    ctx.save()
    ctx.translate(0, -5)
    line.draw(ctx, {
      width: this.height,
      color: 'white',
      dash: [10, 10]
    })
    ctx.restore()
  }
}

export default Crossing
