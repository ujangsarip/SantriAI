import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { reply: "API KEY tidak terbaca." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await req.json();
    const message = body.message;

    if (!message) {
      return Response.json(
        { reply: "Pesan kosong." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Kamu adalah AI Santri." },
        { role: "user", content: message },
      ],
    });

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "AI tidak memberikan jawaban.";

    return Response.json({ reply });

  } catch (error) {
    console.error("OPENAI ERROR:", error);

    return Response.json(
      { reply: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}