import { DirectionalLight, Mesh, MeshStandardMaterial, SRGBColorSpace } from "three";
import Experience from "../Experience";
import { texture } from "three/examples/jsm/nodes/Nodes.js";

export default class Environment {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {

            this.debugFolder = this.debug.ui.addFolder('Environment')


        }

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight() {

        this.sunLight = new DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunLight)

        if (this.debug.active) {

            this.debugFolder.add(this.sunLight, 'intensity')
                .min(0)
                .max(10)
                .step(0.001)
                .name('Sun Intensity')

            this.debugFolder.add(this.sunLight.position, 'x')
                .min(0)
                .max(10)
                .step(0.001)
                .name('Sun X')

            this.debugFolder.add(this.sunLight.position, 'y')
                .min(0)
                .max(10)
                .step(0.001)
                .name('Sun Y')

            this.debugFolder.add(this.sunLight.position, 'z')
                .min(0)
                .max(10)
                .step(0.001)
                .name('Sun Z')


        }
    }

    setEnvironmentMap() {

        this.environmentMap = {
            intensity: 0.4
        }

        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = SRGBColorSpace

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {

            this.scene.traverse(child => {

                if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        if (this.debug.active) {

            this.debugFolder.add(this.environmentMap, 'intensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
                .name('Intensity')
        }
    }

}