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
    this.onMouseMove()
    this.setPlateforme10Group()
  }

  setPlateforme10Model() {
    // const bakedTextureA = new THREE.MeshBasicMaterial({ map: this.resources.items.textureBuildings })
    // const bakedTextureB = new THREE.MeshBasicMaterial({ map: this.resources.items.textureMdba })
    // const bakedTextureC = new THREE.MeshBasicMaterial({ map: this.resources.items.textureMudacDetails })
    // const bakedTextureD = new THREE.MeshBasicMaterial({ map: this.resources.items.textureTerrain })
    // bakedTextureD.flipY = false
    // bakedTextureD.encoding = THREE.sRGBEncoding

    const lightPanelTexture = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
    const tempTexture = new THREE.MeshBasicMaterial({ color: 0xff00cc })

    this.actualPlateforme10.traverse((child) => {

      child.material = tempTexture

      if(child.name.match(/^lightPanel.*$/)) {
        child.material = lightPanelTexture
      }

      this.plateforme10Children[child.name.toLowerCase()] = child
    })
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth // makes the position of the cursor from -1 to 1
      this.lerp.target = this.rotation * 0.3
    })
  }

  setPlateforme10Group() {
    // New group so we can rotate the Plateforme10 with GSAP without intefering with our mouse rotation lerping
    // Like a spinning plateform that can spin independetly from others
    this.group = new THREE.Group()
    this.group.add(this.actualPlateforme10)
    this.scene.add(this.group)
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )

    this.group.rotation.y = this.lerp.current
  }
}
