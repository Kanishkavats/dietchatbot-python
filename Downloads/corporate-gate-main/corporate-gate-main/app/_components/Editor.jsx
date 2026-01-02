// ResumeEditor.jsx - Improved UI version
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import {
  updatePersonal,
  updateSummary,
  updateSkills,
  updateExperience,
  updateEducation,
  updateProjects,
  updateCertifications,
  updateLanguages,
  updateInterests,
  resetResume,
  toggleSectionVisibility,
  addCustomSection,
  updateCustomSection,
  removeCustomSection,
  updateTheme,
  setCustomSectionModal,
} from "../../store/slices/resumeSlice";
import ModernTemplate from "./templates/ModernTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import AcademicTemplate from "./templates/AcademicTemplate";
import TechTemplate from "./templates/TechTemplate";
import {
  PersonalModal,
  SummaryModal,
  SkillsModal,
  ExperienceModal,
  EducationModal,
  ProjectsModal,
  CertificationsModal,
  LanguagesModal,
  InterestsModal,
  CustomSectionModal,
  ThemeModal,
} from "./EditModals";
import {
  FileText,
  Download,
  Eye,
  Edit3,
  Save,
  ArrowLeft,
  Palette,
  Settings,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Globe,
  Heart,
  FolderKanban,
  AlignLeft,
  ChevronRight,
  Menu,
  X,
  Plus,
  RotateCcw,
  Upload,
  Sparkles,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useResumeUploader } from "../_hooks/useResumeUploader";
import { ResumeAnalysisModal } from "./resume-analysis/ResumeAnalysisModal";

export default function ResumeEditor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeData = useSelector((state) => state.resume);

  const [activeView, setActiveView] = useState("edit");
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scale, setScale] = useState(0.9);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const customSectionModal = resumeData.customSectionModal;
  
  // Resume uploader hook
  const { loading: uploadLoading, uploadAndExtract } = useResumeUploader();
  const [uploadMessage, setUploadMessage] = useState(null);
  
  // Analysis modal state
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  // Get template from URL params, default to 'modern'
  const templateId = searchParams.get("template") || "modern";

  // Modal states
  const [activeModal, setActiveModal] = useState(null);

  // Template mapping
  const templateComponents = {
    modern: ModernTemplate,
    executive: ExecutiveTemplate,
    creative: CreativeTemplate,
    minimalist: MinimalistTemplate,
    academic: AcademicTemplate,
    tech: TechTemplate,
  };

  // Get the selected template component
  const SelectedTemplate = templateComponents[templateId] || ModernTemplate;

  // Handle section clicks to open modals
  const handleSectionClick = (sectionName) => {
    if (activeView === "edit") {
      setActiveModal(sectionName);
    }
  };

  // Modal save handlers
  const handlePersonalSave = (data) => {
    dispatch(updatePersonal(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSummarySave = (data) => {
    dispatch(updateSummary(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSkillsSave = (data) => {
    dispatch(updateSkills(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleExperienceSave = (data) => {
    dispatch(updateExperience(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEducationSave = (data) => {
    dispatch(updateEducation(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleProjectsSave = (data) => {
    dispatch(updateProjects(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCertificationsSave = (data) => {
    dispatch(updateCertifications(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLanguagesSave = (data) => {
    dispatch(updateLanguages(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInterestsSave = (data) => {
    dispatch(updateInterests(data));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCustomSectionSave = (data) => {
    if (customSectionModal.data) {
      dispatch(updateCustomSection({ id: customSectionModal.data.id, data }));
    } else {
      dispatch(addCustomSection(data));
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleToggleSection = (sectionId) => {
    dispatch(toggleSectionVisibility({ section: sectionId }));
  };

  const handleThemeSave = (colors) => {
    dispatch(updateTheme(colors));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await uploadAndExtract(file);
    
    if (result.success) {
      setUploadMessage({
        type: "success",
        message: `Successfully extracted data! Filled: ${result.filledFields.join(", ")}`,
        filledFields: result.filledFields,
        emptyFields: result.emptyFields,
      });
      setTimeout(() => setUploadMessage(null), 8000);
    } else {
      setUploadMessage({
        type: "error",
        message: result.error,
      });
      setTimeout(() => setUploadMessage(null), 5000);
    }
  };

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      const resumeElement = document.getElementById("resume-content");

      // Create complete HTML document with Tailwind and styles
      const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            ${getResumeStyles()}
            
            /* Print optimizations */
            @page {
              size: A4;
              margin: 0;
            }
            
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            /* Ensure proper text rendering for ATS */
            * {
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          ${resumeElement.outerHTML}
        </body>
      </html>
    `;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resume/export-pdf`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            html: fullHTML,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to export PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.personal.fullName.replace(
        /\s+/g,
        "_"
      )}_Resume.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const getResumeStyles = () => {
    return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    
    body { 
      margin: 0; 
      padding: 0;
      background: white;
    }
    
    /* Ensure all colors print correctly */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `;
  };

  // const getResumeStyles = () => {
  //   return `
  //     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  //     * { font-family: 'Inter', sans-serif; }
  //     body { margin: 0; padding: 20px; }
  //   `;
  // };

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: AlignLeft },
    { id: "skills", name: "Skills", icon: Code },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderKanban },
    { id: "certifications", name: "Certifications", icon: Award },
    { id: "languages", name: "Languages", icon: Globe },
    { id: "interests", name: "Interests", icon: Heart },
  ];

  // const sections = [
  //   ...minsections,
  //   ...(resumeData.customSections || []).map((cs) => ({
  //     id: cs.id,
  //     name: cs.title,
  //     icon: FileText,
  //     isCustom: true,
  //   })),
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-[#333]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push("/templates")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Templates"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
              <FileText className="h-8 w-8 text-[#243a50]" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Resume Builder
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  Click sections to edit
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* View Toggle */}
              <div className="flex gap-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveView("edit")}
                    className={`flex items-center px-2 sm:px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeView === "edit"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Edit3 className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => setActiveView("preview")}
                    className={`flex items-center px-2 sm:px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeView === "preview"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Eye className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                </div>
                <button
                  onClick={() => setThemeModalOpen(true)}
                  className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Palette className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  <span className="hidden sm:inline">Theme</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset?")) {
                      dispatch(resetResume());
                    }
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-gray-500 hover:text-red-600 hover:border-red-500 border border-gray-300 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {/* Zoom Control */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                  className="px-2 py-1 hover:bg-gray-200 rounded transition-colors"
                >
                  -
                </button>
                <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale(Math.min(1.5, scale + 0.1))}
                  className="px-2 py-1 hover:bg-gray-200 rounded transition-colors"
                >
                  +
                </button>
              </div>

              {/* Analyze Resume Button - Only in Preview Mode */}
              {activeView === "preview" && (
                <button
                  onClick={() => setShowAnalysisModal(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline font-semibold">Analyze Resume</span>
                </button>
              )}

              {/* Export Button */}
              <button
                onClick={exportPDF}
                disabled={isExporting}
                className="flex items-center px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white sm:mr-2"></div>
                    <span className="hidden sm:inline">Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Export PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-slide-in">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Successfully saved!</span>
        </div>
      )}

      {/* Upload Message Notification */}
      {uploadMessage && (
        <div
          className={`fixed top-20 right-4 px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in max-w-md ${
            uploadMessage.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-start space-x-2">
            {uploadMessage.type === "success" ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-medium">{uploadMessage.message}</p>
              {uploadMessage.emptyFields && uploadMessage.emptyFields.length > 0 && (
                <p className="text-xs mt-1 opacity-90">
                  Empty fields: {uploadMessage.emptyFields.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Sidebar */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {activeView === "edit" && (
          <aside
            className={`${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out mt-16 lg:mt-0`}
          >
            <div className="h-full flex flex-col">
              <div className="px-4 py-4 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Resume Sections
                </h2>
                <p className="text-xs text-gray-500 mt-1">Click to edit</p>
                
                {/* Upload Resume to Autofill Button */}
                <div className="mt-4">
                  <label
                    htmlFor="resume-upload"
                    className="relative flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all cursor-pointer shadow-md hover:shadow-lg group"
                  >
                    {uploadLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-xs font-semibold">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                        <span className="text-xs font-semibold">Upload to Autofill</span>
                      </>
                    )}
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    disabled={uploadLoading}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Upload your resume to auto-fill fields
                  </p>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto px-2 py-4">
                <div className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isVisible =
                      resumeData.sectionVisibility?.[section.id] !== false;

                    return (
                      <div key={section.id} className="flex items-center gap-1">
                        <button
                          onClick={() => setActiveModal(section.id)}
                          className={`flex-1 group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                            isVisible
                              ? "hover:bg-indigo-50 hover:text-indigo-600"
                              : "opacity-50 hover:bg-gray-50"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 mr-3 transition-colors ${
                              isVisible
                                ? "text-gray-400 group-hover:text-indigo-600"
                                : "text-gray-300"
                            }`}
                          />
                          <span className="flex-1 text-left">
                            {section.name}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <button
                          onClick={() => handleToggleSection(section.id)}
                          className={`p-2 rounded-md transition-colors ${
                            isVisible
                              ? "text-red-500 hover:bg-red-50"
                              : "text-green-500 hover:bg-green-50"
                          }`}
                          title={isVisible ? "Hide section" : "Show section"}
                        >
                          {isVisible ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Sections */}
                {resumeData.customSections?.length > 0 && (
                  <>
                    <div className="px-3 py-2 mt-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Custom Sections
                      </h3>
                    </div>
                    <div className="space-y-1">
                      {resumeData.customSections.map((customSection) => {
                        const isVisible = customSection.visible !== false;

                        return (
                          <div
                            key={customSection.id}
                            className="flex items-center gap-1"
                          >
                            <button
                              onClick={() =>
                                dispatch(
                                  setCustomSectionModal({
                                    open: true,
                                    data: customSection,
                                  })
                                )
                              }
                              className={`flex-1 group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                                isVisible
                                  ? "hover:bg-indigo-50 hover:text-indigo-600"
                                  : "opacity-50 hover:bg-gray-50"
                              }`}
                            >
                              <FileText
                                className={`h-5 w-5 mr-3 transition-colors ${
                                  isVisible
                                    ? "text-gray-400 group-hover:text-indigo-600"
                                    : "text-gray-300"
                                }`}
                              />
                              <span className="flex-1 text-left">
                                {customSection.title}
                              </span>
                              <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>

                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    `Remove "${customSection.title}" section?`
                                  )
                                ) {
                                  dispatch(
                                    removeCustomSection(customSection.id)
                                  );
                                }
                              }}
                              className="p-2 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete section"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Add Custom Section Button */}
                <button
                  onClick={() =>
                    dispatch(setCustomSectionModal({ open: true, data: null }))
                  }
                  className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-all mt-4"
                >
                  <Plus className="h-5 w-5 mr-3" />
                  <span>Add Custom Section</span>
                </button>
              </nav>
            </div>
          </aside>
        )}

        {/* Overlay for mobile */}
        {sidebarOpen && activeView === "edit" && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden mt-16"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Preview Area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6">
              <div
                className="flex justify-center"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                <div className="shadow-2xl">
                  <SelectedTemplate
                    data={resumeData}
                    onSectionClick={handleSectionClick}
                  />
                </div>
              </div>
            </div>

            {/* Instructions Footer */}
            {activeView === "edit" && (
              <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                  <div className="flex items-center space-x-6 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">👆</span>
                      <span className="hidden sm:inline">
                        Click sections to edit
                      </span>
                      <span className="sm:hidden">Click to edit</span>
                    </div>
                    <div className="hidden md:flex items-center">
                      <span className="mr-2">💾</span>
                      <span>Save changes</span>
                    </div>
                    <div className="hidden md:flex items-center">
                      <span className="mr-2">📄</span>
                      <span>Export as PDF</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      Tip: Use sidebar for quick access
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Edit Modals */}
      <PersonalModal
        isOpen={activeModal === "personal"}
        onClose={() => setActiveModal(null)}
        data={resumeData.personal}
        onSave={handlePersonalSave}
      />

      <SummaryModal
        isOpen={activeModal === "summary"}
        onClose={() => setActiveModal(null)}
        data={resumeData.summary}
        onSave={handleSummarySave}
      />

      <SkillsModal
        isOpen={activeModal === "skills"}
        onClose={() => setActiveModal(null)}
        data={resumeData.skills}
        onSave={handleSkillsSave}
      />

      <ExperienceModal
        isOpen={activeModal === "experience"}
        onClose={() => setActiveModal(null)}
        data={resumeData.experience}
        onSave={handleExperienceSave}
      />

      <EducationModal
        isOpen={activeModal === "education"}
        onClose={() => setActiveModal(null)}
        data={resumeData.education}
        onSave={handleEducationSave}
      />

      <ProjectsModal
        isOpen={activeModal === "projects"}
        onClose={() => setActiveModal(null)}
        data={resumeData.projects}
        onSave={handleProjectsSave}
      />

      <CertificationsModal
        isOpen={activeModal === "certifications"}
        onClose={() => setActiveModal(null)}
        data={resumeData.certifications}
        onSave={handleCertificationsSave}
      />

      <LanguagesModal
        isOpen={activeModal === "languages"}
        onClose={() => setActiveModal(null)}
        data={resumeData.languages}
        onSave={handleLanguagesSave}
      />

      <InterestsModal
        isOpen={activeModal === "interests"}
        onClose={() => setActiveModal(null)}
        data={resumeData.interests}
        onSave={handleInterestsSave}
      />

      <CustomSectionModal
        isOpen={customSectionModal.open}
        onClose={() =>
          dispatch(setCustomSectionModal({ open: false, data: null }))
        }
        data={customSectionModal.data}
        onSave={handleCustomSectionSave}
      />

      <ThemeModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        theme={resumeData.theme}
        onSave={handleThemeSave}
      />

      {/* Resume Analysis Modal */}
      <ResumeAnalysisModal
        isOpen={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
      />

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
