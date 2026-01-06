import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function StarLayer({ count, radius, speed, color }) {
    const ref = useRef();
    const [positions] = useState(() =>
        random.inSphere(new Float32Array(count * 3), { radius })
    );

    useFrame((_, delta) => {
        ref.current.rotation.y -= delta * speed;
        ref.current.rotation.x -= delta * speed * 0.5;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={color}
                size={0.0025}
                sizeAttenuation
                depthWrite={false}
            />
        </Points>
    );
}

function AnimatedStars() {
    const colors = ["#7dd3fc", "#c084fc", "#22d3ee"];
    const colorIndex = useRef(0);

    useFrame((state) => {
        const t = Math.floor(state.clock.elapsedTime / 4) % colors.length;
        colorIndex.current = t;
    });

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <StarLayer count={4000} radius={1.6} speed={0.02} color="#7dd3fc" />
            <StarLayer count={2500} radius={1.2} speed={0.015} color="#c084fc" />
            <StarLayer count={1500} radius={0.8} speed={0.01} color="#22d3ee" />
        </group>
    );
}

const Background3D = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-gray-50 dark:bg-[#0d1117] transition-colors duration-500">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 1.5]} // Limit pixel ratio to save GPU
                gl={{ antialias: false, powerPreference: "high-performance" }} // Optimize WebGL context
            >
                <AnimatedStars />
            </Canvas>
        </div>
    );
};

export default Background3D;
