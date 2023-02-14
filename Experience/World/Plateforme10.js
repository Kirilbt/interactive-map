import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Bike {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.plateforme10 = this.resources.items.plateforme10
    this.actualPlateforme10 = this.plateforme10.scene
    this.plateforme10Children = {}

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('plateforme10')
      this.obj = {
        colorObj: {r:0 , g: 0, b: 0}
      }
    }

    this.setPlateforme10Model()
  }

  setPlateforme10Model() {
    const textureBuildings = this.resources.items.textureBuildings
    textureBuildings.flipY = false
    textureBuildings.encoding = THREE.sRGBEncoding
    const materialBuildings = new THREE.MeshBasicMaterial({ map: textureBuildings })

    const textureMdba = this.resources.items.textureMdba
    textureMdba.flipY = false
    textureMdba.encoding = THREE.sRGBEncoding
    const materialMdba = new THREE.MeshBasicMaterial({ map: textureMdba })

    const textureMudacDetails = this.resources.items.textureMudacDetails
    textureMudacDetails.flipY = false
    textureMudacDetails.encoding = THREE.sRGBEncoding
    const materialMudacDetails = new THREE.MeshBasicMaterial({ map: textureMudacDetails })

    const textureTerrain = this.resources.items.textureTerrain
    textureTerrain.flipY = false
    textureTerrain.encoding = THREE.sRGBEncoding
    const materialTerrain = new THREE.MeshBasicMaterial({ map: textureTerrain })

    const lightPanelTexture = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

    this.actualPlateforme10.traverse((child) => {
      if(child.name.match(/^mdba.*$/)) {
        child.material = materialMdba
      }

      if(child.name.match(/^mudac.*$/)) {
        child.material = materialMudacDetails
      }

      if(child.name.match(/^terrain.*$/)) {
        child.material = materialTerrain
      }

      if(child.name.match(/^buildings.*$/)) {
        child.material = materialBuildings
      }

      if(child.name.match(/^lightPanel.*$/)) {
        child.material = lightPanelTexture
      }
    })

    this.scene.add(this.actualPlateforme10)
  }

  resize() {}

  update() {
  }
}
