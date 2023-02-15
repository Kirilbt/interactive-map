import * as THREE from 'three'

import Experience from './Experience.js'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.debug = this.experience.debug

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('camera')
    }

    // // Grid Helper
    // const size = 20;
    // const divisions = 20;

    // const gridHelper = new THREE.GridHelper( size, divisions );
    // this.scene.add(gridHelper)

    // // Axes Helper
    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);

    // Setup
    this.createOrthographicCamera()
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -20,
      20
    )

    this.orthographicCamera.position.x = 3
    this.orthographicCamera.position.y = 1
    this.orthographicCamera.position.z = 3

    this.scene.add(this.orthographicCamera)

    // // Orthographic Camera Helper
    // this.orthographicCameraHelper = new THREE.CameraHelper(this.orthographicCamera)
    // this.scene.add(this.orthographicCameraHelper)
  }

  resize() {
    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustum) / 2
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustum) / 2
    this.orthographicCamera.top = this.sizes.frustum / 2
    this.orthographicCamera.bottom = -this.sizes.frustum / 2
    this.orthographicCamera.updateProjectionMatrix()
  }

  update() {
    // // Updating Orthographic Camera Helper
    // this.orthographicCameraHelper.matrixWorldNeedsUpdate = true
    // this.orthographicCameraHelper.update()
    // this.orthographicCameraHelper.position.copy(this.orthographicCamera.position)
    // this.orthographicCameraHelper.position.copy(this.orthographicCamera.rotation)
  }
}
