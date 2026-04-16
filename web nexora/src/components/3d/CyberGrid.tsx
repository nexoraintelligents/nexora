import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { MotionValue } from "motion/react";

interface CyberGridProps {
  scrollY: MotionValue<number>;
}

export function CyberGrid({ scrollY }: CyberGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scanlineRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Pre-compute static geometry - 0 per-frame allocations
  const { gridGeometry, accentGeometry, pointsGeometry } = useMemo(() => {
    // 1. Base Grid Layer (Fine lines)
    const gridSize = 60;
    const divisions = 40;
    const step = gridSize / divisions;
    const halfSize = gridSize / 2;
    
    const gridPoints = [];
    // Z-axis lines
    for (let i = 0; i <= divisions; i++) {
        const x = -halfSize + i * step;
        gridPoints.push(x, 0, -halfSize, x, 0, halfSize);
    }
    // X-axis lines
    for (let i = 0; i <= divisions; i++) {
        const z = -halfSize + i * step;
        gridPoints.push(-halfSize, 0, z, halfSize, 0, z);
    }
    const internalGridGeo = new THREE.BufferGeometry();
    internalGridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridPoints, 3));

    // 2. Accent Grid Layer (thicker intervals)
    const accentDivisions = 10;
    const accentStep = gridSize / accentDivisions;
    const accentPoints = [];
    for (let i = 0; i <= accentDivisions; i++) {
        const x = -halfSize + i * accentStep;
        accentPoints.push(x, 0, -halfSize, x, 0, halfSize);
        const z = -halfSize + i * accentStep;
        accentPoints.push(-halfSize, 0, z, halfSize, 0, z);
    }
    const internalAccentGeo = new THREE.BufferGeometry();
    internalAccentGeo.setAttribute("position", new THREE.Float32BufferAttribute(accentPoints, 3));

    // 3. 140 Floating Data Nodes
    const nodeCount = 140;
    const pointVertices = [];
    const pointSizes = [];
    for (let i = 0; i < nodeCount; i++) {
        pointVertices.push(
            (Math.random() - 0.5) * gridSize,
            Math.random() * 2, // Float slightly above the grid
            (Math.random() - 0.5) * gridSize
        );
        pointSizes.push(Math.random());
    }
    const internalPointsGeo = new THREE.BufferGeometry();
    internalPointsGeo.setAttribute("position", new THREE.Float32BufferAttribute(pointVertices, 3));
    internalPointsGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(pointSizes, 1));

    return { gridGeometry: internalGridGeo, accentGeometry: internalAccentGeo, pointsGeometry: internalPointsGeo };
  }, []);

  const pointMaterial = useMemo(() => {
     return new THREE.PointsMaterial({
        color: "#818cf8",
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
     });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Non-allocation scroll read from motion value
    const scrollOffset = scrollY.get() * 0.005;
    
    if (groupRef.current) {
       // Drift perspective over time + passive scroll parallax
       groupRef.current.position.z = ((time * 0.4 + scrollOffset) % 1.5);
    }

    if (scanlineRef.current) {
       // Oscillate scanline across grid terrain
       scanlineRef.current.position.z = Math.sin(time * 0.5) * 15;
    }

    if (pointsRef.current) {
        // Slow constant rotation
        pointsRef.current.rotation.y = time * 0.02;
        // Pulse size
        const pulse = 1 + Math.sin(time * 2) * 0.2;
        (pointsRef.current.material as THREE.PointsMaterial).size = 0.08 * pulse;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      <group ref={groupRef}>
        <lineSegments geometry={gridGeometry}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </lineSegments>
        <lineSegments geometry={accentGeometry}>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.12} />
        </lineSegments>
        <points ref={pointsRef} geometry={pointsGeometry} material={pointMaterial} />
      </group>
      
      {/* Horizontal Scanline */}
      <mesh ref={scanlineRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 0.1]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
