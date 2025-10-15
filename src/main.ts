import Graph from './graph'
import GraphEditor from './editors/graphEditor'
import './style.css'
import { MODES, type Modes } from './types'
import { scale } from './utils'
import Viewport from './viewport'
import World from './world'
import StopEditor from './editors/stopEditor'
import CrossingEditor from './editors/crossingEditor'

const btnSave = document.getElementById('btnSave') as HTMLButtonElement
const btnDispose = document.getElementById('btnDispose') as HTMLButtonElement
const btnGraph = document.getElementById('btnGraph') as HTMLButtonElement
const btnStop = document.getElementById('btnStop') as HTMLButtonElement
const btnCrossing = document.getElementById('btnCrossing') as HTMLButtonElement

btnSave.addEventListener('click', () => {
  localStorage.setItem('graph', JSON.stringify(graph))
})

btnDispose.addEventListener('click', () => {
  graphEditor.dispose()
  world.markings.length = 0
})

btnGraph.addEventListener('click', () => {
  setMode(MODES.GRAPH)
})

btnStop.addEventListener('click', () => {
  setMode(MODES.STOP)
})

btnCrossing.addEventListener('click', () => {
  setMode(MODES.CROSSING)
})

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

let oldGraphHash = graph.hash()
setMode(MODES.GRAPH)
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

function setMode(mode: Modes) {
  disableEditors()
  switch (mode) {
    case MODES.GRAPH:
      btnGraph.style.backgroundColor = 'lightgreen'
      btnGraph.style.filter = 'none'
      graphEditor.enable()
      break
    case MODES.STOP:
      btnStop.style.backgroundColor = 'lightgreen'
      btnStop.style.filter = 'none'
      stopEditor.enable()
      break
    case MODES.CROSSING:
      btnCrossing.style.backgroundColor = 'lightgreen'
      btnCrossing.style.filter = 'none'
      crossingEditor.enable()
      break
  }
}

function disableEditors() {
  btnGraph.style.backgroundColor = 'gray'
  btnGraph.style.filter = 'grayscale(100%)'
  graphEditor.disable()
  btnStop.style.backgroundColor = 'gray'
  btnStop.style.filter = 'grayscale(100%)'
  stopEditor.disable()
  btnCrossing.style.backgroundColor = 'gray'
  btnCrossing.style.filter = 'grayscale(100%)'
  crossingEditor.disable()
}
