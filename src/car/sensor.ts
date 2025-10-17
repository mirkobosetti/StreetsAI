import { getIntersection, lerp } from './utils'

class Sensor {
  rayCount: number
  rayLength: number
  raySpread: number
  rays: { x: number; y: number }[][]
  readings: ({ x: number; y: number; offset: number } | null)[]
  constructor() {
    this.rayCount = 5
    this.rayLength = 150
    this.raySpread = Math.PI / 4

    this.rays = []
    this.readings = []
  }

  update(x: number, y: number, angle: number, roadBorders: any[], traffic: any[]) {
    this.castRays(x, y, angle)
    this.readings = []
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.getReading(this.rays[i], roadBorders, traffic))
    }
  }

  private getReading(
    ray: { x: number; y: number }[],
    roadBorders: any[],
    traffic: any[]
  ): { x: number; y: number; offset: number } | null {
    let touches = []

    roadBorders.forEach((border) => {
      for (let i = 1; i < border.length; i++) {
        const touch = getIntersection(ray[0], ray[1], border[i - 1], border[i])
        if (touch) {
          touches.push(touch)
        }
      }
    })

    for (let i = 0; i < traffic.length; i++) {
      const poly = traffic[i].polygon
      for (let j = 0; j < poly.length; j++) {
        const value = getIntersection(ray[0], ray[1], poly[j], poly[(j + 1) % poly.length])
        if (value) {
          touches.push(value)
        }
      }
    }

    if (touches.length == 0) {
      return null
    } else {
      const offsets = touches.map((e) => e.offset)
      const minOffset = Math.min(...offsets)
      return touches.find((e) => e.offset == minOffset) ?? null
    }
  }

  private castRays(x: number, y: number, angle: number) {
    this.rays = []
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + angle

      const start = { x, y }
      const end = {
        x: x - Math.sin(rayAngle) * this.rayLength,
        y: y - Math.cos(rayAngle) * this.rayLength
      }
      this.rays.push([start, end])
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1]

      if (this.readings[i]) {
        end = {
          x: this.readings[i]!.x,
          y: this.readings[i]!.y
        }
      }

      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'yellow'
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
    }
  }
}

export default Sensor
