import type CrossingEditor from './editors/crossing.marking.editor'
import type GraphEditor from './editors/graph.editor'
import type StopEditor from './editors/stop.marking.editor'
import type Graph from './graph'
import { MODES, type Modes } from './types'
import type World from './world'

class UI {
  private btnSave: HTMLButtonElement
  private btnDispose: HTMLButtonElement
  private btnGraph: HTMLButtonElement
  private btnStop: HTMLButtonElement
  private btnCrossing: HTMLButtonElement

  graph: Graph
  graphEditor: GraphEditor
  world: World
  stopEditor: StopEditor
  crossingEditor: CrossingEditor

  constructor(
    graph: Graph,
    graphEditor: GraphEditor,
    world: World,
    stopEditor: StopEditor,
    crossingEditor: CrossingEditor
  ) {
    this.btnSave = document.getElementById('btnSave') as HTMLButtonElement
    this.btnDispose = document.getElementById('btnDispose') as HTMLButtonElement
    this.btnGraph = document.getElementById('btnGraph') as HTMLButtonElement
    this.btnStop = document.getElementById('btnStop') as HTMLButtonElement
    this.btnCrossing = document.getElementById('btnCrossing') as HTMLButtonElement

    this.graph = graph
    this.graphEditor = graphEditor
    this.world = world
    this.stopEditor = stopEditor
    this.crossingEditor = crossingEditor

    this.btnSave.addEventListener('click', () => {
      localStorage.setItem('graph', JSON.stringify(graph))
    })

    this.btnDispose.addEventListener('click', () => {
      graphEditor.dispose()
      world.markings.length = 0
    })

    this.btnGraph.addEventListener('click', () => this.setMode(MODES.GRAPH))
    this.btnStop.addEventListener('click', () => this.setMode(MODES.STOP))
    this.btnCrossing.addEventListener('click', () => this.setMode(MODES.CROSSING))
  }

  setMode(mode: Modes) {
    this.disableEditors()
    switch (mode) {
      case MODES.GRAPH:
        this.btnGraph.style.backgroundColor = 'lightgreen'
        this.btnGraph.style.filter = 'none'
        this.graphEditor.enable()
        break
      case MODES.STOP:
        this.btnStop.style.backgroundColor = 'lightgreen'
        this.btnStop.style.filter = 'none'
        this.stopEditor.enable()
        break
      case MODES.CROSSING:
        this.btnCrossing.style.backgroundColor = 'lightgreen'
        this.btnCrossing.style.filter = 'none'
        this.crossingEditor.enable()
        break
    }
  }

  disableEditors() {
    this.btnGraph.style.backgroundColor = 'gray'
    this.btnGraph.style.filter = 'grayscale(100%)'
    this.graphEditor.disable()
    this.btnStop.style.backgroundColor = 'gray'
    this.btnStop.style.filter = 'grayscale(100%)'
    this.stopEditor.disable()
    this.btnCrossing.style.backgroundColor = 'gray'
    this.btnCrossing.style.filter = 'grayscale(100%)'
    this.crossingEditor.disable()
  }
}

export default UI
