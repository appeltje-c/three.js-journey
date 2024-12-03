import { useFrame, useThree } from '@react-three/fiber'
import { Stage, Lightformer, Environment, Sky, ContactShadows, AccumulativeShadows, useHelper, OrbitControls, RandomizedLight } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'
import { DirectionalLightHelper } from 'three'
import { useControls } from 'leva'

export default function Experience() {

    const cube = useRef()

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
    })

    return (
        <>
            <Perf position="top-left" />
            <OrbitControls makeDefault />

            <Stage
                shadows={{
                    type: 'contact',
                    opacity: 0.4,
                    blur: 2
                }}
                environment='sunset'
                preset='portrait'
                intensity={2}>

                <mesh position-x={- 2} castShadow>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>

                <mesh ref={cube} position-x={2} scale={1.5} castShadow>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </Stage>

        </>
    )
}