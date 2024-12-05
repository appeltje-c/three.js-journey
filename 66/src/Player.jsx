import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import useGame from "./stores/useGame";

export default function Player() {

    const marble = useRef()
    const [smoothCameraPosition] = useState(() => new Vector3(10, 10, 10))
    const [smoothCameraTarget] = useState(() => new Vector3())

    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { rapier, world } = useRapier()

    const start = useGame(state => state.start)
    const end = useGame(state => state.end)
    const restart = useGame(state => state.restart)
    const phase = useGame(state => state.phase)
    const blocksCount = useGame(state => state.blocksCount)

    useFrame((state, delta) => {

        const { forward, backward, leftward, rightward } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if (rightward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }
        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if (leftward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        marble.current.applyImpulse(impulse)
        marble.current.applyTorqueImpulse(torque)

        /**
         * Camera
         */
        const marblePosition = marble.current.translation()
        const cameraPosition = new Vector3()
        cameraPosition.copy(marblePosition)
        cameraPosition.z += 2.25
        cameraPosition.y += 0.65

        const cameraTarget = new Vector3()
        cameraTarget.copy(marblePosition)
        cameraTarget.y += 0.25

        smoothCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothCameraPosition)
        state.camera.lookAt(smoothCameraTarget)

        /**
         * Phases
         */
        if (marblePosition.z < - (blocksCount * 4 + 2)) {
            end()
        }

        if (marblePosition.y < -4) {
            restart()
        }
    })

    const jump = () => {

        const origin = marble.current.translation()
        origin.y -= 0.31
        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)

        const hit = world.castRay(ray, 10, true)

        if (hit.timeOfImpact < 0.15) {
            marble.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
        }
    }

    const reset = () => {

        marble.current.setTranslation({ x: 0, y: 1, z: 0 })
        marble.current.setLinvel({ x: 0, y: 0, z: 0 })
        marble.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    useEffect(() => {

        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (phase) => {
                if (phase === 'ready') {
                    console.info('call reset')
                    reset()
                }
            })

        const unsubscribe = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value) jump()
            })

        const unsubscribeAny = subscribeKeys(() => {
            start()
        })

        return () => {
            unsubscribeReset()
            unsubscribe()
            unsubscribeAny()
        }
    }, [])

    return (
        <>
            <RigidBody
                ref={marble}
                type="dynamic"
                canSleep={false}
                colliders="ball"
                position={[0, 1, 0]}
                restitution={0.2}
                friction={1}
                linearDamping={0.5}
                angularDamping={0.5}>
                <mesh castShadow>
                    <icosahedronGeometry args={[0.3, 1]} />
                    <meshStandardMaterial flatShading color="mediumpurple" />
                </mesh>
            </RigidBody>
        </>
    )
}