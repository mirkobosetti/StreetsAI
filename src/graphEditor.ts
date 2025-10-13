import type Graph from './graph/graph'
import { getNearestPoint } from './graph/utils'
import Point from './primitives/point'

class GraphEditor {
  graph: Graph
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  selected: Point | null = null
  hovered: Point | null = null

  constructor(graph: Graph, canvas: HTMLCanvasElement) {
    this.graph = graph
    this.canvas = canvas
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not get canvas context')
    this.ctx = context

    this.addEventListeners()
  }

  display() {
    this.graph.draw(this.ctx)

    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true })
    }
  }

  private addEventListeners() {
    this.canvas.addEventListener('mousedown', (event) => {
      const mouse = new Point(event.offsetX, event.offsetY)
      this.hovered = getNearestPoint(mouse, this.graph.points, 10)
      if (this.hovered) {
        this.selected = this.hovered
        return
      }
      this.graph.tryAddPoint(mouse)
      this.selected = mouse
    })
  }
}

export default GraphEditor
