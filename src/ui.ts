import CrossingEditor from './editors/crossing.marking.editor'
import GraphEditor from './editors/graph.editor'
import LightEditor from './editors/light.marking.editor'
import ParkingEditor from './editors/parking.marking.editor'
import StartEditor from './editors/start.marking.editor'
import StopEditor from './editors/stop.marking.editor'
import TargetEditor from './editors/target.marking.editor'
import YieldEditor from './editors/yield.marking.editor'
import type Graph from './graph'
import { MODES, type Modes, type Tools } from './types'
import type Viewport from './viewport'
import World from './world'

class UI {
  private btnSave: HTMLButtonElement
  private btnDispose: HTMLButtonElement
  private btnGraph: HTMLButtonElement
  private btnStop: HTMLButtonElement
  private btnCrossing: HTMLButtonElement
  private btnStart: HTMLButtonElement
  private btnLight: HTMLButtonElement
  private btnParking: HTMLButtonElement
  private btnTarget: HTMLButtonElement
  private btnYield: HTMLButtonElement
  private btnLoad: HTMLButtonElement
  private fileInput: HTMLInputElement

  graph: Graph
  world: World
  viewport: Viewport

  tools: Tools

  constructor(graph: Graph, world: World, viewport: Viewport) {
    this.btnSave = document.getElementById('btnSave') as HTMLButtonElement
    this.btnDispose = document.getElementById('btnDispose') as HTMLButtonElement
    this.btnGraph = document.getElementById('btnGraph') as HTMLButtonElement
    this.btnStop = document.getElementById('btnStop') as HTMLButtonElement
    this.btnCrossing = document.getElementById('btnCrossing') as HTMLButtonElement
    this.btnStart = document.getElementById('btnStart') as HTMLButtonElement
    this.btnLight = document.getElementById('btnLight') as HTMLButtonElement
    this.btnParking = document.getElementById('btnParking') as HTMLButtonElement
    this.btnTarget = document.getElementById('btnTarget') as HTMLButtonElement
    this.btnYield = document.getElementById('btnYield') as HTMLButtonElement
    this.btnLoad = document.getElementById('btnLoad') as HTMLButtonElement
    this.fileInput = document.getElementById('fileInput') as HTMLInputElement

    this.graph = graph
    this.world = world
    this.viewport = viewport

    this.btnSave.addEventListener('click', () => this.save())

    this.btnDispose.addEventListener('click', () => {
      this.tools.graph.editor.dispose()
      this.world.laneGuides.length = 0
      this.world.markings.length = 0
    })

    this.btnGraph.addEventListener('click', () => this.setMode(MODES.GRAPH))
    this.btnStop.addEventListener('click', () => this.setMode(MODES.STOP))
    this.btnCrossing.addEventListener('click', () => this.setMode(MODES.CROSSING))
    this.btnStart.addEventListener('click', () => this.setMode(MODES.START))
    this.btnLight.addEventListener('click', () => this.setMode(MODES.LIGHT))
    this.btnParking.addEventListener('click', () => this.setMode(MODES.PARKING))
    this.btnTarget.addEventListener('click', () => this.setMode(MODES.TARGET))
    this.btnYield.addEventListener('click', () => this.setMode(MODES.YIELD))
    this.btnLoad.addEventListener('click', () => this.fileInput.click())
    this.fileInput.addEventListener('change', (e) => this.load(e))

    this.tools = {
      graph: { button: this.btnGraph, editor: new GraphEditor(graph, viewport) },
      stop: { button: this.btnStop, editor: new StopEditor(world, viewport) },
      crossing: { button: this.btnCrossing, editor: new CrossingEditor(world, viewport) },
      start: { button: this.btnStart, editor: new StartEditor(world, viewport) },
      light: { button: this.btnLight, editor: new LightEditor(world, viewport) },
      parking: { button: this.btnParking, editor: new ParkingEditor(world, viewport) },
      target: { button: this.btnTarget, editor: new TargetEditor(world, viewport) },
      yield: { button: this.btnYield, editor: new YieldEditor(world, viewport) }
    }
  }

  private save() {
    this.world.zoom = this.viewport.zoom
    this.world.offset = this.viewport.offset

    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.world))
    )

    const fileName = 'name.world'
    element.setAttribute('download', fileName)

    element.click()

    console.log('Saving world...', this.world)
    localStorage.setItem('world', JSON.stringify(this.world))
  }

  private load(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0)

    if (!file) {
      alert('No file selected.')
      return
    }

    const reader = new FileReader()
    reader.readAsText(file)

    reader.onload = async (e) => {
      const fileContent = e.target?.result
      const jsonData = JSON.parse(fileContent as string)
      this.world = await World.load(jsonData)
      localStorage.setItem('world', JSON.stringify(this.world))
      location.reload()
    }
  }

  setMode(mode: Modes) {
    this.disableEditors()
    this.tools[mode].button.style.backgroundColor = 'lightgreen'
    this.tools[mode].button.style.filter = 'none'
    this.tools[mode].editor.enable()
  }

  disableEditors() {
    Object.values(this.tools).forEach((tool) => {
      tool.editor.disable()
      tool.button.style.backgroundColor = 'gray'
      tool.button.style.filter = 'grayscale(100%)'
    })
  }
}

export default UI
