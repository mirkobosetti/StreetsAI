import type Graph from './graph/graph'
import Envelope from './primitives/envelope'
import Polygon from './primitives/polygon'
import type Segment from './primitives/segment'

class World {
  graph: Graph
  roadWidth: number
  roadRoundness: number
  envelopes: Envelope[]
  roadBorders: Segment[]

  constructor(graph: Graph, roadWidth = 80, roadRoundness = 3) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
    this.envelopes = []
    this.roadBorders = []
    this.generate()
  }

  generate() {
    this.envelopes.length = 0

    for (const segment of this.graph.segments) {
      this.envelopes.push(new Envelope(segment, this.roadWidth, this.roadRoundness))
    }

    this.roadBorders = Polygon.union(this.envelopes.map((env) => env.poly))
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const env of this.envelopes) {
      env.draw(ctx)
    }

    for (const border of this.roadBorders) {
      border.draw(ctx, { color: 'white', width: 4 })
    }
  }
}

export default World
