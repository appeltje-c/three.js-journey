import { useFrame } from '@react-three/fiber'
import { meshBounds, OrbitControls, useCursor, useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import Hamburger from './Hamburger'

export default function Experience() {

    const cube = useRef()
    const cursor = useCursor(true)
    console.info(cursor)

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
    })

    const eventHandler = (event) => {
        event.stopPropagation()

        const color = Math.random() * 0xffffff
        const otherWayColor = `hsl(${Math.random() * 360}, 100%, 50%)`
        event.object.material.color.set(color)
    }

    const otherEvent = (event) => {

        event.stopPropagation()
        console.info('other')
    }

    const pointerEnter = (event) => {
        event.stopPropagation()
        console.info('enter')

        document.body.style.cursor = 'pointer'
    }

    const pointerLeave = (event) => {
        event.stopPropagation()
        console.info('leave')

        document.body.style.cursor = 'auto'
    }

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <mesh position-x={- 2} onClick={otherEvent}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
            raycast={meshBounds}
            ref={cube}
            position-x={2}
            scale={1.5}
            onClick={eventHandler}
            onContextMenu={eventHandler}
            onPointerEnter={pointerEnter}
            onPointerLeave={pointerLeave}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Hamburger scale={0.2} position={[0, -1, 1]} onClick={eventHandler} />

    </>
}