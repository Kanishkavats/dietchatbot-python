// AcademicTemplate.jsx - Academic/Research Style
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

const AcademicTemplate = ({ data, onSectionClick }) => {
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
      {/* Header Section - Academic Style */}
      {data.sectionVisibility?.personal !== false && personal && (
        <div
          id="personal-section"
          onClick={() => onSectionClick("personal")}
          className="p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors border-b-2"
          style={{ borderColor: theme?.primaryColor || "#2C5282" }}
        >
          <div className="flex flex-col items-center">
            {personal.profileImage && (
              <img
                src={personal.profileImage}
                alt={personal.fullName}
                className="w-28 h-28 rounded-full border-2 object-cover mb-4"
                style={{ borderColor: theme?.primaryColor || "#2C5282" }}
              />
            )}

            <h1
              className="text-4xl font-serif font-bold mb-2"
              style={{ color: theme?.primaryColor || "#2C5282" }}
            >
              {personal.fullName}
            </h1>
            <p
              className="text-lg mb-4 font-serif italic"
              style={{ color: theme?.secondaryColor || "#4A5568" }}
            >
              {personal.title}
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700">
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

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700 mt-2">
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
        </div>
      )}

      <div className="px-10 py-6">
        {/* Summary Section */}
        {data.sectionVisibility?.summary !== false && summary && (
          <div
            id="summary-section"
            onClick={() => onSectionClick("summary")}
            className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
          >
            <h2
              className="text-lg font-serif font-bold mb-3 text-center uppercase"
              style={{ color: theme?.primaryColor || "#2C5282" }}
            >
              Research Interests / Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Education Section - Priority for Academic */}
        {data.sectionVisibility?.education !== false &&
          education &&
          education.length > 0 && (
            <div
              id="education-section"
              onClick={() => onSectionClick("education")}
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-lg font-serif font-bold mb-3 text-center uppercase"
                style={{ color: theme?.primaryColor || "#2C5282" }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h3
                          className="text-base font-bold"
                          style={{ color: theme?.primaryColor || "#2C5282" }}
                        >
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-gray-700 italic">{edu.field}</p>
                        )}
                        <p
                          className="font-semibold"
                          style={{ color: theme?.accentColor || "#3182CE" }}
                        >
                          {edu.institution}
                        </p>
                        <p className="text-sm text-gray-600">{edu.location}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mb-2">GPA: {edu.gpa}</p>
                    )}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
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

        {/* Experience Section */}
        {data.sectionVisibility?.experience !== false &&
          experience &&
          experience.length > 0 && (
            <div
              id="experience-section"
              onClick={() => onSectionClick("experience")}
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-lg font-serif font-bold mb-3 text-center uppercase"
                style={{ color: theme?.primaryColor || "#2C5282" }}
              >
                Research & Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id || index} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h3
                          className="text-base font-bold"
                          style={{ color: theme?.primaryColor || "#2C5282" }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="font-semibold"
                          style={{ color: theme?.accentColor || "#3182CE" }}
                        >
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
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

        {/* Projects Section - Research Projects */}
        {data.sectionVisibility?.projects !== false &&
          projects &&
          projects.length > 0 && (
            <div
              id="projects-section"
              onClick={() => onSectionClick("projects")}
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-lg font-serif font-bold mb-3 text-center uppercase"
                style={{ color: theme?.primaryColor || "#2C5282" }}
              >
                Research Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id || index} className="pb-4 border-b border-gray-200 last:border-0">
                    <h3
                      className="text-base font-bold"
                      style={{ color: theme?.primaryColor || "#2C5282" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-2 text-justify">
                      {project.description}
                    </p>
                    {project.techStack && project.techStack.length > 0 && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Methods/Tools:</span>{" "}
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

        {/* Skills Section */}
        {data.sectionVisibility?.skills !== false &&
          skills &&
          skills.length > 0 && (
            <div
              id="skills-section"
              onClick={() => onSectionClick("skills")}
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-lg font-serif font-bold mb-3 text-center uppercase"
                style={{ color: theme?.primaryColor || "#2C5282" }}
              >
                Technical Skills & Competencies
              </h2>
              <div className="space-y-2">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="flex">
                    <span
                      className="font-semibold min-w-[150px]"
                      style={{ color: theme?.primaryColor || "#2C5282" }}
                    >
                      {skillGroup.category}:
                    </span>
                    <span className="text-gray-700">
                      {skillGroup.items.join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Certifications */}
        {data.sectionVisibility?.certifications !== false &&
          certifications &&
          certifications.length > 0 && (
            <div
              id="certifications-section"
              onClick={() => onSectionClick("certifications")}
              className="mb-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-lg font-serif font-bold mb-3 text-center uppercase"
                style={{ color: theme?.primaryColor || "#2C5282" }}
              >
                Certifications & Awards
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={cert.id || index} className="flex items-start gap-2">
                    <Award
                      className="w-5 h-5 mt-0.5"
                      style={{ color: theme?.accentColor || "#3182CE" }}
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{cert.name}</p>
                      <p className="text-sm text-gray-600">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Bottom sections */}
        <div className="grid grid-cols-2 gap-6">
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
                  className="text-base font-serif font-bold mb-3 uppercase"
                  style={{ color: theme?.primaryColor || "#2C5282" }}
                >
                  Languages
                </h2>
                <div className="space-y-1">
                  {languages.map((lang, index) => (
                    <div key={lang.id || index} className="text-sm">
                      <span className="font-semibold text-gray-800">
                        {lang.language}:
                      </span>
                      <span className="text-gray-600"> {lang.proficiency}</span>
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
                  className="text-base font-serif font-bold mb-3 uppercase"
                  style={{ color: theme?.primaryColor || "#2C5282" }}
                >
                  Interests
                </h2>
                <div className="space-y-1">
                  {interests.map((interest, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      • {interest}
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
              className="mt-6 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded transition-colors"
            >
              <h2
                className="text-lg font-serif font-bold mb-3 text-center uppercase"
                style={{ color: theme?.primaryColor || "#2C5282" }}
              >
                {section.title}
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap text-justify">
                {section.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AcademicTemplate;

