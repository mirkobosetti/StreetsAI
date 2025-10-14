import { add, scale, subtract } from './utils/utils'
import Point from './primitives/point'

class Viewport {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  zoom: number
  offset: Point
  drag: {
    start: Point
    end: Point
    offset: Point
    active: boolean
  }
  center: Point

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.zoom = 1
    this.center = new Point(canvas.width / 2, canvas.height / 2)
    this.offset = scale(this.center, -1)
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false
    }

    this.addEventListeners()
  }

  getMouse(event: MouseEvent, subtractOffset = false): Point {
    const mouse = new Point(
      (event.offsetX - this.center.x) * this.zoom - this.offset.x,
      (event.offsetY - this.center.y) * this.zoom - this.offset.y
    )
    return subtractOffset ? subtract(mouse, this.drag.offset) : mouse
  }

  getOffset() {
    return add(this.offset, this.drag.offset)
  }

  reset() {
    this.ctx.restore()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.save()
    this.ctx.translate(this.center.x, this.center.y)
    this.ctx.scale(1 / this.zoom, 1 / this.zoom)
    const offset = this.getOffset()
    this.ctx.translate(offset.x, offset.y)
  }

  private addEventListeners() {
    this.canvas.addEventListener('wheel', (event) => this.handleWheel(event))
    this.canvas.addEventListener('mousedown', (event) => this.handleMouseDown(event))
    this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event))
    this.canvas.addEventListener('mouseup', () => this.handleMouseUp())
  }

  private handleWheel(event: WheelEvent) {
    const direction = Math.sign(event.deltaY)
    const step = 0.1
    this.zoom += direction * step
    this.zoom = Math.max(1, Math.min(this.zoom, 5))
  }

  private handleMouseMove(event: MouseEvent) {
    if (!this.drag.active) return
    this.drag.end = this.getMouse(event)
    this.drag.offset = subtract(this.drag.end, this.drag.start)
  }

  private handleMouseUp() {
    if (!this.drag.active) return
    this.offset = add(this.offset, this.drag.offset)
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false
    }
  }

  private handleMouseDown(event: MouseEvent) {
    if (event.button !== 1) return
    this.drag.start = this.getMouse(event)
    this.drag.active = true
  }
}

export default Viewport
