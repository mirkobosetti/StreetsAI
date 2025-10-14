import type Graph from './graph/graph'
import Envelope from './primitives/envelope'
import type Point from './primitives/point'
import Polygon from './primitives/polygon'

class World {
  graph: Graph
  roadWidth: number
  roadRoundness: number
  envelopes: Envelope[]
  intersections: Point[]

  constructor(graph: Graph, roadWidth = 80, roadRoundness = 3) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness
    this.envelopes = []
    this.intersections = []
    this.generate()
  }

  generate() {
    this.envelopes.length = 0

    this.graph.segments.forEach((segment) => {
      this.envelopes.push(new Envelope(segment, this.roadWidth, this.roadRoundness))
    })

    this.intersections = Polygon.break(this.envelopes[0].poly, this.envelopes[1].poly)
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: '#BBB', stroke: '#BBB', lineWidth: 15 })
    }
    for (const int of this.intersections) {
      int.draw(ctx, { color: 'red', size: 6 })
    }
  }
}

export default World
