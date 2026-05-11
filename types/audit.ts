export type ToolName =
  | "cursor"
  | "copilot"
  | "claude"
  | "chatgpt"
  | "gemini";

export interface ToolInput {
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: ToolInput[];
  teamSize: number;
  useCase: string;
}

export interface AuditRecommendation {
  tool: string;
  currentSpend: number;
  recommendedSpend: number;
  savings: number;
  recommendation: string;
  reason: string;
}

export interface AuditSummary {
  recommendations: AuditRecommendation[];
  totalCurrentSpend: number;
  totalRecommendedSpend: number;
  totalSavings: number;
  annualSavings: number;
}