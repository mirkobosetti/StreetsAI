import Envelope from '../primitives/envelope'
import Point from '../primitives/point'
import type Polygon from '../primitives/polygon'
import Segment from '../primitives/segment'
import { angle, translate } from '../utils'
// import Crossing from './crossing.marking'
// import Light from './light.marking'
// import Parking from './parking.marking'
// import Start from './start.marking'
// import Stop from './stop.marking'
// import Target from './target.marking'
// import Yield from './yield.marking'

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

  // static load(info) {
  //   const point = new Point(info.center.x, info.center.y)
  //   const dir = new Point(info.directionVector.x, info.directionVector.y)
  //   switch (info.type) {
  //     case 'crossing':
  //       return new Crossing(point, dir, info.width, info.height)
  //     case 'light':
  //       return new Light(point, dir, info.width)
  //     case 'marking':
  //       return new Marking(point, dir, info.width, info.height)
  //     case 'parking':
  //       return new Parking(point, dir, info.width, info.height)
  //     case 'start':
  //       return new Start(point, dir, info.width, info.height)
  //     case 'stop':
  //       return new Stop(point, dir, info.width, info.height)
  //     case 'target':
  //       return new Target(point, dir, info.width, info.height)
  //     case 'yield':
  //       return new Yield(point, dir, info.width, info.height)
  //   }
  // }

  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx)
  }
}

export default Marking
