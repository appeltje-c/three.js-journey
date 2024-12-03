import { shaderMaterial, Sparkles, Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { Color } from 'three'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new Color('#fffded'),
        uColorEnd: new Color('#fffef9'),
    },
    portalVertexShader,
    portalFragmentShader)

extend({ PortalMaterial })

export default function Experience() {

    const portalMaterial = useRef()
    const { nodes } = useGLTF('./model/portal.glb')
    const texture = useTexture('./model/baked.jpg')
    texture.flipY = false

    useFrame(({ clock }) => {
        portalMaterial.current.uTime = clock.getElapsedTime()
    })

    return (
        <>
            <color args={['#201919']} attach="background" />

            <OrbitControls makeDefault />

            <Center position-y={0.7} position-x={0} rotation={[0, -0.3, 0]}>

                <mesh
                    geometry={nodes.Baked.geometry}
                    position={nodes.Baked.position}>
                    <meshBasicMaterial map={texture} />
                </mesh>

                <mesh
                    geometry={nodes.PoleLightA.geometry}
                    position={nodes.PoleLightA.position}>
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>

                <mesh
                    geometry={nodes.PoleLightB.geometry}
                    position={nodes.PoleLightB.position}>
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>

                <mesh
                    geometry={nodes.PortalLight.geometry}
                    position={nodes.PortalLight.position}
                    rotation={nodes.PortalLight.rotation} >
                    <portalMaterial ref={portalMaterial} />
                </mesh>

                <Sparkles
                    size={6}
                    scale={[4, 2, 4]}
                    position-y={1}
                    speed={0.2}
                    count={50}
                />

            </Center>
        </>
    )
}