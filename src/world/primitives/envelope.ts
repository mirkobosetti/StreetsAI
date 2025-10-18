import { angle, subtract, translate } from '../utils'
import type { drawOptions } from '../types'
import Polygon from './polygon'
import Segment from './segment'

class Envelope {
  skeleton: Segment | null
  poly: Polygon | null

  constructor(skeleton?: Segment, width?: number, roundness = 1) {
    if (skeleton && width) {
      this.skeleton = skeleton
      this.poly = this.generatePolygon(width, roundness)
    } else {
      this.skeleton = null
      this.poly = null
    }
  }

  static load(info: Envelope) {
    if (!info.skeleton || !info.poly) return new Envelope()

    const env = new Envelope()
    env.skeleton = new Segment(info.skeleton.p1, info.skeleton.p2)
    env.poly = Polygon.load(info.poly)
    return env
  }

  draw(ctx: CanvasRenderingContext2D, options?: drawOptions) {
    this.poly!.draw(ctx, options)
  }

  private generatePolygon(width: number, roundness: number): Polygon {
    const { p1, p2 } = this.skeleton!

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
