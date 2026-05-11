"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
  teamSize: number;
  useCase: string;
};

export function AuditForm() {
  const { register, handleSubmit, watch, setValue } =
    useForm<FormData>();

  useEffect(() => {
    const saved = localStorage.getItem("audit-form");

    if (saved) {
      const parsed = JSON.parse(saved);

      Object.entries(parsed).forEach(([key, value]) => {
        setValue(key as keyof FormData, value as never);
      });
    }
  }, [setValue]);

  const values = watch();

  useEffect(() => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify(values)
    );
  }, [values]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Audit calculation coming next step!");
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <h2 className="mb-6 text-3xl font-semibold">
        Start Your Free Audit
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm">
            AI Tool
          </label>

          <select
            {...register("tool")}
            className="w-full rounded-lg border border-white/10 bg-black p-3"
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
          <label className="mb-2 block text-sm">
            Current Plan
          </label>

          <input
            {...register("plan")}
            placeholder="Ex: Team"
            className="w-full rounded-lg border border-white/10 bg-black p-3"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              {...register("monthlySpend")}
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Seats
            </label>

            <input
              type="number"
              {...register("seats")}
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm">
            Team Size
          </label>

          <input
            type="number"
            {...register("teamSize")}
            className="w-full rounded-lg border border-white/10 bg-black p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">
            Primary Use Case
          </label>

          <select
            {...register("useCase")}
            className="w-full rounded-lg border border-white/10 bg-black p-3"
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
          className="w-full rounded-lg bg-green-500 py-3 font-medium text-black transition hover:bg-green-400"
        >
          Generate Free Audit
        </button>
      </form>
    </div>
  );
}