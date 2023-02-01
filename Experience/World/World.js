import * as THREE from 'three'
import Experience from "../Experience.js"

import { EventEmitter } from 'events'

import Environment from './Environment.js'
import Plateforme10 from './Plateforme10.js'
import Interests from './Interests.js'
// import Controls from '../Controls.js'


export default class World extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.plateforme10 = new Plateforme10()
      this.interests = new Interests()
      // this.controls = new Controls()
      this.emit('worldready')
    })
  }

  resize() {}

  update() {
    if(this.plateforme10) {
      this.plateforme10.update()
    }

    if(this.controls) {
      this.controls.update()
    }

    if(this.interests) {
      this.interests.update()
    }
  }
}
