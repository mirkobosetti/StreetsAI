import { angle, subtract, translate } from '../graph/utils'
import type Point from './point'
import Polygon from './polygon'
import type Segment from './segment'

class Envelope {
  skeleton: Segment
  poly: Polygon

  constructor(skeleton: Segment, width: number) {
    this.skeleton = skeleton
    this.poly = this.generatePolygon(width)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx, { stroke: 'red', fill: 'rgba(255,0,0,0.3)' })
  }

  private generatePolygon(width: number): Polygon {
    const { p1, p2 } = this.skeleton
    const radius = width / 2
    const alpha = angle(subtract(p1, p2))
    const alpha_cw = alpha + Math.PI / 2
    const alpha_ccw = alpha - Math.PI / 2

    const p1_ccw = translate(p1, alpha_ccw, radius)
    const p2_ccw = translate(p2, alpha_ccw, radius)

    const p1_cw = translate(p1, alpha_cw, radius)
    const p2_cw = translate(p2, alpha_cw, radius)

    return new Polygon([p1_ccw, p2_ccw, p2_cw, p1_cw])
  }
}

export default Envelope
