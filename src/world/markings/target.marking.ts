import type Point from '../primitives/point'
import Marking from './base.marking'

class Target extends Marking {
  type = 'target'

  constructor(center: Point, directionVector: Point, width: number, height: number) {
    super(center, directionVector, width, height)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.center.draw(ctx, { color: 'red', size: 30 })
    this.center.draw(ctx, { color: 'white', size: 20 })
    this.center.draw(ctx, { color: 'red', size: 10 })
  }
}

export default Target
