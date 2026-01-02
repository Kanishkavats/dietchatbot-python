"use client";

import { useState, useEffect } from "react";
import { Image, Download, RefreshCw, Sparkles, Loader2 } from "lucide-react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function ImageGenerationPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageHistory, setImageHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("imageGenerationHistory");
      if (saved) {
        const history = JSON.parse(saved);
        setImageHistory(history);
      }
    } catch (e) {
      console.error("Failed to load image history:", e);
      // Clear corrupted history
      try {
        localStorage.removeItem("imageGenerationHistory");
      } catch (clearErr) {
        console.error("Failed to clear history:", clearErr);
      }
    }
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt to generate an image");
      return;
    }

    setError("");
    setLoading(true);
    setGeneratedImage(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/image-generation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (data.success && data.image) {
        setGeneratedImage({
          image: data.image,
          prompt: data.prompt,
          timestamp: new Date().toISOString(),
        });

        // Save to history (only prompts, not full images to avoid quota issues)
        // Keep only the last 5 prompts
        const newHistory = [
          {
            prompt: data.prompt,
            timestamp: new Date().toISOString(),
          },
          ...imageHistory
            .filter((item) => !item.image) // Remove any old items with images
            .slice(0, 4), // Keep last 4, plus the new one = 5 total
        ];
        setImageHistory(newHistory);

        // Try to save to localStorage, but handle quota errors gracefully
        try {
          localStorage.setItem(
            "imageGenerationHistory",
            JSON.stringify(newHistory)
          );
        } catch (storageError) {
          // If quota exceeded, clear old history and try again
          if (storageError.name === "QuotaExceededError") {
            console.warn("localStorage quota exceeded, clearing old history");
            try {
              localStorage.removeItem("imageGenerationHistory");
              // Only save the current prompt
              const minimalHistory = [
                {
                  prompt: data.prompt,
                  timestamp: new Date().toISOString(),
                },
              ];
              localStorage.setItem(
                "imageGenerationHistory",
                JSON.stringify(minimalHistory)
              );
              setImageHistory(minimalHistory);
            } catch (clearError) {
              console.error("Failed to clear and save history:", clearError);
              // Continue without saving to history
            }
          } else {
            console.error("localStorage error:", storageError);
          }
        }
      } else {
        throw new Error("No image data received");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Image generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageBase64, prompt) => {
    try {
      // Convert base64 to blob
      const byteCharacters = atob(imageBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download image");
    }
  };

  const handleUseHistory = (historyItem) => {
    setPrompt(historyItem.prompt);
    // Don't set generatedImage since we don't store images in history anymore
    setGeneratedImage(null);
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem("imageGenerationHistory");
      setImageHistory([]);
    } catch (err) {
      console.error("Failed to clear history:", err);
    }
  };

  const samplePrompts = [
    "A futuristic cityscape at sunset with flying cars",
    "A serene mountain landscape with a lake reflection",
    "A cyberpunk street scene with neon lights",
    "A cute robot reading a book in a library",
    "An abstract art piece with vibrant colors",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/20 shadow-sm mb-4">
            <Sparkles className="w-5 h-5 text-[#345773]" />
            <span className="text-[#345773] font-semibold text-sm">
              AI Image Generation
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Generate Images with AI 🎨
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create stunning images from text prompts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6 sticky top-4">
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                    rows={6}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Be descriptive for better results
                  </p>
                </div>

                {/* Sample Prompts */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Try Sample Prompts
                  </label>
                  <div className="space-y-2">
                    {samplePrompts.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPrompt(sample)}
                        className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 transition-all"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                    {error}
                  </div>
                )}

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#345773] text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-[#2a4560] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Image</span>
                    </>
                  )}
                </button>
              </form>

              {/* History Section */}
              {imageHistory.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Recent Prompts
                    </h3>
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                      title="Clear history"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {imageHistory.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleUseHistory(item)}
                        className="w-full flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-all group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center flex-shrink-0">
                          <Image className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-700 truncate group-hover:text-[#345773]">
                            {item.prompt}
                          </p>
                          {item.timestamp && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Generated Image */}
          <div className="lg:col-span-2">
            {loading && !generatedImage && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-12 text-center">
                <div className="inline-block w-12 h-12 border-4 border-[#345773]/30 border-t-[#345773] rounded-full animate-spin mb-4" />
                <p className="text-gray-600 font-medium">
                  Generating your image...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This may take a few moments
                </p>
              </div>
            )}

            {generatedImage && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Image className="w-6 h-6 text-[#345773]" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Generated Image
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleGenerate(e);
                      }}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all disabled:opacity-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">Regenerate</span>
                    </button>
                    <button
                      onClick={() =>
                        handleDownload(
                          generatedImage.image,
                          generatedImage.prompt
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-[#345773] text-white rounded-lg font-medium text-sm hover:bg-[#2a4560] transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Prompt:</span>{" "}
                    {generatedImage.prompt}
                  </p>
                </div>

                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                  <img
                    src={`data:image/png;base64,${generatedImage.image}`}
                    alt={generatedImage.prompt}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}

            {!loading && !generatedImage && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-12 text-center">
                <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Ready to generate images?
                </h3>
                <p className="text-gray-500">
                  Enter a prompt and click "Generate Image" to create your
                  artwork.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
