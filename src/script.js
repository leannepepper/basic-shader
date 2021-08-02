import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import Spring from 'tiny-spring'
import testVertexShader from './shaders/test/vertex.glsl'
//import testFragmentShader from './shaders/test/fragment.glsl'
//import testFragmentShader from './shaders/test/algorithmic-fragment.glsl'
import testFragmentShader from './shaders/test/profile-fragment.glsl'

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const flagTexture = textureLoader.load('/textures/flag-french.jpg')

/**
 * Fonts
 */

 const fontLoader = new THREE.FontLoader()

 fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new THREE.TextGeometry(
            'Leanne Werner',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const textMaterial = new THREE.MeshBasicMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.rotateY(-30)
        scene.add(text)
    }
)


/**
 * Test mesh
 */
// Geometry

var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
const count = geometry.attributes.position.count;
const randoms = new Float32Array(count)

for(let i = 0; i < count; i++){
    randoms[i] = Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
   uniforms : {
       u_frequency: {value: new THREE.Vector2(10,5)},
       uTexture: {value: flagTexture},
       u_time: {value: 0},
       u_resolution: { value: new THREE.Vector2() },
       u_mouse: { value: new THREE.Vector2() },
   }
})
material.side = THREE.DoubleSide;
//gui.add(material.uniforms.u_frequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
//gui.add(material.uniforms.u_frequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')

// Mesh
for(let i = 0; i < 200; i++) {
const star = new THREE.Mesh(geometry, material)
star.position.x = (Math.random() - 0.5) * 25
star.position.y = (Math.random() - 0.5) * 25
star.position.z = (Math.random() - 0.5) * 25

const scale = Math.random()
star.scale.set(scale, scale, scale)

scene.add(star)
}
/**
 * Mouse Move 
 */
function handleMouseMove(evt){
        material.uniforms.u_mouse.value.x = evt.clientX * 0.001;
        material.uniforms.u_mouse.value.y = evt.clientY * 0.001;
}

window.addEventListener('mousemove', handleMouseMove)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
    material.uniforms.u_resolution.value.x = renderer.domElement.width;
    material.uniforms.u_resolution.value.y = renderer.domElement.height;
})

/**
 * Camera
 */
// Base camera
let maxZoom = 100.0;
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(maxZoom, 0.0, 1)
scene.add(camera)

/** 
 * Spring Animation
*/

const spring = Spring(maxZoom, {stiffness: 300, damping: 40});

spring.onUpdate(val => {
    camera.position.set(val, 0.0, 1)
 });
  
spring.setValue(maxZoom);

spring.transitionTo(10.0);

spring.onRest(() => {
    spring.destroy();
});


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

material.uniforms.u_resolution.value.x = renderer.domElement.width;
material.uniforms.u_resolution.value.y = renderer.domElement.height;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
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