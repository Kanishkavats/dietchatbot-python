// MinimalistTemplate.jsx - Clean and Simple Design
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

const MinimalistTemplate = ({ data, onSectionClick }) => {
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
      {/* Header Section - Minimalist */}
      {data.sectionVisibility?.personal !== false && personal && (
        <div
          id="personal-section"
          onClick={() => onSectionClick("personal")}
          className="p-10 cursor-pointer hover:bg-gray-50 transition-colors border-b"
          style={{ borderColor: theme?.primaryColor || "#000000" }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1
                className="text-5xl font-light mb-2 tracking-tight"
                style={{ color: theme?.primaryColor || "#000000" }}
              >
                {personal.fullName}
              </h1>
              <p
                className="text-xl mb-6 font-light"
                style={{ color: theme?.secondaryColor || "#666666" }}
              >
                {personal.title}
              </p>

              <div className="space-y-1 text-sm text-gray-700">
                {personal.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{personal.location}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{personal.website}</span>
                  </div>
                )}
                {personal.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span>{personal.linkedin}</span>
                  </div>
                )}
                {personal.github && (
                  <div className="flex items-center gap-2">
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
                className="w-32 h-32 object-cover grayscale"
              />
            )}
          </div>
        </div>
      )}

      <div className="px-10 py-8">
        {/* Summary Section */}
        {data.sectionVisibility?.summary !== false && summary && (
          <div
            id="summary-section"
            onClick={() => onSectionClick("summary")}
            className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
          >
            <h2
              className="text-xl font-light mb-3 pb-2 border-b"
              style={{
                color: theme?.primaryColor || "#000000",
                borderColor: theme?.secondaryColor || "#E5E5E5",
              }}
            >
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed font-light">{summary}</p>
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
                className="text-xl font-light mb-4 pb-2 border-b"
                style={{
                  color: theme?.primaryColor || "#000000",
                  borderColor: theme?.secondaryColor || "#E5E5E5",
                }}
              >
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id || index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3
                          className="text-lg font-normal"
                          style={{ color: theme?.primaryColor || "#000000" }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="font-light"
                          style={{ color: theme?.secondaryColor || "#666666" }}
                        >
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-500 font-light">
                          {exp.location}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 font-light">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-2 font-light">
                        {exp.description}
                      </p>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 ml-4">
                        {exp.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-700 font-light flex items-start"
                          >
                            <span className="mr-2">–</span>
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
                className="text-xl font-light mb-4 pb-2 border-b"
                style={{
                  color: theme?.primaryColor || "#000000",
                  borderColor: theme?.secondaryColor || "#E5E5E5",
                }}
              >
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="flex">
                    <span
                      className="font-normal min-w-[140px]"
                      style={{ color: theme?.primaryColor || "#000000" }}
                    >
                      {skillGroup.category}
                    </span>
                    <span className="text-gray-700 font-light">
                      {skillGroup.items.join(", ")}
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
                className="text-xl font-light mb-4 pb-2 border-b"
                style={{
                  color: theme?.primaryColor || "#000000",
                  borderColor: theme?.secondaryColor || "#E5E5E5",
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
                          className="text-lg font-normal"
                          style={{ color: theme?.primaryColor || "#000000" }}
                        >
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-gray-700 font-light">{edu.field}</p>
                        )}
                        <p
                          className="font-light"
                          style={{ color: theme?.secondaryColor || "#666666" }}
                        >
                          {edu.institution}
                        </p>
                        <p className="text-sm text-gray-500 font-light">
                          {edu.location}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-500 font-light">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 font-light">
                        {edu.startDate} – {edu.endDate}
                      </div>
                    </div>
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="space-y-1 mt-2 ml-4">
                        {edu.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-700 font-light flex items-start"
                          >
                            <span className="mr-2">–</span>
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
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-xl font-light mb-4 pb-2 border-b"
                style={{
                  color: theme?.primaryColor || "#000000",
                  borderColor: theme?.secondaryColor || "#E5E5E5",
                }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id || index}>
                    <h3
                      className="text-lg font-normal"
                      style={{ color: theme?.primaryColor || "#000000" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-2 font-light">
                      {project.description}
                    </p>
                    {project.techStack && project.techStack.length > 0 && (
                      <p className="text-sm text-gray-600 mb-2 font-light">
                        {project.techStack.join(" • ")}
                      </p>
                    )}
                    {project.link && (
                      <p
                        className="text-sm font-light"
                        style={{ color: theme?.secondaryColor || "#666666" }}
                      >
                        {project.link}
                      </p>
                    )}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="space-y-1 mt-2 ml-4">
                        {project.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-700 font-light flex items-start"
                          >
                            <span className="mr-2">–</span>
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
        <div className="grid grid-cols-3 gap-8">
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
                  className="text-base font-normal mb-3 pb-1 border-b"
                  style={{
                    color: theme?.primaryColor || "#000000",
                    borderColor: theme?.secondaryColor || "#E5E5E5",
                  }}
                >
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={cert.id || index} className="text-sm">
                      <p className="font-normal text-gray-800">{cert.name}</p>
                      <p className="text-gray-600 text-xs font-light">
                        {cert.issuer}
                      </p>
                      <p className="text-gray-500 text-xs font-light">
                        {cert.date}
                      </p>
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
                  className="text-base font-normal mb-3 pb-1 border-b"
                  style={{
                    color: theme?.primaryColor || "#000000",
                    borderColor: theme?.secondaryColor || "#E5E5E5",
                  }}
                >
                  Languages
                </h2>
                <div className="space-y-1">
                  {languages.map((lang, index) => (
                    <div key={lang.id || index} className="text-sm">
                      <span className="font-normal text-gray-800">
                        {lang.language}
                      </span>
                      <span className="text-gray-600 font-light">
                        {" "}
                        – {lang.proficiency}
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
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
              >
                <h2
                  className="text-base font-normal mb-3 pb-1 border-b"
                  style={{
                    color: theme?.primaryColor || "#000000",
                    borderColor: theme?.secondaryColor || "#E5E5E5",
                  }}
                >
                  Interests
                </h2>
                <div className="space-y-1">
                  {interests.map((interest, index) => (
                    <p key={index} className="text-sm text-gray-700 font-light">
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
                className="text-xl font-light mb-3 pb-2 border-b"
                style={{
                  color: theme?.primaryColor || "#000000",
                  borderColor: theme?.secondaryColor || "#E5E5E5",
                }}
              >
                {section.title}
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap font-light">
                {section.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MinimalistTemplate;

