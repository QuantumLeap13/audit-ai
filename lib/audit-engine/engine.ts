import { AuditInput, AuditRecommendation } from "@/types/audit";

export function generateAudit(
  input: AuditInput
): AuditRecommendation[] {
  const recommendations: AuditRecommendation[] = [];

  input.tools.forEach((tool) => {
    let recommendedSpend = tool.monthlySpend;
    let recommendation = "Current plan is appropriate";
    let reason = "No optimization detected";

    if (tool.seats <= 2 && tool.plan === "team") {
      recommendedSpend = tool.monthlySpend * 0.6;
      recommendation = "Downgrade from Team plan";
      reason =
        "Small teams usually do not require collaboration features";
    }

    recommendations.push({
      tool: tool.tool,
      currentSpend: tool.monthlySpend,
      recommendedSpend,
      savings: tool.monthlySpend - recommendedSpend,
      recommendation,
      reason,
    });
  });

  return recommendations;
}