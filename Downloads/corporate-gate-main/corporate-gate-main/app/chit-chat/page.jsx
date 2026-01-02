"use client";

import Footer from "../_components/Footer";
import Link from "next/link";
import { useState } from "react";
import { Play, Save } from "lucide-react";

export default function ChitChatSetupPage() {
  const [form, setForm] = useState({
    topic: "",
    language: "en",
  });

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const isValid = form.topic.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#fafafa] font-poppins">
      <main className="w-full text-gray-800 max-w-5xl mx-auto px-4 py-8 text-xs md:text-base">
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-semibold">AI Chit-Chat</h1>
          <p className="text-xs md:text-base text-gray-500 mt-1">
            Start a casual conversation with AI on any topic. Supports both
            English and Hindi.
          </p>
        </div>

        <div className="bg-white/80 border rounded-xl p-4 md:p-6 shadow-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs md:text-sm font-medium">
                Topic to Chat About
              </label>
              <input
                value={form.topic}
                onChange={(e) => update("topic", e.target.value)}
                placeholder="e.g., Technology, Movies, Sports, Cooking..."
                className="mt-1 w-full text-xs md:text-sm border rounded-lg px-3 py-2 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter any topic you'd like to discuss
              </p>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium">
                Language
              </label>
              <select
                value={form.language}
                onChange={(e) => update("language", e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <Link
              href={{
                pathname: "/chit-chat/lobby",
                query: { preset: JSON.stringify(form) },
              }}
              className={`px-5 py-2 rounded-lg text-white gradient-bg btn-hover text-center inline-flex items-center gap-2 cursor-pointer ${
                !isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => {
                if (!isValid) {
                  e.preventDefault();
                }
              }}
            >
              <Play size={16} />
              <span>Start Chatting</span>
            </Link>

            <button
              type="button"
              onClick={() =>
                localStorage.setItem("chitChatSetupDraft", JSON.stringify(form))
              }
              className="px-5 py-2 rounded-lg border btn-hover inline-flex items-center gap-2 cursor-pointer"
            >
              <Save size={16} />
              <span>Save Draft</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
