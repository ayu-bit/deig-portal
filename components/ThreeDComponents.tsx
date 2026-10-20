
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, RootState } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, PerspectiveCamera as DreiPerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 1. Abstract Technical Shape
export const TechShape: React.FC<{ color?: string; type?: 'box' | 'sphere' | 'torus' | 'octahedron' }> = ({ 
  color = '#1075BB', 
  type = 'box' 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state: RootState) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 'sphere': return new THREE.SphereGeometry(1, 32, 32);
      case 'torus': return new THREE.TorusGeometry(1, 0.4, 16, 100);
      case 'octahedron': return new THREE.OctahedronGeometry(1);
      default: return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [type]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.4}
          radius={1}
          wireframe
        />
      </mesh>
      {/* Decorative wireframe overlay */}
      <mesh geometry={geometry} scale={1.05}>
         <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  );
};

// 2. Rotating Engineering Gear
export const EngineeringGear: React.FC<{ color?: string }> = ({ color = '#1075BB' }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += 0.01;
  });

  return (
    <group ref={meshRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.2, 16, 50]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          rotation={[0, 0, (i / 8) * Math.PI * 2]} 
          position={[Math.cos((i / 8) * Math.PI * 2) * 1.1, Math.sin((i / 8) * Math.PI * 2) * 1.1, 0]}
        >
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// 3. Cyber Shield / Network
export const CyberNetwork: React.FC<{ color?: string }> = ({ color = '#1075BB' }) => {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 50; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ));
    }
    return p;
  }, []);

  const meshRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={meshRef}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <Float speed={1.5}>
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

// 4. Industry Specific 3D Component
export const Industry3D: React.FC<{ industryId: string; color?: string }> = ({ industryId, color }) => {
  switch (industryId) {
    case 'haei': // Heavy Armament
    case 'bveig': // Bishoftu Automotive
      return <EngineeringGear color={color} />;
    case 'gaei': // Gafat Armament
      return <TechShape type="octahedron" color={color} />;
    case 'bpig': // Blen Projectile
      return <TechShape type="sphere" color={color} />;
    case 'leeig': // Lemi Electronics
    case 'rig': // R&D
      return <CyberNetwork color={color} />;
    default:
      return <TechShape type="box" color={color} />;
  }
};

// 6. UAV Model (Abstract)
export const UAVModel: React.FC<{ color?: string }> = ({ color = '#ffffff' }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state: RootState) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    // Wing tip tilt
    meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={meshRef}>
      {/* Fuselage */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.1, 3, 32]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Main Wing */}
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[5, 0.05, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Tail - Vertical Pin */}
      <mesh position={[0, 0.3, -1.2]}>
        <boxGeometry args={[0.02, 0.6, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Tail - Horizontal Stabilizers */}
      <mesh position={[0, 0, -1.2]}>
        <boxGeometry args={[1.5, 0.02, 0.3]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Engine/Propeller Area */}
      <mesh position={[0, 0, 1.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Glowing Sensors */}
      <mesh position={[0, -0.15, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </group>
  );
};

// 7. Container for 3D elements
export const ThreeDContainer: React.FC<{ 
    children: React.ReactNode; 
    className?: string;
    cameraPos?: [number, number, number];
    interactive?: boolean;
}> = ({ children, className = '', cameraPos = [0, 0, 5], interactive = false }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <DreiPerspectiveCamera makeDefault position={cameraPos} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {children}
        
        {interactive && <OrbitControls enableZoom={false} autoRotate />}
      </Canvas>
    </div>
  );
};
