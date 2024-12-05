import { useMemo } from "react"
import { BoxGeometry, MeshStandardMaterial } from "three"
import BlockStart from "./blocks/BlockStart"
import BlockEnd from "./blocks/BlockEnd"
import { BlockSpinner } from "./blocks/BlockSpinner"
import BlockLimbo from "./blocks/BlockLimbo"
import BlockAxe from "./blocks/BlockAxe"
import Bounds from "./blocks/Bounds"

const boxGeometry = new BoxGeometry(1, 1, 1)
const floorMaterial1 = new MeshStandardMaterial({ color: 'limegreen' })
const floorMaterial2 = new MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new MeshStandardMaterial({ color: 'slategray' })

export function Level({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo], seed = 0 }) {

    const blocks = useMemo(() => {

        const blocks = []
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }
        return blocks

    }, [count, types, seed])

    return (
        <>
            <BlockStart geometry={boxGeometry} material={floorMaterial1} position={[0, 0, 0]} />
            {
                blocks.map((Block, index) =>
                    <Block
                        key={`${index}`}
                        position={[0, 0, -(index + 1) * 4]}
                        geometry={boxGeometry}
                        floorMaterial={floorMaterial2}
                        obstacleMaterial={obstacleMaterial} />)
            }
            <BlockEnd geometry={boxGeometry} material={floorMaterial1} position={[0, 0, -(count + 1) * 4]} />

            <Bounds length={count + 2} geometry={boxGeometry} material={wallMaterial} />
        </>
    )
}