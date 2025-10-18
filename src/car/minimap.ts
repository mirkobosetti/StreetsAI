import type Graph from '../world/graph'
import Point from '../world/primitives/point'
import { scale } from '../world/utils'

class Minimap {
  private canvas: HTMLCanvasElement
  private graph: Graph
  private size: number
  private ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement, graph: Graph, size: number) {
    this.canvas = canvas
    this.graph = graph
    this.size = size
    this.canvas.width = this.size
    this.canvas.height = this.size
    this.ctx = this.canvas.getContext('2d')!
  }

  public update(viewPoint: Point) {
    this.ctx.clearRect(0, 0, this.size, this.size)

    const scaler = 0.05
    const scaledViewPoint = scale(viewPoint, scaler)

    this.ctx.save()
    this.ctx.translate(scaledViewPoint.x + this.size / 2, scaledViewPoint.y + this.size / 2)
    this.ctx.scale(scaler, scaler)

    for (const segment of this.graph.segments) {
      segment.draw(this.ctx, { width: 3 / scaler, color: 'white' })
    }

    this.ctx.restore()

    new Point(this.size / 2, this.size / 2).draw(this.ctx, { color: 'red', outline: true })
  }
}

export default Minimap
