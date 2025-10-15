import type Graph from './graph'
import Building from './items/building'
import Tree from './items/tree'
import Envelope from './primitives/envelope'
import Point from './primitives/point'
import Polygon from './primitives/polygon'
import Segment from './primitives/segment'
import type { BuildingOptions, RoadOptions, TreeOptions } from './types'
import { add, distance, lerp, scale } from './utils'

class World {
  graph: Graph

  envelopes: Envelope[] = []
  roadBorders: Segment[] = []
  buildings: Building[] = []
  trees: Tree[] = []
  laneGuides: Segment[] = []

  roadOptions: RoadOptions
  buildingOptions: BuildingOptions
  treeOptions: TreeOptions

  constructor(
    graph: Graph,
    roadOptions: RoadOptions = { width: 100, roundness: 10 },
    buildingOptions: BuildingOptions = { width: 150, minLength: 150, spacing: 50 },
    treeOptions: TreeOptions = { size: 160 }
  ) {
    this.graph = graph
    this.roadOptions = roadOptions
    this.buildingOptions = buildingOptions
    this.treeOptions = treeOptions

    this.generate()
  }

  generate() {
    this.envelopes.length = 0

    for (const segment of this.graph.segments) {
      this.envelopes.push(new Envelope(segment, this.roadOptions.width, this.roadOptions.roundness))
    }

    this.roadBorders = Polygon.union(this.envelopes.map((env) => env.poly))
    this.buildings = this.generateBuildings()
    this.trees = this.generateTrees()

    this.laneGuides = this.generateLaneGuides()
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

    const support = []
    for (const seg of guides) {
      const len = seg.length() + this.buildingOptions.spacing
      const buildingCount = Math.floor(
        len / (this.buildingOptions.minLength + this.buildingOptions.spacing)
      )
      const buildingLength = len / buildingCount - this.buildingOptions.spacing
      const dir = seg.directionVector()

      let q1 = seg.p1
      let q2 = add(q1, scale(dir, buildingLength))
      support.push(new Segment(q1, q2))

      for (let i = 1; i < buildingCount; i++) {
        q1 = add(q2, scale(dir, this.buildingOptions.spacing))
        q2 = add(q1, scale(dir, buildingLength))
        support.push(new Segment(q1, q2))
      }
    }

    const bases = []
    for (const seg of support) {
      bases.push(new Envelope(seg, this.buildingOptions.width).poly)
    }

    const eps = 0.001

    // looping between all bases to break them at intersections
    for (let i = 0; i < bases.length - 1; i++) {
      for (let j = i + 1; j < bases.length; j++) {
        if (
          bases[i].intersectsPoly(bases[j]) ||
          bases[i].distanceToPoly(bases[j]) < this.buildingOptions.spacing - eps
        ) {
          bases.splice(j, 1)
          j--
        }
      }
    }

    return bases.map((b) => new Building(b))
  }

  private generateTrees() {
    const points = [
      ...this.roadBorders.map((s) => [s.p1, s.p2]).flat(),
      ...this.buildings.map((b) => b.base.points).flat()
    ]
    const left = Math.min(...points.map((p) => p.x))
    const right = Math.max(...points.map((p) => p.x))
    const top = Math.min(...points.map((p) => p.y))
    const bottom = Math.max(...points.map((p) => p.y))

    const illegalPolys = [
      ...this.buildings.map((b) => b.base),
      ...this.envelopes.map((e) => e.poly)
    ]

    const trees: Tree[] = []
    let tryCount = 0
    while (tryCount < 100) {
      const p = new Point(lerp(left, right, Math.random()), lerp(bottom, top, Math.random()))

      let keep = true
      for (const poly of illegalPolys) {
        if (poly.containsPoint(p) || poly.distanceToPoint(p) < this.treeOptions.size) {
          keep = false
          break
        }
      }

      // check if tree too close to other trees
      if (keep) {
        for (const tree of trees) {
          if (distance(tree.center, p) < this.treeOptions.size) {
            keep = false
            break
          }
        }
      }

      // avoiding trees in the middle of nowhere
      if (keep) {
        let closeToSomething = false
        for (const poly of illegalPolys) {
          if (poly.distanceToPoint(p) < this.treeOptions.size * 2) {
            closeToSomething = true
            break
          }
        }
        keep = closeToSomething
      }

      if (keep) {
        trees.push(new Tree(p, this.treeOptions.size))
        tryCount = 0
      }
      tryCount++
    }
    return trees
  }

  private generateLaneGuides(): Segment[] {
    const tmpEnvelopes: Envelope[] = []
    for (const seg of this.graph.segments) {
      tmpEnvelopes.push(new Envelope(seg, this.roadOptions.width / 2, this.roadOptions.roundness))
    }

    const segments = Polygon.union(tmpEnvelopes.map((env) => env.poly))
    return segments
  }

  draw(ctx: CanvasRenderingContext2D, viewPoint: Point) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: '#bbb', stroke: '#bbb', width: 1, lineWidth: 15 })
    }

    for (const segment of this.graph.segments) {
      segment.draw(ctx, { color: 'white', width: 4, dash: [10, 10] })
    }

    for (const border of this.roadBorders) {
      border.draw(ctx, { color: 'white', width: 4 })
    }

    const items = [...this.buildings, ...this.trees]
    items.sort((a, b) => b.base.distanceToPoint(viewPoint) - a.base.distanceToPoint(viewPoint))
    for (const i of items) {
      i.draw(ctx, viewPoint)
    }
  }
}

export default World
