import React from "react";
import { ActiveTab } from "../lib/types";
import {
  Box,
  Cpu,
  ShieldCheck,
  Sparkles,
  Code2,
  BarChart3,
  Zap,
  Lock,
  Activity,
  Server,
} from "lucide-react";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  coherence: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  coherence,
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "aetherCube",
      label: "Cubo Aether 6D (Shader)",
      icon: <Box className="w-4 h-4" />,
    },
    {
      id: "latticeOracle",
      label: "Motor QACO (0.38ms)",
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      id: "z3Guard",
      label: "Guardia Z3 IBM",
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: "queryTerminal",
      label: "Terminal Oráculo (AI)",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: "codeViewer",
      label: "Código Madre (Go/Py/GLSL)",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      id: "industrialMetrics",
      label: "Impacto (-68.4% CPU)",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "industrialDeployment",
      label: "Despliegue Industrial 100%",
      icon: <Server className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <header className="border-b border-cyan-900/40 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50 text-slate-100">
      {/* Top Banner Status Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-b border-cyan-950/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/50 font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            SEXTA LEY OMEGA
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Ley de Reflejo Dimensional y Lógica de Retículos Ortomodulares
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1 text-cyan-400">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Sello:</span>
            <span className="text-amber-300 font-bold tracking-wider">
              [7FEE26DBFF29]
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>Kernel Go Nativo:</span>
            <span className="text-emerald-300 font-bold">0.38 ms</span>
            <span className="text-slate-500">(9000 Hz)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Coherencia:</span>
            <span
              className={`font-bold px-1.5 py-0.5 rounded ${
                coherence >= 0.96
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-600/40"
                  : "bg-amber-950 text-amber-300 border border-amber-600/40"
              }`}
            >
              {(coherence * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Title & Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-200 bg-clip-text text-transparent flex items-center gap-2">
            El Oráculo de Mérito
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-200 font-normal border border-emerald-700/40">
              100% Industrial Ready
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Trascendiendo la informática binaria mediante kernel nativo Go, IBM Z3 SMT Solver y aceleración por hardware.
          </p>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === t.id
                  ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/50 shadow-lg shadow-cyan-950/50"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
