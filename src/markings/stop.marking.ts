import type Point from '../primitives/point'
import Segment from '../primitives/segment'
import { angle } from '../utils'
import Marking from './base.marking'

class Stop extends Marking {
  border: Segment // use by cars to detect the stop

  constructor(center: Point, directionVector: Point, width: number, height: number) {
    super(center, directionVector, width, height)

    this.border = this.poly.segments[2] // segments[2] is the top segment
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.border.draw(ctx, { color: 'white', width: 5 })
    ctx.save()
    ctx.translate(this.center.x, this.center.y)
    ctx.rotate(angle(this.directionVector) - Math.PI / 2)
    ctx.scale(1, 3)
    ctx.beginPath()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'white'
    ctx.font = `bold ${this.height * 0.3}px Arial`
    ctx.fillText('STOP', 0, 1)
    ctx.restore()
  }
}

export default Stop
