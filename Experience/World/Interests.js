import * as THREE from 'three'
import Experience from '../Experience.js'
import { EventEmitter } from 'events'

export default class Interests {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.debug = this.experience.debug

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('interest1')
      this.obj = {
        x: 1.55,
        y: 0.3,
        z: - 0.6
      }
    }

    // Setup
    this.points = []
    this.raycaster = new THREE.Raycaster()
    this.setInterests()
  }

  setInterests() {
    this.points = [{
      position: new THREE.Vector3(this.obj.x, this.obj.y, this.obj.z),
      element: document.querySelector('.point-0')
    }]

    // Debug
    if(this.debug.active) {
      this.debugFolder
        .add(this.points[0].position, 'x')
        .name('x')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[0].position, 'y')
        .name('y')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[0].position, 'z')
        .name('z')
        .min(-10)
        .max(10)
        .step(0.01)
    }
  }

  resize() {}

  update() {
      for(const point of this.points) {
        const screenPosition = point.position.clone()
        screenPosition.project(this.camera.orthographicCamera)

        this.raycaster.setFromCamera(screenPosition, this.camera.orthographicCamera)
        const intersects = this.raycaster.intersectObjects(this.scene.children, true)

        if(intersects.length === 0) {
          point.element.classList.add('visible')
        } else {
          const intersectionDistance = intersects[0].distance
          const pointDistance = point.position.distanceTo(this.camera.orthographicCamera.position)

          if(intersectionDistance < pointDistance) {
            point.element.classList.remove('visible')
          } else {
            point.element.classList.add('visible')
          }
        }

        const translateX = screenPosition.x * this.sizes.width * 0.5
        const translateY = - screenPosition.y * this.sizes.height * 0.5
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
      }
  }
}
