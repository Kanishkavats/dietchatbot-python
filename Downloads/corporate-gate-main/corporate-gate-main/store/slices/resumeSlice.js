import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personal: {
    fullName: "John Doe",
    title: "Full-Stack Developer",
    email: "john.doe@email.com",
    phone: "+1 234-567-8900",
    location: "San Francisco, CA",
    website: "johndoe.dev",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    twitter: "",
    portfolio: "",
    profileImage: "",
  },

  summary:
    "Passionate Full-Stack Developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Proven track record of delivering high-quality solutions and leading development teams.",

  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    },
    { category: "Tools", items: ["Git", "Docker", "AWS", "CI/CD"] },
  ],

  experience: [
    {
      id: "exp1",
      company: "Tech Corp",
      role: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      description:
        "Lead developer for enterprise web applications serving 100k+ users.",
      highlights: [
        "Led team of 5 developers in migrating legacy system to modern React/Node.js stack",
        "Improved application performance by 40% through optimization techniques",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      id: "exp2",
      company: "StartUp Inc",
      role: "Full Stack Developer",
      location: "Remote",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      current: false,
      description: "Developed and maintained core features for SaaS platform.",
      highlights: [
        "Built real-time collaboration features using WebSockets",
        "Designed and implemented RESTful APIs serving mobile and web clients",
        "Reduced server costs by 30% through database optimization",
      ],
    },
  ],

  education: [
    {
      id: "edu1",
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2016",
      endDate: "2020",
      gpa: "3.8",
      highlights: [
        "Dean's List all semesters",
        "President of Computer Science Club",
      ],
    },
  ],

  projects: [
    {
      id: "proj1",
      name: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration and admin dashboard",
      techStack: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
      link: "github.com/johndoe/ecommerce",
      highlights: [
        "Processed over $1M in transactions",
        "Supports 10k+ concurrent users",
      ],
    },
    {
      id: "proj2",
      name: "Task Management App",
      description: "Real-time collaborative task management application",
      techStack: ["React", "Socket.io", "MongoDB"],
      link: "github.com/johndoe/taskapp",
      highlights: ["Used by 500+ teams", "Real-time updates and notifications"],
    },
  ],

  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "ABC123XYZ",
    },
  ],

  languages: [
    { id: "lang1", language: "English", proficiency: "Native" },
    { id: "lang2", language: "Spanish", proficiency: "Professional" },
  ],

  interests: ["Open Source", "Machine Learning", "Photography", "Travel"],

  // Template and theme settings
  selectedTemplate: "modern",
  theme: {
    primaryColor: "#134E4A", // Teal 900 - Deep teal
    secondaryColor: "#0F766E", // Teal 700 - Medium teal
    accentColor: "#14B8A6", // Teal 500 - Bright teal accent
  },
  customSectionModal: {
    open: false,
    data: null,
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    updatePersonal(state, action) {
      state.personal = { ...state.personal, ...action.payload };
    },
    updateSummary(state, action) {
      state.summary = action.payload;
    },
    updateSkills(state, action) {
      state.skills = action.payload;
    },
    addSkillCategory(state, action) {
      state.skills.push(action.payload);
    },
    removeSkillCategory(state, action) {
      state.skills = state.skills.filter(
        (_, index) => index !== action.payload
      );
    },
    updateExperience(state, action) {
      state.experience = action.payload;
    },
    addExperience(state, action) {
      state.experience.push({
        ...action.payload,
        id: `exp${Date.now()}`,
      });
    },
    updateExperienceItem(state, action) {
      const { id, data } = action.payload;
      const index = state.experience.findIndex((exp) => exp.id === id);
      if (index !== -1) {
        state.experience[index] = { ...state.experience[index], ...data };
      }
    },
    removeExperience(state, action) {
      state.experience = state.experience.filter(
        (exp) => exp.id !== action.payload
      );
    },
    updateEducation(state, action) {
      state.education = action.payload;
    },
    addEducation(state, action) {
      state.education.push({
        ...action.payload,
        id: `edu${Date.now()}`,
      });
    },
    updateEducationItem(state, action) {
      const { id, data } = action.payload;
      const index = state.education.findIndex((edu) => edu.id === id);
      if (index !== -1) {
        state.education[index] = { ...state.education[index], ...data };
      }
    },
    removeEducation(state, action) {
      state.education = state.education.filter(
        (edu) => edu.id !== action.payload
      );
    },
    updateProjects(state, action) {
      state.projects = action.payload;
    },
    addProject(state, action) {
      state.projects.push({
        ...action.payload,
        id: `proj${Date.now()}`,
      });
    },
    updateProjectItem(state, action) {
      const { id, data } = action.payload;
      const index = state.projects.findIndex((proj) => proj.id === id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...data };
      }
    },
    removeProject(state, action) {
      state.projects = state.projects.filter(
        (proj) => proj.id !== action.payload
      );
    },
    updateCertifications(state, action) {
      state.certifications = action.payload;
    },
    addCertification(state, action) {
      state.certifications.push({
        ...action.payload,
        id: `cert${Date.now()}`,
      });
    },
    removeCertification(state, action) {
      state.certifications = state.certifications.filter(
        (cert) => cert.id !== action.payload
      );
    },
    updateLanguages(state, action) {
      state.languages = action.payload;
    },
    updateInterests(state, action) {
      state.interests = action.payload;
    },
    updateSelectedTemplate(state, action) {
      state.selectedTemplate = action.payload;
    },
    updateTheme(state, action) {
      state.theme = { ...state.theme, ...action.payload };
    },
    resetResume() {
      console.log("reset");
      return initialState;
    },
    setCustomSectionModal(state, action) {
      state.customSectionModal = {
        ...state.customSectionModal,
        ...action.payload,
      };
    },
    toggleSectionVisibility: (state, action) => {
      const { section } = action.payload;
      if (!state.sectionVisibility) {
        state.sectionVisibility = {};
      }
      // Toggle visibility - default is true (visible)
      state.sectionVisibility[section] =
        state.sectionVisibility[section] === false ? true : false;
    },

    addCustomSection: (state, action) => {
      if (!state.customSections) {
        state.customSections = [];
      }
      state.customSections.push({
        id: `custom-${Date.now()}`,
        title: action.payload.title,
        description: action.payload.description,
        visible: true,
      });
    },

    updateCustomSection: (state, action) => {
      const { id, data } = action.payload;
      const index = state.customSections.findIndex((s) => s.id === id);
      if (index !== -1) {
        state.customSections[index] = {
          ...state.customSections[index],
          ...data,
        };
      }
    },

    removeCustomSection: (state, action) => {
      state.customSections = state.customSections.filter(
        (s) => s.id !== action.payload
      );
    },
  },
});

export const {
  updatePersonal,
  updateSummary,
  updateSkills,
  addSkillCategory,
  removeSkillCategory,
  updateExperience,
  addExperience,
  updateExperienceItem,
  removeExperience,
  updateEducation,
  addEducation,
  updateEducationItem,
  removeEducation,
  updateProjects,
  addProject,
  updateProjectItem,
  removeProject,
  updateCertifications,
  addCertification,
  removeCertification,
  updateLanguages,
  updateInterests,
  updateSelectedTemplate,
  updateTheme,
  resetResume,
  toggleSectionVisibility,
  addCustomSection,
  updateCustomSection,
  removeCustomSection,
  setCustomSectionModal,
} = resumeSlice.actions;

export default resumeSlice.reducer;
