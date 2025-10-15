import type Point from '../primitives/point'
import type Segment from '../primitives/segment'
import { angle } from '../utils'
import Marking from './base.marking'

class Yield extends Marking {
  border: Segment
  type = 'yield'

  constructor(center: Point, directionVector: Point, width: number, height: number) {
    super(center, directionVector, width, height)

    this.border = this.poly.segments[2]
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.border.draw(ctx, { width: 5, color: 'white' })
    ctx.save()
    ctx.translate(this.center.x, this.center.y)
    ctx.rotate(angle(this.directionVector) - Math.PI / 2)
    ctx.scale(1, 3)

    ctx.beginPath()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'white'
    ctx.font = 'bold ' + this.height * 0.3 + 'px Arial'
    ctx.fillText('YIELD', 0, 1)

    ctx.restore()
  }
}

export default Yield
