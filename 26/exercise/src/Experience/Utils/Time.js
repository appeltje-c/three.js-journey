import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {

    /**
     * The time the project started
     */
    start

    /**
     * The current time
     */
    current

    /**
     * How much time passed
     */
    elapsed

    /**
     * The time between frames
     */
    delta

    /**
     * 
     */
    constructor() {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {

        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}