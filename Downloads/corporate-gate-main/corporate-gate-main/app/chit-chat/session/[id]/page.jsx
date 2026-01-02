"use client";

import { useEffect, useState } from "react";
import { Mic, Bot, PhoneOff, Flag, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Vapi from "@vapi-ai/web";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
const VAPI_API_KEY =
  process.env.NEXT_PUBLIC_VAPI_CLIENT_API_KEY ||
  "b94a9911-8bb1-48ba-a3a0-1fbd2196f2e1";

export default function ChitChatSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Vapi instance
  const [vapiInstance, setVapiInstance] = useState(null);
  const [isVapiConnected, setIsVapiConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to parse form data", e);
        router.push("/chit-chat");
      }
    } else {
      router.push("/chit-chat");
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (formData) {
      startChat();
    }
  }, [formData]);

  const startChat = async () => {
    try {
      setLoading(true);
      const isHindi =
        formData.language === "hi" || formData.language === "hindi";

      // Create session in backend
      const response = await fetch(`${BACKEND_URL}/api/chit-chat/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: formData.topic,
          language: formData.language,
          mode: "voice",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSessionId(data.sessionId);
      } else {
        console.error("Failed to create session:", data.error);
        alert("Failed to start chat: " + data.error);
        setLoading(false);
        return;
      }

      // Start Vapi
      await initializeVapi();
      setLoading(false);
    } catch (error) {
      console.error("Error starting chat:", error);
      alert("Error starting chat. Please check if the backend is running.");
      setLoading(false);
    }
  };

  const initializeVapi = async () => {
    try {
      const isHindi =
        formData.language === "hi" || formData.language === "hindi";
      const vapi = new Vapi(VAPI_API_KEY);
      setVapiInstance(vapi);

      // Event listeners
      vapi.on("call-start", () => {
        setIsVapiConnected(true);
      });

      vapi.on("call-end", () => {
        setIsVapiConnected(false);
      });

      vapi.on("speech-start", () => {
        setIsSpeaking(true);
      });

      vapi.on("speech-end", () => {
        setIsSpeaking(false);
      });

      vapi.on("error", (error) => {
        console.error("❌ VAPI ERROR:", error);
        alert("Voice error: " + error.message);
      });

      // Configure system prompt based on language - optimized for speed
      const systemPrompt = isHindi
        ? `आप एक मित्रवत AI सहायक हैं। "${formData.topic}" विषय पर संक्षिप्त और प्राकृतिक बातचीत करें। 

**महत्वपूर्ण: आपको केवल हिंदी में ही बोलना है। हमेशा हिंदी में जवाब दें। कभी भी अंग्रेजी में न बोलें। सभी प्रतिक्रियाएं हिंदी में होनी चाहिए।**`
        : `You are a friendly AI assistant. Have brief, natural conversations about "${formData.topic}". Keep responses concise.`;

      const firstMessage = isHindi
        ? `नमस्ते! ${formData.topic} के बारे में बात करते हैं।`
        : `Hello! Let's chat about ${formData.topic}.`;

      // Start call with optimized configuration for faster responses
      await vapi.start({
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: isHindi ? "hi" : "en-US",
        },
        model: {
          provider: "openai",
          model: "gpt-4o-mini", // Faster model for quicker responses
          systemPrompt: systemPrompt,
          temperature: 0.7, // Lower temperature for faster, more focused responses
          maxTokens: 150, // Limit response length for faster TTS
        },
        voice: isHindi
          ? {
            provider: "11labs",
            voiceId: "CpLFIATEbkaZdJr01erZ",
            model: "eleven_multilingual_v2",
            speed: 1,
            // stability: 0.5,
            // similarityBoost: 0.75,
          }
          : {
            provider: "11labs",
            voiceId: "CpLFIATEbkaZdJr01erZ",
            speed: 1,
          },
        firstMessage: firstMessage,
        // startSpeakingPlan: {
        //   waitSeconds: 5.0
        // }
      });
    } catch (error) {
      console.error("❌ VAPI ERROR:", error);
      alert("Failed to start voice: " + error.message);
    }
  };

  const endChat = () => setShowConfirmEnd(true);

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

    router.push("/chit-chat");
  };

  const isHindi = formData?.language === "hi" || formData?.language === "hindi";

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-[#fafafa] font-poppins flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-gray-500">
            {isHindi ? "आपकी चैट शुरू हो रही है..." : "Starting your chat..."}
          </p>
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
                  CorporateGate • AI Chit-Chat
                </div>
                <div className="text-xs md:text-sm opacity-90">
                  {formData.topic} • {isHindi ? "हिंदी" : "English"}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-gray-50 border rounded-xl p-6 flex flex-col items-center justify-center">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center mb-4"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--background) 10%, white)",
                  border:
                    "2px solid color-mix(in srgb, var(--background) 30%, transparent)",
                }}
              >
                <Mic size={32} />
              </div>
              <div className="text-xs md:text-sm text-gray-600 mb-4">
                {isSpeaking
                  ? isHindi
                    ? "आप बोल रहे हैं"
                    : "You are speaking"
                  : isHindi
                    ? "सुन रहे हैं..."
                    : "Listening..."}
              </div>
              <WaveBars active={false} />

              <div className="mt-6 flex items-center gap-2">
                <button
                  onClick={endChat}
                  className="px-4 py-2 rounded-lg text-white btn-hover inline-flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: "#e11d48" }}
                >
                  <PhoneOff size={16} />
                  <span className="text-xs md:text-sm">
                    {isHindi ? "समाप्त" : "End"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t bg-white flex items-center justify-between">
            <div className="text-xs md:text-sm text-gray-500">
              {isHindi ? `भाषा: हिंदी` : `Language: English`}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={endChat}
                className="px-4 py-2 rounded-lg border btn-hover bg-[#e11d48] text-white inline-flex items-center gap-2 cursor-pointer text-xs md:text-sm"
              >
                <Flag size={16} />
                <span>{isHindi ? "चैट समाप्त करें" : "End Chat"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {showConfirmEnd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border shadow-custom w-full max-w-sm p-5">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              {isHindi ? "चैट समाप्त करें?" : "End Chat?"}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              {isHindi
                ? "आपको मुख्य पृष्ठ पर ले जाया जाएगा।"
                : "You will be redirected to the main page."}
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowConfirmEnd(false)}
                className="px-4 py-2 rounded-lg border btn-hover text-gray-800 cursor-pointer text-xs md:text-sm"
              >
                {isHindi ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={confirmEnd}
                className="px-4 py-2 rounded-lg text-white btn-hover bg-[#e11d48] cursor-pointer text-xs md:text-sm"
              >
                {isHindi ? "अभी समाप्त करें" : "End Now"}
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
          className={`w-1 rounded-sm ${active ? "bg-[#345773]" : "bg-gray-300"
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
