import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { BallCollider, CuboidCollider, CylinderCollider, InstancedRigidBodies, Physics, RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Euler, Matrix4, Quaternion, Vector3 } from 'three'

export default function Experience() {

    const cubesCount = 300

    const hamburger = useGLTF('./hamburger.glb')

    const cube = useRef()
    const twister = useRef()

    const instances = useMemo(() => {

        const instances = []
        for (let i = 0; i < cubesCount; i++) {
            instances.push({
                key: `${i}`,
                position: [
                    (Math.random() - 0.5) * 8,
                    6 + i * 0.2,
                    (Math.random() - 0.5) * 8
                ],
                rotation: [0, 0, 0]
            })
        }

        return instances
    }, [])

    const [hitSound] = useState(() => new Audio('./hit.mp3'))

    const jump = (event) => {

        const mass = cube.current.mass()
        console.info(mass)

        cube.current.applyImpulse({
            x: 0,
            y: 5 * mass,
            z: 0
        })

        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        })
    }

    useFrame((state) => {

        const time = state.clock.getElapsedTime()
        const eulerRotation = new Euler(0, time * 3, 0)
        const quaternionRotation = new Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current?.setNextKinematicRotation(quaternionRotation)


        const angle = time * 0.5;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;

        twister.current?.setNextKinematicTranslation({ x, y: -0.8, z })
    })

    const collisionEnter = (e) => {

        // console.info('Collision Enter', e)
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    const collisionExit = (e) => {
        // console.info('Collision Exit', e)
    }


    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1.5} />

            <Physics gravity={[0, -9.08, 0]} debug={false}>

                <RigidBody colliders="ball" >
                    <mesh castShadow position={[-1.5, 2, 0]}>
                        <sphereGeometry />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                </RigidBody>

                <RigidBody
                    ref={cube}
                    position={[1.5, 2, 0]}
                    gravityScale={1}
                    restitution={0}
                    friction={0.01}
                    colliders={false}
                    onCollisionEnter={collisionEnter}
                // onCollisionExit={collisionExit}
                // onSleep={() => console.info('sleep')}
                // onWake={() => console.info('awake')}
                >
                    <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
                    <mesh castShadow onClick={jump}>
                        <boxGeometry />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                </RigidBody>

                <RigidBody
                    ref={twister}
                    position={[0, -0.8, 0]}
                    friction={0}
                    type='kinematicPosition'>
                    <mesh receiveShadow scale={[0.4, 0.4, 3]}>
                        <boxGeometry />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </RigidBody>

                <RigidBody colliders={false} position={[0, 4, 0]}>
                    <primitive
                        object={hamburger.scene}
                        scale={0.2}
                        position-y={0}
                    />
                    <CylinderCollider args={[0.5, 1.25]} />
                </RigidBody>

                <RigidBody type='fixed'>
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
                </RigidBody>

                <RigidBody type='fixed' friction={0.1}>
                    <BallCollider args={[0.5]} position={[0, 2.5, 0]} />
                    <mesh receiveShadow position-y={- 1.25}>
                        <boxGeometry args={[10, 0.5, 10]} />
                        <meshStandardMaterial color="greenyellow" />
                    </mesh>
                </RigidBody>

                <InstancedRigidBodies instances={instances}>
                    <instancedMesh args={[null, null, cubesCount]}>
                        <boxGeometry />
                        <meshStandardMaterial color="orange" />
                    </instancedMesh>
                </InstancedRigidBodies>

            </Physics>
        </>
    )
}