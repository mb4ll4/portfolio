import * as THREE from '/js/three.js-master/build/three.module.js';
import { GLTFLoader } from '/js/three.js-master/examples/jsm/loaders/GLTFLoader.js';
//import { OrbitControls } from './three/OrbitControls.js';
//import * as dat from "/three.js-master/examples/jsm/libs/dat.gui.module.js";
import Stats from "/js/three.js-master/examples/jsm/libs/stats.module.js";


class Plane {
    constructor() {
      this.$ = {
        canvas: document.getElementById('plane')
      }
      this.mouse = {
        x: 0,
        y: 0
      };
  
      this.width = window.innerWidth
      this.height = window.innerHeight
  
      this.renderer = null
      this.scene = null
      this.camera = null
      this.cameraAspect = this.width / this.height
  
      this.resize = this.resize.bind(this)
      this.mouseMove = this.mouseMove.bind(this)
  
      this.init()
    }
  
    init() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      document.body.appendChild(this.renderer.domElement)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.width, this.height)
  
      this.scene = new THREE.Scene()
      this.scene.fog = new THREE.Fog( 0x000000, 1, 120 )
  
      this.camera = new THREE.PerspectiveCamera(45, this.cameraAspect, 1, 1000)
      this.camera.position.y = this.cameraAspect > 1 ? 10 / this.cameraAspect : 10 * this.cameraAspect
      this.camera.position.z = this.cameraAspect > 1 ? 70 / this.cameraAspect : 70 * this.cameraAspect
      
      this.clock = 0
      
      this.events()
      this.elements()
      this.lights()
      this.update()
    }
  
    resize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.cameraAspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.camera.position.y = this.cameraAspect > 1 ? 10 / this.cameraAspect : 10 * this.cameraAspect
      this.camera.position.z = this.cameraAspect > 1 ? 70 / this.cameraAspect : 70 * this.cameraAspect
      this.renderer.setSize(this.width, this.height)
      console.log(this.cameraAspect)
    }
  
    mouseMove(e) {
      this.mouse.x = e.clientX || e.touches[0].clientX
      this.mouse.y = e.clientY || e.touches[0].clientY
    }
  
    events() {
      window.addEventListener('resize', this.resize, false)
      window.addEventListener('mousemove', this.mouseMove, false)
      window.addEventListener('touchstart', this.mouseMove, false)
      window.addEventListener('touchmove', this.mouseMove, false)
    }
  
    elements() {
      this.geometry = new THREE.PlaneBufferGeometry( 100, 100, 100, 7)
      this.material = new THREE.MeshLambertMaterial({
        color: 0xff0000
      })
      this.plane = new THREE.Mesh(this.geometry, this.material)
      this.plane.rotation.x = Math.PI * -0.5
      this.plane.rotation.z = Math.PI * 0.25
      this.scene.add(this.plane)
      
      this.noise = new SimplexNoise()
      this.peak = 2
      this.smoothness = 40
      this.speed = 35
    }
    
    refreshVertex() {
      this.vertices = this.plane.geometry.attributes.position.array
      for(let i = 0; i <= this.vertices.length; i+=3) {
        this.vertices[i + 2] = (this.peak) * this.noise.noise2D(this.vertices[i] / this.smoothness + this.clock / this.speed, this.vertices[i + 1] / this.smoothness + this.clock / this.speed)
      }
      this.plane.geometry.attributes.position.needsUpdate = true
      this.plane.geometry.computeVertexNormals()
    }
  
    lights() {
      this.light = new THREE.DirectionalLight(0x666666, 1.8)
      this.light.position.set(-50, 50, 100)
      this.scene.add(this.light)
    }
  
    update() {
      this.clock += 0.1
      this.refreshVertex()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(() => { this.update() })
    }
  }
  
  const plane = new Plane()