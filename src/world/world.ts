import Graph from './graph'
import Building from './items/building'
import Tree from './items/tree'
import Marking from './markings/base.marking'
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
  markings: Marking[] = []

  roadOptions: RoadOptions
  buildingOptions: BuildingOptions
  treeOptions: TreeOptions

  frameCount: number = 0

  zoom: number = 1
  offset: Point = new Point(0, 0)

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

  static async load(info: World) {
    const world = new World(new Graph([], []))

    world.graph = Graph.load(info.graph)

    world.roadOptions = info.roadOptions
    world.buildingOptions = info.buildingOptions
    world.treeOptions = info.treeOptions

    world.envelopes = info.envelopes.map((e) => Envelope.load(e))
    world.roadBorders = info.roadBorders.map((b) => new Segment(b.p1, b.p2))
    world.buildings = info.buildings.map((e) => Building.load(e))
    world.trees = info.trees.map((t) => new Tree(t.center, world.treeOptions.size))
    world.laneGuides = info.laneGuides.map((g) => new Segment(g.p1, g.p2))
    world.markings = await Promise.all(info.markings.map((m) => Marking.load(m)))
    world.zoom = info.zoom
    world.offset = info.offset
    return world
  }

  /** Generate the world elements (buildings, trees, road borders, lane guides) */
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

  /**
   * Generate building bases along the roads
   * @returns Array of generated building bases
   */
  private generateBuildings(): Building[] {
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

  /**
   * Generate trees in the world avoiding buildings and roads
   * @returns Array of generated trees
   */
  private generateTrees(): Tree[] {
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

  /**
   * Generate lane guides for the roads
   * @returns Array of lane guide segments
   */
  private generateLaneGuides(): Segment[] {
    const tmpEnvelopes: Envelope[] = []
    for (const seg of this.graph.segments) {
      tmpEnvelopes.push(new Envelope(seg, this.roadOptions.width / 2, this.roadOptions.roundness))
    }

    const segments = Polygon.union(tmpEnvelopes.map((env) => env.poly))
    return segments
  }

  /**
   * Get intersection points in the graph where more than two segments meet
   * @returns Array of intersection points
   */
  private getIntersections(): Point[] {
    const subset = []
    for (const point of this.graph.points) {
      let degree = 0
      for (const seg of this.graph.segments) {
        if (seg.includes(point)) {
          degree++
        }
      }

      if (degree > 2) {
        subset.push(point)
      }
    }
    return subset
  }

  private updateLights() {
    //TODO: re-implement traffic light logic
    // const lights = this.markings.filter((m) => m instanceof Light)

    // console.log(this.getIntersections())

    // const controlCenters = []
    // for (const light of lights) {
    //   const point = getNearestPoint(light.center, this.getIntersections())
    //   let controlCenter = controlCenters.find((c) => c.equals(point))
    //   if (!controlCenter) {
    //     controlCenter = new Point(point.x, point.y)
    //     controlCenter.lights = [light]
    //     controlCenters.push(controlCenter)
    //   } else {
    //     controlCenter.lights.push(light)
    //   }
    // }

    // const greenDuration = 2
    // const yellowDuration = 1

    // for (const center of controlCenters) {
    //   center.ticks = center.lights.length * (greenDuration + yellowDuration)
    // }
    // const tick = Math.floor(this.frameCount / 60)
    // for (const center of controlCenters) {
    //   const cTick = tick % center.ticks
    //   const greenYellowIndex = Math.floor(cTick / (greenDuration + yellowDuration))
    //   const greenYellowState =
    //     cTick % (greenDuration + yellowDuration) < greenDuration ? 'green' : 'yellow'
    //   for (let i = 0; i < center.lights.length; i++) {
    //     if (i == greenYellowIndex) {
    //       center.lights[i].state = greenYellowState
    //     } else {
    //       center.lights[i].state = 'red'
    //     }
    //   }
    // }
    this.frameCount++
  }

  draw(ctx: CanvasRenderingContext2D, viewPoint: Point) {
    this.updateLights()

    for (const env of this.envelopes) {
      env.draw(ctx, { fill: '#bbb', stroke: '#bbb', width: 1, lineWidth: 15 })
    }

    for (const marking of this.markings) {
      marking.draw(ctx)
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
