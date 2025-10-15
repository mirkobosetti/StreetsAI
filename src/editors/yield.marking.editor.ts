import Yield from '../markings/yield.marking'
import type Point from '../primitives/point'
import type Viewport from '../viewport'
import type World from '../world'
import MarkingEditor from './base.marking.editor'

class YieldEditor extends MarkingEditor {
  constructor(world: World, viewport: Viewport) {
    super(world, viewport, world.laneGuides)
  }

  override createMarking(center: Point, directionVector: Point) {
    return new Yield(
      center,
      directionVector,
      this.world.roadOptions.width / 2,
      this.world.roadOptions.width / 2
    )
  }
}

export default YieldEditor
