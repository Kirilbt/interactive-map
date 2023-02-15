import { clamp, lerp } from '../Utils/math.js'

export default class Scrolling {
  constructor({
    blockers = ['menu--open'],
    easing = 0.07,
    element,
    speed = 1,
    trigger = document.querySelector('.info-panel-content')
  }) {
    this.blockers = blockers
    this.element = element
    this.speed = speed
    this.trigger = trigger
    this.wrapper = element.children[0]

    this.current = 0
    this.target = 0
    this.easing = easing
    this.limit = 0

    this.addObserver()
    this.addEventListeners()
  }

  onWheel ({ deltaY }) {
    if (this.blockers.some(className => document.documentElement.classList.contains(className))) return

    this.target += deltaY * this.speed
  }

  onTouchStart (event) {
    if (this.blockers.some(className => document.documentElement.classList.contains(className))) return

    this.isDown = true

    this.y = event.touches ? event.touches[0].clientY : event.clientY
    this.position = this.current
  }

  onTouchMove (event) {
    if (!this.isDown) return

    const y = event.touches ? event.touches[0].clientY : event.clientY
    const distance = this.y - y

    this.target = this.position + (distance * 3)
  }

  onTouchEnd (event) {
    this.isDown = false
  }

  addObserver() {
    this.observer = new window.ResizeObserver(entries => {
      for (const entry of entries) {
        this.resize()
      }
    })

    this.observer.observe(this.wrapper)
  }

  addEventListeners () {
    this.trigger.addEventListener('wheel', this.onWheel.bind(this))

    this.trigger.addEventListener('touchstart', this.onTouchStart.bind(this))
    this.trigger.addEventListener('touchmove', this.onTouchMove.bind(this))
    this.trigger.addEventListener('touchend', this.onTouchEnd.bind(this))

    this.trigger.addEventListener('mousedown', this.onTouchStart.bind(this))
    this.trigger.addEventListener('mousemove', this.onTouchMove.bind(this))
    this.trigger.addEventListener('mouseup', this.onTouchEnd.bind(this))
  }

  removeEventListeners () {
    this.trigger.removeEventListener('wheel', this.onWheel.bind(this))

    this.trigger.removeEventListener('touchstart', this.onTouchStart.bind(this))
    this.trigger.removeEventListener('touchmove', this.onTouchMove.bind(this))
    this.trigger.removeEventListener('touchend', this.onTouchEnd.bind(this))

    this.trigger.removeEventListener('mousedown', this.onTouchStart.bind(this))
    this.trigger.removeEventListener('mousemove', this.onTouchMove.bind(this))
    this.trigger.removeEventListener('mouseup', this.onTouchEnd.bind(this))
  }

  update () {
    this.target = clamp(this.target, 0, this.limit)
    this.current = lerp(this.current, this.target, this.easing)

    this.element.style.transform = `translate3d(0, -${this.current + 60}px, 0)`
  }

  resize() {
    this.limit = this.wrapper.clientHeight - this.element.clientHeight
  }
}
