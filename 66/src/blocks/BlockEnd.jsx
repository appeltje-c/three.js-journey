import { Text, useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

export default function BlockEnd({ geometry, material, position = [0, 0, 0] }) {

    const hamburger = useGLTF('./hamburger.glb')

    hamburger.scene.children.forEach((child) => {
        child.castShadow = true
    })

    return (
        <group position={position}>
            <Text
                font='./bebas-neue-v9-latin-regular.woff'
                scale={0.5}
                position={[0, 2, 2]}>
                FINISH
                <meshBasicMaterial toneMapped={false} />
            </Text>
            <mesh
                position={[0, 0, 0]}
                geometry={geometry}
                material={material}
                scale={[4, 0.2, 4]}
                receiveShadow />
            <RigidBody type="fixed" colliders="hull" position={[0, 0.25, 0]} restitution={0.2} friction={0}>
                <primitive object={hamburger.scene} scale={0.2} />
            </RigidBody>
        </group>
    )
}
