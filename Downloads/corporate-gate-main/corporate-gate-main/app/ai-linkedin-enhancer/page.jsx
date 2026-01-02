"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Zap,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  FileText,
  Linkedin,
} from "lucide-react";

export default function AILinkedInEnhancerPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    headline: "",
    bio: "",
    experienceSummary: "",
    educationSummary: "",
    skills: "",
    certifications: "",
    volunteerWork: "",
    posts: "",
    tone: "Professional",
    keywords: "",
    profileGoal: "Job Seeking",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enhancedProfile, setEnhancedProfile] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null);
  const [lastEnhancement, setLastEnhancement] = useState(null);
  const [activeFormSection, setActiveFormSection] = useState("basic");
  const [expandedSections, setExpandedSections] = useState({
    headline: true,
    about: true,
    experience: true,
    education: true,
    skills: true,
    certifications: true,
    volunteer: true,
    posts: true,
  });

  // Load last enhancement from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("linkedInEnhancerLastData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.formData) {
          setFormData(data.formData);
        }
        if (data.profile) {
          setEnhancedProfile(data.profile);
          setLastEnhancement(data);
        }
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnhance = async () => {
    const hasContent =
      formData.fullName ||
      formData.headline ||
      formData.bio ||
      formData.experienceSummary ||
      formData.educationSummary ||
      formData.skills ||
      formData.certifications ||
      formData.volunteerWork ||
      formData.posts;

    if (!hasContent) {
      setError(
        "Please fill in at least one field to enhance your LinkedIn profile."
      );
      return;
    }

    setError("");
    setLoading(true);
    setEnhancedProfile(null);

    try {
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
      const response = await fetch(`${BACKEND_URL}/api/enhance-linkedin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to enhance content"
        );
      }

      setEnhancedProfile(data.profile);

      // Save to localStorage
      const enhancementData = {
        formData,
        profile: data.profile,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(
        "linkedInEnhancerLastData",
        JSON.stringify(enhancementData)
      );
      setLastEnhancement(enhancementData);

      // Scroll to result
      setTimeout(() => {
        const resultSection = document.getElementById("result-section");
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!lastEnhancement || !lastEnhancement.formData) {
      handleEnhance();
      return;
    }
    setFormData(lastEnhancement.formData);
    setTimeout(() => {
      handleEnhance();
    }, 100);
  };

  const handleCopy = async (text, sectionName) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionName);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSampleData = () => {
    setFormData({
      fullName: "John Doe",
      headline: "Software Engineer @ Google",
      bio: "Passionate software engineer with 5+ years of experience building scalable web applications. Love React, Node.js, and cloud technologies.",
      experienceSummary:
        "• Senior Software Engineer at Google (2021-Present)\n• Software Engineer at Microsoft (2019-2021)\n• Full-stack Developer at StartupXYZ (2018-2019)",
      educationSummary:
        "• B.S. Computer Science, MIT (2014-2018)\n• Relevant coursework: Data Structures, Algorithms, Database Systems",
      skills:
        "React, Node.js, TypeScript, Python, AWS, Docker, Kubernetes, MongoDB, PostgreSQL",
      certifications:
        "• AWS Certified Solutions Architect\n• Google Cloud Professional Cloud Architect\n• Certified Kubernetes Administrator",
      volunteerWork:
        "• Volunteer Tech Mentor at Code for Good (2020-Present)\n• Organized local hackathons",
      posts:
        "Just shipped a major feature that improved API response time by 40%! 🚀\n\nExcited to share that our team successfully migrated our infrastructure to Kubernetes.",
      tone: "Professional",
      keywords:
        "AI, Web Development, Leadership, Cloud Computing, Full-stack Development",
      profileGoal: "Job Seeking",
    });
    setError("");
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formSections = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills & Certs", icon: Award },
    { id: "extras", label: "Extras", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/20 shadow-sm mb-4">
            <Sparkles className="w-5 h-5 text-[#345773]" />
            <span className="text-[#345773] font-semibold text-sm">
              AI LinkedIn Enhancer
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            AI LinkedIn Enhancer 🚀
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let AI optimize your complete LinkedIn profile for maximum impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6 sticky top-4">
              {/* Form Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
                {formSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveFormSection(section.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeFormSection === section.id
                          ? "bg-[#345773] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{section.label}</span>
                    </button>
                  );
                })}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEnhance();
                }}
                className="space-y-4"
              >
                {/* Basic Info Section */}
                {activeFormSection === "basic" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="John Doe"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Headline / Title
                      </label>
                      <input
                        type="text"
                        value={formData.headline}
                        onChange={(e) =>
                          handleInputChange("headline", e.target.value)
                        }
                        placeholder="Software Engineer @ Google"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Bio / About
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        placeholder="Your LinkedIn bio..."
                        rows={4}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Tone Preference
                      </label>
                      <select
                        value={formData.tone}
                        onChange={(e) =>
                          handleInputChange("tone", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900"
                      >
                        <option>Professional</option>
                        <option>Friendly</option>
                        <option>Bold</option>
                        <option>Thought Leader</option>
                        <option>Recruiter-Focused</option>
                        <option>Personal Branding</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Profile Goal
                      </label>
                      <select
                        value={formData.profileGoal}
                        onChange={(e) =>
                          handleInputChange("profileGoal", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900"
                      >
                        <option>Job Seeking</option>
                        <option>Personal Branding</option>
                        <option>Networking</option>
                        <option>Freelance Opportunities</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Keywords
                      </label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) =>
                          handleInputChange("keywords", e.target.value)
                        }
                        placeholder="AI, Web Development, Leadership"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                )}

                {/* Experience Section */}
                {activeFormSection === "experience" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Experience Summary
                    </label>
                    <textarea
                      value={formData.experienceSummary}
                      onChange={(e) =>
                        handleInputChange("experienceSummary", e.target.value)
                      }
                      placeholder="List your experiences..."
                      rows={8}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 resize-none"
                    />
                  </div>
                )}

                {/* Education Section */}
                {activeFormSection === "education" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Education Summary
                    </label>
                    <textarea
                      value={formData.educationSummary}
                      onChange={(e) =>
                        handleInputChange("educationSummary", e.target.value)
                      }
                      placeholder="List your education..."
                      rows={6}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 resize-none"
                    />
                  </div>
                )}

                {/* Skills & Certs Section */}
                {activeFormSection === "skills" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Skills / Strengths
                      </label>
                      <textarea
                        value={formData.skills}
                        onChange={(e) =>
                          handleInputChange("skills", e.target.value)
                        }
                        placeholder="React, Node.js, Python..."
                        rows={4}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Certifications
                      </label>
                      <textarea
                        value={formData.certifications}
                        onChange={(e) =>
                          handleInputChange("certifications", e.target.value)
                        }
                        placeholder="List your certifications..."
                        rows={4}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Extras Section */}
                {activeFormSection === "extras" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Volunteer Work / Extracurriculars
                      </label>
                      <textarea
                        value={formData.volunteerWork}
                        onChange={(e) =>
                          handleInputChange("volunteerWork", e.target.value)
                        }
                        placeholder="List volunteer work..."
                        rows={4}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Posts / Achievements / Articles
                      </label>
                      <textarea
                        value={formData.posts}
                        onChange={(e) =>
                          handleInputChange("posts", e.target.value)
                        }
                        placeholder="Your posts or achievements..."
                        rows={6}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#345773] focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#345773] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#2a4560] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Enhance with AI</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleSampleData}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
                  >
                    Try Sample Data
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            {loading && !enhancedProfile && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-12 text-center">
                <div className="inline-block w-12 h-12 border-4 border-[#345773]/30 border-t-[#345773] rounded-full animate-spin mb-4" />
                <p className="text-gray-600 font-medium">
                  Crafting your perfect LinkedIn profile…
                </p>
              </div>
            )}

            {enhancedProfile && (
              <div id="result-section" className="space-y-4">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-6 h-6 text-[#345773]" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        Enhanced LinkedIn Profile
                      </h2>
                    </div>
                    <button
                      onClick={handleRegenerate}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all disabled:opacity-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">Regenerate</span>
                    </button>
                  </div>
                </div>

                {/* Headline Section */}
                {enhancedProfile.headline && (
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#345773]" />
                        Headline
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(enhancedProfile.headline, "headline")
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-all"
                      >
                        {copiedSection === "headline" ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {enhancedProfile.headline}
                    </p>
                  </div>
                )}

                {/* About Section */}
                {enhancedProfile.about && (
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#345773]" />
                        About
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(enhancedProfile.about, "about")
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-all"
                      >
                        {copiedSection === "about" ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {enhancedProfile.about}
                    </p>
                  </div>
                )}

                {/* Experience Section */}
                {enhancedProfile.experience &&
                  Array.isArray(enhancedProfile.experience) &&
                  enhancedProfile.experience.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <Briefcase className="w-5 h-5 text-[#345773]" />
                        Experience
                      </h3>
                      <div className="space-y-6">
                        {enhancedProfile.experience.map((exp, idx) => (
                          <div
                            key={idx}
                            className="border-l-2 border-[#345773] pl-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-gray-900">
                                  {exp.title || "Position"}
                                </h4>
                                <p className="text-[#345773] font-medium">
                                  {exp.company || "Company"}
                                </p>
                                {exp.period && (
                                  <p className="text-gray-500 text-sm">
                                    {exp.period}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() =>
                                  handleCopy(
                                    JSON.stringify(exp, null, 2),
                                    `exp-${idx}`
                                  )
                                }
                                className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-all"
                              >
                                {copiedSection === `exp-${idx}` ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            {exp.achievements &&
                              Array.isArray(exp.achievements) && (
                                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                                  {exp.achievements.map((ach, aIdx) => (
                                    <li key={aIdx}>{ach}</li>
                                  ))}
                                </ul>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Education Section */}
                {enhancedProfile.education && (
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-[#345773]" />
                        Education
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(enhancedProfile.education, "education")
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-all"
                      >
                        {copiedSection === "education" ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {enhancedProfile.education}
                    </p>
                  </div>
                )}

                {/* Skills Section */}
                {enhancedProfile.skills && (
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#345773]" />
                        Skills
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(
                            JSON.stringify(enhancedProfile.skills, null, 2),
                            "skills"
                          )
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-all"
                      >
                        {copiedSection === "skills" ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {enhancedProfile.skills.primary &&
                        enhancedProfile.skills.primary.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Primary Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {enhancedProfile.skills.primary.map(
                                (skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-[#345773]/10 text-[#345773] rounded-full text-sm font-medium"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {enhancedProfile.skills.cloud &&
                        enhancedProfile.skills.cloud.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Cloud Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {enhancedProfile.skills.cloud.map(
                                (skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {enhancedProfile.skills.databases &&
                        enhancedProfile.skills.databases.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Databases
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {enhancedProfile.skills.databases.map(
                                (skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {enhancedProfile.skills.expertise &&
                        enhancedProfile.skills.expertise.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Areas of Expertise
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {enhancedProfile.skills.expertise.map(
                                (skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Certifications Section */}
                {enhancedProfile.certifications &&
                  Array.isArray(enhancedProfile.certifications) &&
                  enhancedProfile.certifications.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Award className="w-5 h-5 text-[#345773]" />
                          Certifications
                        </h3>
                        <button
                          onClick={() =>
                            handleCopy(
                              enhancedProfile.certifications.join("\n"),
                              "certifications"
                            )
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-all"
                        >
                          {copiedSection === "certifications" ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {enhancedProfile.certifications.map((cert, idx) => (
                          <li key={idx}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Volunteer Work Section */}
                {enhancedProfile.volunteerWork &&
                  Array.isArray(enhancedProfile.volunteerWork) &&
                  enhancedProfile.volunteerWork.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <Heart className="w-5 h-5 text-[#345773]" />
                        Volunteer Work
                      </h3>
                      <div className="space-y-4">
                        {enhancedProfile.volunteerWork.map((vol, idx) => (
                          <div
                            key={idx}
                            className="border-l-2 border-pink-300 pl-4"
                          >
                            <h4 className="font-bold text-gray-900">
                              {vol.role || "Role"}
                            </h4>
                            <p className="text-[#345773] font-medium">
                              {vol.organization || "Organization"}
                            </p>
                            {vol.period && (
                              <p className="text-gray-500 text-sm">
                                {vol.period}
                              </p>
                            )}
                            {vol.description && (
                              <p className="text-gray-700 mt-2">
                                {vol.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Sample Posts Section */}
                {enhancedProfile.samplePosts &&
                  Array.isArray(enhancedProfile.samplePosts) &&
                  enhancedProfile.samplePosts.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-[#345773]" />
                        Sample LinkedIn Posts
                      </h3>
                      <div className="space-y-4">
                        {enhancedProfile.samplePosts.map((post, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-500">
                                Post {idx + 1}
                              </span>
                              <button
                                onClick={() => handleCopy(post, `post-${idx}`)}
                                className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-all"
                              >
                                {copiedSection === `post-${idx}` ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                              {post}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {!loading && !enhancedProfile && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl p-12 text-center">
                <Linkedin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Ready to optimize your LinkedIn profile?
                </h3>
                <p className="text-gray-500">
                  Fill in the form and click "Enhance with AI" to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
