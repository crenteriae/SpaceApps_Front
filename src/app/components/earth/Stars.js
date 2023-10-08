import { useRef, useMemo } from 'react';
import { Points, BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';

export default function Stars ({count=5000}) {
    const pointsRef = useRef();
    const vertices = useMemo(() => {
        const positions = new Float32Array(count * 3); 
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100; 
        }
        return positions;
    }, [count]);

    return (
        <Points ref={pointsRef}>
            <BufferGeometry attach="geometry">
                <Float32BufferAttribute
                    value={vertices}
                    itemSize={3}
                />
            </BufferGeometry>
            <PointsMaterial
                attach="material"
                size={0.1}
                color="white"
            />
        </Points>
    );
}