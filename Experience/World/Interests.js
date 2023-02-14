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
    const mcba = document.querySelector('.mcba')
    const mudac = document.querySelector('.mudac')
    const elysee = document.querySelector('.elysee')
    const closeIcn = document.querySelector('.close')

    const infoPanel = document.querySelector('.info-panel')
    const infoPanelImage = document.querySelector('.info-panel-image')
    const infoPanelLogo = document.querySelector('.info-panel-logo')
    const infoPanelTitle = document.querySelector('.info-panel-title')
    const infoPanelLead = document.querySelector('.info-panel-lead')
    const infoPanelDescription = document.querySelector('.info-panel-description')
    const infoPanelMo = document.querySelector('.info-panel-monday')
    const infoPanelTu = document.querySelector('.info-panel-tuesday')
    const infoPanelWe = document.querySelector('.info-panel-wednesday')
    const infoPanelTh = document.querySelector('.info-panel-thursday')
    const infoPanelFr = document.querySelector('.info-panel-friday')
    const infoPanelSa = document.querySelector('.info-panel-saturday')
    const infoPanelSu = document.querySelector('.info-panel-sunday')
    const infoPanelPhone = document.querySelector('.info-panel-phone')
    const infoPanelEmail = document.querySelector('.info-panel-email')
    const infoPanelWebsite = document.querySelector('.info-panel-website')
    let infoPanelRightStyle = '0'

    const infos = [
      {
        'image': '/images/img-mcba.jpg',
        'logo': '/images/logo-mcba.svg',
        'title': 'Musée Cantonal des Beaux-Arts Lausanne',
        'lead': 'Opened in 1841, the Vaud Museum of Fine Arts in Lausanne is one of the oldest Swiss museums exclusively dedicated to art. Now located in Plateforme 10, it presents several temporary exhibitions a year from its collection of 10,000 works.',
        'description': `Ducros, Gleyre, Steinlen, Vallotton and Soutter: these are some of the Vaudois painters for which the Vaud Museum of Fine Arts (MCBA) is known, nationally and internationally. Their works form a large part of the museum’s collection, currently comprising some 10,000 paintings. <br><br>
        The MCBA organises several temporary exhibitions every year, each one accompanied with a programme of cultural activities including events, guided tours and workshops for adults and children. Admission is free on the first Saturday of the month.`,
        'schedule': [
          'Closed',
          '10:00 - 18:00',
          '10:00 - 18:00',
          '10:00 - 20:00',
          '10:00 - 18:00',
          '10:00 - 18:00',
          '10:00 - 18:00'
        ],
        'contact': [
          '+41 21 316 34 45',
          'mcba@plateforme10.ch'
        ],
        'website': 'https://www.mcba.ch/en/'
      },
      {
        'image': '/images/img-mudac.jpg',
        'logo': '/images/logo-mudac.svg',
        'title': 'Musée Cantonal de Design et d’Arts Appliqués Contemporains',
        'lead': 'mudac – Lausanne’s Museum of Contemporary Design and Applied Arts – is the only institution in Western Switzerland entirely dedicated to design.',
        'description': `It has developed its identity and international reputation through hundreds of ambitious and often unusual exhibitions and continues to pursue a policy of openness and exchange between the many disciplines of contemporary creation. <br><br>
        Its programme showcases designers and artists at solo exhibitions and extends to exhibitions that question the public on contemporary social issues. It demonstrates the museum’s interest in the world and in the wide scope that the term design itself can encompass. <br><br>
        The diversity of points of view of each project has enabled mudac to assert itself both on the national and international scene by offering its exhibitions to its counterparts. Europe and Asia have thus been able to discover exhibitions made in mudac on numerous occasions.`,
        'schedule': [
          '10:00 - 18:00',
          'Closed',
          '10:00 - 18:00',
          '10:00 - 20:00',
          '10:00 - 18:00',
          '10:00 - 18:00',
          '10:00 - 18:00'
        ],
        'contact': [
          '+41 21 318 44 00',
          'mudac@plateforme10.ch'
        ],
        'website': 'https://mudac.ch/en/'
      },
      {
        'image': '/images/img-elysee.jpg',
        'logo': '/images/logo-elysee.svg',
        'title': 'Photo Elysée',
        'lead': 'Photo Elysée is one of the most important museums entirely dedicated to the photographic medium. Each year, we produce demanding exhibitions, distribute reference editorial content, conceive innovative events and offer events open to all.',
        'description': `Since its creation in 1985 as a “museum for photography”, Photo Elysée has been questioning the permanent reinvention of the medium through the great figures who have marked its history by imagining new ways of seeing or making people see, while revealing in a privileged way the emerging photography which, through unseen views, bears witness to the world of today and prefigures that of tomorrow. In other words: to cover all the subjects of photography, to discover them sometimes, and above all to make them rediscovered. <br><br>
        The museum’s collection of more than 1,200,000 phototypes covers the entire field of photography, from the first processes dating from the 1840s to the digital image. It includes many complete photographic collections or archives, including those of Sabine Weiss, Jan Groover, René Burri, Ella Maillart, Nicolas Bouvier, Charlie Chaplin, Gertrude Fehr, Hans Steiner and Olivier Föllmi.`,
        'schedule': [
          '10:00 - 18:00',
          'Closed',
          '10:00 - 18:00',
          '10:00 - 20:00',
          '10:00 - 18:00',
          '10:00 - 18:00',
          '10:00 - 18:00'
        ],
        'contact': [
          '+41 21 318 44 00',
          'info@elysee.ch'
        ],
        'website': 'https://elysee.ch/en'
      },
    ]

    if (this.device === 'desktop') {
      infoPanelRightStyle  = '-33%'
    } else {
      infoPanelRightStyle  = '-100%'
    }

    mcba.addEventListener('click', () => {
      infoPanel.scrollTop = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[0].image
      infoPanelLogo.src = infos[0].logo
      infoPanelTitle.innerHTML = infos[0].title
      infoPanelLead.innerHTML = infos[0].lead
      infoPanelDescription.innerHTML = infos[0].description
      infoPanelMo.innerHTML = infos[0].schedule[0]
      infoPanelTu.innerHTML = infos[0].schedule[1]
      infoPanelWe.innerHTML = infos[0].schedule[2]
      infoPanelTh.innerHTML = infos[0].schedule[3]
      infoPanelFr.innerHTML = infos[0].schedule[4]
      infoPanelSa.innerHTML = infos[0].schedule[5]
      infoPanelSu.innerHTML = infos[0].schedule[6]
      infoPanelPhone.innerHTML = infos[0].contact[0]
      infoPanelEmail.innerHTML = infos[0].contact[1]
      infoPanelWebsite.href = infos[0].website
    });

    mudac.addEventListener('click', () => {
      infoPanel.scrollTop = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[1].image
      infoPanelLogo.src = infos[1].logo
      infoPanelTitle.innerHTML = infos[1].title
      infoPanelLead.innerHTML = infos[1].lead
      infoPanelDescription.innerHTML = infos[1].description
      infoPanelMo.innerHTML = infos[1].schedule[0]
      infoPanelTu.innerHTML = infos[1].schedule[1]
      infoPanelWe.innerHTML = infos[1].schedule[2]
      infoPanelTh.innerHTML = infos[1].schedule[3]
      infoPanelFr.innerHTML = infos[1].schedule[4]
      infoPanelSa.innerHTML = infos[1].schedule[5]
      infoPanelSu.innerHTML = infos[1].schedule[6]
      infoPanelPhone.innerHTML = infos[1].contact[0]
      infoPanelEmail.innerHTML = infos[1].contact[1]
      infoPanelWebsite.href = infos[1].website
    });

    elysee.addEventListener('click', () => {
      infoPanel.scrollTop = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[2].image
      infoPanelLogo.src = infos[2].logo
      infoPanelTitle.innerHTML = infos[2].title
      infoPanelLead.innerHTML = infos[2].lead
      infoPanelDescription.innerHTML = infos[2].description
      infoPanelMo.innerHTML = infos[2].schedule[0]
      infoPanelTu.innerHTML = infos[2].schedule[1]
      infoPanelWe.innerHTML = infos[2].schedule[2]
      infoPanelTh.innerHTML = infos[2].schedule[3]
      infoPanelFr.innerHTML = infos[2].schedule[4]
      infoPanelSa.innerHTML = infos[2].schedule[5]
      infoPanelSu.innerHTML = infos[2].schedule[6]
      infoPanelPhone.innerHTML = infos[2].contact[0]
      infoPanelEmail.innerHTML = infos[2].contact[1]
      infoPanelWebsite.href = infos[2].website
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
