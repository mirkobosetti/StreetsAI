import type Graph from './graph'
import Envelope from './primitives/envelope'
import Polygon from './primitives/polygon'
import type Segment from './primitives/segment'
import type { BuildingOptions, RoadOptions } from './types'

class World {
  graph: Graph

  envelopes: Envelope[]
  roadBorders: Segment[]
  buildings: Segment[]

  roadOptions: RoadOptions
  buildingOptions: BuildingOptions

  constructor(
    graph: Graph,
    roadOptions: RoadOptions = { width: 100, roundness: 10 },
    buildingOptions: BuildingOptions = { width: 100, minLength: 150, spacing: 50 }
  ) {
    this.graph = graph

    this.envelopes = []
    this.roadBorders = []
    this.buildings = []

    this.roadOptions = roadOptions
    this.buildingOptions = buildingOptions

    this.generate()
  }

  generate() {
    this.envelopes.length = 0

    for (const segment of this.graph.segments) {
      this.envelopes.push(new Envelope(segment, this.roadOptions.width, this.roadOptions.roundness))
    }

    this.roadBorders = Polygon.union(this.envelopes.map((env) => env.poly))
    this.buildings = this.generateBuildings()
  }

  private generateBuildings() {
    const tmpEnvelopes: Envelope[] = []
    for (const seg of this.graph.segments) {
      tmpEnvelopes.push(
        new Envelope(
          seg,
          this.roadOptions.width + this.buildingOptions.width + this.buildingOptions.spacing * 2,
          this.roadOptions.roundness
        )
      )
    }

    const guides = Polygon.union(tmpEnvelopes.map((env) => env.poly))

    for (let i = 0; i < guides.length; i++) {
      const element = guides[i]
      if (element.length() < this.buildingOptions.minLength) {
        guides.splice(i, 1)
        i--
      }
    }

    return guides
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: '#bbb', stroke: '#bbb', width: 1, lineWidth: 15 })
    }

    for (const segment of this.graph.segments) {
      segment.draw(ctx, { color: 'white', width: 4, dash: [10, 10] })
    }

    for (const border of this.roadBorders) {
      border.draw(ctx, { color: 'white', width: 4 })
    }

    for (const building of this.buildings) {
      building.draw(ctx, { color: 'rgba(200,0,0,0.8)', width: 4 })
    }
  }
}

export default World
