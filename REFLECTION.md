# Reflection

## 1. The hardest bug I hit this week, and how I debugged it

One of the hardest issues I encountered was getting the dynamic audit pages and Supabase integration working correctly together inside the Next.js App Router architecture.

Initially, the public audit pages were failing intermittently because the audit ID parameter handling inside the dynamic route was inconsistent with my async data fetching logic. The page would sometimes render successfully during development but fail during navigation or refreshes.

My first hypothesis was that the issue came from Supabase returning null values due to row-level security or database write timing. I tested this by logging database responses directly inside the API route and verifying that the rows were being created correctly.

After narrowing it down, I realized the problem was actually caused by how I structured the async params handling in the dynamic route component. I refactored the page to properly await the params object before querying Supabase.

I also added better null handling and fallback UI states to avoid runtime crashes.

The biggest lesson was that debugging became much easier once I isolated assumptions systematically rather than changing multiple things at once.

---

## 2. A decision I reversed mid-week, and what made me reverse it

Initially, I planned to make the audit engine heavily AI-driven. My first idea was to let the language model analyze pricing plans and generate recommendations dynamically.

After experimenting with this approach, I realized the outputs were often inconsistent and financially unreliable. The AI sometimes produced unrealistic savings estimates or recommendations that were difficult to justify objectively.

I reversed this decision and moved to deterministic hardcoded optimization rules for all pricing and savings calculations.

The only remaining AI-generated component became the personalized summary paragraph.

This change made the product significantly more trustworthy and aligned much better with the assignment requirements, which specifically emphasized financially defensible logic.

It also simplified testing and improved predictability across edge cases.

---

## 3. What I would build in week 2 if I had more time

If I continued development for another week, I would focus on improving the realism and scalability of the audit engine.

The first major addition would be true multi-tool stack analysis rather than single-tool audits. Many startups overspend because of overlapping subscriptions across multiple providers simultaneously, and deeper cross-tool recommendations would create more value.

I would also implement:
- industry benchmarking
- spend-per-engineer comparisons
- PDF exports
- historical audit tracking
- referral systems
- richer analytics dashboards

Another important improvement would be usage-based recommendations rather than static plan comparisons. For example, API-heavy users could receive optimization advice based on token consumption patterns rather than only subscription tiers.

Finally, I would improve onboarding polish and build a stronger growth loop around public audit sharing.

---

## 4. How I used AI tools during development

I used AI tools extensively during development, primarily ChatGPT and GitHub Copilot.

AI was most useful for:
- accelerating boilerplate generation
- debugging TypeScript issues
- improving Tailwind layouts
- generating initial documentation structure
- brainstorming architecture decisions

However, I intentionally avoided trusting AI with:
- pricing accuracy
- business logic correctness
- final audit recommendation rules
- startup economics assumptions

One specific failure happened when an AI-generated pricing recommendation incorrectly suggested that enterprise plans are always financially inefficient for small teams. In reality, certain support and compliance requirements can justify enterprise pricing even for smaller organizations.

I caught this by reviewing the recommendation logic critically and adjusting the rules to be more conservative and context-aware.

This reinforced the importance of treating AI as an assistant rather than an autonomous decision-maker.

---

## 5. Self-rating

### Discipline — 8/10

I maintained consistent progress throughout the project and structured the work into manageable milestones, though there were moments where I underestimated documentation effort.

---

### Code Quality — 7/10

The codebase is modular, typed, and reasonably maintainable, but there are still opportunities to improve abstractions and reduce duplication in the frontend components.

---

### Design Sense — 8/10

I focused heavily on creating a clean and modern interface that felt like a real startup product rather than a classroom assignment.

---

### Problem Solving — 8/10

I handled several integration and architecture issues independently and improved the project iteratively rather than forcing premature complexity.

---

### Entrepreneurial Thinking — 8/10

I tried to approach the assignment as a real product opportunity rather than only a coding exercise, especially in the GTM strategy, viral mechanics, and lead-generation flow.