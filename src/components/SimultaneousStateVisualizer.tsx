import React, { useState, useEffect } from "react";
import { Cpu, Zap, Activity, CheckCircle2, Play, RefreshCw, ShieldCheck } from "lucide-react";
import { SOURCE_CODES } from "../lib/sourceCodes";

export const SimultaneousStateVisualizer: React.FC = () => {
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(9000);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    "[SYSTEM] Motor QACO inicializado. Pulso activo a 9000 Hz.",
    "[QACO] Axioma de la Ubicuidad cargado. Coexistencia P(1)=1.0 y P(0)=1.0 activa.",
  ]);
  const [stateVector, setStateVector] = useState<{
    p1: number;
    p0: number;
    vector: number[];
  }>({
    p1: 1.0,
    p0: 1.0,
    vector: [0.618, 1.618, 0.4],
  });

  const runSimultaneousEvaluation = () => {
    setIsExecuting(true);
    const id = `INPUT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    setExecutionLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] [INICIO] Ejecutando EvaluateSimultaneousStates("${id}")...`,
      `[+0.00ms] Axioma de Ubicuidad: Asignando Bit como Retículo Ortomodular...`,
      `[+0.12ms] Vector de Reflejo Ω aplicado: [0.618, 1.618, 0.4]`,
      `[+0.25ms] Coexistencia activa: Estado 1 (Éxito) = 1.00, Estado 0 (Fallo) = 1.00`,
      ...prev.slice(0, 8),
    ]);

    // Simulate 0.38ms QACO pulse completion
    setTimeout(() => {
      setExecutionLogs((prev) => [
        `[+0.38ms] [+] ORÁCULO: Reflejo dimensional completado para ${id} bajo Sello [7FEE26DBFF29]`,
        ...prev,
      ]);
      setIsExecuting(false);
    }, 400);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => (prev >= 9005 ? 8995 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Visual Header */}
      <div className="bg-slate-900/90 border border-cyan-900/40 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              <Cpu className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-slate-100">
              Motor de Lógica No-Distributiva en Go (<code className="text-cyan-300 font-mono text-sm">lattice_oracle.go</code>)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sexta Ley Omega: En lugar de un binario 0 o 1, el Bit es un retículo ortomodular que procesa ambas rutas simultáneamente en superposición.
          </p>
        </div>

        <button
          onClick={runSimultaneousEvaluation}
          disabled={isExecuting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer shadow-lg shadow-cyan-950/50 disabled:opacity-50"
        >
          {isExecuting ? (
            <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
          ) : (
            <Play className="w-4 h-4 fill-slate-950" />
          )}
          Ejecutar Reflejo QACO (0.38 ms)
        </button>
      </div>

      {/* Grid: Live Coexistence Diagram & Vector Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coexistence Quantum Bit Diagram */}
        <div className="bg-slate-950 border border-cyan-900/40 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
            <h3 className="text-sm font-bold text-cyan-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Retículo Ortomodular de Coexistencia
            </h3>
            <span className="text-xs text-emerald-400 font-mono">
              Frecuencia: {pulseCount} Hz
            </span>
          </div>

          <div className="bg-slate-900/80 border border-cyan-900/30 rounded-lg p-6 flex flex-col items-center justify-center relative min-h-[260px] overflow-hidden">
            {/* Background Golden Spiral Glow */}
            <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20 animate-ping opacity-25" />

            <div className="relative z-10 grid grid-cols-2 gap-8 w-full max-w-xs text-center">
              {/* State 1 Card */}
              <div className="bg-cyan-950/80 border border-cyan-500/50 rounded-xl p-4 shadow-lg shadow-cyan-950">
                <span className="text-2xl font-black text-cyan-300 font-mono">1.0</span>
                <p className="text-xs font-bold text-cyan-200 mt-1">Estado 1 (Éxito)</p>
                <span className="text-[10px] text-cyan-400 block mt-1">P(S=1) = 1.0</span>
              </div>

              {/* State 0 Card */}
              <div className="bg-purple-950/80 border border-purple-500/50 rounded-xl p-4 shadow-lg shadow-purple-950">
                <span className="text-2xl font-black text-purple-300 font-mono">1.0</span>
                <p className="text-xs font-bold text-purple-200 mt-1">Estado 0 (Fallo)</p>
                <span className="text-[10px] text-purple-400 block mt-1">P(S=0) = 1.0</span>
              </div>
            </div>

            {/* Connecting Orthomodular Superposition Vector */}
            <div className="mt-6 w-full max-w-xs bg-slate-950 border border-amber-500/40 rounded-lg p-3 text-center space-y-1">
              <span className="text-xs font-bold text-amber-300 block">
                Vector de Reflejo Áureo Ω
              </span>
              <span className="text-sm font-mono font-bold text-slate-100">
                [ {stateVector.vector.join(", ")} ]
              </span>
              <p className="text-[10px] text-slate-400">
                Axioma de Ubicuidad: Procesamiento simultáneo en superposición
              </p>
            </div>
          </div>

          {/* Key Parameters */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-cyan-900/30">
              <span className="text-slate-400 text-[10px] block">LatticeSync</span>
              <span className="text-cyan-300 font-bold">400 µs (0.4ms)</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-cyan-900/30">
              <span className="text-slate-400 text-[10px] block">QuantumSeal</span>
              <span className="text-amber-300 font-bold">7FEE26DBFF29</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-cyan-900/30">
              <span className="text-slate-400 text-[10px] block">Motor QACO</span>
              <span className="text-emerald-300 font-bold">Sin Ruido Térmico</span>
            </div>
          </div>
        </div>

        {/* Live Execution Console & Code Integration */}
        <div className="bg-slate-950 border border-cyan-900/40 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Consola de Tiempos QACO (Sincronía 0.38ms)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              LatticeSync = 400µs
            </span>
          </div>

          {/* Terminal Logs Window */}
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1.5 h-[230px] overflow-y-auto border border-cyan-950">
            {executionLogs.map((log, index) => (
              <div
                key={index}
                className={`py-0.5 ${
                  log.includes("ORÁCULO")
                    ? "text-emerald-300 font-bold bg-emerald-950/40 px-2 rounded"
                    : log.includes("INICIO")
                    ? "text-cyan-300 font-semibold"
                    : "text-slate-400"
                }`}
              >
                {log}
              </div>
            ))}
          </div>

          {/* Code Excerpt Snippet */}
          <div className="bg-slate-900/90 border border-cyan-900/30 rounded-lg p-3 font-mono text-[11px] text-slate-300 space-y-1">
            <div className="text-amber-400 text-[10px] font-bold">
              // Código Go original: lattice_oracle.go
            </div>
            <pre className="text-cyan-200/90 overflow-x-auto p-1 bg-slate-950 rounded">
{`oe.ActiveLattices[inputID] = LatticeState{
    SuccessProbability: 1.0,
    FailureProbability: 1.0,
    ReflectionVector:   []float32{0.618, 1.618, 0.4},
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
