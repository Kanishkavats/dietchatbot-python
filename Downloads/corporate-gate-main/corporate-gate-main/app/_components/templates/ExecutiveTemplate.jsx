// ExecutiveTemplate.jsx - Professional Executive Style
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
  Award,
  Book,
} from "lucide-react";
import { setCustomSectionModal } from "@/store/slices/resumeSlice";
import { useDispatch } from "react-redux";

const ExecutiveTemplate = ({ data, onSectionClick }) => {
  const {
    personal,
    summary,
    skills,
    experience,
    education,
    projects,
    certifications,
    languages,
    interests,
    theme,
  } = data;
  const dispatch = useDispatch();

  return (
    <div
      id="resume-content"
      className="bg-white shadow-xl"
      style={{ width: "850px", minHeight: "1100px" }}
    >
      {/* Header Section - Elegant with sidebar accent */}
      {data.sectionVisibility?.personal !== false && personal && (
        <div className="flex">
          {/* Left accent bar */}
          <div
            className="w-2"
            style={{
              background: theme?.primaryColor || "#1A202C",
            }}
          ></div>

          <div
            id="personal-section"
            onClick={() => onSectionClick("personal")}
            className="flex-1 p-8 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1
                  className="text-5xl font-bold mb-2"
                  style={{ color: theme?.primaryColor || "#1A202C" }}
                >
                  {personal.fullName}
                </h1>
                <p
                  className="text-2xl mb-4 uppercase tracking-wide"
                  style={{ color: theme?.secondaryColor || "#4A5568" }}
                >
                  {personal.title}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mt-6">
                  {personal.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ color: theme?.accentColor || "#3182CE" }} />
                      <span>{personal.email}</span>
                    </div>
                  )}
                  {personal.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" style={{ color: theme?.accentColor || "#3182CE" }} />
                      <span>{personal.phone}</span>
                    </div>
                  )}
                  {personal.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: theme?.accentColor || "#3182CE" }} />
                      <span>{personal.location}</span>
                    </div>
                  )}
                  {personal.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" style={{ color: theme?.accentColor || "#3182CE" }} />
                      <span>{personal.website}</span>
                    </div>
                  )}
                  {personal.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" style={{ color: theme?.accentColor || "#3182CE" }} />
                      <span>{personal.linkedin}</span>
                    </div>
                  )}
                  {personal.github && (
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4" style={{ color: theme?.accentColor || "#3182CE" }} />
                      <span>{personal.github}</span>
                    </div>
                  )}
                </div>
              </div>

              {personal.profileImage && (
                <img
                  src={personal.profileImage}
                  alt={personal.fullName}
                  className="w-32 h-32 rounded-sm border-4 object-cover"
                  style={{ borderColor: theme?.primaryColor || "#1A202C" }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="px-10 py-6">
        {/* Summary Section */}
        {data.sectionVisibility?.summary !== false && summary && (
          <div
            id="summary-section"
            onClick={() => onSectionClick("summary")}
            className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
          >
            <h2
              className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
              style={{
                color: theme?.primaryColor || "#1A202C",
                borderColor: theme?.primaryColor || "#1A202C",
              }}
            >
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Experience Section */}
        {data.sectionVisibility?.experience !== false &&
          experience &&
          experience.length > 0 && (
            <div
              id="experience-section"
              onClick={() => onSectionClick("experience")}
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                style={{
                  color: theme?.primaryColor || "#1A202C",
                  borderColor: theme?.primaryColor || "#1A202C",
                }}
              >
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id || index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{ color: theme?.primaryColor || "#1A202C" }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="font-semibold text-base"
                          style={{ color: theme?.accentColor || "#3182CE" }}
                        >
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-2">{exp.description}</p>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Skills Section */}
        {data.sectionVisibility?.skills !== false &&
          skills &&
          skills.length > 0 && (
            <div
              id="skills-section"
              onClick={() => onSectionClick("skills")}
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                style={{
                  color: theme?.primaryColor || "#1A202C",
                  borderColor: theme?.primaryColor || "#1A202C",
                }}
              >
                Core Competencies
              </h2>
              <div className="space-y-2">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="flex">
                    <span
                      className="font-bold min-w-[140px]"
                      style={{ color: theme?.primaryColor || "#1A202C" }}
                    >
                      {skillGroup.category}:
                    </span>
                    <span className="text-gray-700">
                      {skillGroup.items.join(" • ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Education Section */}
        {data.sectionVisibility?.education !== false &&
          education &&
          education.length > 0 && (
            <div
              id="education-section"
              onClick={() => onSectionClick("education")}
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                style={{
                  color: theme?.primaryColor || "#1A202C",
                  borderColor: theme?.primaryColor || "#1A202C",
                }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{ color: theme?.primaryColor || "#1A202C" }}
                        >
                          {edu.degree}
                        </h3>
                        {edu.field && <p className="text-gray-700">{edu.field}</p>}
                        <p
                          className="font-semibold"
                          style={{ color: theme?.accentColor || "#3182CE" }}
                        >
                          {edu.institution}
                        </p>
                        <p className="text-sm text-gray-600">{edu.location}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Book className="w-4 h-4 mr-1" />
                        <span>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                    </div>
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-2">
                        {edu.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Projects Section */}
        {data.sectionVisibility?.projects !== false &&
          projects &&
          projects.length > 0 && (
            <div
              id="projects-section"
              onClick={() => onSectionClick("projects")}
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                style={{
                  color: theme?.primaryColor || "#1A202C",
                  borderColor: theme?.primaryColor || "#1A202C",
                }}
              >
                Key Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id || index}>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: theme?.primaryColor || "#1A202C" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    {project.techStack && project.techStack.length > 0 && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Technologies:</span>{" "}
                        {project.techStack.join(", ")}
                      </p>
                    )}
                    {project.link && (
                      <p
                        className="text-sm"
                        style={{ color: theme?.accentColor || "#3182CE" }}
                      >
                        {project.link}
                      </p>
                    )}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-2">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Bottom sections in grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Certifications */}
          {data.sectionVisibility?.certifications !== false &&
            certifications &&
            certifications.length > 0 && (
              <div
                id="certifications-section"
                onClick={() => onSectionClick("certifications")}
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
              >
                <h2
                  className="text-base font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                  style={{
                    color: theme?.primaryColor || "#1A202C",
                    borderColor: theme?.secondaryColor || "#4A5568",
                  }}
                >
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={cert.id || index} className="text-sm">
                      <div className="flex items-start gap-1">
                        <Award
                          className="w-4 h-4 mt-0.5"
                          style={{ color: theme?.accentColor || "#3182CE" }}
                        />
                        <div>
                          <p className="font-medium text-gray-800">{cert.name}</p>
                          <p className="text-gray-600 text-xs">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Languages */}
          {data.sectionVisibility?.languages !== false &&
            languages &&
            languages.length > 0 && (
              <div
                id="languages-section"
                onClick={() => onSectionClick("languages")}
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
              >
                <h2
                  className="text-base font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                  style={{
                    color: theme?.primaryColor || "#1A202C",
                    borderColor: theme?.secondaryColor || "#4A5568",
                  }}
                >
                  Languages
                </h2>
                <div className="space-y-1">
                  {languages.map((lang, index) => (
                    <div key={lang.id || index} className="text-sm">
                      <span className="font-medium text-gray-800">
                        {lang.language}
                      </span>
                      <span className="text-gray-600"> • {lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Interests */}
          {data.sectionVisibility?.interests !== false &&
            interests &&
            interests.length > 0 && (
              <div
                id="interests-section"
                onClick={() => onSectionClick("interests")}
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
              >
                <h2
                  className="text-base font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                  style={{
                    color: theme?.primaryColor || "#1A202C",
                    borderColor: theme?.secondaryColor || "#4A5568",
                  }}
                >
                  Interests
                </h2>
                <div className="space-y-1">
                  {interests.map((interest, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      {interest}
                    </p>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Custom Sections */}
        {data.customSections
          ?.filter((cs) => cs.visible !== false)
          .map((section) => (
            <div
              id={section.id}
              key={section.id}
              onClick={() =>
                dispatch(
                  setCustomSectionModal({
                    open: true,
                    data: section,
                  })
                )
              }
              className="mt-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                style={{
                  color: theme?.primaryColor || "#1A202C",
                  borderColor: theme?.primaryColor || "#1A202C",
                }}
              >
                {section.title}
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {section.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;

