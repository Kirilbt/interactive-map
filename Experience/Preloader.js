import * as THREE from 'three'
import GSAP from 'gsap'
import { EventEmitter } from 'events'

import Experience from "./Experience"

export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera
    this.world = this.experience.world
    this.device = this.sizes.device

    this.sizes.on('switchdevice', (device) => {
      this.device = device
    })

    this.world.on('worldready', () => {
      this.setAssets()
      this.playIntro()
    })
  }

  setAssets() {
    this.group = this.experience.world.plateforme10.group
    this.actualPlateforme10 = this.experience.world.plateforme10.actualPlateforme10
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline()
      this.timeline.to('.preloader', {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector('.preloader').classList.add('hidden')
        }
      })

      if (this.device === 'desktop') {
        this.timeline.to(this.camera.orthographicCamera.position, {
          x: 1,
          y: 0.6,
          z: 1
        }, 'intro')
      } else {
        this.timeline.to(this.camera.orthographicCamera.position, {
          x: 1,
          y: 0.6,
          z: 1
        }, 'intro')
      }
    })
  }

  async playIntro() {
    await this.firstIntro()
  }

  resize() {}

  update() {}
}
