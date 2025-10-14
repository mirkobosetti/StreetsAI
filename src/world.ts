import type Graph from './graph/graph'
import Envelope from './primitives/envelope'

class World {
  graph: Graph
  roadWidth: number
  roadRoundness: number
  envelopes: Envelope[]

  constructor(graph: Graph, roadWidth = 80, roadRoundness = 3) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
    this.envelopes = []
    this.generate()
  }

  generate() {
    this.envelopes.length = 0

    this.graph.segments.forEach((segment) => {
      this.envelopes.push(new Envelope(segment, this.roadWidth, this.roadRoundness))
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.envelopes.forEach((envelope) => {
      envelope.draw(ctx)
    })
  }
}

export default World
