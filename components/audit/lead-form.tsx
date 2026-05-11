"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  savings: number;
  tool: string;
  teamSize: number;
}

export function LeadForm({
  savings,
  tool,
  teamSize,
}: Props) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] =
    useState("");

  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("leads")
      .insert({
        email,
        company_name: companyName,
        role,
        monthly_savings: savings,
        tool,
        team_size: teamSize,
      });

    setLoading(false);

   if (error) {
  console.error("SUPABASE ERROR:", error);

  alert(
    JSON.stringify(error, null, 2)
  );
} else {
  setSuccess(true);
}
  };

  if (success) {
    return (
      <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-6">
        <h3 className="text-2xl font-bold text-green-400">
          Audit Saved Successfully
        </h3>

        <p className="mt-2 text-gray-300">
          We’ll email your audit summary shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-2xl font-bold">
        Save Your Audit Report
      </h3>

      <p className="mt-2 text-gray-400">
        Get a copy of your audit and future savings
        alerts.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        <input
          type="email"
          required
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black p-3"
        />

        <input
          placeholder="Company name"
          value={companyName}
          onChange={(e) =>
            setCompanyName(e.target.value)
          }
          className="w-full rounded-lg border border-white/10 bg-black p-3"
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black p-3"
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-white py-3 font-medium text-black"
        >
          {loading
            ? "Saving..."
            : "Save Audit Report"}
        </button>
      </form>
    </div>
  );
}