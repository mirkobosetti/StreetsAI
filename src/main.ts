import Graph from './graph/graph'
import GraphEditor from './graphEditor'
import './style.css'
import Viewport from './viewport'

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement

canvas.width = 600
canvas.height = 600

const savedGraph = localStorage.getItem('graph')

const graph = savedGraph ? Graph.load(JSON.parse(savedGraph)) : new Graph([], [])
const viewport = new Viewport(canvas)
const graphEditor = new GraphEditor(graph, viewport)

animate()

function animate() {
  viewport.reset()
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
