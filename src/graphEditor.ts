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
        const mouse = new Point(event.offsetX, event.offsetY)
        if (this.hovered) {
          this.selectPoint(this.hovered)
          this.dragging = true
          return
        }
        this.graph.tryAddPoint(mouse)

        this.selectPoint(mouse)
        this.hovered = mouse
      }
    })

    this.canvas.addEventListener('mousemove', (event) => {
      const mouse = new Point(event.offsetX, event.offsetY)
      this.hovered = getNearestPoint(mouse, this.graph.points, 10)

      if (this.dragging && this.selected) {
        this.selected.x = mouse.x
        this.selected.y = mouse.y
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
