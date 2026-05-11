import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("audits")
      .insert({
        tool: body.tool,
        plan: body.plan,
        monthly_spend: body.monthlySpend,
        seats: body.seats,

        total_savings: body.totalSavings,
        annual_savings: body.annualSavings,

        summary: body.summary,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      auditId: data.id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}