"use client";

import { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function TeachPage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [script, setScript] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [warning, setWarning] = useState("");
  const [history, setHistory] = useState([]);

  async function fetchHistory() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/lectures`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch lectures");
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (e) {
      // Silent history error
    }
  }

  async function regenerateFromHistory(item) {
    setError("");
    setWarning("");
    setScript("");
    setVideoUrl("");
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/lectures/${item._id}/generate-video`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to regenerate video");
      }
      setScript(item.script || "");
      setVideoUrl(data.videoUrl || "");
      if (data?.warning) setWarning(data.warning);
      fetchHistory();
      // Scroll to result
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setScript("");
    setVideoUrl("");
    setWarning("");
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/generate-lecture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, description }),
      });

      const data = await res.json();
      if (!res.ok) {
        // May include script on video error from older server behavior
        setScript(data?.script || "");
        const details = data?.details ? ` (${data.details})` : "";
        throw new Error(
          (data?.error || "Failed to generate lecture") + details
        );
      }

      setScript(data.script || "");
      setVideoUrl(data.videoUrl || "");
      if (data?.warning) setWarning(data.warning);
      fetchHistory();
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          AI Teaching Video
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Generate a 10-minute lecture using ChatGPT and an AI avatar.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none"
              placeholder="e.g., Introduction to Machine Learning"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none"
              placeholder="Key points, audience level, examples to include, etc."
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating...
                </span>
              ) : (
                "Generate Lecture"
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {warning && (
          <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
            {warning}
          </div>
        )}

        {(script || videoUrl) && (
          <div className="mt-10 space-y-6">
            {script && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Generated Script
                </h2>
                <div className="mt-2 whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-800">
                  {script}
                </div>
              </div>
            )}

            {videoUrl && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Lecture Video
                </h2>
                <div className="mt-2 overflow-hidden rounded-md border border-gray-200">
                  <iframe
                    src={videoUrl}
                    className="h-[360px] w-full"
                    allow="autoplay; encrypted-media;"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-16">
          <h3 className="text-lg font-semibold text-gray-900">
            Previous Lectures
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {history?.length === 0 && (
              <div className="text-sm text-gray-500">No lectures yet.</div>
            )}
            {history?.map((item) => (
              <button
                key={item._id}
                onClick={() => regenerateFromHistory(item)}
                className="rounded-md border border-gray-200 p-4 text-left hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.subject}
                    </div>
                    <div className="mt-1 line-clamp-2 text-xs text-gray-600">
                      {item.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : ""}
                  </div>
                </div>
                {item.videoUrl && (
                  <span className="mt-3 inline-block text-xs font-medium text-blue-600">
                    Has video • click to regenerate
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
