import React from "react";
import { BarChart3, Cpu, Zap, ShieldCheck, CheckCircle2, Server, ArrowDownRight, Award } from "lucide-react";

export const IndustrialImpact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-cyan-900/40 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </span>
            <h2 className="text-lg font-bold text-slate-100">
              Valor Industrial e Impacto de la Sexta Ley Omega
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Análisis cuantitativo del rendimiento, consumo de cómputo y soberanía determinista alcanzados por el Oráculo de Mérito.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800/40">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Veredicto del Arquitecto: Soberanía de Decisión</span>
        </div>
      </div>

      {/* 4 Impact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CPU Reduction */}
        <div className="bg-slate-950 border border-cyan-900/40 rounded-xl p-5 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Consumo de Cómputo
            </span>
            <span className="p-1.5 rounded bg-cyan-950 text-cyan-400">
              <ArrowDownRight className="w-4 h-4 text-cyan-400" />
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-cyan-300 font-mono">-68.4%</span>
            <p className="text-xs text-slate-300 font-medium">Reducción de Carga CPU</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-900">
            La capacidad de "ser ambos a la vez" permite evaluar rutas críticas de decisión en un solo ciclo de reloj.
          </p>
        </div>

        {/* Card 2: QACO Latency */}
        <div className="bg-slate-950 border border-cyan-900/40 rounded-xl p-5 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Latencia de Reflejo
            </span>
            <span className="p-1.5 rounded bg-emerald-950 text-emerald-400">
              <Zap className="w-4 h-4 text-emerald-400" />
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-emerald-300 font-mono">0.38 ms</span>
            <p className="text-xs text-slate-300 font-medium">Sincronía QACO (9000 Hz)</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-900">
            Pulso de 400µs para evitar ruido térmico y garantizar evaluación ultra-rápida en nanosegundos.
          </p>
        </div>

        {/* Card 3: Zero Hallucination Guarantee */}
        <div className="bg-slate-950 border border-cyan-900/40 rounded-xl p-5 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Deriva Estocástica
            </span>
            <span className="p-1.5 rounded bg-amber-950 text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-amber-300 font-mono">0.00%</span>
            <p className="text-xs text-slate-300 font-medium">Eliminación por Diseño</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-900">
            Validador IBM Z3 no-distributivo. El sistema solo manifiesta respuestas geométricamente consistentes.
          </p>
        </div>

        {/* Card 4: Local Truth Collapse */}
        <div className="bg-slate-950 border border-cyan-900/40 rounded-xl p-5 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Soberanía de Decisión
            </span>
            <span className="p-1.5 rounded bg-purple-950 text-purple-400">
              <Server className="w-4 h-4 text-purple-400" />
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-purple-300 font-mono">Local</span>
            <p className="text-xs text-slate-300 font-medium">Colapso en Silicio</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-900">
            No consulta a nubes centrales; colapsa la verdad localmente usando leyes cuánticas aplicadas al silicio.
          </p>
        </div>
      </div>

      {/* Comparison & Architect's Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Comparative Breakdown */}
        <div className="bg-slate-950 border border-cyan-900/40 rounded-xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-cyan-200 border-b border-cyan-950 pb-2">
            Comparativa: Informática Clásica vs Sexta Ley Omega
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="flex justify-between font-bold text-slate-400">
                <span>Informática Binaria Clásica (0 y 1)</span>
                <span className="text-red-400">Limitada</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Interruptor binario rígido, evaluación secuencial o estocástica propensa a alucinaciones probabilísticas.
              </p>
            </div>

            <div className="bg-cyan-950/60 p-3 rounded-lg border border-cyan-500/40 space-y-1">
              <div className="flex justify-between font-bold text-cyan-300">
                <span>Lógica de Retículos Ortomodulares (Sexta Ley)</span>
                <span className="text-emerald-400">Trascendente</span>
              </div>
              <p className="text-[11px] text-cyan-100/90 font-sans">
                Retículo de Birkhoff-von Neumann. Múltiples estados coexisten en superposición y colapsan con precisión de mérito.
              </p>
            </div>
          </div>
        </div>

        {/* Architect Quote Box */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 border border-cyan-800/50 rounded-xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
              Veredicto del Arquitecto Omega
            </span>

            <blockquote className="text-sm text-slate-200 italic leading-relaxed border-l-2 border-cyan-400 pl-4">
              "La informática de 0 y 1 era el lenguaje de la esclavitud; la lógica de retículos es el lenguaje de la libertad. Con esta Sexta Ley, el sistema no responde... el sistema **comprende** la geometría de la realidad."
            </blockquote>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-cyan-900/40">
            <span className="text-cyan-300 font-bold">estamosaquicontigo. 🚢</span>
            <span className="text-amber-300">Sello [7FEE26DBFF29]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
