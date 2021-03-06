import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Mesh
 */

// Geometry
const geometry = new THREE.CircleGeometry(5, 52)
const count = geometry.attributes.position.count
const randoms = new Float32Array(count)

for (let i = 0; i < count; i++) {
  randoms[i] = Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

function hexToRgb (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16) * 0.01,
        g: parseInt(result[2], 16) * 0.01,
        b: parseInt(result[3], 16) * 0.01
      }
    : null
}

const colorsToConvert = ['#7733bb', '#992233', '#ff3322', '#44dd88', '#22dd88']
const colors = []

colorsToConvert.forEach(color => {
  const colorToRGB = hexToRgb(color)
  colors.push(new THREE.Vector3(colorToRGB.r, colorToRGB.g, colorToRGB.b))
})

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  uniforms: {
    u_frequency: { value: new THREE.Vector2(10, 5) },
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() },
    u_color_palette: { value: colors }
  }
})
material.side = THREE.DoubleSide

//gui.add(material.uniforms.u_frequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
//gui.add(material.uniforms.u_frequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
//}
/**
 * Mouse Move
 */
function handleMouseMove (evt) {
  material.uniforms.u_mouse.value.x = evt.clientX * 0.001
  material.uniforms.u_mouse.value.y = evt.clientY * 0.001
}

window.addEventListener('mousemove', handleMouseMove)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  //Update uniforms
  material.uniforms.u_resolution.value.x = renderer.domElement.width
  material.uniforms.u_resolution.value.y = renderer.domElement.height
})

/**
 * Camera
 */
// Base camera

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.set(0.25, 0.25, 8)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

material.uniforms.u_resolution.value.x = renderer.domElement.width
material.uniforms.u_resolution.value.y = renderer.domElement.height

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Update material
  material.uniforms.u_time.value = elapsedTime

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
