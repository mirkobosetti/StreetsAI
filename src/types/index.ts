import type CrossingEditor from '../editors/crossing.marking.editor'
import type GraphEditor from '../editors/graph.editor'
import type StartEditor from '../editors/start.marking.editor'
import type StopEditor from '../editors/stop.marking.editor'

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
  SEMAPHORE: 'semaphore'
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
  [key: string]: Tool<Editor>
}
