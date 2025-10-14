import { angle, subtract, translate } from '../graph/utils'
import Polygon from './polygon'
import type Segment from './segment'

class Envelope {
  skeleton: Segment
  poly: Polygon

  constructor(skeleton: Segment, width: number, roundness = 1) {
    this.skeleton = skeleton
    this.poly = this.generatePolygon(width, roundness)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx, { stroke: 'red', fill: 'rgba(255,0,0,0.3)' })
  }

  private generatePolygon(width: number, roundness: number): Polygon {
    const { p1, p2 } = this.skeleton

    const radius = width / 2
    const alpha = angle(subtract(p1, p2))
    const alpha_cw = alpha + Math.PI / 2
    const alpha_ccw = alpha - Math.PI / 2

    const points = []
    const step = Math.PI / Math.max(1, roundness)
    const eps = step / 2 // to include the last point and preventing going over
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p1, i, radius))
    }
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p2, Math.PI + i, radius))
    }

    return new Polygon(points)
  }
}

export default Envelope
