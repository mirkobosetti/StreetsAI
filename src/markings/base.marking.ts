import Envelope from '../primitives/envelope'
import type Point from '../primitives/point'
import type Polygon from '../primitives/polygon'
import Segment from '../primitives/segment'
import { angle, translate } from '../utils'

class Marking {
  center: Point
  directionVector: Point
  width: number
  height: number
  support: Segment
  poly: Polygon

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
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx)
  }
}

export default Marking
