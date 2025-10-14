import Graph from './graph/graph'
import GraphEditor from './graphEditor'
import Point from './primitives/point'
import Segment from './primitives/segment'
import './style.css'
import Viewport from './viewport'

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 600
canvas.height = 600

const p1 = new Point(100, 100)
const p2 = new Point(200, 200)
const p3 = new Point(300, 100)
const p4 = new Point(400, 300)

const s1 = new Segment(p1, p2)
const s2 = new Segment(p2, p3)
const s3 = new Segment(p3, p4)

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3])
const viewport = new Viewport(canvas)
const graphEditor = new GraphEditor(graph, viewport)

animate()

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.translate(viewport.center.x, viewport.center.y)
  ctx.scale(1 / viewport.zoom, 1 / viewport.zoom)
  const offset = viewport.getOffset()
  ctx.translate(offset.x, offset.y)
  graphEditor.display()
  ctx.restore()
  requestAnimationFrame(animate)
}
