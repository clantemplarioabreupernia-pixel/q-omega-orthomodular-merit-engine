export interface LatticeState {
  inputID: string;
  successProbability: number; // State 1
  failureProbability: number; // State 0
  reflectionVector: number[]; // [0.618, 1.618, 0.4]
  coherence: number;
  timestamp: string;
}

export interface Z3ValidationResult {
  sat: boolean;
  leftVal: boolean;
  rightVal: boolean;
  distributivityHolds: boolean;
  statusMessage: string;
  quantumVanishTriggered: boolean;
  nonDistributiveVerified: boolean;
}

export interface OracleEvaluationResponse {
  inputID: string;
  quantumSeal: string;
  qacoLatencyMs: string;
  latticeSyncUs: number;
  coherence: number;
  nativeKernelInfo?: string;
  latticeState: {
    successProbability: number;
    failureProbability: number;
    reflectionVector: number[];
    nonDistributiveValidated: boolean;
  };
  meritCollapse: {
    chosenState: number;
    meritScore: number;
    reasoning: string;
    z3Status: string;
  };
  industrialMetrics: {
    cpuSavingsPercent: number;
    stochasticDriftRisk: string;
    localTruthCollapse: boolean;
    productionStatus?: string;
  };
}

export type ActiveTab =
  | "aetherCube"
  | "latticeOracle"
  | "z3Guard"
  | "queryTerminal"
  | "codeViewer"
  | "industrialMetrics"
  | "industrialDeployment";
