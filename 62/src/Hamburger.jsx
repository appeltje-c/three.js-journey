import { useGLTF } from "@react-three/drei"

export default function Hamburger(props) {

    const hamburger = useGLTF('./hamburger.glb')

    return <primitive object={hamburger.scene} {...props} />

}