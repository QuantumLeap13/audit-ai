export function HeroSection() {
  return (
    <section className="border-b border-white/10">
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="mb-4 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm text-green-400">
          Save up to 40% on AI tool spend
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Audit Your AI Spend in 60 Seconds
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
          Discover hidden overspending across ChatGPT, Claude,
          Cursor, Copilot, Gemini, and more.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <span>No login required</span>
          <span>•</span>
          <span>Free instant audit</span>
          <span>•</span>
          <span>Shareable reports</span>
        </div>
      </div>
    </section>
  );
}