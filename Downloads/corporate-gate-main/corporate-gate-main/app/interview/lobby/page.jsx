"use client";

import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Hourglass,
  Mic,
  PhoneCall,
  ArrowLeft,
} from "lucide-react";

export default function InterviewLobbyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [permission, setPermission] = useState("prompt");
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [testUrl, setTestUrl] = useState("");
  const [recording, setRecording] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Get form data from query params
    const preset = searchParams.get("preset");
    if (preset) {
      try {
        const data = JSON.parse(preset);
        setFormData(data);
      } catch (e) {
        console.error("Failed to parse preset data", e);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;

    // Only request mic permission if mode is Voice
    if (formData?.mode === "Voice") {
      navigator.mediaDevices
        ?.getUserMedia({ audio: true })
        .then(() => setPermission("granted"))
        .catch(() => setPermission("denied"));

      navigator.mediaDevices?.enumerateDevices?.().then((list) => {
        if (!mounted) return;
        const mics = list.filter((d) => d.kind === "audioinput");
        setDevices(mics);
        if (mics[0]) setSelectedDeviceId(mics[0].deviceId || "default");
      });
    } else {
      setPermission("not-required");
    }

    return () => {
      mounted = false;
    };
  }, [formData]);

  const startTest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
        },
      });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setTestUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
      };
      mediaRecorder.start();
      setRecording(true);
      setTimeout(() => mediaRecorder.stop(), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const isReady = formData?.mode === "Text" || permission === "granted";

  const handleStartInterview = () => {
    if (!formData) return;
    // Pass form data to session page
    router.push(
      `/session/${Date.now()}?data=${encodeURIComponent(
        JSON.stringify(formData)
      )}`
    );
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#fafafa] font-poppins flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-poppins">
      <main className="w-full text-gray-800 max-w-4xl mx-auto px-4 py-8 text-xs md:text-base">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">
          Lobby & Mic Check
        </h1>
        <p className="text-gray-500 mb-6 text-xs md:text-base">
          {formData.mode === "Voice"
            ? "We will verify your microphone and device settings before starting."
            : "You're ready to start the text-based interview."}
        </p>

        <div className="bg-white/80 border rounded-xl p-4 md:p-6 shadow-custom space-y-6">
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2 text-xs md:text-sm">
              Interview Details:
            </h3>
            <div className="text-xs md:text-sm text-gray-600 space-y-1">
              <p>
                <strong>Company:</strong> {formData.company}
              </p>
              <p>
                <strong>Role:</strong> {formData.role}
              </p>
              <p>
                <strong>Mode:</strong> {formData.mode}
              </p>
              <p>
                <strong>Tone:</strong> {formData.tone}
              </p>
              <p>
                <strong>Difficulty:</strong> {formData.difficulty}
              </p>
            </div>
          </div>

          {formData.mode === "Voice" && (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs md:text-sm">
                    Microphone Permission
                  </span>
                  <span
                    className={`inline-flex items-center gap-2 text-xs md:text-sm ${
                      permission === "granted"
                        ? "text-green-600"
                        : permission === "denied"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {permission === "granted" && <CheckCircle2 size={16} />}
                    {permission === "denied" && <XCircle size={16} />}
                    {permission !== "granted" && permission !== "denied" && (
                      <Hourglass size={16} />
                    )}
                    {permission}
                  </span>
                </div>
                {permission === "denied" && (
                  <p className="text-xs md:text-sm text-red-600 mt-2">
                    Mic access blocked. Please enable in browser settings or
                    switch to Text mode.
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium inline-flex items-center gap-2">
                  <Mic size={14} />
                  <span>Input Device</span>
                </label>
                <select
                  value={selectedDeviceId}
                  onChange={(e) => setSelectedDeviceId(e.target.value)}
                  className="mt-1 w-full text-xs md:text-sm border rounded-lg px-3 py-2 focus:outline-none"
                >
                  {devices.map((d) => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || "Microphone"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={startTest}
                    className="px-4 py-2 rounded-lg text-white gradient-bg btn-hover cursor-pointer inline-flex items-center gap-2 text-xs md:text-sm"
                    disabled={!isReady || recording}
                  >
                    <Mic size={16} />
                    <span>{recording ? "Recording…" : "Record 3s Test"}</span>
                  </button>
                </div>
                {testUrl && (
                  <div className="mt-3">
                    <audio controls src={testUrl} className="w-full" />
                  </div>
                )}
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  Say a short sentence; we will play it back.
                </p>
              </div>
            </>
          )}

          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={handleStartInterview}
              disabled={!isReady}
              className={`px-5 py-2 rounded-lg text-white gradient-bg btn-hover text-center cursor-pointer inline-flex items-center gap-2 text-xs md:text-sm ${
                !isReady ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <PhoneCall size={16} />
              <span>Start Interview</span>
            </button>
            <Link
              href="/interview"
              className="px-5 py-2 rounded-lg border btn-hover text-center cursor-pointer inline-flex items-center gap-2 text-xs md:text-sm"
            >
              <ArrowLeft size={16} />
              <span>Back to Setup</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
