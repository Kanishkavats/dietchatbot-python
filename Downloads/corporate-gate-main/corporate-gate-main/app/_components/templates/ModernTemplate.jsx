// ModernTemplate.jsx
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

const ModernTemplate = ({ data, onSectionClick }) => {
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
      className="bg-white shadow-xl rounded-lg overflow-hidden"
      style={{ width: "850px", minHeight: "1100px" }}
    >
      {/* Header Section */}
      {data.sectionVisibility?.personal !== false && personal && (
        <div
          id="personal-section"
          onClick={() => onSectionClick("personal")}
          className="text-white p-8 cursor-pointer hover:opacity-95 transition-opacity"
          style={{
            background: `linear-gradient(to right, ${
              theme?.primaryColor || "#1A202C"
            }, ${theme?.secondaryColor || "#4A5568"})`,
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{personal.fullName}</h1>
              <p
                className="text-xl mb-4"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {personal.title}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                {personal.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{personal.location}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm mt-2">
                {personal.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{personal.website}</span>
                  </div>
                )}
                {personal.linkedin && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="w-4 h-4" />
                    <span>{personal.linkedin}</span>
                  </div>
                )}
                {personal.github && (
                  <div className="flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    <span>{personal.github}</span>
                  </div>
                )}
              </div>
            </div>

            {personal.profileImage && (
              <img
                src={personal.profileImage}
                alt={personal.fullName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
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
            className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
          >
            <h2
              className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2 inline-block"
              style={{ borderColor: theme?.accentColor || "#3182CE" }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Skills Section */}
        {data.sectionVisibility?.skills !== false &&
          skills &&
          skills.length > 0 && (
            <div
              id="skills-section"
              onClick={() => onSectionClick("skills")}
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2 inline-block"
                style={{ borderColor: theme?.accentColor || "#3182CE" }}
              >
                Technical Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="flex flex-wrap">
                    <span className="font-semibold text-gray-700 min-w-[120px]">
                      {skillGroup.category}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: `${
                              theme?.accentColor || "#3182CE"
                            }20`,
                            color: theme?.accentColor || "#3182CE",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2 inline-block"
                style={{ borderColor: theme?.accentColor || "#3182CE" }}
              >
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div
                    key={exp.id || index}
                    className="border-l-2 border-gray-200 pl-4 ml-2"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{ color: theme?.primaryColor || "#1A202C" }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="font-medium"
                          style={{ color: theme?.accentColor || "#3182CE" }}
                        >
                          {exp.company}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: theme?.secondaryColor || "#4A5568" }}
                        >
                          {exp.location}
                        </p>
                      </div>
                      <div
                        className="flex items-center text-sm"
                        style={{ color: theme?.secondaryColor || "#4A5568" }}
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-2">{exp.description}</p>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
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

        {/* Education Section */}
        {data.sectionVisibility?.education !== false &&
          education &&
          education.length > 0 && (
            <div
              id="education-section"
              onClick={() => onSectionClick("education")}
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2 inline-block"
                style={{ borderColor: theme?.accentColor || "#3182CE" }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={edu.id || index}
                    className="border-l-2 border-gray-200 pl-4 ml-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{ color: theme?.primaryColor || "#1A202C" }}
                        >
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-gray-700">{edu.field}</p>
                        )}
                        <p
                          className="font-medium"
                          style={{ color: theme?.accentColor || "#3182CE" }}
                        >
                          {edu.institution}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: theme?.secondaryColor || "#4A5568" }}
                        >
                          {edu.location}
                        </p>
                        {edu.gpa && (
                          <p
                            className="text-sm"
                            style={{
                              color: theme?.secondaryColor || "#4A5568",
                            }}
                          >
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <div
                        className="flex items-center text-sm"
                        style={{ color: theme?.secondaryColor || "#4A5568" }}
                      >
                        <Book className="w-4 h-4 mr-1" />
                        <span>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                    </div>
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
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
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2 inline-block"
                style={{ borderColor: theme?.accentColor || "#3182CE" }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="border-l-2 pl-4 ml-2"
                    style={{ borderColor: theme?.secondaryColor || "#4A5568" }}
                  >
                    <h3
                      className="text-lg font-bold"
                      style={{ color: theme?.primaryColor || "#1A202C" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
                      <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
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

        {/* Bottom Row - Certifications, Languages, Interests */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Certifications */}
          {data.sectionVisibility?.certifications !== false &&
            certifications &&
            certifications.length > 0 && (
              <div
                id="certifications-section"
                onClick={() => onSectionClick("certifications")}
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
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
                          <p className="font-medium text-gray-800">
                            {cert.name}
                          </p>
                          <p className="text-gray-600">
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
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
                  Languages
                </h2>
                <div className="space-y-1">
                  {languages.map((lang, index) => (
                    <div key={lang.id || index} className="text-sm">
                      <span className="font-medium text-gray-800">
                        {lang.language}
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        • {lang.proficiency}
                      </span>
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
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
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
              className="mb-6 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
            >
              <h2
                className="text-xl font-bold text-gray-800 mb-3 border-b-2 pb-2"
                style={{ borderColor: theme?.accentColor || "#3182CE" }}
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

export default ModernTemplate;
