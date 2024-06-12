import * as THREE from 'three'

// Handle to the canvas in the html file
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Create a mesh
// A mesh is a shape (object) and a material
const cube = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(cube, material)

// add our mesh to the scene
scene.add(mesh)

// without a camera we cannot see anything
// we use a perspective camera
// 2 needed params:
//  - field of view (which is vertical in degrees, default 50)
//  - aspect ratio 

// the aspect ratio is based on width and height 
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)