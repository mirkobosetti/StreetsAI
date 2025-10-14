import Point from './primitives/point'

class Viewport {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  zoom: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.zoom = 1

    this.addEventListeners()
  }

  getMouse(event: MouseEvent) {
    return new Point(event.offsetX * this.zoom, event.offsetY * this.zoom)
  }

  private addEventListeners() {
    this.canvas.addEventListener('wheel', (event) => this.handleWheel(event))
  }

  private handleWheel(event: WheelEvent) {
    const direction = Math.sign(event.deltaY)
    const step = 0.1
    this.zoom += direction * step
    this.zoom = Math.max(1, Math.min(this.zoom, 5))
  }
}

export default Viewport
