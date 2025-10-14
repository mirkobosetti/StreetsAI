import type Graph from './graph/graph'
import { getNearestPoint } from './graph/utils'
import Point from './primitives/point'
import Segment from './primitives/segment'

class GraphEditor {
  graph: Graph
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  selected: Point | null = null
  hovered: Point | null = null
  dragging: boolean = false
  mouse: Point = new Point(0, 0)

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

    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true })
    }

    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] }, 1)
      this.selected.draw(this.ctx, { outline: true })
    }
  }

  private addEventListeners() {
    this.canvas.addEventListener('mousedown', (event) => {
      if (event.button == 2) {
        if (this.hovered) {
          this.removePoint(this.hovered)
          this.hovered = null
        } else {
          this.selected = null
        }
      } else if (event.button == 0) {
        if (this.hovered) {
          this.selectPoint(this.hovered)
          this.dragging = true
          return
        }
        this.graph.tryAddPoint(this.mouse)

        this.selectPoint(this.mouse)
        this.hovered = this.mouse
      }
    })

    this.canvas.addEventListener('mousemove', (event) => {
      this.mouse = new Point(event.offsetX, event.offsetY)
      this.hovered = getNearestPoint(this.mouse, this.graph.points, 10)

      if (this.dragging && this.selected) {
        this.selected.x = this.mouse.x
        this.selected.y = this.mouse.y
      }
    })

    this.canvas.addEventListener('mouseup', () => {
      this.dragging = false
    })

    this.canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault()
    })
  }

  private selectPoint(point: Point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point))
    }

    this.selected = point
  }

  private removePoint(point: Point) {
    this.graph.removePoint(point)
    if (this.selected && this.selected.equals(point)) {
      this.selected = null
    }
    if (this.hovered && this.hovered.equals(point)) {
      this.hovered = null
    }
  }
}

export default GraphEditor
