// EditModals.jsx
import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, Wand2, Loader2 } from "lucide-react";
import { presetThemes } from "@/data";

// AI Enhance Button Component
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const AiEnhanceButton = ({
  fieldName,
  value,
  onEnhance,
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEnhance = async () => {
    if (!value || !value.trim() || loading || disabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/enhance-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fieldName,
          value: value.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to enhance text");
      }

      if (data.enhancedText) {
        onEnhance(data.enhancedText);
      }
    } catch (err) {
      setError(err.message || "Failed to enhance text");
      console.error("Error enhancing text:", err);
      // Optionally show a toast notification here
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleEnhance}
        disabled={loading || disabled || !value || !value.trim()}
        className="group relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-50"
        title="Enhance with AI - Powered by OpenAI"
      >
        {loading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="hidden sm:inline">Enhancing...</span>
          </>
        ) : (
          <>
            <Wand2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enhance with AI</span>
          </>
        )}
      </button>
      {error && (
        <div className="absolute top-full left-0 mt-1 px-2 py-1 text-xs text-red-600 bg-red-50 rounded border border-red-200 z-10 whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

// Base Modal Component
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[#00000050]" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Personal Information Modal
export const PersonalModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Personal Information">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="City, State/Country"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="yourwebsite.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="linkedin.com/in/yourprofile"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <input
              type="text"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="github.com/yourusername"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              type="text"
              value={formData.twitter}
              onChange={(e) =>
                setFormData({ ...formData, twitter: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="twitter.com/yourusername"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Summary Modal
export const SummaryModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Professional Summary">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <AiEnhanceButton
              fieldName="Professional Summary"
              value={formData}
              onEnhance={setFormData}
            />
          </div>
          <textarea
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a compelling summary that highlights your experience, skills, and career goals..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Tip: Keep it between 3-4 sentences and focus on your unique value
            proposition
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Skills Modal
export const SkillsModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSkillInputs, setNewSkillInputs] = useState({});

  useEffect(() => {
    // Deep clone to avoid mutations
    setFormData(JSON.parse(JSON.stringify(data || [])));
  }, [data, isOpen]);

  const addCategory = () => {
    if (newCategory.trim()) {
      setFormData([...formData, { category: newCategory.trim(), items: [] }]);
      setNewCategory("");
    }
  };

  const addSkill = (categoryIndex) => {
    const skillValue = newSkillInputs[categoryIndex];
    if (skillValue && skillValue.trim()) {
      const updated = formData.map((cat, idx) => {
        if (idx === categoryIndex) {
          return {
            ...cat,
            items: [...cat.items, skillValue.trim()],
          };
        }
        return cat;
      });
      setFormData(updated);
      setNewSkillInputs({ ...newSkillInputs, [categoryIndex]: "" });
    }
  };

  const removeCategory = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const removeSkill = (categoryIndex, skillIndex) => {
    const updated = formData.map((cat, idx) => {
      if (idx === categoryIndex) {
        return {
          ...cat,
          items: cat.items.filter((_, i) => i !== skillIndex),
        };
      }
      return cat;
    });
    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a deep clone to prevent mutation
    onSave(JSON.parse(JSON.stringify(formData)));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Skills">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {formData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">
                  {category.category}
                </h3>
                <button
                  type="button"
                  onClick={() => removeCategory(categoryIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {category.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(categoryIndex, skillIndex)}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={newSkillInputs[categoryIndex] || ""}
                  onChange={(e) =>
                    setNewSkillInputs({
                      ...newSkillInputs,
                      [categoryIndex]: e.target.value,
                    })
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(categoryIndex);
                    }
                  }}
                  className="flex-1 px-3 py-1 border rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => addSkill(categoryIndex)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New category name (e.g., Frontend, Backend, Tools)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
// Experience Modal
export const ExperienceModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data || []);
  const [editingIndex, setEditingIndex] = useState(null);

  const emptyExperience = {
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    highlights: [""],
  };

  const [currentExp, setCurrentExp] = useState(emptyExperience);

  useEffect(() => {
    setFormData(data || []);
  }, [data]);

  const handleAddExperience = () => {
    if (editingIndex !== null) {
      const updated = [...formData];
      updated[editingIndex] = { ...currentExp, id: formData[editingIndex].id };
      setFormData(updated);
      setEditingIndex(null);
    } else {
      setFormData([...formData, { ...currentExp, id: `exp${Date.now()}` }]);
    }
    setCurrentExp(emptyExperience);
  };

  const handleEditExperience = (index) => {
    setCurrentExp(formData[index]);
    setEditingIndex(index);
  };

  const handleDeleteExperience = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...currentExp.highlights];
    newHighlights[index] = value;
    setCurrentExp({ ...currentExp, highlights: newHighlights });
  };

  const addHighlight = () => {
    setCurrentExp({
      ...currentExp,
      highlights: [...currentExp.highlights, ""],
    });
  };

  const removeHighlight = (index) => {
    const newHighlights = currentExp.highlights.filter((_, i) => i !== index);
    setCurrentExp({ ...currentExp, highlights: newHighlights });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Experience">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={currentExp.company}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, company: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <input
                type="text"
                value={currentExp.role}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, role: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={currentExp.location}
              onChange={(e) =>
                setCurrentExp({ ...currentExp, location: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={currentExp.startDate}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, startDate: e.target.value })
                }
                placeholder="Jan 2020"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={currentExp.endDate}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, endDate: e.target.value })
                }
                placeholder="Dec 2022 or Present"
                disabled={currentExp.current}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={currentExp.current}
                onChange={(e) =>
                  setCurrentExp({
                    ...currentExp,
                    current: e.target.checked,
                    endDate: e.target.checked ? "Present" : "",
                  })
                }
                className="rounded"
              />
              <span className="text-sm text-gray-700">
                Currently working here
              </span>
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <AiEnhanceButton
                fieldName="Experience Description"
                value={currentExp.description}
                onEnhance={(enhanced) =>
                  setCurrentExp({ ...currentExp, description: enhanced })
                }
              />
            </div>
            <textarea
              value={currentExp.description}
              onChange={(e) =>
                setCurrentExp({ ...currentExp, description: e.target.value })
              }
              rows={2}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Achievements
            </label>
            {currentExp.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your achievement..."
                />
                <AiEnhanceButton
                  fieldName="Achievement"
                  value={highlight}
                  onEnhance={(enhanced) =>
                    handleHighlightChange(index, enhanced)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Achievement
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddExperience}
            disabled={!currentExp.company || !currentExp.role}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors"
          >
            {editingIndex !== null ? "Update Experience" : "Add Experience"}
          </button>
        </div>

        {/* Existing Experiences */}
        {formData.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Current Experiences</h3>
            {formData.map((exp, index) => (
              <div
                key={exp.id}
                className="border rounded-lg p-3 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">{exp.role}</p>
                  <p className="text-sm text-gray-600">
                    {exp.company} • {exp.startDate} -{" "}
                    {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditExperience(index)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Education Modal
export const EducationModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data || []);
  const [editingIndex, setEditingIndex] = useState(null);

  const emptyEducation = {
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    gpa: "",
    highlights: [""],
  };

  const [currentEdu, setCurrentEdu] = useState(emptyEducation);

  useEffect(() => {
    setFormData(data || []);
  }, [data]);

  const handleAddEducation = () => {
    if (editingIndex !== null) {
      const updated = [...formData];
      updated[editingIndex] = { ...currentEdu, id: formData[editingIndex].id };
      setFormData(updated);
      setEditingIndex(null);
    } else {
      setFormData([...formData, { ...currentEdu, id: `edu${Date.now()}` }]);
    }
    setCurrentEdu(emptyEducation);
  };

  const handleEditEducation = (index) => {
    setCurrentEdu(formData[index]);
    setEditingIndex(index);
  };

  const handleDeleteEducation = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...currentEdu.highlights];
    newHighlights[index] = value;
    setCurrentEdu({ ...currentEdu, highlights: newHighlights });
  };

  const addHighlight = () => {
    setCurrentEdu({
      ...currentEdu,
      highlights: [...currentEdu.highlights, ""],
    });
  };

  const removeHighlight = (index) => {
    const newHighlights = currentEdu.highlights.filter((_, i) => i !== index);
    setCurrentEdu({ ...currentEdu, highlights: newHighlights });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Education">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution *
              </label>
              <input
                type="text"
                value={currentEdu.institution}
                onChange={(e) =>
                  setCurrentEdu({ ...currentEdu, institution: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree *
              </label>
              <input
                type="text"
                value={currentEdu.degree}
                onChange={(e) =>
                  setCurrentEdu({ ...currentEdu, degree: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Bachelor of Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={currentEdu.field}
                onChange={(e) =>
                  setCurrentEdu({ ...currentEdu, field: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={currentEdu.location}
                onChange={(e) =>
                  setCurrentEdu({ ...currentEdu, location: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={currentEdu.startDate}
                onChange={(e) =>
                  setCurrentEdu({ ...currentEdu, startDate: e.target.value })
                }
                placeholder="2016"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={currentEdu.endDate}
                onChange={(e) =>
                  setCurrentEdu({ ...currentEdu, endDate: e.target.value })
                }
                placeholder="2020"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA
              </label>
              <input
                type="text"
                value={currentEdu.gpa}
                onChange={(e) =>
                  setCurrentEdu({ ...currentEdu, gpa: e.target.value })
                }
                placeholder="3.8"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Achievements & Honors
            </label>
            {currentEdu.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Dean's List, Honors, etc..."
                />
                <AiEnhanceButton
                  fieldName="Education Achievement"
                  value={highlight}
                  onEnhance={(enhanced) =>
                    handleHighlightChange(index, enhanced)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Achievement
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddEducation}
            disabled={!currentEdu.institution || !currentEdu.degree}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors"
          >
            {editingIndex !== null ? "Update Education" : "Add Education"}
          </button>
        </div>

        {formData.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Current Education</h3>
            {formData.map((edu, index) => (
              <div
                key={edu.id}
                className="border rounded-lg p-3 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-sm text-gray-600">
                    {edu.institution} • {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditEducation(index)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Projects Modal
export const ProjectsModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data || []);
  const [editingIndex, setEditingIndex] = useState(null);

  const emptyProject = {
    name: "",
    description: "",
    techStack: [],
    link: "",
    highlights: [""],
  };

  const [currentProject, setCurrentProject] = useState(emptyProject);
  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    setFormData(data || []);
  }, [data]);

  const handleAddProject = () => {
    if (editingIndex !== null) {
      const updated = [...formData];
      updated[editingIndex] = {
        ...currentProject,
        id: formData[editingIndex].id,
      };
      setFormData(updated);
      setEditingIndex(null);
    } else {
      setFormData([
        ...formData,
        { ...currentProject, id: `proj${Date.now()}` },
      ]);
    }
    setCurrentProject(emptyProject);
  };

  const handleEditProject = (index) => {
    setCurrentProject(formData[index]);
    setEditingIndex(index);
  };

  const handleDeleteProject = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const addTech = () => {
    if (newTech.trim()) {
      setCurrentProject({
        ...currentProject,
        techStack: [...currentProject.techStack, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const removeTech = (index) => {
    const newTechStack = currentProject.techStack.filter((_, i) => i !== index);
    setCurrentProject({ ...currentProject, techStack: newTechStack });
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...currentProject.highlights];
    newHighlights[index] = value;
    setCurrentProject({ ...currentProject, highlights: newHighlights });
  };

  const addHighlight = () => {
    setCurrentProject({
      ...currentProject,
      highlights: [...currentProject.highlights, ""],
    });
  };

  const removeHighlight = (index) => {
    const newHighlights = currentProject.highlights.filter(
      (_, i) => i !== index
    );
    setCurrentProject({ ...currentProject, highlights: newHighlights });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Projects">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              value={currentProject.name}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <AiEnhanceButton
                fieldName="Project Description"
                value={currentProject.description}
                onEnhance={(enhanced) =>
                  setCurrentProject({
                    ...currentProject,
                    description: enhanced,
                  })
                }
              />
            </div>
            <textarea
              value={currentProject.description}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  description: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <input
              type="text"
              value={currentProject.link}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, link: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="github.com/username/project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tech Stack
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {currentProject.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(index)}
                    className="ml-1 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="Add technology"
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Features & Achievements
            </label>
            {currentProject.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe a key feature or achievement..."
                />
                <AiEnhanceButton
                  fieldName="Project Feature"
                  value={highlight}
                  onEnhance={(enhanced) =>
                    handleHighlightChange(index, enhanced)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddProject}
            disabled={!currentProject.name}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors"
          >
            {editingIndex !== null ? "Update Project" : "Add Project"}
          </button>
        </div>

        {formData.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Current Projects</h3>
            {formData.map((project, index) => (
              <div
                key={project.id}
                className="border rounded-lg p-3 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditProject(index)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Certifications Modal
export const CertificationsModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data || []);
  const [editingIndex, setEditingIndex] = useState(null);

  const emptyCertification = {
    name: "",
    issuer: "",
    date: "",
    credentialId: "",
  };

  const [currentCert, setCurrentCert] = useState(emptyCertification);

  useEffect(() => {
    setFormData(data || []);
  }, [data]);

  const handleAddCertification = () => {
    if (editingIndex !== null) {
      const updated = [...formData];
      updated[editingIndex] = { ...currentCert, id: formData[editingIndex].id };
      setFormData(updated);
      setEditingIndex(null);
    } else {
      setFormData([...formData, { ...currentCert, id: `cert${Date.now()}` }]);
    }
    setCurrentCert(emptyCertification);
  };

  const handleEditCertification = (index) => {
    setCurrentCert(formData[index]);
    setEditingIndex(index);
  };

  const handleDeleteCertification = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Certifications">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certification Name *
            </label>
            <input
              type="text"
              value={currentCert.name}
              onChange={(e) =>
                setCurrentCert({ ...currentCert, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="AWS Certified Solutions Architect"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                value={currentCert.issuer}
                onChange={(e) =>
                  setCurrentCert({ ...currentCert, issuer: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Obtained
              </label>
              <input
                type="text"
                value={currentCert.date}
                onChange={(e) =>
                  setCurrentCert({ ...currentCert, date: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2023"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credential ID
            </label>
            <input
              type="text"
              value={currentCert.credentialId}
              onChange={(e) =>
                setCurrentCert({ ...currentCert, credentialId: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="ABC123XYZ"
            />
          </div>

          <button
            type="button"
            onClick={handleAddCertification}
            disabled={!currentCert.name || !currentCert.issuer}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors"
          >
            {editingIndex !== null
              ? "Update Certification"
              : "Add Certification"}
          </button>
        </div>

        {formData.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">
              Current Certifications
            </h3>
            {formData.map((cert, index) => (
              <div
                key={cert.id}
                className="border rounded-lg p-3 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-gray-600">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditCertification(index)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCertification(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Languages Modal
export const LanguagesModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data || []);
  const [editingIndex, setEditingIndex] = useState(null);

  const emptyLanguage = {
    language: "",
    proficiency: "Professional",
  };

  const [currentLang, setCurrentLang] = useState(emptyLanguage);

  const proficiencyLevels = [
    "Native",
    "Fluent",
    "Professional",
    "Intermediate",
    "Basic",
  ];

  useEffect(() => {
    setFormData(data || []);
  }, [data]);

  const handleAddLanguage = () => {
    if (editingIndex !== null) {
      const updated = [...formData];
      updated[editingIndex] = { ...currentLang, id: formData[editingIndex].id };
      setFormData(updated);
      setEditingIndex(null);
    } else {
      setFormData([...formData, { ...currentLang, id: `lang${Date.now()}` }]);
    }
    setCurrentLang(emptyLanguage);
  };

  const handleEditLanguage = (index) => {
    setCurrentLang(formData[index]);
    setEditingIndex(index);
  };

  const handleDeleteLanguage = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Languages">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language *
              </label>
              <input
                type="text"
                value={currentLang.language}
                onChange={(e) =>
                  setCurrentLang({ ...currentLang, language: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="English, Spanish, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency *
              </label>
              <select
                value={currentLang.proficiency}
                onChange={(e) =>
                  setCurrentLang({
                    ...currentLang,
                    proficiency: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {proficiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddLanguage}
            disabled={!currentLang.language}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors"
          >
            {editingIndex !== null ? "Update Language" : "Add Language"}
          </button>
        </div>

        {formData.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Current Languages</h3>
            {formData.map((lang, index) => (
              <div
                key={lang.id}
                className="border rounded-lg p-3 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">{lang.language}</p>
                  <p className="text-sm text-gray-600">{lang.proficiency}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditLanguage(index)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteLanguage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Interests Modal
export const InterestsModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data || []);
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    setFormData(data || []);
  }, [data]);

  const addInterest = () => {
    if (newInterest.trim() && !formData.includes(newInterest.trim())) {
      setFormData([...formData, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Interests">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Interests & Hobbies
          </label>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[60px] p-3 border rounded-lg bg-gray-50">
            {formData.length === 0 ? (
              <p className="text-gray-400 text-sm">No interests added yet</p>
            ) : (
              formData.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(index)}
                    className="ml-1 hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInterest();
                }
              }}
              placeholder="Add an interest (e.g., Photography, Hiking, Reading)"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addInterest}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Add interests that showcase your personality and help you connect
            with others
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export function CustomSectionModal({ isOpen, onClose, data = null, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
      });
    } else {
      setFormData({ title: "", description: "" });
    }
  }, [data, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000050] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {data ? "Edit Custom Section" : "Add Custom Section"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., Publications, Volunteer Work, Awards"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <AiEnhanceButton
                fieldName="Custom Section Description"
                value={formData.description}
                onEnhance={(enhanced) =>
                  setFormData({ ...formData, description: enhanced })
                }
              />
            </div>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Describe this section content..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {data ? "Update Section" : "Add Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ThemeModal({ isOpen, onClose, theme, onSave }) {
  const [colors, setColors] = useState({
    primaryColor: theme?.primaryColor || "#172554",
    secondaryColor: theme?.secondaryColor || "#1E40AF",
    accentColor: theme?.accentColor || "#3B82F6",
  });

  useEffect(() => {
    if (theme) {
      setColors({
        primaryColor: theme.primaryColor || "#172554",
        secondaryColor: theme.secondaryColor || "#1E40AF",
        accentColor: theme.accentColor || "#3B82F6",
      });
    }
  }, [theme, isOpen]);

  const handleSave = () => {
    onSave(colors);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000050] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Theme Colors</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Color Pickers */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color (Headings & Titles)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={colors.primaryColor}
                  onChange={(e) =>
                    setColors({ ...colors, primaryColor: e.target.value })
                  }
                  className="h-12 w-24 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.primaryColor}
                  onChange={(e) =>
                    setColors({ ...colors, primaryColor: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="#172554"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color (Dates & Borders)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={colors.secondaryColor}
                  onChange={(e) =>
                    setColors({ ...colors, secondaryColor: e.target.value })
                  }
                  className="h-12 w-24 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.secondaryColor}
                  onChange={(e) =>
                    setColors({ ...colors, secondaryColor: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="#1E40AF"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Color (Links & Highlights)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={colors.accentColor}
                  onChange={(e) =>
                    setColors({ ...colors, accentColor: e.target.value })
                  }
                  className="h-12 w-24 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.accentColor}
                  onChange={(e) =>
                    setColors({ ...colors, accentColor: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="#3B82F6"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 sticky top-[10%] bg-white">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Preview
            </h3>
            <div
              className="rounded-lg p-4 text-white mb-3"
              style={{
                background: `linear-gradient(to right, ${colors.primaryColor}, ${colors.secondaryColor})`,
              }}
            >
              <h4 className="text-lg font-bold">Your Name</h4>
              <p className="text-sm opacity-90">Job Title</p>
            </div>
            <div className="space-y-2">
              <h4
                className="text-lg font-bold border-b-2 pb-1 inline-block"
                style={{
                  color: colors.primaryColor,
                  borderColor: colors.accentColor,
                }}
              >
                Section Heading
              </h4>
              <p className="text-sm" style={{ color: colors.secondaryColor }}>
                Supporting text and dates
              </p>
              <span
                className="inline-block px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.accentColor}20`,
                  color: colors.accentColor,
                }}
              >
                Skill Badge
              </span>
            </div>
          </div>

          {/* Preset Themes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Preset Themes
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {presetThemes.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setColors(preset.colors)}
                  className="p-3 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.colors.primaryColor }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.colors.secondaryColor }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.colors.accentColor }}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {preset.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Apply Theme
          </button>
        </div>
      </div>
    </div>
  );
}
