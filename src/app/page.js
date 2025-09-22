"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // { type: 'success' | 'error' | 'loading', text: string }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setStatus({ type: 'error', text: 'Name and email are required.' });
      return;
    }

    setStatus({ type: 'loading', text: 'Sending...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message }),
      });

      if (res.ok) {
        setStatus({ type: 'success', text: 'Message sent.' });
        setName('');
        setEmail('');
        setMessage('');
      } else if (res.status === 404) {
        console.warn('No /api/contact route found. Submission logged locally.');
        console.log({ name, email, message });
        setStatus({ type: 'success', text: 'Message logged locally (no API route).' });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await res.json().catch(() => ({ message: res.statusText || 'Unknown error' }));
        setStatus({ type: 'error', text: data.message || 'Submission failed.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Network error. Try again.' });
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <div className="flex items-center gap-4">
          
          <h1 className="text-2xl font-semibold">Contact</h1>
        </div>

        <form
          className="w-full bg-white/60 dark:bg-black/50 rounded-lg p-6 shadow-sm grid gap-4"
          onSubmit={handleSubmit}
          aria-label="contact form"
        >
          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">Name</span>
            <input
              className="px-3 py-2 border rounded bg-transparent focus:outline-none focus:ring"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">Email</span>
            <input
              className="px-3 py-2 border rounded bg-transparent focus:outline-none focus:ring"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">Message</span>
            <textarea
              className="px-3 py-2 border rounded bg-transparent focus:outline-none focus:ring resize-y"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Write your message..."
            />
          </label>

          <div className="flex gap-3 items-center">
            <button
              type="submit"
              className="rounded-full bg-foreground text-background px-4 py-2 font-medium disabled:opacity-60"
              disabled={status?.type === 'loading'}
            >
              {status?.type === 'loading' ? 'Sending...' : 'Send'}
            </button>

            {status && (
              <p
                className={
                  status.type === 'success'
                    ? 'text-sm text-green-600'
                    : status.type === 'error'
                    ? 'text-sm text-red-600'
                    : 'text-sm text-gray-700'
                }
                role="status"
                aria-live="polite"
              >
                {status.text}
              </p>
            )}
          </div>
        </form>

        <div className="flex gap-4 items-center flex-col sm:flex-row w-full">
          
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm">
        <a className="hover:underline" href="" target="_blank" rel="noreferrer">
          Learn
        </a>
        <a className="hover:underline" href="" target="_blank" rel="noreferrer">
          Examples
        </a>
        <a className="hover:underline" href="" target="_blank" rel="noreferrer">
          Go to →
        </a>
      </footer>
    </div>
  );
}
