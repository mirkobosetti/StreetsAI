import Graph from './graph'
import GraphEditor from './graphEditor'
import './style.css'
import { MODES, type Modes } from './types'
import { scale } from './utils/utils'
import Viewport from './viewport'
import World from './world'

const btnSave = document.getElementById('btnSave') as HTMLButtonElement
const btnDispose = document.getElementById('btnDispose') as HTMLButtonElement
const btnGraph = document.getElementById('btnGraph') as HTMLButtonElement
const btnStop = document.getElementById('btnStop') as HTMLButtonElement

btnSave.addEventListener('click', () => {
  localStorage.setItem('graph', JSON.stringify(graph))
})

btnDispose.addEventListener('click', () => {
  graphEditor.dispose()
})

btnGraph.addEventListener('click', () => {
  setMode(MODES.GRAPH)
})

btnStop.addEventListener('click', () => {
  setMode(MODES.STOP)
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
      break
  }
}

function disableEditors() {
  btnGraph.style.backgroundColor = 'gray'
  btnGraph.style.filter = 'grayscale(100%)'
  graphEditor.disable()
  btnStop.style.backgroundColor = 'gray'
  btnStop.style.filter = 'grayscale(100%)'
}
