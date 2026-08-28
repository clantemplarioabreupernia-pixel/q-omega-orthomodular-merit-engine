import React, { useState } from "react";
import { SOURCE_CODES } from "../lib/sourceCodes";
import { Copy, Check, Code2, FileCode, Layers } from "lucide-react";

export const CodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<"go" | "python" | "glsl">("go");
  const [copied, setCopied] = useState<boolean>(false);

  const currentCode = SOURCE_CODES[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-cyan-900/40 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              <Code2 className="w-5 h-5 text-cyan-400" />
            </span>
            <h2 className="text-lg font-bold text-slate-100">
              Código Madre e Inspector de Código Técnico
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Archivos fuente originales que implementan la Sexta Ley de la Arquitectura Omega: Reflejo Dimensional y Lógica de Retículos Ortomodulares.
          </p>
        </div>

        {/* File Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-cyan-900/60">
          {[
            { id: "go", label: "lattice_oracle.go", lang: "Go" },
            { id: "python", label: "lattice_guard.py", lang: "Python" },
            { id: "glsl", label: "dimensional_reflection.glsl", lang: "GLSL" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedFile(item.id as "go" | "python" | "glsl")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedFile === item.id
                  ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="bg-slate-950 border border-cyan-900/40 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top File Bar */}
        <div className="bg-slate-900 p-4 border-b border-cyan-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs font-bold text-slate-100">
              {currentCode.filename}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              — {currentCode.title}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all cursor-pointer border border-slate-700"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Código</span>
              </>
            )}
          </button>
        </div>

        {/* Code Description */}
        <div className="bg-slate-900/60 p-3 px-5 border-b border-cyan-950/60 text-xs text-slate-300 font-sans">
          {currentCode.description}
        </div>

        {/* Pre Code Box */}
        <div className="p-4 bg-slate-950 overflow-x-auto text-xs font-mono leading-relaxed text-cyan-100/90 max-h-[550px] overflow-y-auto">
          <pre className="selection:bg-cyan-900 selection:text-cyan-100">
            <code>{currentCode.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
