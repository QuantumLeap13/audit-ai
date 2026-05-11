import { AuditSummary } from "@/types/audit";
import { AISummary } from "./ai-summary";
import { LeadForm } from "./lead-form";

interface Props {
  results: AuditSummary;
}

export function AuditResults({ results }: Props) {
  return (
    <div className="mt-10 space-y-6">
      {/* Savings Hero Section */}
      <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-8">
        <h2 className="text-3xl font-bold">
          Potential Savings
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-400">
              Monthly Savings
            </p>

            <p className="text-5xl font-bold text-green-400">
              ${results.totalSavings.toFixed(0)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Annual Savings
            </p>

            <p className="text-5xl font-bold text-green-400">
              ${results.annualSavings.toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {results.recommendations.map((item) => (
          <div
            key={item.tool}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold capitalize">
                {item.tool}
              </h3>

              <div className="text-right">
                <p className="text-sm text-gray-400">
                  Savings
                </p>

                <p className="text-2xl font-bold text-green-400">
                  ${item.savings.toFixed(0)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-400">
                  Current Spend
                </p>

                <p className="text-xl">
                  ${item.currentSpend}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Recommended Spend
                </p>

                <p className="text-xl">
                  ${item.recommendedSpend.toFixed(0)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium text-green-300">
                {item.recommendation}
              </p>

              <p className="mt-1 text-gray-400">
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Credex CTA */}
      {results.totalSavings > 500 && (
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
          <h3 className="text-2xl font-bold">
            Large Savings Opportunity Detected
          </h3>

          <p className="mt-2 text-gray-300">
            Credex may help reduce your AI infrastructure
            costs even further through discounted credits.
          </p>

          <button className="mt-4 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-400">
            Book Consultation
          </button>
        </div>
      )}

      {/* Honest Low Savings Message */}
      {results.totalSavings < 100 && (
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6">
          <h3 className="text-2xl font-bold text-yellow-300">
            Your AI Spend Looks Healthy
          </h3>

          <p className="mt-2 text-gray-300">
            We didn’t detect major overspending opportunities
            right now. Still, saving your audit lets us notify
            you when better optimizations become available.
          </p>
        </div>
      )}

      {/* AI Summary */}
      <AISummary
        tool={results.recommendations[0]?.tool || ""}
        currentSpend={results.totalCurrentSpend}
        savings={results.totalSavings}
        useCase="coding"
      />

      {/* Lead Capture */}
      <LeadForm
        savings={results.totalSavings}
        tool={results.recommendations[0]?.tool || ""}
        teamSize={5}
      />
    </div>
  );
}