// TechTemplate.jsx - Tech-focused with code-like design
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
  Terminal,
} from "lucide-react";
import { setCustomSectionModal } from "@/store/slices/resumeSlice";
import { useDispatch } from "react-redux";

const TechTemplate = ({ data, onSectionClick }) => {
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
      className="bg-gray-900 shadow-xl"
      style={{ width: "850px", minHeight: "1100px" }}
    >
      {/* Header Section - Terminal Style */}
      {data.sectionVisibility?.personal !== false && personal && (
        <div
          id="personal-section"
          onClick={() => onSectionClick("personal")}
          className="p-8 cursor-pointer hover:bg-gray-800 transition-colors border-b-2"
          style={{ borderColor: theme?.accentColor || "#10B981" }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Terminal
                  className="w-6 h-6"
                  style={{ color: theme?.accentColor || "#10B981" }}
                />
                <span
                  className="text-sm font-mono"
                  style={{ color: theme?.accentColor || "#10B981" }}
                >
                  ~/resume
                </span>
              </div>
              <h1
                className="text-4xl font-mono font-bold mb-2"
                style={{ color: theme?.primaryColor || "#F9FAFB" }}
              >
                {personal.fullName}
              </h1>
              <p
                className="text-xl font-mono mb-4"
                style={{ color: theme?.secondaryColor || "#D1D5DB" }}
              >
                <span style={{ color: theme?.accentColor || "#10B981" }}>
                  {">"}{" "}
                </span>
                {personal.title}
              </p>

              <div className="space-y-1 text-sm font-mono text-gray-300">
                {personal.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: theme?.accentColor || "#10B981" }} />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" style={{ color: theme?.accentColor || "#10B981" }} />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: theme?.accentColor || "#10B981" }} />
                    <span>{personal.location}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" style={{ color: theme?.accentColor || "#10B981" }} />
                    <span>{personal.website}</span>
                  </div>
                )}
                {personal.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" style={{ color: theme?.accentColor || "#10B981" }} />
                    <span>{personal.linkedin}</span>
                  </div>
                )}
                {personal.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" style={{ color: theme?.accentColor || "#10B981" }} />
                    <span>{personal.github}</span>
                  </div>
                )}
              </div>
            </div>

            {personal.profileImage && (
              <img
                src={personal.profileImage}
                alt={personal.fullName}
                className="w-32 h-32 rounded border-2 object-cover"
                style={{ borderColor: theme?.accentColor || "#10B981" }}
              />
            )}
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Summary Section */}
        {data.sectionVisibility?.summary !== false && summary && (
          <div
            id="summary-section"
            onClick={() => onSectionClick("summary")}
            className="mb-6 cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
          >
            <h2
              className="text-xl font-mono font-bold mb-3 flex items-center gap-2"
              style={{ color: theme?.accentColor || "#10B981" }}
            >
              <span>{"// "}</span>
              <span>ABOUT</span>
            </h2>
            <p className="text-gray-300 leading-relaxed font-mono text-sm">
              {summary}
            </p>
          </div>
        )}

        {/* Skills Section - Code Block Style */}
        {data.sectionVisibility?.skills !== false &&
          skills &&
          skills.length > 0 && (
            <div
              id="skills-section"
              onClick={() => onSectionClick("skills")}
              className="mb-6 cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-mono font-bold mb-3 flex items-center gap-2"
                style={{ color: theme?.accentColor || "#10B981" }}
              >
                <span>{"// "}</span>
                <span>TECH_STACK</span>
              </h2>
              <div className="space-y-3">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="font-mono text-sm">
                    <span
                      className="font-bold"
                      style={{ color: theme?.primaryColor || "#F9FAFB" }}
                    >
                      const{" "}
                    </span>
                    <span
                      style={{ color: theme?.secondaryColor || "#D1D5DB" }}
                    >
                      {skillGroup.category.toLowerCase().replace(/\s+/g, "_")}
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: theme?.primaryColor || "#F9FAFB" }}
                    >
                      {" = "}
                    </span>
                    <span style={{ color: theme?.accentColor || "#10B981" }}>
                      [
                    </span>
                    <div className="ml-6 mt-1">
                      {skillGroup.items.map((skill, idx) => (
                        <div key={idx}>
                          <span className="text-yellow-400">"{skill}"</span>
                          {idx < skillGroup.items.length - 1 && (
                            <span className="text-gray-500">,</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <span style={{ color: theme?.accentColor || "#10B981" }}>
                      ];
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Experience Section */}
        {data.sectionVisibility?.experience !== false &&
          experience &&
          experience.length > 0 && (
            <div
              id="experience-section"
              onClick={() => onSectionClick("experience")}
              className="mb-6 cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-mono font-bold mb-3 flex items-center gap-2"
                style={{ color: theme?.accentColor || "#10B981" }}
              >
                <span>{"// "}</span>
                <span>EXPERIENCE</span>
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div
                    key={exp.id || index}
                    className="border-l-2 pl-4"
                    style={{ borderColor: theme?.accentColor || "#10B981" }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3
                          className="text-lg font-mono font-bold"
                          style={{ color: theme?.primaryColor || "#F9FAFB" }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="font-mono"
                          style={{ color: theme?.accentColor || "#10B981" }}
                        >
                          @ {exp.company}
                        </p>
                        <p className="text-sm text-gray-400 font-mono">
                          {exp.location}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 font-mono">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-300 mb-2 font-mono text-sm">
                        {exp.description}
                      </p>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 font-mono text-sm">
                        {exp.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-gray-300 flex items-start"
                          >
                            <span
                              className="mr-2"
                              style={{ color: theme?.accentColor || "#10B981" }}
                            >
                              {">"}{" "}
                            </span>
                            <span>{highlight}</span>
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
              className="mb-6 cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-mono font-bold mb-3 flex items-center gap-2"
                style={{ color: theme?.accentColor || "#10B981" }}
              >
                <span>{"// "}</span>
                <span>PROJECTS</span>
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="p-4 rounded border"
                    style={{
                      backgroundColor: "#1F2937",
                      borderColor: theme?.secondaryColor || "#4B5563",
                    }}
                  >
                    <h3
                      className="text-lg font-mono font-bold mb-2"
                      style={{ color: theme?.primaryColor || "#F9FAFB" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-gray-300 mb-2 font-mono text-sm">
                      {project.description}
                    </p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded text-xs font-mono"
                            style={{
                              backgroundColor: `${
                                theme?.accentColor || "#10B981"
                              }20`,
                              color: theme?.accentColor || "#10B981",
                              border: `1px solid ${
                                theme?.accentColor || "#10B981"
                              }`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <p
                        className="text-sm font-mono"
                        style={{ color: theme?.accentColor || "#10B981" }}
                      >
                        🔗 {project.link}
                      </p>
                    )}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="space-y-1 mt-2 font-mono text-sm">
                        {project.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-gray-300 flex items-start"
                          >
                            <span
                              className="mr-2"
                              style={{ color: theme?.accentColor || "#10B981" }}
                            >
                              {">"}{" "}
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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
              className="mb-6 cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-mono font-bold mb-3 flex items-center gap-2"
                style={{ color: theme?.accentColor || "#10B981" }}
              >
                <span>{"// "}</span>
                <span>EDUCATION</span>
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className="text-lg font-mono font-bold"
                          style={{ color: theme?.primaryColor || "#F9FAFB" }}
                        >
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-gray-300 font-mono">{edu.field}</p>
                        )}
                        <p
                          className="font-mono"
                          style={{ color: theme?.accentColor || "#10B981" }}
                        >
                          @ {edu.institution}
                        </p>
                        <p className="text-sm text-gray-400 font-mono">
                          {edu.location}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-400 font-mono">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-400 font-mono">
                        <Book className="w-4 h-4 mr-1" />
                        <span>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                    </div>
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="space-y-1 mt-2 font-mono text-sm">
                        {edu.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-gray-300 flex items-start"
                          >
                            <span
                              className="mr-2"
                              style={{ color: theme?.accentColor || "#10B981" }}
                            >
                              {">"}{" "}
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Bottom sections */}
        <div className="grid grid-cols-3 gap-6">
          {/* Certifications */}
          {data.sectionVisibility?.certifications !== false &&
            certifications &&
            certifications.length > 0 && (
              <div
                id="certifications-section"
                onClick={() => onSectionClick("certifications")}
                className="cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
              >
                <h2
                  className="text-base font-mono font-bold mb-3"
                  style={{ color: theme?.accentColor || "#10B981" }}
                >
                  {"// CERTS"}
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={cert.id || index} className="text-sm">
                      <div className="flex items-start gap-1">
                        <Award
                          className="w-4 h-4 mt-0.5"
                          style={{ color: theme?.accentColor || "#10B981" }}
                        />
                        <div>
                          <p className="font-mono text-gray-200">{cert.name}</p>
                          <p className="text-gray-400 text-xs font-mono">
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
                className="cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
              >
                <h2
                  className="text-base font-mono font-bold mb-3"
                  style={{ color: theme?.accentColor || "#10B981" }}
                >
                  {"// LANGS"}
                </h2>
                <div className="space-y-1">
                  {languages.map((lang, index) => (
                    <div key={lang.id || index} className="text-sm font-mono">
                      <span className="text-gray-200">{lang.language}</span>
                      <span className="text-gray-400"> • {lang.proficiency}</span>
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
                className="cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
              >
                <h2
                  className="text-base font-mono font-bold mb-3"
                  style={{ color: theme?.accentColor || "#10B981" }}
                >
                  {"// INTERESTS"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{
                        backgroundColor: `${theme?.accentColor || "#10B981"}20`,
                        color: theme?.accentColor || "#10B981",
                      }}
                    >
                      {interest}
                    </span>
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
              className="mt-6 cursor-pointer hover:bg-gray-800 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-mono font-bold mb-3 flex items-center gap-2"
                style={{ color: theme?.accentColor || "#10B981" }}
              >
                <span>{"// "}</span>
                <span>{section.title.toUpperCase()}</span>
              </h2>
              <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                {section.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TechTemplate;

