import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import { extend, useFrame, useThree } from "@react-three/fiber"
import CustomObject from "./CustomObject"

extend({ OrbitControls })

export default function Experience() {

    const { camera, gl } = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()


    useFrame((state, delta) => {

        cubeRef.current.rotation.y += delta

        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 1
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)



    })

    return (
        <>

            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1} />


            <group ref={groupRef}>

                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>

                <mesh ref={cubeRef} scale={1.5} position-x={2} rotateY={Math.PI * 0.25}>
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial color="blue" />
                </mesh>
            </group>

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="green" />
            </mesh>

            <CustomObject />

        </>
    )
}