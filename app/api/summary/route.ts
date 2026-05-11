import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
          {
            role: "system",
            content:
              "You are an AI infrastructure cost optimization expert.",
          },

          {
            role: "user",
            content: `
Generate a concise personalized AI spend audit summary.

Tool: ${body.tool}
Current Monthly Spend: $${body.currentSpend}
Potential Monthly Savings: $${body.savings}
Use Case: ${body.useCase}

Requirements:
- Around 80-120 words
- Professional but conversational
- Mention realistic optimization opportunities
- Mention annualized savings
- Avoid hype language
`,
          },
        ],
      });

    const summary =
      completion.choices[0].message.content;

    return Response.json({
      summary,
    });
  } catch (error) {
    console.error(error);

    // Fallback response
    return Response.json({
      summary:
        "Your AI stack appears to have meaningful optimization opportunities. Based on your current spend, reducing unnecessary enterprise features and optimizing usage patterns may significantly reduce annual costs while maintaining productivity.",
    });
  }
}