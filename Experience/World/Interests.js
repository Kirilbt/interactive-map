import * as THREE from 'three'
import Experience from '../Experience.js'
import { EventEmitter } from 'events'
import gsap from 'gsap'

export default class Interests {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.debug = this.experience.debug
    this.device = this.sizes.device

    this.sizes.on('switchdevice', (device) => {
      this.device = device
      console.log(device);
    })

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('interest1')
    }

    this.obj = {
      x: 4,
      y: 1.2,
      z: 0.5
    }

    // Setup
    this.points = []
    this.raycaster = new THREE.Raycaster()
    this.setInterests()
    this.showInfos()
  }

  setInterests() {
    this.points = [
      {
        position: new THREE.Vector3(4, 1.2, 0.5),
        element: document.querySelector('.mcba')
      },
      {
        position: new THREE.Vector3(-3.75, 1.2, 0.3),
        element: document.querySelector('.mudac')
      },
      {
        position: new THREE.Vector3(-3.75, 1.2, -1.55),
        element: document.querySelector('.elysee')
      },
      {
        position: new THREE.Vector3(1.85, 0.9, -1.05),
        element: document.querySelector('.lift')
      },
      {
        position: new THREE.Vector3(-0.65, 0.25, -1.2),
        element: document.querySelector('.restaurant')
      }
    ]

    // Debug
    if(this.debug.active) {
        this.debugFolder
        .add(this.points[4].position, 'x')
        .name('x4')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[4].position, 'y')
        .name('y4')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[4].position, 'z')
        .name('z4')
        .min(-10)
        .max(10)
        .step(0.01)
    }
  }

  showInfos() {
    // Show Panel
    const mcbaToggle = document.querySelector('.mcba')
    const infoPanel = document.querySelector('.info-panel')
    const closeIcn = document.querySelector('.close')
    let infoPanelRightStyle = '0'

    if (this.device === 'desktop') {
      infoPanelRightStyle  = '-33%'
    } else {
      infoPanelRightStyle  = '-100%'
    }

    mcbaToggle.addEventListener('click', () => {
      infoPanel.style.right = '0'
    });

    closeIcn.addEventListener('click', () => {
      infoPanel.style.right = infoPanelRightStyle
    });
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
