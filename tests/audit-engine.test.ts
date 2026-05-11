import { describe, expect, it } from "vitest";

import { generateAudit } from "@/lib/audit-engine/engine";

describe("Audit Engine", () => {
  it("detects unnecessary team plan", () => {
    const result = generateAudit({
      tools: [
        {
          tool: "chatgpt",
          plan: "team",
          monthlySpend: 100,
          seats: 2,
        },
      ],

      teamSize: 2,

      useCase: "coding",
    });

    expect(result.totalSavings).toBeGreaterThan(0);
  });

  it("reduces enterprise overspending", () => {
    const result = generateAudit({
      tools: [
        {
          tool: "claude",
          plan: "enterprise",
          monthlySpend: 500,
          seats: 3,
        },
      ],

      teamSize: 3,

      useCase: "research",
    });

    expect(result.totalSavings).toBeGreaterThan(100);
  });

  it("calculates annual savings", () => {
    const result = generateAudit({
      tools: [
        {
          tool: "chatgpt",
          plan: "team",
          monthlySpend: 200,
          seats: 2,
        },
      ],

      teamSize: 2,

      useCase: "coding",
    });

    expect(result.annualSavings).toBe(
      result.totalSavings * 12
    );
  });

  it("returns recommendations", () => {
    const result = generateAudit({
      tools: [
        {
          tool: "cursor",
          plan: "team",
          monthlySpend: 120,
          seats: 2,
        },
      ],

      teamSize: 2,

      useCase: "coding",
    });

    expect(
      result.recommendations.length
    ).toBeGreaterThan(0);
  });

  it("handles optimized plans", () => {
    const result = generateAudit({
      tools: [
        {
          tool: "gemini",
          plan: "pro",
          monthlySpend: 20,
          seats: 1,
        },
      ],

      teamSize: 1,

      useCase: "writing",
    });

    expect(result.totalSavings).toBeGreaterThanOrEqual(
      0
    );
  });
});