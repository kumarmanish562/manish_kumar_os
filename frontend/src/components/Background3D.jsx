import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { usePortfolio } from "../context/PortfolioContext";

const StarField = ({ theme }) => {
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

    const starColor = theme === 'dark' ? "#00f3ff" : "#0f172a"; // Cyan for dark, Dark Slate for light

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
            <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={starColor}
                    size={theme === 'dark' ? 0.003 : 0.004} // Slightly larger in light mode

                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={2}
                />
            </Points>
        </group>
    );
};

const Background3D = () => {
    const { theme } = usePortfolio();
    const isDark = theme === 'dark';

    // Aesthetic Colors
    const bgColor = isDark ? "#030712" : "#ffffff"; // Deep Space vs Pure White
    const fogColor = isDark ? "#030712" : "#ffffff";

    return (
        <div
            className="fixed inset-0 z-[-1] transition-colors duration-700"
            style={{ backgroundColor: bgColor }}
        >
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField theme={theme} />
                {/* Fog hides stars as they get too far away */}
                <fog attach="fog" args={[fogColor, 0.5, 2.8]} />
            </Canvas>
        </div>
    );
};

export default Background3D;
