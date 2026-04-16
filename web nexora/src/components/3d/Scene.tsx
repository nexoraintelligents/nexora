import { Float, Environment } from "@react-three/drei";
import { AIOrb } from "./AIOrb";
import { ParticleField } from "./ParticleField";

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#7B61FF" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#00D4FF" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <AIOrb isProcessing={false} />
      </Float>
      
      <ParticleField count={1500} />
      
      <Environment preset="city" />
    </>
  );
}
