import Crossing from '../markings/crossing.marking'
import type Point from '../primitives/point'
import type Viewport from '../viewport'
import type World from '../world'
import MarkingEditor from './base.marking.editor'

class CrossingEditor extends MarkingEditor {
  constructor(world: World, viewport: Viewport) {
    super(world, viewport, world.graph.segments)
  }

  createMarking(center: Point, directionVector: Point) {
    return new Crossing(
      center,
      directionVector,
      this.world.roadOptions.width,
      this.world.roadOptions.width / 2
    )
  }
}

export default CrossingEditor
