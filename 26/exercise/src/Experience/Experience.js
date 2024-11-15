import { Mesh, Scene } from 'three';
import Sizes from './Utils/Sizes'
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import sources from './sources'
import Debug from './Utils/Debug';

let instance = null

export default class Experience {

    /**
     * Reference to the canvas in the DOM
     * document.querySelector('class|id ')
     */
    canvas

    /**
     * The app sizing
     */
    sizes

    /**
     * The timer
     */
    time

    /**
     * Create a new experience
     * 
     * @param {*} canvas The canvas to render on 
     */
    constructor(canvas) {

        if (instance) {
            return instance
        }

        instance = this

        // Global access
        window.experience = this

        // Set members
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time passing event
        this.time.on('tick', () => {
            this.update()
        })


    }

    resize() {
        this.camera.resize()
        this.renderer.resize()

    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse scene
        this.scene.traverse(child => {

            if (child instanceof Mesh) {

                child.geometry.dispose()

                for (const key in child.material) {

                    const value = child.material[key]

                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active)
            this.debug.ui.destroy()




    }
}