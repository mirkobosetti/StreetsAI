import Graph from './graph/graph'
import Point from './primitives/point'
import Segment from './primitives/segment'
import './style.css'

const btnAddPoint = document.getElementById('btnAddPoint') as HTMLButtonElement
btnAddPoint.addEventListener('click', () => {
  const added = graph.tryAddPoint(
    new Point(Math.random() * canvas.width, Math.random() * canvas.height)
  )
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  graph.draw(ctx)
})

const btnAddSegment = document.getElementById('btnAddSegment') as HTMLButtonElement
btnAddSegment.addEventListener('click', () => {
  if (graph.points.length < 2) return
  const index1 = Math.floor(Math.random() * graph.points.length)
  const index2 = Math.floor(Math.random() * graph.points.length)

  const added = graph.tryAddSegment(new Segment(graph.points[index1], graph.points[index2]))

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  graph.draw(ctx)
})

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
graph.draw(ctx)
