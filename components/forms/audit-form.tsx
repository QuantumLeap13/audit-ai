"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { ToolName, AuditSummary } from "@/types/audit";
import { generateAudit } from "@/lib/audit-engine/engine";
import { AuditResults } from "@/components/audit/audit-results";

type FormData = {
  tool: ToolName | "";
  plan: string;
  monthlySpend: number;
  seats: number;
  teamSize: number;
  useCase: string;
};

const inputClass =
  "w-full rounded-lg border border-white/20 bg-black p-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500";

export function AuditForm() {
  const [results, setResults] = useState<AuditSummary | null>(null);
  const [shareUrl, setShareUrl] = useState("");

  const { register, handleSubmit, control, setValue } =
    useForm<FormData>();

  const watchedValues = useWatch({ control });

  useEffect(() => {
    const saved = localStorage.getItem("audit-form");
    if (!saved) return;

    const parsed = JSON.parse(saved) as Partial<FormData>;

    Object.entries(parsed).forEach(([key, value]) => {
      setValue(key as keyof FormData, value as never);
    });
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify(watchedValues)
    );
  }, [watchedValues]);

  const onSubmit = async (data: FormData) => {
    if (!data.tool) return;

    const audit = generateAudit({
      tools: [
        {
          tool: data.tool,
          plan: data.plan,
          monthlySpend: Number(data.monthlySpend),
          seats: Number(data.seats),
        },
      ],
      teamSize: Number(data.teamSize),
      useCase: data.useCase,
    });

    setResults(audit);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: data.tool,
          plan: data.plan,
          monthlySpend: Number(data.monthlySpend),
          seats: Number(data.seats),
          totalSavings: audit.totalSavings,
          annualSavings: audit.annualSavings,
          summary: "AI-generated audit summary placeholder",
        }),
      });

      const result = await response.json();

      if (result.auditId) {
        setShareUrl(
          `${window.location.origin}/audit/${result.auditId}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      aria-labelledby="audit-form-title"
      className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
    >
      <h2
        id="audit-form-title"
        className="mb-6 text-3xl font-semibold"
      >
        Start Your Free Audit
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="tool" className="mb-2 block text-sm">
            AI Tool
          </label>
          <select
            id="tool"
            {...register("tool")}
            className={inputClass}
            required
          >
            <option value="">Select tool</option>
            <option value="chatgpt">ChatGPT</option>
            <option value="claude">Claude</option>
            <option value="cursor">Cursor</option>
            <option value="copilot">GitHub Copilot</option>
            <option value="gemini">Gemini</option>
          </select>
        </div>

        <div>
          <label htmlFor="plan" className="mb-2 block text-sm">
            Current Plan
          </label>
          <input
            id="plan"
            {...register("plan")}
            placeholder="Ex: Team"
            className={inputClass}
            required
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="monthlySpend"
              className="mb-2 block text-sm"
            >
              Monthly Spend ($)
            </label>
            <input
              id="monthlySpend"
              type="number"
              min="0"
              {...register("monthlySpend")}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="seats" className="mb-2 block text-sm">
              Seats
            </label>
            <input
              id="seats"
              type="number"
              min="1"
              {...register("seats")}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="teamSize" className="mb-2 block text-sm">
            Team Size
          </label>
          <input
            id="teamSize"
            type="number"
            min="1"
            {...register("teamSize")}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="useCase" className="mb-2 block text-sm">
            Primary Use Case
          </label>
          <select
            id="useCase"
            {...register("useCase")}
            className={inputClass}
            required
          >
            <option value="">Select use case</option>
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="research">Research</option>
            <option value="data">Data Analysis</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <button
          type="submit"
          aria-label="Generate AI spend audit"
          className="w-full rounded-lg bg-green-500 py-3 font-medium text-black transition hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          Generate Free Audit
        </button>
      </form>

      {results && <AuditResults results={results} />}

      {shareUrl && (
        <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
          <p className="font-medium text-blue-200">
            Shareable Audit URL
          </p>

          <a
            href={shareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open shareable audit report"
            className="mt-2 block break-all text-sm text-white underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {shareUrl}
          </a>
        </div>
      )}
    </section>
  );
}