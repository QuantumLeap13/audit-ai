import {
  AuditInput,
  AuditRecommendation,
  AuditSummary,
} from "@/types/audit";

export function generateAudit(
  input: AuditInput
): AuditSummary {
  const recommendations: AuditRecommendation[] = [];

  let totalCurrentSpend = 0;
  let totalRecommendedSpend = 0;

  input.tools.forEach((tool) => {
    let recommendedSpend = tool.monthlySpend;
    let recommendation = "Current plan is already optimized";
    let reason = "No meaningful savings opportunity detected";

    // Small team overpaying for team plans
    if (
      tool.seats <= 2 &&
      tool.plan.toLowerCase() === "team"
    ) {
      recommendedSpend = tool.monthlySpend * 0.6;

      recommendation = "Downgrade from Team plan";

      reason =
        "Small teams often don't need advanced collaboration features.";
    }

    // Expensive enterprise plan
    if (
      tool.seats < 10 &&
      tool.plan.toLowerCase() === "enterprise"
    ) {
      recommendedSpend = tool.monthlySpend * 0.5;

      recommendation = "Move away from Enterprise plan";

      reason =
        "Enterprise pricing rarely makes sense for teams under 10 users.";
    }

    // ChatGPT optimization
    if (
      tool.tool === "chatgpt" &&
      tool.monthlySpend > 100
    ) {
      recommendedSpend *= 0.8;

      recommendation =
        "Reduce API usage or shift workloads";

      reason =
        "Heavy ChatGPT spend can often be partially replaced with cheaper AI tooling.";
    }

    // Claude optimization
    if (
      tool.tool === "claude" &&
      input.useCase === "coding"
    ) {
      recommendedSpend *= 0.85;

      recommendation =
        "Consider mixed AI workflow";

      reason =
        "Coding-heavy teams often reduce costs using hybrid tooling.";
    }

    const savings =
      tool.monthlySpend - recommendedSpend;

    totalCurrentSpend += tool.monthlySpend;
    totalRecommendedSpend += recommendedSpend;

    recommendations.push({
      tool: tool.tool,
      currentSpend: tool.monthlySpend,
      recommendedSpend,
      savings,
      recommendation,
      reason,
    });
  });

  const totalSavings =
    totalCurrentSpend - totalRecommendedSpend;

  return {
    recommendations,
    totalCurrentSpend,
    totalRecommendedSpend,
    totalSavings,
    annualSavings: totalSavings * 12,
  };
}