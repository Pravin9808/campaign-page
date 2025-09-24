"use client"; // Required for React hooks (useState)

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "loading", text: "Sending..." });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      setStatus({ type: res.ok ? "success" : "error", text: data.message });

      if (res.ok) {
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Network error" });
    }
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Contact Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border px-3 py-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border px-3 py-2 w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          className="border px-3 py-2 w-full"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={status?.type === "loading"}
        >
          {status?.type === "loading" ? "Sending..." : "Send"}
        </button>
        {status && (
          <p
            className={
              status.type === "success"
                ? "text-green-600"
                : status.type === "error"
                ? "text-red-600"
                : ""
            }
          >
            {status.text}
          </p>
        )}
      </form>
    </main>
  );
}
