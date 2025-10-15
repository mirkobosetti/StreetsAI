import Graph from './graph'
import GraphEditor from './editors/graph.editor'
import './style.css'
import { MODES } from './types'
import { scale } from './utils'
import Viewport from './viewport'
import World from './world'
import StopEditor from './editors/stop.marking.editor'
import CrossingEditor from './editors/crossing.marking.editor'
import UI from './ui'

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 900
canvas.height = 900

const savedGraph = localStorage.getItem('graph')

const graph = savedGraph ? Graph.load(JSON.parse(savedGraph)) : new Graph([], [])
const world = new World(graph)
const viewport = new Viewport(canvas)
const graphEditor = new GraphEditor(graph, viewport)
const stopEditor = new StopEditor(world, viewport)
const crossingEditor = new CrossingEditor(world, viewport)

const ui = new UI(graph, graphEditor, world, stopEditor, crossingEditor)

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
  graphEditor.display()
  stopEditor.display()
  crossingEditor.display()
  requestAnimationFrame(animate)
}
