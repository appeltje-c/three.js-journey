import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { ToneMapping, EffectComposer, Vignette, Glitch, Noise, Bloom, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode, ToneMappingMode } from 'postprocessing'
import Drunk from './Drunk'
import { useRef } from 'react'
import { useControls } from 'leva'


export default function Experience() {

    const drunkRef = useRef()

    const drukProps = useControls('Drunk', {
        frequency: { value: 2, min: 0, max: 20, step: 0.1 },
        amplitude: { value: 0.1, min: 0, max: 1, step: 0.01 },
    })

    return <>

        <color attach="background" args={["#fff"]} />

        <EffectComposer>
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />

            <Drunk
                ref={drunkRef}
                {...drukProps}
                blendFunction={BlendFunction.SATURATION} />

        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <mesh castShadow position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}