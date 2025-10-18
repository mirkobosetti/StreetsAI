import type Point from '../primitives/point'
import { angle } from '../utils'
import Marking from './base.marking'
import carImage from '../assets/car.png'

class Start extends Marking {
  image: HTMLImageElement
  type = 'start'

  constructor(center: Point, directionVector: Point, width: number, height: number) {
    super(center, directionVector, width, height)

    this.image = new Image()
    this.image.src = carImage
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.center.x, this.center.y)
    ctx.rotate(angle(this.directionVector) - Math.PI / 2)

    ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)

    ctx.restore()
  }
}

export default Start
