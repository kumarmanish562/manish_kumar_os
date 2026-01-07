import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarField = () => {
    const groupRef = useRef();
    const pointsRef = useRef();

    // Generate 6000 stars
    const sphere = useMemo(() => {
        const data = random.inSphere(new Float32Array(6000), { radius: 1.5 });
        // Validate to ensure no NaN values
        for (let i = 0; i < data.length; i++) {
            if (isNaN(data[i])) {
                data[i] = (Math.random() - 0.5) * 3;
            }
        }
        return data;
    }, []);

    useFrame((state, delta) => {
        // 1. Auto-Rotation (Applied to the inner Points mesh)
        pointsRef.current.rotation.x -= delta / 10;
        pointsRef.current.rotation.y -= delta / 15;

        // 2. Parallax (Applied to the outer Group)
        // Smoothly tilt the entire field container based on mouse
        const x = state.mouse.x * 0.2;
        const y = state.mouse.y * 0.2;

        groupRef.current.rotation.x += (y - groupRef.current.rotation.x) * delta;
        groupRef.current.rotation.y += (x - groupRef.current.rotation.y) * delta;
    });

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
            <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={2}
                />
            </Points>
        </group>
    );
};

const Background3D = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#030712]">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
                {/* Fog hides stars as they get too far away */}
                <fog attach="fog" args={['#030712', 0.5, 2.8]} />
            </Canvas>
        </div>
    );
};

export default Background3D;
