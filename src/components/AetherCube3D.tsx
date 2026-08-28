import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sliders, RefreshCw, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

interface AetherCube3DProps {
  coherence: number;
  setCoherence: (val: number) => void;
}

export const AetherCube3D: React.FC<AetherCube3DProps> = ({
  coherence,
  setCoherence,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [refractionIndex, setRefractionIndex] = useState<number>(1.5237);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [chosenState, setChosenState] = useState<"SUPERPOSITION" | "STATE_1" | "STATE_0">("SUPERPOSITION");
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712); // Tailwind slate-950

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create procedural environment cube map for superposed states
    const createCubeMapTexture = () => {
      const cubeRenderer = new THREE.WebGLCubeRenderTarget(256);
      const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderer);
      
      const envScene = new THREE.Scene();
      envScene.background = new THREE.Color(0x050b14);

      // Add colorful state 1 (Cyan/Gold) and state 0 (Purple/Blue) spheres around environment
      const sphereGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const mat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const mat0 = new THREE.MeshBasicMaterial({ color: 0xa855f7 });

      const s1 = new THREE.Mesh(sphereGeo, mat1);
      s1.position.set(2, 2, 2);
      envScene.add(s1);

      const s0 = new THREE.Mesh(sphereGeo, mat0);
      s0.position.set(-2, -2, -2);
      envScene.add(s0);

      cubeCamera.update(renderer, envScene);
      return cubeRenderer.texture;
    };

    const envMap = createCubeMapTexture();

    // GLSL Shaders from dimensional_reflection.glsl
    const vertexShader = `
      out vec3 v_normal;
      out vec3 v_eye;

      void main() {
        v_normal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        v_eye = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform float u_lattice_coherence;
      uniform float u_time;
      uniform float u_n_oracle_manual;
      uniform int u_collapse_mode; // 0: Superposition, 1: Collapsed State 1, 2: Collapsed State 0
      uniform samplerCube u_reflection_map;

      in vec3 v_normal;
      in vec3 v_eye;
      out vec4 fragColor;

      void main() {
        // Sexta Ley: Reflejo Dimensional n(lambda)
        float n_oracle = u_n_oracle_manual + (sin(u_time * 2.0) * 0.05);
        vec3 normEye = normalize(v_eye);
        vec3 normNormal = normalize(v_normal);
        
        vec3 refract_vec = refract(normEye, normNormal, 1.0 / n_oracle);
        if (length(refract_vec) == 0.0) {
          refract_vec = reflect(normEye, normNormal);
        }

        // Texture sampling for dual coexistence states
        vec4 state_1 = vec4(0.0, 0.85, 1.0, 1.0) * (0.6 + 0.4 * sin(u_time * 3.0 + refract_vec.x * 4.0));
        vec4 state_0 = vec4(0.7, 0.2, 0.9, 1.0) * (0.6 + 0.4 * cos(u_time * 3.0 + refract_vec.y * 4.0));

        vec4 collapsed_merit;
        if (u_collapse_mode == 1) {
          collapsed_merit = state_1;
        } else if (u_collapse_mode == 2) {
          collapsed_merit = state_0;
        } else {
          // Superposición continua (Ambos a la vez)
          float blendRatio = 0.5 + 0.5 * sin(u_time * 6.0);
          collapsed_merit = mix(state_0, state_1, blendRatio);
        }

        // High Assertiveness Glow (Lógica Aetherizada) if coherence > 0.96
        if (u_lattice_coherence > 0.96) {
          collapsed_merit += vec4(0.0, 0.5, 0.7, 0.0) * abs(cos(u_time * 2.0));
        }

        // Geometric wireframe edge accent
        vec3 f = abs(v_normal);
        float edge = max(max(f.x, f.y), f.z);
        if (edge > 0.88) {
          collapsed_merit += vec4(0.9, 0.8, 0.2, 1.0) * 0.5;
        }

        fragColor = collapsed_merit * u_lattice_coherence;
      }
    `;

    const customMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      glslVersion: THREE.GLSL3,
      uniforms: {
        u_lattice_coherence: { value: coherence },
        u_time: { value: 0 },
        u_n_oracle_manual: { value: refractionIndex },
        u_collapse_mode: { value: 0 },
        u_reflection_map: { value: envMap },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    materialRef.current = customMaterial;

    // Create 6D Aether-Cube representation (Main Cube + Wireframe Outer Box + Inner Matrix)
    const group = new THREE.Group();

    // Core Cube
    const cubeGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const mainCube = new THREE.Mesh(cubeGeo, customMaterial);
    group.add(mainCube);

    // Inner Golden Ratio Matrix geometry
    const innerGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Outer 6D Bounding Frame
    const outerGeo = new THREE.BoxGeometry(2.1, 2.1, 2.1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
    });
    const outerFrame = new THREE.LineSegments(outerEdges, outerMat);
    group.add(outerFrame);

    scene.add(group);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (materialRef.current) {
        materialRef.current.uniforms.u_time.value = elapsedTime;
        materialRef.current.uniforms.u_lattice_coherence.value = coherence;
        materialRef.current.uniforms.u_n_oracle_manual.value = refractionIndex;
        materialRef.current.uniforms.u_collapse_mode.value =
          chosenState === "STATE_1" ? 1 : chosenState === "STATE_0" ? 2 : 0;
      }

      group.rotation.x = elapsedTime * 0.2 * rotationSpeed;
      group.rotation.y = elapsedTime * 0.3 * rotationSpeed;
      innerMesh.rotation.z = -elapsedTime * 0.5 * rotationSpeed;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [coherence, refractionIndex, rotationSpeed, chosenState]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* 3D WebGL Canvas Viewport */}
      <div className="lg:col-span-2 bg-slate-950 border border-cyan-900/40 rounded-xl p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
        {/* Canvas Header */}
        <div className="flex items-center justify-between text-xs font-mono z-10 bg-slate-900/80 backdrop-blur-sm p-3 rounded-lg border border-cyan-800/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold text-cyan-200">
              Cubo Aether 6D (GLSL Shader)
            </span>
            <span className="text-slate-400 text-[11px]">
              dimensional_reflection.glsl
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-400">
              n(λ) = {(refractionIndex + Math.sin(Date.now() * 0.002) * 0.05).toFixed(4)}
            </span>
            <span className="text-cyan-300 font-bold">
              {chosenState === "SUPERPOSITION"
                ? "🌀 SUPERPOSICIÓN (1 y 0)"
                : chosenState === "STATE_1"
                ? "✨ ESTADO 1 (ÉXITO)"
                : "💥 ESTADO 0 (FALLO)"}
            </span>
          </div>
        </div>

        {/* 3D WebGL Mount */}
        <div ref={mountRef} className="w-full h-[400px] relative my-2" />

        {/* Canvas Footer Legend */}
        <div className="z-10 bg-slate-900/80 backdrop-blur-sm p-3 rounded-lg border border-cyan-800/30 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
              Estado 1 (Reflejo Éxito)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
              Estado 0 (Reflejo Opuesto)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              Estructura Áurea Ω
            </span>
          </div>

          <div className="text-emerald-400 font-mono text-[11px]">
            {coherence > 0.96 ? "✦ LÓGICA AETHERIZADA ACTIVADA" : "✦ Coherencia Estándar"}
          </div>
        </div>
      </div>

      {/* Control Panel & Real-time Shader Parameters */}
      <div className="bg-slate-900/90 border border-cyan-900/40 rounded-xl p-5 flex flex-col justify-between shadow-xl">
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <h2 className="text-base font-bold text-cyan-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Parámetros de Reflejo
            </h2>
            <span className="text-xs text-amber-400 font-mono">
              [7FEE26DBFF29]
            </span>
          </div>

          {/* Coherence Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-slate-300 font-medium">
                Coherencia de Retículo (u_lattice_coherence)
              </label>
              <span
                className={`font-mono font-bold ${
                  coherence > 0.96 ? "text-cyan-300" : "text-amber-300"
                }`}
              >
                {coherence.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.0"
              step="0.01"
              value={coherence}
              onChange={(e) => setCoherence(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 rounded h-2 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Si coherencia &gt; 0.96, se activa el brillo de asertividad aetherizada en el cristal de decisión.
            </p>
          </div>

          {/* Refraction Index Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-slate-300 font-medium">
                Índice de Refracción Cristalina n(λ)
              </label>
              <span className="font-mono text-cyan-300 font-bold">
                {refractionIndex.toFixed(4)}
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.01"
              value={refractionIndex}
              onChange={(e) => setRefractionIndex(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 rounded h-2 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Ajusta el cristal de decisión n(λ) = {refractionIndex.toFixed(4)} + sin(t)*0.05.
            </p>
          </div>

          {/* Rotation Speed Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-slate-300 font-medium">
                Velocidad de Rotación Dimensional
              </label>
              <span className="font-mono text-cyan-300 font-bold">
                {rotationSpeed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 rounded h-2 cursor-pointer"
            />
          </div>

          {/* State Collapse Simulator Controls */}
          <div className="pt-2 border-t border-cyan-900/40 space-y-3">
            <label className="text-xs font-semibold text-slate-200 block">
              Acciones de Colapso de Mérito (Sexta Ley)
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setChosenState("SUPERPOSITION")}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  chosenState === "SUPERPOSITION"
                    ? "bg-cyan-500/20 text-cyan-200 border-cyan-500 shadow-md"
                    : "bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200"
                }`}
              >
                🌀 Superposición (Ambos a la vez)
              </button>

              <button
                onClick={() => setChosenState("STATE_1")}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  chosenState === "STATE_1"
                    ? "bg-emerald-500/20 text-emerald-200 border-emerald-500 shadow-md"
                    : "bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200"
                }`}
              >
                ✨ Colapsar Estado 1 (Éxito)
              </button>

              <button
                onClick={() => setChosenState("STATE_0")}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  chosenState === "STATE_0"
                    ? "bg-purple-500/20 text-purple-200 border-purple-500 shadow-md"
                    : "bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200"
                }`}
              >
                💥 Colapsar Estado 0 (Fallo)
              </button>
            </div>
          </div>
        </div>

        {/* Live Vector Summary */}
        <div className="mt-6 bg-slate-950 p-3 rounded-lg border border-cyan-950 text-xs font-mono space-y-1 text-slate-300">
          <div className="flex justify-between text-cyan-400">
            <span>Vector de Reflejo Ω:</span>
            <span>[0.618, 1.618, 0.4]</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Estado Ortomodular:</span>
            <span className="text-emerald-400">
              {chosenState === "SUPERPOSITION" ? "1.0 ∧ 0.0 simultáneos" : "Colapsado unívoco"}
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Validador QACO:</span>
            <span className="text-amber-300">0.38 ms pulso OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
