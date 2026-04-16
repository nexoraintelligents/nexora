import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { MotionValue } from "motion/react";

interface ParticleFieldProps {
  scrollY?: MotionValue<number>;
  primaryColor?: string;
  secondaryColor?: string;
}

export function ParticleField({ 
  scrollY, 
  primaryColor = "#a78bfa", 
  secondaryColor = "#34d399" 
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const particleCount = 1000;

  // Zero per-frame allocations: all arrays generated strictly inside useMemo
  const { positions, basePositions, velocities, colors, geometry } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colorsArr = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(primaryColor);
    const c2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Distributed across bounds. Z range [-6, 2]
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 20;
      const z = Math.random() * 8 - 6;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      // Velocities array hijacked to store phases and amplitude lengths
      velocities[i3] = Math.random() * Math.PI * 2; // phase X
      velocities[i3 + 1] = Math.random() * Math.PI * 2; // phase Y
      velocities[i3 + 2] = 0.3 + Math.random() * 0.3; // amplitude strictly 0.3 - 0.6

      // Assign random color mapped to props
      const isPrimary = Math.random() > 0.5;
      const color = isPrimary ? c1 : c2;
      colorsArr[i3] = color.r;
      colorsArr[i3 + 1] = color.g;
      colorsArr[i3 + 2] = color.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));

    return { positions, basePositions, velocities, colors: colorsArr, geometry: geo };
  }, [primaryColor, secondaryColor]);

  // Static material instance
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: true,
      depthWrite: false, // Performance requirement
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Y-axis shifting mapped purely from scroll MotionValue without extra renders
    if (groupRef.current && scrollY) {
       groupRef.current.position.y = scrollY.get() * 0.005;
    }

    if (!pointsRef.current) return;

    // Retrieve active float array bypassing set state
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Organic swarm breathing effect utilizing sine loop (-1 to +1) * weak coefficient
    // The pull factor oscillates representing an attraction scaling variable
    const pullFactor = Math.sin(time * 0.5) * 0.001;

    for (let i = 0; i < particleCount; i++) {
       const i3 = i * 3;
       
       const baseX = basePositions[i3];
       const baseY = basePositions[i3 + 1];
       const baseZ = basePositions[i3 + 2];

       const phaseX = velocities[i3];
       const phaseY = velocities[i3 + 1];
       const amplitude = velocities[i3 + 2];

       // Slow sine/cosine orbits
       let currentX = baseX + Math.sin(time * 0.5 + phaseX) * amplitude;
       let currentY = baseY + Math.cos(time * 0.5 + phaseY) * amplitude;
       
       // Center pull logic
       const centerX = 0;
       const centerY = 0;
       const centerZ = -2;

       // Base vectors migrate weakly tracking the variable pull factor
       basePositions[i3] += (centerX - baseX) * pullFactor;
       basePositions[i3 + 1] += (centerY - baseY) * pullFactor;
       basePositions[i3 + 2] += (centerZ - baseZ) * pullFactor;

       // Commit mutations immediately 
       posArray[i3] = currentX;
       posArray[i3 + 1] = currentY;
       posArray[i3 + 2] = baseZ; // Z stays stable except for the base pull migration
    }

    // Force GL update sweep
    posAttr.needsUpdate = true;

    // Dynamic Opacity pulse exactly locked between 0.35 and 0.55
    material.opacity = 0.45 + (Math.sin(time) * 0.1);
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  );
}
