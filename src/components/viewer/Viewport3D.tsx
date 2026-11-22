import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';
import { ModelSchema } from '../../types/model';
import { ParametricMesh } from './ParametricMesh';
import { CameraPreset, LightingPreset } from './ViewportControls';

interface Viewport3DProps {
  model: ModelSchema;
  params: Record<string, any>;
  cameraPreset: CameraPreset;
  lightingPreset: LightingPreset;
  showGrid: boolean;
  wireframe: boolean;
  onMeshReady?: (group: THREE.Group) => void;
}

// Subcomponente interno para gerenciar a câmera com os presets
const CameraController: React.FC<{ preset: CameraPreset }> = ({ preset }) => {
  const { camera } = useThree();

  useEffect(() => {
    switch (preset) {
      case 'iso':
        camera.position.set(90, -110, 80);
        camera.up.set(0, 0, 1);
        break;
      case 'top':
        camera.position.set(0, 0, 160);
        camera.up.set(0, 1, 0);
        break;
      case 'front':
        camera.position.set(0, -160, 20);
        camera.up.set(0, 0, 1);
        break;
      case 'side':
        camera.position.set(160, 0, 20);
        camera.up.set(0, 0, 1);
        break;
    }
    camera.lookAt(0, 0, 0);
  }, [preset, camera]);

  return null;
};

// Subcomponente de Iluminação baseada no preset
const SceneLighting: React.FC<{ preset: LightingPreset }> = ({ preset }) => {
  switch (preset) {
    case 'soft':
      return (
        <>
          <ambientLight intensity={1.2} />
          <directionalLight position={[40, -40, 80]} intensity={0.8} />
        </>
      );
    case 'bright':
      return (
        <>
          <ambientLight intensity={1.6} />
          <directionalLight position={[60, -60, 100]} intensity={1.4} castShadow />
          <directionalLight position={[-60, 60, 60]} intensity={0.6} />
        </>
      );
    case 'dramatic':
      return (
        <>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[80, -60, 120]}
            angle={0.4}
            penumbra={0.8}
            intensity={2.5}
            castShadow
          />
          <pointLight position={[-60, -60, -20]} intensity={0.5} color="#81314d" />
        </>
      );
    case 'studio':
    default:
      return (
        <>
          <ambientLight intensity={0.85} />
          <directionalLight
            position={[50, -50, 90]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-50, 50, 60]} intensity={0.4} />
          <pointLight position={[0, -80, 40]} intensity={0.5} />
        </>
      );
  }
};

export const Viewport3D: React.FC<Viewport3DProps> = ({
  model,
  params,
  cameraPreset,
  lightingPreset,
  showGrid,
  wireframe,
  onMeshReady,
}) => {
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 select-none">
      <Canvas
        shadows
        camera={{ position: [90, -110, 80], fov: 42, near: 1, far: 2000 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      >
        <CameraController preset={cameraPreset} />
        <SceneLighting preset={lightingPreset} />

        {/* OrbitControls suave com limites ergonômicos */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.8}
          zoomSpeed={1.0}
          minDistance={20}
          maxDistance={400}
        />

        {/* Centro de Gravidade e Malha Paramétrica */}
        <Center top position={[0, 0, 0]}>
          <ParametricMesh
            model={model}
            params={params}
            wireframe={wireframe}
            onMeshReady={onMeshReady}
          />
        </Center>

        {/* Mesa de Impressão 3D (Build Plate Grid) */}
        {showGrid && (
          <group position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
            {/* Grid Principal */}
            <gridHelper args={[220, 22, '#475569', '#334155']} />
            {/* Linha de borda 220x220mm (Mesa típica Ender/Bambu) */}
            <mesh position={[0, 0, 0]}>
              <ringGeometry args={[109, 110, 4]} />
              <meshBasicMaterial color="#64748b" opacity={0.4} transparent />
            </mesh>
          </group>
        )}
      </Canvas>
    </div>
  );
};
