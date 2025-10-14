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
