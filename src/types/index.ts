import type CrossingEditor from '../editors/crossing.marking.editor'
import type GraphEditor from '../editors/graph.editor'
import type LightEditor from '../editors/light.marking.editor'
import type ParkingEditor from '../editors/parking.marking.editor'
import type StartEditor from '../editors/start.marking.editor'
import type StopEditor from '../editors/stop.marking.editor'
import type TargetEditor from '../editors/target.marking.editor'
import type YieldEditor from '../editors/yield.marking.editor'

export type Intersection = {
  x: number
  y: number
  offset: number
}

export type drawOptions = {
  stroke?: string
  lineWidth?: number
  fill?: string
  color?: string
  width?: number
  dash?: number[]
  size?: number
  outline?: boolean
  fillCircle?: boolean
  join?: CanvasLineJoin
  cap?: CanvasLineCap
}

export type BuildingOptions = {
  width: number
  minLength: number
  spacing: number
}

export type RoadOptions = {
  width: number
  roundness: number
}

export type TreeOptions = {
  size: number
}

export const MODES = {
  GRAPH: 'graph',
  STOP: 'stop',
  CROSSING: 'crossing',
  START: 'start',
  LIGHT: 'light',
  PARKING: 'parking',
  TARGET: 'target',
  YIELD: 'yield'
}
export type Modes = (typeof MODES)[keyof typeof MODES]

export const MOUSE = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2
}
export type MouseButtons = (typeof MOUSE)[keyof typeof MOUSE]

export interface Editor {
  enable(): void
  disable(): void
  display(): void
}

export interface Tool<T extends Editor> {
  button: HTMLButtonElement
  editor: T
}

export interface Tools {
  graph: Tool<GraphEditor>
  stop: Tool<StopEditor>
  crossing: Tool<CrossingEditor>
  start: Tool<StartEditor>
  light: Tool<LightEditor>
  parking: Tool<ParkingEditor>
  target: Tool<TargetEditor>
  yield: Tool<YieldEditor>
  [key: string]: Tool<Editor>
}
