import { supabase } from "@/lib/supabase";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

/* -------------------------------- */
/* Dynamic SEO Metadata */
/* -------------------------------- */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return {
      title: "Audit Not Found",
    };
  }

  return {
    title: `${data.tool} AI Spend Audit`,
    description: `Potential annual savings: $${data.annual_savings}`,

    openGraph: {
      title: `${data.tool} AI Spend Audit`,
      description: `Potential annual savings: $${data.annual_savings}`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${data.tool} AI Spend Audit`,
      description: `Potential annual savings: $${data.annual_savings}`,
    },
  };
}

/* -------------------------------- */
/* Page Component */
/* -------------------------------- */

export default async function AuditPage({
  params,
}: Props) {
  const { id } = await params;

  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h1 className="text-3xl font-bold">
            Audit Not Found
          </h1>

          <p className="mt-3 text-gray-400">
            The requested audit report does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Hero Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
          <div className="mb-6 inline-block rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1 text-sm text-green-400">
            Public AI Spend Audit
          </div>

          <h1 className="text-5xl font-bold capitalize md:text-6xl">
            {data.tool} Spend Audit
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Generated AI infrastructure savings report.
          </p>

          {/* Savings Stats */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
              <p className="text-sm text-gray-300">
                Monthly Savings
              </p>

              <p className="mt-2 text-5xl font-bold text-green-400">
                ${data.total_savings}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
              <p className="text-sm text-gray-300">
                Annual Savings
              </p>

              <p className="mt-2 text-5xl font-bold text-blue-400">
                ${data.annual_savings}
              </p>
            </div>
          </div>

          {/* Tool Details */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-gray-400">
                Current Plan
              </p>

              <p className="mt-2 text-2xl font-semibold capitalize">
                {data.plan}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-gray-400">
                Monthly Spend
              </p>

              <p className="mt-2 text-2xl font-semibold">
                ${data.monthly_spend}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-gray-400">
                Seats
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {data.seats}
              </p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-8">
            <h2 className="text-3xl font-bold">
              Recommendation
            </h2>

            <p className="mt-4 leading-8 text-gray-300">
              {data.summary}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-8">
            <h3 className="text-3xl font-bold">
              Reduce AI Infrastructure Costs
            </h3>

            <p className="mt-3 text-gray-300">
              Credex helps startups access discounted AI
              infrastructure credits and optimize tooling
              spend.
            </p>

            <button className="mt-6 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200">
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}