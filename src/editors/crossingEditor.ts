import Crossing from '../markings/crossing'
import Point from '../primitives/point'
import { getNearestSegment } from '../utils'
import type Viewport from '../viewport'
import type World from '../world'

class CrossingEditor {
  world: World
  viewport: Viewport
  enabled: boolean = false
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  intent: Crossing | null = null
  mouse: Point = new Point(0, 0)
  markings: Crossing[] = []

  private boundMouseDown!: (event: MouseEvent) => void
  private boundMouseMove!: (event: MouseEvent) => void
  private boundContextMenu!: (event: MouseEvent) => void

  constructor(world: World, viewport: Viewport) {
    this.world = world
    this.viewport = viewport
    this.canvas = viewport.canvas
    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('Could not get canvas context')
    this.ctx = context
    this.markings = world.markings
  }

  display() {
    if (this.intent) {
      this.intent.draw(this.ctx)
    }
  }

  enable() {
    this.addEventListeners()
  }

  disable() {
    this.removeEventListeners()
  }

  private addEventListeners() {
    this.boundMouseDown = this.handleMouseDown.bind(this)
    this.boundMouseMove = this.handleMouseMove.bind(this)
    this.boundContextMenu = this.handleContextMenu.bind(this)
    this.canvas.addEventListener('mousedown', this.boundMouseDown)
    this.canvas.addEventListener('mousemove', this.boundMouseMove)
    this.canvas.addEventListener('contextmenu', this.boundContextMenu)
  }

  private removeEventListeners() {
    this.canvas.removeEventListener('mousedown', this.boundMouseDown)
    this.canvas.removeEventListener('mousemove', this.boundMouseMove)
    this.canvas.removeEventListener('contextmenu', this.boundContextMenu)
  }

  private handleMouseDown(event: MouseEvent) {
    if (event.button == 0) {
      // left click
      if (this.intent) {
        this.markings.push(this.intent)
        this.intent = null
      }
    }
    if (event.button == 2) {
      // right click
      for (let i = 0; i < this.markings.length; i++) {
        const poly = this.markings[i].poly
        if (poly.containsPoint(this.mouse)) {
          this.markings.splice(i, 1)
          return
        }
      }
    }
  }

  private handleMouseMove(event: MouseEvent) {
    this.mouse = this.viewport.getMouse(event, true)
    const segment = getNearestSegment(
      this.mouse,
      this.world.graph.segments,
      10 * this.viewport.zoom
    )

    if (!segment) {
      this.intent = null
      return
    }

    const project = segment.projectPoint(this.mouse)
    if (project.offset >= 0 && project.offset <= 1) {
      this.intent = new Crossing(
        project.point,
        segment.directionVector(),
        this.world.roadOptions.width,
        this.world.roadOptions.width / 2
      )
    } else {
      this.intent = null
    }
  }

  private handleContextMenu(event: MouseEvent) {
    event.preventDefault()
  }
}

export default CrossingEditor
