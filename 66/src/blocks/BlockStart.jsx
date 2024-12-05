import { Float, Text } from "@react-three/drei";

export default function BlockStart({ geometry, material, position = [0, 0, 0] }) {

    return (
        <group position={position}>
            <Float floatIntensity={0.25} rotationIntensity={0.25}>
                <Text
                    font='./bebas-neue-v9-latin-regular.woff'
                    scale={0.3}
                    maxWidth={0.25}
                    lineHeight={0.75}
                    textAlign="right"
                    position={[0.9, 0.65, 0]}
                    rotation-y={-0.8}>
                    Marble Race
                </Text>
            </Float>
            <mesh
                position={[0, -0.1, 0]}
                geometry={geometry}
                material={material}
                scale={[4, 0.2, 4]}
                receiveShadow />
        </group>
    )
}