import type Point from '../primitives/point'
import Segment from '../primitives/segment'
import { add, perpendicular, scale } from '../utils'
import Marking from './base.marking'

class Crossing extends Marking {
  borders: Segment[] // use by cars to detect the crossing

  constructor(center: Point, directionVector: Point, width: number, height: number) {
    super(center, directionVector, width, height)

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
