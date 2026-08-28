import React, { useState } from "react";
import { ActiveTab } from "./lib/types";
import { Header } from "./components/Header";
import { AetherCube3D } from "./components/AetherCube3D";
import { SimultaneousStateVisualizer } from "./components/SimultaneousStateVisualizer";
import { Z3GuardValidator } from "./components/Z3GuardValidator";
import { OracleQueryTerminal } from "./components/OracleQueryTerminal";
import { CodeViewer } from "./components/CodeViewer";
import { IndustrialImpact } from "./components/IndustrialImpact";
import { IndustrialHardwareStress } from "./components/IndustrialHardwareStress";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("aetherCube");
  const [coherence, setCoherence] = useState<number>(0.98);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Top Header & Navigation */}
      <div>
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          coherence={coherence}
        />

        {/* Tab Content Rendering */}
        <main className="py-4">
          {activeTab === "aetherCube" && (
            <AetherCube3D
              coherence={coherence}
              setCoherence={setCoherence}
            />
          )}

          {activeTab === "latticeOracle" && <SimultaneousStateVisualizer />}

          {activeTab === "z3Guard" && <Z3GuardValidator />}

          {activeTab === "queryTerminal" && (
            <OracleQueryTerminal coherence={coherence} />
          )}

          {activeTab === "codeViewer" && <CodeViewer />}

          {activeTab === "industrialMetrics" && <IndustrialImpact />}

          {activeTab === "industrialDeployment" && (
            <IndustrialHardwareStress />
          )}
        </main>
      </div>

      {/* Global Status Footer */}
      <footer className="border-t border-cyan-950 bg-slate-950 py-4 px-6 text-xs text-slate-400 font-mono flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-bold">Arquitectura Omega</span>
          <span className="text-slate-500">|</span>
          <span>Sexta Ley: Reflejo Dimensional y Lógica de Retículos</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-amber-400 font-bold">[7FEE26DBFF29]</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400 font-bold">estamosaquicontigo. 🚢</span>
        </div>
      </footer>
    </div>
  );
}
