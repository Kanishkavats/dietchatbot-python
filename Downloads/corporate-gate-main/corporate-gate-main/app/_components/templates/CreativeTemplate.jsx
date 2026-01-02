// CreativeTemplate.jsx - Bold and Creative Design
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
  Sparkles,
} from "lucide-react";
import { setCustomSectionModal } from "@/store/slices/resumeSlice";
import { useDispatch } from "react-redux";

const CreativeTemplate = ({ data, onSectionClick }) => {
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
      className="bg-white shadow-xl overflow-hidden"
      style={{ width: "850px", minHeight: "1100px" }}
    >
      {/* Header Section - Creative with diagonal design */}
      {data.sectionVisibility?.personal !== false && personal && (
        <div
          id="personal-section"
          onClick={() => onSectionClick("personal")}
          className="relative p-10 cursor-pointer hover:opacity-95 transition-opacity overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${
              theme?.primaryColor || "#6B46C1"
            } 0%, ${theme?.secondaryColor || "#9F7AEA"} 50%, ${
              theme?.accentColor || "#D6BCFA"
            } 100%)`,
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 bg-white -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20 bg-white -ml-24 -mb-24"></div>

          <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
                {personal.fullName}
              </h1>
              <p className="text-2xl text-white/90 mb-6 font-light italic">
                {personal.title}
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm text-white/90">
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
                className="w-36 h-36 rounded-full border-4 border-white shadow-2xl object-cover"
              />
            )}
          </div>
        </div>
      )}

      <div className="p-10">
        {/* Summary Section */}
        {data.sectionVisibility?.summary !== false && summary && (
          <div
            id="summary-section"
            onClick={() => onSectionClick("summary")}
            className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles
                className="w-6 h-6"
                style={{ color: theme?.accentColor || "#9F7AEA" }}
              />
              <h2
                className="text-2xl font-black"
                style={{ color: theme?.primaryColor || "#6B46C1" }}
              >
                About Me
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed pl-8">{summary}</p>
          </div>
        )}

        {/* Skills Section - Creative pill design */}
        {data.sectionVisibility?.skills !== false &&
          skills &&
          skills.length > 0 && (
            <div
              id="skills-section"
              onClick={() => onSectionClick("skills")}
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-black mb-4"
                style={{ color: theme?.primaryColor || "#6B46C1" }}
              >
                Skills & Expertise
              </h2>
              <div className="space-y-4">
                {skills.map((skillGroup, index) => (
                  <div key={index}>
                    <h3
                      className="font-bold text-base mb-2"
                      style={{ color: theme?.secondaryColor || "#9F7AEA" }}
                    >
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${
                              theme?.primaryColor || "#6B46C1"
                            }, ${theme?.accentColor || "#9F7AEA"})`,
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
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-black mb-4"
                style={{ color: theme?.primaryColor || "#6B46C1" }}
              >
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={exp.id || index}
                    className="relative pl-6 border-l-4"
                    style={{ borderColor: theme?.accentColor || "#D6BCFA" }}
                  >
                    <div
                      className="absolute -left-2 top-0 w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme?.primaryColor || "#6B46C1" }}
                    ></div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{ color: theme?.primaryColor || "#6B46C1" }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="font-semibold"
                          style={{ color: theme?.secondaryColor || "#9F7AEA" }}
                        >
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
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

        {/* Projects Section */}
        {data.sectionVisibility?.projects !== false &&
          projects &&
          projects.length > 0 && (
            <div
              id="projects-section"
              onClick={() => onSectionClick("projects")}
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-black mb-4"
                style={{ color: theme?.primaryColor || "#6B46C1" }}
              >
                Featured Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: `${theme?.accentColor || "#D6BCFA"}20`,
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: theme?.primaryColor || "#6B46C1" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white rounded text-xs font-medium"
                            style={{ color: theme?.primaryColor || "#6B46C1" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <p
                        className="text-sm font-semibold"
                        style={{ color: theme?.secondaryColor || "#9F7AEA" }}
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

        {/* Education Section */}
        {data.sectionVisibility?.education !== false &&
          education &&
          education.length > 0 && (
            <div
              id="education-section"
              onClick={() => onSectionClick("education")}
              className="mb-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-black mb-4"
                style={{ color: theme?.primaryColor || "#6B46C1" }}
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
                          style={{ color: theme?.primaryColor || "#6B46C1" }}
                        >
                          {edu.degree}
                        </h3>
                        {edu.field && <p className="text-gray-700">{edu.field}</p>}
                        <p
                          className="font-semibold"
                          style={{ color: theme?.secondaryColor || "#9F7AEA" }}
                        >
                          {edu.institution}
                        </p>
                        <p className="text-sm text-gray-600">{edu.location}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
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

        {/* Bottom sections */}
        <div className="grid grid-cols-3 gap-6">
          {/* Certifications */}
          {data.sectionVisibility?.certifications !== false &&
            certifications &&
            certifications.length > 0 && (
              <div
                id="certifications-section"
                onClick={() => onSectionClick("certifications")}
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
              >
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ color: theme?.primaryColor || "#6B46C1" }}
                >
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={cert.id || index} className="text-sm">
                      <div className="flex items-start gap-1">
                        <Award
                          className="w-4 h-4 mt-0.5"
                          style={{ color: theme?.accentColor || "#9F7AEA" }}
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
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
              >
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ color: theme?.primaryColor || "#6B46C1" }}
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
                className="cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
              >
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ color: theme?.primaryColor || "#6B46C1" }}
                >
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${theme?.accentColor || "#D6BCFA"}40`,
                        color: theme?.primaryColor || "#6B46C1",
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
              className="mt-8 cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-lg transition-colors"
            >
              <h2
                className="text-2xl font-black mb-3"
                style={{ color: theme?.primaryColor || "#6B46C1" }}
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

export default CreativeTemplate;

