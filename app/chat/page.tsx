"use client";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const aiMessage = { role: "ai", content: data.reply };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 text-center font-semibold text-lg shadow">
        Santri AI Assistant
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md px-4 py-3 rounded-2xl shadow text-sm
                ${
                  m.role === "user"
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-xl shadow text-sm animate-pulse">
              Mengetik...
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Tulis pertanyaan..."
          className="flex-1 bg-gray-100 text-black placeholder-gray-500 
               border border-gray-300 
               rounded-xl px-4 py-3 
               text-base
               focus:outline-none 
               focus:ring-2 
               focus:ring-green-500 
               focus:bg-white
               transition"
        />

        <button
          onClick={send}
          className="bg-green-600 text-white px-6 py-3 
               rounded-xl 
               hover:bg-green-700 
               active:scale-95
               transition font-medium"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
