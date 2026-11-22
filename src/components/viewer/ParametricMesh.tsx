import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ModelSchema } from '../../types/model';

interface ParametricMeshProps {
  model: ModelSchema;
  params: Record<string, any>;
  wireframe: boolean;
  onMeshReady?: (meshGroup: THREE.Group) => void;
}

export const ParametricMesh: React.FC<ParametricMeshProps> = ({
  model,
  params,
  wireframe,
  onMeshReady,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && onMeshReady) {
      onMeshReady(groupRef.current);
    }
  }, [model.id, params, onMeshReady]);

  // ==========================================
  // MODELO: STRING ART RETÂNGULO RADIAL COM NOME
  // ==========================================
  if (model.id === 'string-art-rectangle-name-radial') {
    return <StringArtRadialMesh params={params} wireframe={wireframe} groupRef={groupRef} />;
  }

  // ==========================================
  // MODELO 1: CHAVEIRO PARAMÉTRICO
  // ==========================================
  if (model.id === 'custom-keychain') {
    return <KeychainMesh params={params} wireframe={wireframe} groupRef={groupRef} />;
  }

  // ==========================================
  // MODELO 2: PLACA QR CODE / WIFI
  // ==========================================
  if (model.id === 'qr-wifi-sign') {
    return <SignMesh params={params} wireframe={wireframe} groupRef={groupRef} />;
  }

  // ==========================================
  // MODELO 3: CAIXA ORGANIZADORA COM TAMPA
  // ==========================================
  return <BoxMesh params={params} wireframe={wireframe} groupRef={groupRef} />;
};

// -------------------------------------------------------------
// Componente de Geometria: Chaveiro com Relevo
// -------------------------------------------------------------
interface MeshChildProps {
  params: Record<string, any>;
  wireframe: boolean;
  groupRef: React.RefObject<THREE.Group>;
}

const KeychainMesh: React.FC<MeshChildProps> = ({ params, wireframe, groupRef }) => {
  const text = params.text || 'MAFA3D';
  const font = params.font || 'Montserrat';
  const fontSize = Number(params.fontSize || 14);
  const textHeight = Number(params.textHeight || 1.6);
  const baseThickness = Number(params.baseThickness || 3);
  const padding = Number(params.padding || 6);
  const cornerRadius = Number(params.cornerRadius || 4);
  const hasHole = params.hasHole !== false;
  const holeDiameter = Number(params.holeDiameter || 4.5);
  const baseColor = params.baseColor || '#81314D';
  const textColor = params.textColor || '#FFFFFF';

  // Cálculo das dimensões reais
  const charWidth = fontSize * 0.65;
  const holeSpace = hasHole ? holeDiameter + 8 : 0;
  const width = Math.max(30, text.length * charWidth + padding * 2 + holeSpace);
  const height = fontSize + padding * 2;

  // Geometria da base arredondada com furo
  const baseGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    const r = Math.min(cornerRadius, height / 2 - 0.5, width / 2 - 0.5);

    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r);
    shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    shape.lineTo(x + r, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    if (hasHole) {
      const hole = new THREE.Path();
      const holeX = x + r + holeDiameter / 2 + 1.5;
      const holeY = 0;
      hole.absarc(holeX, holeY, holeDiameter / 2, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: baseThickness,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.35,
      bevelThickness: 0.35,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, [width, height, baseThickness, cornerRadius, hasHole, holeDiameter]);

  // Textura dinâmica de alta resolução com a fonte escolhida
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Fundo transparente
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Renderizar texto com a tipografia selecionada
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(fontSize * 18)}px "${font}", sans-serif`;

    // Deslocamento para compensar o orifício do chaveiro à esquerda
    const xOffset = hasHole ? (holeDiameter * 5) : 0;
    ctx.fillText(text, canvas.width / 2 + xOffset, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [text, font, fontSize, textColor, hasHole, holeDiameter]);

  // Relevo 3D do Texto
  const textReliefGeometry = useMemo(() => {
    const textWidth = width - (hasHole ? holeDiameter + 6 : 0) - padding;
    const geom = new THREE.BoxGeometry(textWidth, height - padding, textHeight);
    return geom;
  }, [width, height, textHeight, hasHole, holeDiameter, padding]);

  return (
    <group ref={groupRef}>
      {/* Base do Chaveiro */}
      <mesh geometry={baseGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={baseColor}
          roughness={0.4}
          metalness={0.08}
          wireframe={wireframe}
        />
      </mesh>

      {/* Relevo com Texto gravado */}
      <mesh
        geometry={textReliefGeometry}
        position={[hasHole ? (holeDiameter + 6) / 2 : 0, 0, baseThickness / 2 + textHeight / 2]}
        castShadow
      >
        <meshStandardMaterial
          color={textColor}
          map={textTexture}
          roughness={0.3}
          metalness={0.1}
          wireframe={wireframe}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// Componente de Geometria: Placa QR Code / WiFi
// -------------------------------------------------------------
const SignMesh: React.FC<MeshChildProps> = ({ params, wireframe, groupRef }) => {
  const width = Number(params.plateWidth || 70);
  const height = Number(params.plateHeight || 90);
  const thickness = Number(params.plateThickness || 2.8);
  const baseColor = params.baseColor || '#1A1A1A';
  const textColor = params.textColor || '#FACC15';
  const titleText = params.titleText || 'REDE WI-FI VIP';
  const subtitleText = params.subtitleText || 'Aponte a câmera do celular';
  const font = params.font || 'Bebas Neue';
  const includeStand = params.includeStand !== false;

  const plateGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    const r = 4;

    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r);
    shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    shape.lineTo(x + r, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.3,
      bevelThickness: 0.3,
    });
    geom.center();
    return geom;
  }, [width, height, thickness]);

  // Textura do QR Code e Textos combinados
  const signTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Título Superior
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold 64px "${font}", sans-serif`;
    ctx.fillText(titleText, canvas.width / 2, 140);

    // Subtítulo
    ctx.font = `32px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(subtitleText, canvas.width / 2, 210);

    // QR Code Simulado com Grid Paramétrico
    const qrSize = 480;
    const startX = (canvas.width - qrSize) / 2;
    const startY = 280;
    const cells = 19;
    const cellSize = qrSize / cells;

    // Fundo branco do QR Code
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(startX - 16, startY - 16, qrSize + 32, qrSize + 32);

    // Padrões do QR Code
    ctx.fillStyle = baseColor;
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        // Padrões de canto do QR
        const isCorner =
          (r < 7 && c < 7) ||
          (r < 7 && c >= cells - 7) ||
          (r >= cells - 7 && c < 7);

        const isInnerCorner =
          (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
          (r >= 2 && r <= 4 && c >= cells - 5 && c <= cells - 3) ||
          (r >= cells - 5 && r <= cells - 3 && c >= 2 && c <= 4);

        const isBorderCorner =
          ((r === 0 || r === 6) && c < 7) ||
          ((c === 0 || c === 6) && r < 7) ||
          ((r === 0 || r === 6) && c >= cells - 7) ||
          ((c === cells - 1 || c === cells - 7) && r < 7) ||
          ((r === cells - 1 || r === cells - 7) && c < 7) ||
          ((c === 0 || c === 6) && r >= cells - 7);

        if (isInnerCorner || isBorderCorner || (!isCorner && (r * 7 + c * 11) % 3 === 0)) {
          ctx.fillRect(startX + c * cellSize, startY + r * cellSize, cellSize, cellSize);
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [width, height, textColor, baseColor, titleText, subtitleText, font]);

  return (
    <group ref={groupRef}>
      {/* Placa Principal */}
      <mesh geometry={plateGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={baseColor}
          roughness={0.4}
          metalness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Camada em Relevo com Informações e QR Code */}
      <mesh position={[0, 0, thickness / 2 + 0.5]} castShadow>
        <planeGeometry args={[width * 0.92, height * 0.92]} />
        <meshStandardMaterial
          map={signTexture}
          transparent={true}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* Suporte de Mesa (Stand) se ativado */}
      {includeStand && (
        <mesh position={[0, -height / 2 + 2, -thickness * 2]} castShadow>
          <boxGeometry args={[width * 0.7, 8, thickness * 4]} />
          <meshStandardMaterial color={baseColor} roughness={0.4} metalness={0.1} />
        </mesh>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// Componente de Geometria: Caixa Organizadora com Tampa
// -------------------------------------------------------------
const BoxMesh: React.FC<MeshChildProps> = ({ params, wireframe, groupRef }) => {
  const width = Number(params.boxWidth || 70);
  const length = Number(params.boxLength || 90);
  const height = Number(params.boxHeight || 35);
  const wall = Number(params.wallThickness || 2.0);
  const dividers = Number(params.numDividers || 1);
  const boxColor = params.baseColor || '#38BDF8';
  const lidColor = params.textColor || '#FFFFFF';
  const lidType = params.lidType || 'Tampa Deslizante (Slide)';

  return (
    <group ref={groupRef}>
      {/* Fundo da Caixa */}
      <mesh position={[0, 0, wall / 2]} castShadow receiveShadow>
        <boxGeometry args={[width, length, wall]} />
        <meshStandardMaterial color={boxColor} roughness={0.4} wireframe={wireframe} />
      </mesh>

      {/* Paredes Laterais (X) */}
      <mesh position={[-width / 2 + wall / 2, 0, height / 2]} castShadow>
        <boxGeometry args={[wall, length, height]} />
        <meshStandardMaterial color={boxColor} roughness={0.4} wireframe={wireframe} />
      </mesh>
      <mesh position={[width / 2 - wall / 2, 0, height / 2]} castShadow>
        <boxGeometry args={[wall, length, height]} />
        <meshStandardMaterial color={boxColor} roughness={0.4} wireframe={wireframe} />
      </mesh>

      {/* Paredes Frontal e Traseira (Y) */}
      <mesh position={[0, -length / 2 + wall / 2, height / 2]} castShadow>
        <boxGeometry args={[width - wall * 2, wall, height]} />
        <meshStandardMaterial color={boxColor} roughness={0.4} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, length / 2 - wall / 2, height / 2]} castShadow>
        <boxGeometry args={[width - wall * 2, wall, height]} />
        <meshStandardMaterial color={boxColor} roughness={0.4} wireframe={wireframe} />
      </mesh>

      {/* Divisórias Internas */}
      {Array.from({ length: dividers }).map((_, i) => {
        const xPos = -width / 2 + (width / (dividers + 1)) * (i + 1);
        return (
          <mesh key={i} position={[xPos, 0, height / 2]} castShadow>
            <boxGeometry args={[wall, length - wall * 2, height - wall]} />
            <meshStandardMaterial color={boxColor} roughness={0.4} wireframe={wireframe} />
          </mesh>
        );
      })}

      {/* Tampa Deslizante ou Snap (levemente aberta para mostrar o interior) */}
      {lidType !== 'Sem Tampa' && (
        <mesh position={[0, -length * 0.25, height + 1]} castShadow>
          <boxGeometry args={[width - wall * 0.5, length * 0.9, wall * 0.8]} />
          <meshStandardMaterial color={lidColor} roughness={0.3} metalness={0.1} />
        </mesh>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// Componente de Geometria: String Art Retângulo Radial com Nome
// -------------------------------------------------------------
const StringArtRadialMesh: React.FC<MeshChildProps> = ({ params, wireframe, groupRef }) => {
  const text = params.text || 'ALINE';
  const font = params.font || 'Bebas Neue';
  const fontSize = Number(params.fontSize || 26);

  const frameWidth = Number(params.frameWidth || 160);
  const frameHeight = Number(params.frameHeight || 110);
  const frameThickness = Number(params.frameThickness || 6);
  const borderWidth = Number(params.borderWidth || 6);

  const numStrings = Number(params.numStrings || 64);
  const stringThickness = Number(params.stringThickness || 0.8);
  const stringPattern = params.stringPattern || 'Radial Estrela (Sunburst)';
  const includeStand = params.includeStand !== false;

  const baseColor = params.baseColor || '#1A1A1A';
  const stringColor = params.stringColor || '#FACC15';
  const textColor = params.textColor || '#FFFFFF';

  // 1. Moldura Externa Retangular com Furo Central
  const frameGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const hw = frameWidth / 2;
    const hh = frameHeight / 2;
    const r = 5;

    // Contorno Externo Arredondado
    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

    // Orifício Retangular Interno (Hole)
    const hole = new THREE.Path();
    const ihw = hw - borderWidth;
    const ihh = hh - borderWidth;
    const hr = 2;
    hole.moveTo(-ihw + hr, -ihh);
    hole.lineTo(ihw - hr, -ihh);
    hole.quadraticCurveTo(ihw, -ihh, ihw, -ihh + hr);
    hole.lineTo(ihw, ihh - hr);
    hole.quadraticCurveTo(ihw, ihh, ihw - hr, ihh);
    hole.lineTo(-ihw + hr, ihh);
    hole.quadraticCurveTo(-ihw, ihh, -ihw, ihh - hr);
    hole.lineTo(-ihw, -ihh + hr);
    hole.quadraticCurveTo(-ihw, -ihh, -ihw + hr, -ihh);
    shape.holes.push(hole);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: frameThickness,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.4,
      bevelThickness: 0.4,
    });
    geom.center();
    return geom;
  }, [frameWidth, frameHeight, frameThickness, borderWidth]);

  // 2. Fios Radiais de String Art
  const stringsGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions: number[] = [];
    const normals: number[] = [];

    const hw = (frameWidth - borderWidth * 2) / 2;
    const hh = (frameHeight - borderWidth * 2) / 2;
    const innerHw = Math.max(22, text.length * fontSize * 0.32 + 8);
    const innerHh = Math.max(13, fontSize * 0.6 + 6);
    const stringHeight = 0.8;

    for (let i = 0; i < numStrings; i++) {
      const angle = (i * 2 * Math.PI) / numStrings;

      // Deslocamento angular dependendo do padrão
      let outerAngle = angle;
      if (stringPattern === 'Radial Cruzado (Interlaced)') {
        outerAngle = angle + (Math.PI / 4) * (i % 2 === 0 ? 1 : -1);
      } else if (stringPattern === 'Radial Espiral (Vortex)') {
        outerAngle = angle + Math.PI / 3;
      }

      // Ponto na borda do retângulo externo
      const cosOut = Math.cos(outerAngle);
      const sinOut = Math.sin(outerAngle);
      const scaleOutX = Math.abs(cosOut) > 1e-5 ? hw / Math.abs(cosOut) : Infinity;
      const scaleOutY = Math.abs(sinOut) > 1e-5 ? hh / Math.abs(sinOut) : Infinity;
      const scaleOut = Math.min(scaleOutX, scaleOutY);
      const pOutX = cosOut * scaleOut;
      const pOutY = sinOut * scaleOut;

      // Ponto na borda da ilha interna (elipse ou retângulo central)
      const cosIn = Math.cos(angle);
      const sinIn = Math.sin(angle);
      const scaleInX = Math.abs(cosIn) > 1e-5 ? innerHw / Math.abs(cosIn) : Infinity;
      const scaleInY = Math.abs(sinIn) > 1e-5 ? innerHh / Math.abs(sinIn) : Infinity;
      const scaleIn = Math.min(scaleInX, scaleInY);
      const pInX = cosIn * scaleIn;
      const pInY = sinIn * scaleIn;

      // Vetor do segmento e normal 2D para largura da linha
      const dx = pOutX - pInX;
      const dy = pOutY - pInY;
      const len = Math.hypot(dx, dy);
      if (len < 1e-4) continue;

      const nx = (-dy / len) * (stringThickness / 2);
      const ny = (dx / len) * (stringThickness / 2);

      // 4 vértices do quad do fio
      const zTop = 0.5;
      const p0 = [pInX - nx, pInY - ny, zTop];
      const p1 = [pInX + nx, pInY + ny, zTop];
      const p2 = [pOutX + nx, pOutY + ny, zTop];
      const p3 = [pOutX - nx, pOutY - ny, zTop];

      // Adiciona faces superiores
      positions.push(
        ...p0, ...p1, ...p2,
        ...p0, ...p2, ...p3
      );
      normals.push(
        0, 0, 1,  0, 0, 1,  0, 0, 1,
        0, 0, 1,  0, 0, 1,  0, 0, 1
      );
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    return geom;
  }, [frameWidth, frameHeight, borderWidth, numStrings, stringThickness, stringPattern, text, fontSize]);

  // 3. Ilha Central com Nome Flutuante
  const centerIslandGeometry = useMemo(() => {
    const hw = Math.max(22, text.length * fontSize * 0.32 + 8);
    const hh = Math.max(13, fontSize * 0.6 + 6);
    const shape = new THREE.Shape();
    const r = 6;

    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 1.6,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.3,
      bevelThickness: 0.3,
    });
    geom.center();
    return geom;
  }, [text, fontSize]);

  // Textura dinâmica do Nome com a Fonte Selecionada
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(fontSize * 14)}px "${font}", sans-serif`;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [text, font, fontSize, textColor]);

  const nameReliefGeometry = useMemo(() => {
    const hw = Math.max(20, text.length * fontSize * 0.32 + 6) * 2;
    const hh = Math.max(12, fontSize * 0.6 + 4) * 2;
    return new THREE.PlaneGeometry(hw, hh);
  }, [text, fontSize]);

  return (
    <group ref={groupRef}>
      {/* Moldura Externa */}
      <mesh geometry={frameGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={baseColor}
          roughness={0.4}
          metalness={0.08}
          wireframe={wireframe}
        />
      </mesh>

      {/* Trama de Fios Radiais (String Art) */}
      <mesh geometry={stringsGeometry} castShadow>
        <meshStandardMaterial
          color={stringColor}
          roughness={0.25}
          metalness={0.2}
          wireframe={wireframe}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ilha Central de Ancoragem dos Fios */}
      <mesh geometry={centerIslandGeometry} position={[0, 0, 0.4]} castShadow>
        <meshStandardMaterial
          color={baseColor}
          roughness={0.4}
          metalness={0.08}
          wireframe={wireframe}
        />
      </mesh>

      {/* Relevo 3D do Nome */}
      <mesh geometry={nameReliefGeometry} position={[0, 0, 1.4]} castShadow>
        <meshStandardMaterial
          map={textTexture}
          transparent={true}
          roughness={0.2}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Suportes de Mesa Inclinados se ativados */}
      {includeStand && (
        <group position={[0, -frameHeight / 2 + 1, -frameThickness / 2]}>
          <mesh position={[-frameWidth * 0.32, 0, -8]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[8, 18, 4]} />
            <meshStandardMaterial color={baseColor} roughness={0.4} />
          </mesh>
          <mesh position={[frameWidth * 0.32, 0, -8]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[8, 18, 4]} />
            <meshStandardMaterial color={baseColor} roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
};
