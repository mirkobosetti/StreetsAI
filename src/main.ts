import Graph from './graph'
import GraphEditor from './graphEditor'
import './style.css'
import Viewport from './viewport'
import World from './world'

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 600
canvas.height = 600

const savedGraph = localStorage.getItem('graph')

const graph = savedGraph ? Graph.load(JSON.parse(savedGraph)) : new Graph([], [])
const world = new World(graph)
const viewport = new Viewport(canvas)
const graphEditor = new GraphEditor(graph, viewport)

let oldGraphHash = graph.hash()
animate()

function animate() {
  viewport.reset()
  if (oldGraphHash != graph.hash()) {
    world.generate()
    oldGraphHash = graph.hash()
  }
  world.draw(ctx)
  ctx.globalAlpha = 0.2
  graphEditor.display()
  requestAnimationFrame(animate)
}

const btnSave = document.getElementById('btnSave') as HTMLButtonElement
const btnDispose = document.getElementById('btnDispose') as HTMLButtonElement

btnSave.addEventListener('click', () => {
  localStorage.setItem('graph', JSON.stringify(graph))
})

btnDispose.addEventListener('click', () => {
  graphEditor.dispose()
})
