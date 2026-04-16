import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export function AIOrb({ isProcessing = false }: { isProcessing?: boolean }) {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      orbRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      
      const targetScale = isProcessing ? 1.2 : 1.0;
      orbRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group>
      <Sphere ref={orbRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial 
          color={isProcessing ? "#00D4FF" : "#7B61FF"}
          emissive={isProcessing ? "#0044FF" : "#220055"}
          emissiveIntensity={0.5}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.7}
          roughness={0.2}
          distort={isProcessing ? 0.6 : 0.4}
          speed={isProcessing ? 5 : 2}
        />
      </Sphere>
      {/* Glow behind the orb */}
      <pointLight position={[0, 0, 0]} color={isProcessing ? "#00D4FF" : "#7B61FF"} intensity={10} distance={5} />
    </group>
  );
}
