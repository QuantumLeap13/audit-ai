"use client";

import { useEffect, useState } from "react";

interface Props {
  tool: string;
  currentSpend: number;
  savings: number;
  useCase: string;
}

export function AISummary({
  tool,
  currentSpend,
  savings,
  useCase,
}: Props) {
  const [summary, setSummary] =
    useState("Generating AI summary...");

  useEffect(() => {
    async function generateSummary() {
      try {
        const response = await fetch(
          "/api/summary",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              tool,
              currentSpend,
              savings,
              useCase,
            }),
          }
        );

        const data = await response.json();

        setSummary(data.summary);
      } catch {
        setSummary(
          "Your current AI tooling setup shows opportunities for cost optimization and better pricing alignment."
        );
      }
    }

    generateSummary();
  }, [tool, currentSpend, savings, useCase]);

  return (
    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-6">
      <h3 className="text-2xl font-bold">
        AI-Generated Summary
      </h3>

      <p className="mt-4 leading-7 text-gray-300">
        {summary}
      </p>
    </div>
  );
}