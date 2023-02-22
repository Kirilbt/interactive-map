import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience.js'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.resources = this.experience.resources
    this.sizes = this.experience.sizes
    this.time = this.experience.time
    this.camera = this.experience.camera

    this.setOrbitControls()
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.camera.orthographicCamera, this.canvas)
    this.controls.enableDamping = true
    this.controls.enableZoom = true
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.listenToKeyEvents( window )
  }

  resize() {}

  update() {
    this.controls.update()
  }
}
