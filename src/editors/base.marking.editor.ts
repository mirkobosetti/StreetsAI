import type Marking from '../markings/base.marking'
import Point from '../primitives/point'
import type Segment from '../primitives/segment'
import { MOUSE, type Editor } from '../types'
import { getNearestSegment } from '../utils'
import type Viewport from '../viewport'
import type World from '../world'

class MarkingEditor implements Editor {
  world: World
  viewport: Viewport
  enabled: boolean = false
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  intent: Marking | null = null
  mouse: Point = new Point(0, 0)
  markings: Marking[] = []
  targetSegments: Segment[]

  private boundMouseDown!: (event: MouseEvent) => void
  private boundMouseMove!: (event: MouseEvent) => void
  private boundContextMenu!: (event: MouseEvent) => void

  constructor(world: World, viewport: Viewport, targetSegments: Segment[]) {
    this.world = world
    this.viewport = viewport
    this.canvas = viewport.canvas
    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('Could not get canvas context')
    this.ctx = context
    this.targetSegments = targetSegments
    this.markings = world.markings
  }

  createMarking(center: Point, _directionVector: Point): any {
    return center
  }

  /** Display the current intent marking */
  display() {
    if (this.intent) {
      this.intent.draw(this.ctx)
    }
  }

  /** Enable the marking editor */
  enable = () => this.addEventListeners()

  /** Disable the marking editor */
  disable = () => this.removeEventListeners()

  /** Add event listeners for the marking editor */
  private addEventListeners() {
    this.boundMouseDown = this.handleMouseDown.bind(this)
    this.boundMouseMove = this.handleMouseMove.bind(this)
    this.boundContextMenu = this.handleContextMenu.bind(this)
    this.canvas.addEventListener('mousedown', this.boundMouseDown)
    this.canvas.addEventListener('mousemove', this.boundMouseMove)
    this.canvas.addEventListener('contextmenu', this.boundContextMenu)
  }

  /** Remove event listeners for the marking editor */
  private removeEventListeners() {
    this.canvas.removeEventListener('mousedown', this.boundMouseDown)
    this.canvas.removeEventListener('mousemove', this.boundMouseMove)
    this.canvas.removeEventListener('contextmenu', this.boundContextMenu)
  }

  /** Handle mouse down events to place or remove markings */
  private handleMouseDown({ button }: MouseEvent) {
    if (button == MOUSE.LEFT) {
      if (this.intent) {
        this.markings.push(this.intent)
        this.intent = null
      }
    } else if (button == MOUSE.RIGHT) {
      for (let i = 0; i < this.markings.length; i++) {
        const poly = this.markings[i].poly
        if (poly.containsPoint(this.mouse)) {
          this.markings.splice(i, 1)
          return
        }
      }
    }
  }

  /** Handle mouse move events to update the current intent marking */
  private handleMouseMove(event: MouseEvent) {
    this.mouse = this.viewport.getMouse(event, true)
    const seg = getNearestSegment(this.mouse, this.targetSegments, 10 * this.viewport.zoom)
    if (seg) {
      const proj = seg.projectPoint(this.mouse)
      if (proj.offset >= 0 && proj.offset <= 1) {
        this.intent = this.createMarking(proj.point, seg.directionVector())
      } else {
        this.intent = null
      }
    } else {
      this.intent = null
    }
  }

  /** Handle context menu events to prevent default behavior */
  private handleContextMenu(event: MouseEvent) {
    event.preventDefault()
  }
}

export default MarkingEditor
