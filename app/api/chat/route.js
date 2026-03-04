import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    console.log("KEY ADA?", !!process.env.OPENAI_API_KEY);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await req.json();
    const message = body.message;

    console.log("MESSAGE:", message);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ganti dulu ke ini untuk test
      messages: [
        { role: "system", content: "Test" },
        { role: "user", content: message },
      ],
    });

    console.log("COMPLETION:", completion);

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "AI tidak memberikan jawaban.";

    return Response.json({ reply });

  } catch (error) {
    console.error("FULL OPENAI ERROR:", error);
    return Response.json(
      { reply: "SERVER ERROR - cek logs" },
      { status: 500 }
    );
  }
}