import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import assets from './Utils/assets.js'

import Scrolling from './Components/Scrolling.js'

import Camera from './Camera.js'
import Controls from './Controls.js'
import Renderer from './Renderer.js'
import Preloader from './Preloader.js'

import World from './World/World.js'

export default class Experience {
  static instance
  constructor(canvas) {
    if(Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.camera = new Camera()
    this.controls = new Controls()
    this.renderer = new Renderer()
    this.resources = new Resources(assets)
    this.world = new World()
    this.preloader = new Preloader()

    this.scrolling = new Scrolling({
      element: document.querySelector('.info-panel-content')
    })

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('update', () => {
      this.update()
    })

    document.documentElement.style.setProperty('--100vh', `${window.innerHeight}px`)
  }

  resize() {
    this.camera.resize()
    this.world.resize()
    this.renderer.resize()
    this.scrolling.resize()
    document.documentElement.style.setProperty('--100vh', `${window.innerHeight}px`)
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
    this.scrolling.update()

    if(this.controls) {
      this.controls.update()
    }
  }
}
