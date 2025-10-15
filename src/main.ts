import Graph from './graph'
import './style.css'
import { MODES } from './types'
import { scale } from './utils'
import Viewport from './viewport'
import World from './world'
import UI from './ui'

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 900
canvas.height = 900

const worldString = localStorage.getItem('world')
const worldInfo = worldString ? JSON.parse(worldString) : null
const world = worldInfo ? World.load(worldInfo) : new World(new Graph([], []))
const graph = world.graph

const viewport = new Viewport(canvas)

const ui = new UI(graph, world, viewport)

let oldGraphHash = graph.hash()
ui.setMode(MODES.GRAPH)
animate()

function animate() {
  viewport.reset()
  if (oldGraphHash != graph.hash()) {
    world.generate()
    oldGraphHash = graph.hash()
  }
  const viewPoint = scale(viewport.getOffset(), -1)
  world.draw(ctx, viewPoint)
  ctx.globalAlpha = 0.2
  Object.values(ui.tools).forEach((tool) => tool.editor.display())
  requestAnimationFrame(animate)
}
