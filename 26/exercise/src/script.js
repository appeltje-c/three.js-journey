import './style.css'
import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector('canvas.webgl'))


// /**
//  * Loaders
//  */
// const gltfLoader = new GLTFLoader()
// const textureLoader = new THREE.TextureLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// /**
//  * Base
//  */
// // Debug
// const gui = new GUI()
// const debugObject = {}

// /**
//  * Update all materials
//  */
// const updateAllMaterials = () =>
// {
//     scene.traverse((child) =>
//     {
//         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
//         {
//             // child.material.envMap = environmentMap
//             child.material.envMapIntensity = debugObject.envMapIntensity
//             child.material.needsUpdate = true
//             child.castShadow = true
//             child.receiveShadow = true
//         }
//     })
// }

// /**
//  * Environment map
//  */
// const environmentMap = cubeTextureLoader.load([
//     '/textures/environmentMap/px.jpg',
//     '/textures/environmentMap/nx.jpg',
//     '/textures/environmentMap/py.jpg',
//     '/textures/environmentMap/ny.jpg',
//     '/textures/environmentMap/pz.jpg',
//     '/textures/environmentMap/nz.jpg'
// ])

// environmentMap.colorSpace = THREE.SRGBColorSpace

// // scene.background = environmentMap
// scene.environment = environmentMap

// debugObject.envMapIntensity = 0.4
// gui.add(debugObject, 'envMapIntensity').min(0).max(4).step(0.001).onChange(updateAllMaterials)

// /**
//  * Models
//  */
// let foxMixer = null

// gltfLoader.load(
//     '/models/Fox/glTF/Fox.gltf',
//     (gltf) =>
//     {
//         // Model
//         gltf.scene.scale.set(0.02, 0.02, 0.02)
//         scene.add(gltf.scene)

//         // Animation
//         foxMixer = new THREE.AnimationMixer(gltf.scene)
//         const foxAction = foxMixer.clipAction(gltf.animations[0])
//         foxAction.play()

//         // Update materials
//         updateAllMaterials()
//     }
// )

// /**
//  * Floor
//  */
// const floorColorTexture = textureLoader.load('textures/dirt/color.jpg')
// floorColorTexture.colorSpace = THREE.SRGBColorSpace
// floorColorTexture.repeat.set(1.5, 1.5)
// floorColorTexture.wrapS = THREE.RepeatWrapping
// floorColorTexture.wrapT = THREE.RepeatWrapping

// const floorNormalTexture = textureLoader.load('textures/dirt/normal.jpg')
// floorNormalTexture.repeat.set(1.5, 1.5)
// floorNormalTexture.wrapS = THREE.RepeatWrapping
// floorNormalTexture.wrapT = THREE.RepeatWrapping

// const floorGeometry = new THREE.CircleGeometry(5, 64)
// const floorMaterial = new THREE.MeshStandardMaterial({
//     map: floorColorTexture,
//     normalMap: floorNormalTexture
// })
// const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)


// gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
// gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
// gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
// gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let previousTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime

//     // Update controls
//     controls.update()

//     // Fox animation
//     if(foxMixer)
//     {
//         foxMixer.update(deltaTime)
//     }

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()