// TemplateSelection.jsx - Updated with Modern template only
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Code,
  ChevronRight,
  Eye,
  Check,
  Zap,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description:
      "Clean, contemporary design with accent colors. Perfect for tech and creative roles.",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-600",
    features: [
      "ATS-friendly format",
      "Two-column layout",
      "Skills visualization",
      "Modern typography",
    ],
    stats: {
      users: "10k+",
      rating: "4.9",
      successRate: "87%"
    },
    preview: "/api/placeholder/400/500",
    recommended: true,
  },
  {
    id: "executive",
    name: "Executive",
    description:
      "Elegant and professional design for senior-level positions. Emphasizes leadership and experience.",
    icon: <Award className="w-6 h-6" />,
    color: "from-gray-700 to-gray-900",
    features: [
      "Professional layout",
      "Executive presence",
      "Clean typography",
      "Experience-focused",
    ],
    stats: {
      users: "8k+",
      rating: "4.8",
      successRate: "85%"
    },
    preview: "/api/placeholder/400/500",
    recommended: false,
  },
  {
    id: "creative",
    name: "Creative",
    description:
      "Bold and vibrant design for creative professionals. Stand out with unique styling.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600",
    features: [
      "Eye-catching design",
      "Colorful accents",
      "Portfolio showcase",
      "Modern gradients",
    ],
    stats: {
      users: "6k+",
      rating: "4.7",
      successRate: "82%"
    },
    preview: "/api/placeholder/400/500",
    recommended: false,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description:
      "Simple, clean design focusing on content. Perfect for any industry with timeless appeal.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-gray-400 to-gray-600",
    features: [
      "Clean & simple",
      "Content-focused",
      "Timeless design",
      "Easy to read",
    ],
    stats: {
      users: "7k+",
      rating: "4.8",
      successRate: "84%"
    },
    preview: "/api/placeholder/400/500",
    recommended: false,
  },
  {
    id: "academic",
    name: "Academic",
    description:
      "Traditional academic format for researchers and educators. Emphasizes education and publications.",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-700 to-indigo-800",
    features: [
      "Academic format",
      "Research-focused",
      "Publication ready",
      "Professional tone",
    ],
    stats: {
      users: "5k+",
      rating: "4.9",
      successRate: "88%"
    },
    preview: "/api/placeholder/400/500",
    recommended: false,
  },
  {
    id: "tech",
    name: "Tech",
    description:
      "Developer-focused design with code-like aesthetics. Perfect for software engineers and developers.",
    icon: <Code className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
    features: [
      "Code-style design",
      "Tech-focused",
      "Dark theme",
      "Developer-friendly",
    ],
    stats: {
      users: "9k+",
      rating: "4.9",
      successRate: "86%"
    },
    preview: "/api/placeholder/400/500",
    recommended: false,
  },
];

export default function TemplateSelection() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    setIsLoading(true);

    // Navigate to editor with selected template
    setTimeout(() => {
      router.push(`/editor?template=${templateId}`);
    }, 500);
  };

  const handlePreview = (e, templateId) => {
    e.stopPropagation();
    setShowPreview(templateId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Build Your Perfect Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from our professionally designed templates. Each one is
              ATS-friendly, customizable, and proven to help you land interviews.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center text-green-600 mb-1">
                  <TrendingUp className="w-5 h-5 mr-1" />
                  <span className="text-2xl font-bold">87%</span>
                </div>
                <span className="text-sm text-gray-600">Success Rate</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-blue-600 mb-1">
                  <Users className="w-5 h-5 mr-1" />
                  <span className="text-2xl font-bold">10k+</span>
                </div>
                <span className="text-sm text-gray-600">Active Users</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-yellow-600 mb-1">
                  <Award className="w-5 h-5 mr-1" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <span className="text-sm text-gray-600">User Rating</span>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <div className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>ATS Optimized</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Professional Designs</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Easy to Customize</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Select Your Template
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden ${
                selectedTemplate === template.id ? "ring-4 ring-indigo-600" : ""
              }`}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Template Preview */}
                <div className="lg:w-2/5 relative h-64 lg:h-auto bg-gradient-to-br from-gray-100 to-gray-200">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-10`}
                  ></div>
                  
                  {/* Mock Resume Preview */}
                  <div className="p-6">
                    <div className="bg-white rounded-lg shadow-md p-4 transform scale-90">
                      <div className="bg-blue-600 -m-4 mb-4 p-4 text-white">
                        <div className="h-3 bg-white/30 rounded w-32 mb-2"></div>
                        <div className="h-2 bg-white/20 rounded w-24"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                        <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                        <div className="mt-4 pt-3 border-t">
                          <div className="h-2 bg-gray-400 rounded w-20 mb-2"></div>
                          <div className="h-2 bg-gray-300 rounded w-full"></div>
                          <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredTemplate === template.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <button 
                      onClick={(e) => handlePreview(e, template.id)}
                      className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transform transition-transform hover:scale-105"
                    >
                      <Eye className="w-5 h-5" />
                      <span>Preview Template</span>
                    </button>
                  </div>

                  {/* Recommended Badge */}
                  {template.recommended && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Recommended
                    </div>
                  )}

                  {/* Selected Badge */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      Selected
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="lg:w-3/5 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${template.color} text-white`}
                        >
                          {template.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {template.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-lg">{template.description}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex space-x-6 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">Users</span>
                      <p className="font-semibold text-gray-900">{template.stats.users}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Rating</span>
                      <p className="font-semibold text-gray-900">⭐ {template.stats.rating}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Success Rate</span>
                      <p className="font-semibold text-gray-900">{template.stats.successRate}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {template.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedTemplate === template.id
                        ? "bg-indigo-600 text-white"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                    }`}
                    disabled={isLoading && selectedTemplate === template.id}
                  >
                    {isLoading && selectedTemplate === template.id ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Loading Editor...</span>
                      </>
                    ) : (
                      <>
                        <span>Use This Template</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}