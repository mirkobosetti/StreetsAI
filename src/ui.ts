import CrossingEditor from './editors/crossing.marking.editor'
import GraphEditor from './editors/graph.editor'
import StopEditor from './editors/stop.marking.editor'
import type Graph from './graph'
import { MODES, type Modes, type Tools } from './types'
import type Viewport from './viewport'
import type World from './world'

class UI {
  private btnSave: HTMLButtonElement
  private btnDispose: HTMLButtonElement
  private btnGraph: HTMLButtonElement
  private btnStop: HTMLButtonElement
  private btnCrossing: HTMLButtonElement

  graph: Graph
  world: World

  tools: Tools

  constructor(graph: Graph, world: World, viewport: Viewport) {
    this.btnSave = document.getElementById('btnSave') as HTMLButtonElement
    this.btnDispose = document.getElementById('btnDispose') as HTMLButtonElement
    this.btnGraph = document.getElementById('btnGraph') as HTMLButtonElement
    this.btnStop = document.getElementById('btnStop') as HTMLButtonElement
    this.btnCrossing = document.getElementById('btnCrossing') as HTMLButtonElement

    this.graph = graph
    this.world = world

    this.btnSave.addEventListener('click', () => {
      localStorage.setItem('graph', JSON.stringify(graph))
    })

    this.btnDispose.addEventListener('click', () => {
      this.tools.graph.editor.dispose()
      this.world.markings.length = 0
    })

    this.btnGraph.addEventListener('click', () => this.setMode(MODES.GRAPH))
    this.btnStop.addEventListener('click', () => this.setMode(MODES.STOP))
    this.btnCrossing.addEventListener('click', () => this.setMode(MODES.CROSSING))

    this.tools = {
      graph: { button: this.btnGraph, editor: new GraphEditor(graph, viewport) },
      stop: { button: this.btnStop, editor: new StopEditor(world, viewport) },
      crossing: { button: this.btnCrossing, editor: new CrossingEditor(world, viewport) }
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
