import Envelope from '../primitives/envelope'
import Point from '../primitives/point'
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
    this.poly = new Envelope(this.support, width, 0).poly!
  }

  static async load(info: any): Promise<Marking> {
    const point = new Point(info.center.x, info.center.y)
    const dir = new Point(info.directionVector.x, info.directionVector.y)
    switch (info.type) {
      case 'crossing': {
        const { default: Crossing } = await import('./crossing.marking')
        return new Crossing(point, dir, info.width, info.height)
      }
      case 'light': {
        const { default: Light } = await import('./light.marking')
        return new Light(point, dir, info.width)
      }
      case 'marking':
        return new Marking(point, dir, info.width, info.height)
      case 'parking': {
        const { default: Parking } = await import('./parking.marking')
        return new Parking(point, dir, info.width, info.height)
      }
      case 'start': {
        const { default: Start } = await import('./start.marking')
        return new Start(point, dir, info.width, info.height)
      }
      case 'stop': {
        const { default: Stop } = await import('./stop.marking')
        return new Stop(point, dir, info.width, info.height)
      }
      case 'target': {
        const { default: Target } = await import('./target.marking')
        return new Target(point, dir, info.width, info.height)
      }
      case 'yield': {
        const { default: Yield } = await import('./yield.marking')
        return new Yield(point, dir, info.width, info.height)
      }
      default:
        return new Marking(point, dir, info.width / 3, info.height / 3)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx)
  }
}

export default Marking
