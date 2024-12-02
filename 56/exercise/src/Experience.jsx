import { useRef } from "react"
import { Float, Text, Html, TransformControls, OrbitControls, PivotControls, MeshReflectorMaterial } from "@react-three/drei"

export default function Experience() {

    const cube = useRef()
    const sphere = useRef()

    return (
        <>

            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1.5} />

            <mesh ref={cube} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls object={cube} />

            <PivotControls
                axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
                lineWidth={4}
                depthTest={false}
                anchor={[0, 0, 0]}>
                <mesh position-x={- 2}>
                    <sphereGeometry ref={sphere} />
                    <meshStandardMaterial color="orange" />
                    <Html
                        position={[1, 1, 0]}
                        wrapperClass="label"
                        center
                        occlude="blending"
                        distanceFactor={5}>This is a Sphere</Html>
                </mesh>
            </PivotControls>


            <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <MeshReflectorMaterial resolution={512} mirror={0.5} blur={[1000, 1000]} mixBlur={1} color={'lightblue'} />
                {/* <meshStandardMaterial color="greenyellow" /> */}
            </mesh>

            <Float speed={5} floatIntensity={2}>
                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={1}
                    color={'hotpink'}
                    position-y={1.5}>
                    R3F is Fanstastic!
                </Text>
            </Float>

        </>
    )
}