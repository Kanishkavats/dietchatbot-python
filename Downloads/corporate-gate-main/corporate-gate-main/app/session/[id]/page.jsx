"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mic,
  Bot,
  Volume2,
  VolumeX,
  PhoneOff,
  User,
  Square,
  Flag,
  Send,
  Loader2,
} from "lucide-react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Vapi from "@vapi-ai/web";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
const VAPI_API_KEY =
  process.env.NEXT_PUBLIC_VAPI_CLIENT_API_KEY ||
  "b94a9911-8bb1-48ba-a3a0-1fbd2196f2e1";

export default function InterviewSessionPage() {
  console.log("🔥 InterviewSessionPage COMPONENT RENDERED!");

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [muted, setMuted] = useState(false);
  const [countdown, setCountdown] = useState(30 * 60);
  const [transcript, setTranscript] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userInput, setUserInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Voice mode specific
  const [vapiInstance, setVapiInstance] = useState(null);
  const [isVapiConnected, setIsVapiConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pendingAudio, setPendingAudio] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const transcriptEndRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const data = searchParams.get("data");
    console.log(data);
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        console.log("Parsed form data:", parsed);
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to parse form data", e);
        router.push("/interview");
      }
    } else {
      router.push("/interview");
    }
  }, [searchParams, router]);

  useEffect(() => {
    console.log("FormData changed:", formData);
    if (formData) {
      console.log("Starting interview with mode:", formData.mode);
      startInterview();
    } else {
      console.log("No formData, waiting...");
    }
  }, [formData]);

  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  // Save transcript periodically for voice mode
  useEffect(() => {
    if (formData?.mode === "Voice" && sessionId && transcript.length > 0) {
      const saveInterval = setInterval(() => {
        saveTranscriptToBackend();
      }, 10000); // Save every 10 seconds

      return () => clearInterval(saveInterval);
    }
  }, [formData, sessionId, transcript]);

  const saveTranscriptToBackend = async () => {
    if (!sessionId || transcript.length === 0) {
      console.log("Skipping transcript save - sessionId or transcript missing");
      return;
    }

    try {
      console.log("Saving transcript to backend:", {
        sessionId,
        messageCount: transcript.length,
      });
      const response = await fetch(
        `${BACKEND_URL}/api/interview/save-transcript`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            messages: transcript,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save transcript:", errorData);
      } else {
        console.log("Transcript saved successfully");
      }
    } catch (error) {
      console.error("Error saving transcript:", error);
    }
  };

  const startInterview = async () => {
    console.log("🚀 startInterview() called");
    try {
      setLoading(true);
      console.log("Setting loading to true");

      if (formData.mode === "Voice") {
        // VOICE MODE: Create backend session first, then start Vapi
        console.log("🎤 Starting voice interview");

        // Create session in backend first
        const response = await fetch(`${BACKEND_URL}/api/interview/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: formData.company,
            role: formData.role,
            mode: formData.mode,
            tone: formData.tone.toLowerCase(),
            difficulty: formData.difficulty.toLowerCase(),
            jobDescription: formData.jd,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setSessionId(data.sessionId);
          setTranscript([
            { from: "ai", text: "Voice interview started. Let's begin!" },
          ]);
        } else {
          console.error("Failed to create voice session:", data.error);
          alert("Failed to start interview: " + data.error);
          setLoading(false);
          return;
        }

        // Start Vapi directly
        console.log("About to call initializeVapi()");
        await initializeVapi();
        console.log("initializeVapi() completed");

        setLoading(false);
        return;
      }

      console.log("Using TEXT mode, calling backend...");

      // TEXT MODE: Use backend
      const response = await fetch(`${BACKEND_URL}/api/interview/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.company,
          role: formData.role,
          mode: formData.mode,
          tone: formData.tone.toLowerCase(),
          difficulty: formData.difficulty.toLowerCase(),
          jobDescription: formData.jd,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSessionId(data.sessionId);
        setCurrentQuestion(data.question);
        setTranscript([{ from: "ai", text: data.question }]);
      } else {
        console.error("Failed to start interview:", data.error);
        alert("Failed to start interview: " + data.error);
      }
    } catch (error) {
      console.error("Error starting interview:", error);
      alert(
        "Error starting interview. Please check if the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const initializeVapi = async () => {
    console.log("🎤 Initializing Vapi...");

    try {
      const vapi = new Vapi(VAPI_API_KEY);
      setVapiInstance(vapi);
      console.log("✅ Vapi created");

      // Event listeners
      vapi.on("call-start", () => {
        console.log("✅ VAPI CALL STARTED!");
        setIsVapiConnected(true);
      });

      vapi.on("call-end", () => {
        console.log("🛑 VAPI CALL ENDED!");
        setIsVapiConnected(false);
      });

      vapi.on("speech-start", () => {
        console.log("🗣️ USER SPEAKING");
        setIsSpeaking(true);
      });

      vapi.on("speech-end", () => {
        console.log("🤐 USER STOPPED");
        setIsSpeaking(false);
      });

      vapi.on("message", (message) => {
        console.log("📨 MESSAGE:", message);
        if (
          message.type === "transcript" &&
          message.transcriptType === "final"
        ) {
          if (message.role === "user") {
            setTranscript((prev) => [
              ...prev,
              { from: "you", text: message.transcript },
            ]);
          } else if (message.role === "assistant") {
            setTranscript((prev) => [
              ...prev,
              { from: "ai", text: message.transcript },
            ]);
          }
        }
      });

      vapi.on("error", (error) => {
        console.error("❌ VAPI ERROR:", error);
        alert("Voice error: " + error.message);
      });

      // Start call
      await vapi.start({
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          systemPrompt: `You are conducting a ${formData.difficulty} interview for ${formData.role} at ${formData.company}. Tone: ${formData.tone}. Job Description: ${formData.jd}. Ask ONE question at a time and wait for complete answers. Be professional and engaging. After 5-7 questions, conclude the interview.`,
          temperature: 0.7,
        },
        voice: { provider: "openai", voiceId: "alloy" },
        firstMessage: `Hello! I'm conducting an interview for ${formData.role} at ${formData.company}. Let's begin. Tell me about yourself and why you're interested in this position.`,
      });

      console.log("✅ Vapi started successfully");
    } catch (error) {
      console.error("❌ VAPI ERROR:", error);
      alert("Failed to start voice: " + error.message);
    }
  };

  const playAudio = (base64Audio) => {
    if (!base64Audio) return;

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = `data:audio/mp3;base64,${base64Audio}`;
      audioRef.current.muted = muted;

      audioRef.current.play().catch((error) => {
        console.warn("Audio autoplay prevented:", error);
        // Store audio for manual play if autoplay is blocked
        setPendingAudio(base64Audio);
        setAudioEnabled(false);
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const enableAudioAndPlay = () => {
    setAudioEnabled(true);
    if (pendingAudio) {
      playAudio(pendingAudio);
      setPendingAudio(null);
    }
  };

  // Update audio muted state when muted changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const handleTextSubmit = async (e) => {
    e?.preventDefault();
    if (!userInput.trim() || submitting || !sessionId) return;

    const answer = userInput.trim();
    setUserInput("");
    setSubmitting(true);

    // Add user's answer to transcript
    setTranscript((prev) => [...prev, { from: "you", text: answer }]);

    try {
      const response = await fetch(`${BACKEND_URL}/api/interview/next`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          answer,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCurrentQuestion(data.question);
        setTranscript((prev) => [...prev, { from: "ai", text: data.question }]);

        // Play audio if in voice mode
        if (formData.mode === "Voice" && data.audioBase64) {
          playAudio(data.audioBase64);
        }
      } else {
        console.error("Failed to get next question:", data.error);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const endInterview = () => setShowConfirmEnd(true);

  const confirmEnd = async () => {
    if (!sessionId || submitting) return;

    setSubmitting(true);
    setShowConfirmEnd(false);

    // Stop Vapi call if active
    if (vapiInstance && isVapiConnected) {
      try {
        vapiInstance.stop();
      } catch (error) {
        console.error("Error stopping Vapi:", error);
      }
    }

    try {
      // Save final transcript for voice mode
      if (formData?.mode === "Voice") {
        await saveTranscriptToBackend();
      }

      // Submit interview for evaluation
      const response = await fetch(`${BACKEND_URL}/api/interview/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        router.push(`/interview/report/${sessionId}`);
      } else {
        const errorData = await response.json();
        console.error("Failed to submit interview:", errorData);
        // Still redirect to report page even on error
        router.push(`/interview/report/${sessionId}`);
      }
    } catch (error) {
      console.error("Error submitting interview:", error);
      // Still redirect to report page even on error
      router.push(`/interview/report/${sessionId}`);
    } finally {
      setSubmitting(false);
    }
  };

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-[#fafafa] font-poppins flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-gray-500">Starting your interview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-poppins">
      <main className="w-full text-gray-800 max-w-5xl mx-auto px-4 py-6 md:py-8 text-xs md:text-base">
        <div className="rounded-xl border bg-gray-200 shadow-custom overflow-hidden">
          <div className="gradient-bg text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 inline-flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <div className="text-xs md:text-sm font-semibold">
                  CorporateGate • AI Interview
                </div>
                <div className="text-xs md:text-sm opacity-90">
                  {formData.company} - {formData.role}
                </div>
              </div>
            </div>
            <div className="text-xs md:text-sm font-semibold tabular-nums">
              {mm}:{ss}
            </div>
          </div>

          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 bg-gray-50 border rounded-xl p-6 flex flex-col items-center justify-center">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--background) 10%, white)",
                  border:
                    "2px solid color-mix(in srgb, var(--background) 30%, transparent)",
                }}
              >
                <Mic />
              </div>
              <div className="mt-4 text-xs md:text-sm text-gray-600">
                {formData.mode === "Voice"
                  ? isSpeaking
                    ? "You are speaking"
                    : "Listening..."
                  : "Text Mode"}
              </div>
              <WaveBars active={submitting || isSpeaking} />

              {formData.mode === "Voice" && pendingAudio && !audioEnabled && (
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-center">
                  <button
                    onClick={enableAudioAndPlay}
                    className="text-blue-600 underline"
                  >
                    Click to enable audio
                  </button>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                {formData.mode === "Voice" && (
                  <button
                    onClick={() => setMuted((m) => !m)}
                    className={`px-3 py-2 rounded-lg border btn-hover inline-flex items-center gap-2 cursor-pointer ${
                      muted ? "bg-gray-100" : ""
                    }`}
                  >
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    <span className="text-xs md:text-sm">
                      {muted ? "Unmute" : "Mute"}
                    </span>
                  </button>
                )}
                <button
                  onClick={endInterview}
                  className="px-3 py-2 rounded-lg text-white btn-hover inline-flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: "#e11d48" }}
                >
                  <PhoneOff size={16} />
                  <span className="text-xs md:text-sm">End</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="h-[420px] md:h-[460px] bg-white border rounded-xl p-4 overflow-y-auto">
                {transcript.length === 0 && (
                  <div className="h-full flex items-center justify-center text-xs md:text-sm text-gray-500">
                    Starting interview...
                  </div>
                )}
                <ul className="space-y-3">
                  {transcript.map((line, idx) => (
                    <li
                      key={idx}
                      className={`flex ${
                        line.from === "you" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-lg border shadow-sm text-xs md:text-sm ${
                          line.from === "you" ? "text-white" : "bg-gray-50"
                        }`}
                        style={
                          line.from === "you"
                            ? { background: "var(--background)" }
                            : {}
                        }
                      >
                        <div className="opacity-70 text-xs md:text-sm mb-1 inline-flex items-center gap-1">
                          {line.from === "you" ? (
                            <>
                              <User size={12} />
                              <span>You</span>
                            </>
                          ) : (
                            <>
                              <Bot size={12} />
                              <span>AI</span>
                            </>
                          )}
                        </div>
                        <div>{line.text}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div ref={transcriptEndRef} />
              </div>

              {formData.mode === "Text" && (
                <form onSubmit={handleTextSubmit} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none text-xs md:text-sm"
                    disabled={submitting}
                  />
                  <button
                    type="submit"
                    disabled={submitting || !userInput.trim()}
                    className="px-4 py-2 rounded-lg text-white gradient-bg btn-hover inline-flex items-center gap-2 cursor-pointer text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Send size={16} />
                    )}
                    <span>Send</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="px-4 py-3 border-t bg-white flex items-center justify-between">
            <div className="text-xs md:text-sm text-gray-500">
              Mode: {formData.mode} | Difficulty: {formData.difficulty}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={endInterview}
                className="px-4 py-2 rounded-lg border btn-hover bg-[#e11d48] text-white inline-flex items-center gap-2 cursor-pointer text-xs md:text-sm"
              >
                <Flag size={16} />
                <span>Finish Interview</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {showConfirmEnd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border shadow-custom w-full max-w-sm p-5">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              End Interview?
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Your progress will be saved and you will be redirected to the
              report.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowConfirmEnd(false)}
                className="px-4 py-2 rounded-lg border btn-hover text-gray-800 cursor-pointer text-xs md:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmEnd}
                className="px-4 py-2 rounded-lg text-white btn-hover bg-[#e11d48] cursor-pointer text-xs md:text-sm"
              >
                End Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WaveBars({ active }) {
  return (
    <div className="mt-4 h-10 flex items-end gap-1" aria-hidden>
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className={`w-1 rounded-sm ${
            active ? "bg-[#345773]" : "bg-gray-300"
          }`}
          style={{
            height: `${active ? 4 + ((i * 7) % 28) : 6}px`,
            transition: "height 300ms ease",
          }}
        />
      ))}
    </div>
  );
}
