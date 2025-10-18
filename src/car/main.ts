import Graph from '../world/graph'
import Start from '../world/markings/start.marking'
import Point from '../world/primitives/point'
import { angle, scale } from '../world/utils'
import Viewport from '../world/viewport'
import World from '../world/world'
import Car from './car'
import NeuralNetwork from './network'
import Visualizer from './visualizer'

const carCanvas = document.getElementById('carCanvas') as HTMLCanvasElement
const networkCanvas = document.getElementById('networkCanvas') as HTMLCanvasElement

carCanvas.height = window.innerHeight
carCanvas.width = window.innerWidth - 330
networkCanvas.height = window.innerHeight
networkCanvas.width = 300

const carCtx = carCanvas.getContext('2d') as CanvasRenderingContext2D
const networkCtx = networkCanvas.getContext('2d') as CanvasRenderingContext2D

// const worldString = localStorage.getItem('world')
// const worldInfo = worldString ? JSON.parse(worldString) : null

// Initialize world asynchronously
;(async () => {
  let world: World
  try {
    const response = await fetch('/src/saves/sclemo.world')
    if (response.ok) {
      const savedJson = await response.json()
      world = await World.load(savedJson)
    } else {
      world = new World(new Graph([], []))
    }
  } catch (error) {
    console.warn('Could not load sclemo.world, using empty world:', error)
    world = new World(new Graph([], []))
  }
  // const world = worldInfo ? await World.load(worldInfo) : new World(new Graph([], []))
  const viewport = new Viewport(carCanvas, world.zoom, world.offset)

  const N = 100
  const cars = generateCars(N)
  const traffic: Car[] = []
  // const roadBorders = world.buildings
  //   .map((b) => b.base.segments)
  //   .flat()
  //   .map((s) => [s.p1, s.p2])
  const roadBorders = world.roadBorders.map((s) => [s.p1, s.p2])
  let bestCar = cars[0]
  if (localStorage.getItem('bestBrain')) {
    for (let i = 0; i < cars.length; i++) {
      cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'))
      if (i > 0) {
        NeuralNetwork.mutate(cars[i].brain, 0.4)
      }
    }
  }

  animate()

  function animate() {
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].update(roadBorders, [])
    }
    for (let i = 0; i < cars.length; i++) {
      cars[i].update(roadBorders, traffic)
    }
    const finded = cars.find((c) => c.fitness == Math.max(...cars.map((c) => c.fitness)))
    world.cars = cars
    if (finded) {
      bestCar = finded
      world.bestCar = bestCar
    }

    viewport.offset.x = -bestCar.x
    viewport.offset.y = -bestCar.y

    viewport.reset()
    const viewPoint = scale(viewport.getOffset(), -1)
    world.draw(carCtx, viewPoint, false)

    for (let i = 0; i < traffic.length; i++) {
      traffic[i].draw(carCtx)
    }

    networkCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height)
    Visualizer.drawNetwork(networkCtx, bestCar.brain)

    requestAnimationFrame(animate)
  }

  function generateCars(N: number) {
    const startPoints = world.markings.filter((m) => m instanceof Start)
    const startPoint = startPoints.length > 0 ? startPoints[0].center : new Point(100, 100)

    const dir = startPoints.length > 0 ? startPoints[0].directionVector : new Point(0, -1)
    const a = -angle(dir) + Math.PI / 2

    const cars = []
    for (let i = 1; i <= N; i++) {
      cars.push(new Car(startPoint.x, startPoint.y, 30, 50, 'AI', a))
    }
    return cars
  }

  const saveButton = document.getElementById('btnSave') as HTMLButtonElement
  const discardButton = document.getElementById('btnReset') as HTMLButtonElement

  saveButton.onclick = save
  discardButton.onclick = discard

  function save() {
    localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain))
  }

  function discard() {
    localStorage.removeItem('bestBrain')
  }
})()
