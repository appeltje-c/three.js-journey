import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"

export default function BlockAxe({ geometry, floorMaterial, obstacleMaterial, position = [0, 0, 0] }) {

    const obstacle = useRef()
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) => {

        const time = state.clock.getElapsedTime()
        const x = Math.sin(time + timeOffset) * 1.25
        obstacle.current.setNextKinematicTranslation({ x, y: position[1] + 0.75, z: position[2] })
    })

    return (
        <group position={position}>

            <mesh position={[0, -0.1, 0]} geometry={geometry} material={floorMaterial} scale={[4, 0.2, 4]} receiveShadow />

            <RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
                <mesh geometry={geometry} material={obstacleMaterial} scale={[1.5, 1.5, 0.3]} castShadow receiveShadow />
            </RigidBody>
        </group>
    )
}
