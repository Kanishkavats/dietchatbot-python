"use client";

import { useState } from "react";
import { Search, BookOpen, Globe, History, Languages, Sparkles, Loader2, AlertCircle } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function DictionaryPage() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!word.trim()) {
      setError("Please enter a word to search");
      return;
    }

    setLoading(true);
    setError(null);
    setWordData(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/dictionary/lookup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: word.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to lookup word");
      }

      setWordData(data.data);
    } catch (err) {
      setError(err.message || "Failed to lookup word");
      console.error("Dictionary lookup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa]">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block px-3 py-1.5 border border-gray-200 shadow-sm rounded-full mb-4">
            <span className="text-sm font-medium text-gray-700">
              <span className="text-[#345773]">AI</span> Dictionary
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Explore <span className="text-[#345773]">Words</span> in Detail
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover comprehensive word definitions, etymology, translations, and cultural context powered by AI.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-custom p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={word}
                onChange={(e) => {
                  setWord(e.target.value);
                  setError(null);
                }}
                placeholder="Enter a word to explore..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#345773] text-gray-900"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !word.trim()}
              className={`px-8 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                loading || !word.trim()
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#345773] text-white hover:bg-[#2a4560] cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Word Data Display */}
        {wordData && (
          <div className="space-y-6">
            {/* Word Header */}
            <div className="bg-gradient-to-r from-[#345773] to-[#2a4560] rounded-2xl p-8 text-white">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">{wordData.word}</h2>
                  {wordData.pronunciation && (
                    <div className="flex items-center gap-4 mt-2">
                      {wordData.pronunciation.phonetic && (
                        <span className="text-lg opacity-90">
                          /{wordData.pronunciation.phonetic}/
                        </span>
                      )}
                      {wordData.pronunciation.audio && (
                        <span className="text-sm opacity-75">
                          [{wordData.pronunciation.audio}]
                        </span>
                      )}
                    </div>
                  )}
                  {wordData.grammar?.partOfSpeech && (
                    <span className="inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-sm">
                      {wordData.grammar.partOfSpeech}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Meanings Section */}
            {wordData.meanings && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-custom p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-6 h-6 text-[#345773]" />
                  <h3 className="text-xl font-bold text-gray-900">Meanings</h3>
                </div>
                <div className="space-y-4">
                  {wordData.meanings.primary && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Primary Meaning</h4>
                      <p className="text-gray-700">{wordData.meanings.primary}</p>
                    </div>
                  )}
                  {wordData.meanings.secondary && wordData.meanings.secondary.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Secondary Meanings</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        {wordData.meanings.secondary.map((meaning, idx) => (
                          <li key={idx}>{meaning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {wordData.meanings.contextual && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Contextual Usage</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {wordData.meanings.contextual.formal && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">Formal:</span>
                            <p className="text-gray-700 mt-1">{wordData.meanings.contextual.formal}</p>
                          </div>
                        )}
                        {wordData.meanings.contextual.informal && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">Informal:</span>
                            <p className="text-gray-700 mt-1">{wordData.meanings.contextual.informal}</p>
                          </div>
                        )}
                        {wordData.meanings.contextual.slang && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">Slang:</span>
                            <p className="text-gray-700 mt-1">{wordData.meanings.contextual.slang}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Etymology Section */}
            {wordData.etymology && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-custom p-6">
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-6 h-6 text-[#345773]" />
                  <h3 className="text-xl font-bold text-gray-900">Etymology</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  {wordData.etymology.origin && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Origin</h4>
                      <p>{wordData.etymology.origin}</p>
                    </div>
                  )}
                  {wordData.etymology.languageOfOrigin && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Language of Origin</h4>
                      <p>{wordData.etymology.languageOfOrigin}</p>
                    </div>
                  )}
                  {wordData.etymology.firstKnownUse && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">First Known Use</h4>
                      <p>{wordData.etymology.firstKnownUse}</p>
                    </div>
                  )}
                  {wordData.etymology.rootWords && wordData.etymology.rootWords.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Root Words</h4>
                      <div className="flex flex-wrap gap-2">
                        {wordData.etymology.rootWords.map((root, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#345773]/10 text-[#345773] rounded-full text-sm"
                          >
                            {root}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Translations Section */}
            {wordData.translations && Object.keys(wordData.translations).length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-custom p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-6 h-6 text-[#345773]" />
                  <h3 className="text-xl font-bold text-gray-900">Translations</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {Object.entries(wordData.translations).map(([lang, translation]) => (
                    translation && (
                      <div
                        key={lang}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                          {lang}
                        </div>
                        <div className="text-gray-900 font-medium">{translation}</div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Grammar Section */}
            {wordData.grammar && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-custom p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Languages className="w-6 h-6 text-[#345773]" />
                  <h3 className="text-xl font-bold text-gray-900">Grammar</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wordData.grammar.plural && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Plural:</span>
                      <p className="text-gray-900 font-medium">{wordData.grammar.plural}</p>
                    </div>
                  )}
                  {wordData.grammar.verbForms && (
                    <div className="space-y-2">
                      {wordData.grammar.verbForms.past && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Past:</span>
                          <p className="text-gray-900 font-medium">{wordData.grammar.verbForms.past}</p>
                        </div>
                      )}
                      {wordData.grammar.verbForms.pastParticiple && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Past Participle:</span>
                          <p className="text-gray-900 font-medium">
                            {wordData.grammar.verbForms.pastParticiple}
                          </p>
                        </div>
                      )}
                      {wordData.grammar.verbForms.presentParticiple && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Present Participle:</span>
                          <p className="text-gray-900 font-medium">
                            {wordData.grammar.verbForms.presentParticiple}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {wordData.grammar.comparative && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Comparative:</span>
                      <p className="text-gray-900 font-medium">{wordData.grammar.comparative}</p>
                    </div>
                  )}
                  {wordData.grammar.superlative && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Superlative:</span>
                      <p className="text-gray-900 font-medium">{wordData.grammar.superlative}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Usage Examples Section */}
            {wordData.usage && wordData.usage.examples && wordData.usage.examples.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-custom p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-[#345773]" />
                  <h3 className="text-xl font-bold text-gray-900">Usage Examples</h3>
                </div>
                <div className="space-y-4">
                  {wordData.usage.examples.map((example, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#345773]">
                      <p className="text-gray-900 italic mb-1">"{example.sentence}"</p>
                      {example.context && (
                        <p className="text-sm text-gray-600">{example.context}</p>
                      )}
                    </div>
                  ))}
                </div>
                {wordData.usage.commonPhrases && wordData.usage.commonPhrases.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Common Phrases</h4>
                    <div className="flex flex-wrap gap-2">
                      {wordData.usage.commonPhrases.map((phrase, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#345773]/10 text-[#345773] rounded-full text-sm"
                        >
                          {phrase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {wordData.usage.idioms && wordData.usage.idioms.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Idioms</h4>
                    <div className="flex flex-wrap gap-2">
                      {wordData.usage.idioms.map((idiom, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {idiom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cultural Context Section */}
            {wordData.culturalContext && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-custom p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-6 h-6 text-[#345773]" />
                  <h3 className="text-xl font-bold text-gray-900">Cultural Context</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  {wordData.culturalContext.regionalVariations && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Regional Variations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {wordData.culturalContext.regionalVariations.british && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">British:</span>
                            <p className="text-gray-700 mt-1">
                              {wordData.culturalContext.regionalVariations.british}
                            </p>
                          </div>
                        )}
                        {wordData.culturalContext.regionalVariations.american && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">American:</span>
                            <p className="text-gray-700 mt-1">
                              {wordData.culturalContext.regionalVariations.american}
                            </p>
                          </div>
                        )}
                        {wordData.culturalContext.regionalVariations.australian && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-600">Australian:</span>
                            <p className="text-gray-700 mt-1">
                              {wordData.culturalContext.regionalVariations.australian}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {wordData.culturalContext.culturalSignificance && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Cultural Significance</h4>
                      <p>{wordData.culturalContext.culturalSignificance}</p>
                    </div>
                  )}
                  {wordData.culturalContext.historicalUsage && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Historical Usage</h4>
                      <p>{wordData.culturalContext.historicalUsage}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Related Words Section */}
            {wordData.relatedWords && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-custom p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-6 h-6 text-[#345773]" />
                  <h3 className="text-xl font-bold text-gray-900">Related Words</h3>
                </div>
                <div className="space-y-4">
                  {wordData.relatedWords.synonyms && wordData.relatedWords.synonyms.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Synonyms</h4>
                      <div className="flex flex-wrap gap-2">
                        {wordData.relatedWords.synonyms.map((synonym, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                          >
                            {synonym}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {wordData.relatedWords.antonyms && wordData.relatedWords.antonyms.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Antonyms</h4>
                      <div className="flex flex-wrap gap-2">
                        {wordData.relatedWords.antonyms.map((antonym, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                          >
                            {antonym}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {wordData.relatedWords.relatedTerms && wordData.relatedWords.relatedTerms.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Related Terms</h4>
                      <div className="flex flex-wrap gap-2">
                        {wordData.relatedWords.relatedTerms.map((term, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fun Facts Section */}
            {wordData.funFacts && wordData.funFacts.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 shadow-custom p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Fun Facts</h3>
                </div>
                <ul className="space-y-2">
                  {wordData.funFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

