import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('environment')
      this.obj = {
        colorObj: {r:0 , g: 0, b: 0}
      }
    }

    // Setup
    this.setBackground()
  }

  setBackground() {
    this.bgColor = 0xd6d2ca
    this.scene.background = new THREE.Color(this.bgColor)
    this.scene.fog = new THREE.Fog(this.bgColor, 5, 20)
  }

  resize() {}

  update() {}
}
