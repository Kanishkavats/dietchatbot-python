"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../_components/Header";

const JOBS = {
  1: {
    id: 1,
    title: "Software Engineer",
    company: "Linear company",
    companyLogo: "https://assets.pipedream.net/s.v0/app_XaLh08/logo/orig",
    website: "https://linear.app",
    location: "Brussels, Belgium",
    workplace: "Hybrid",
    type: "Full time",
    salary: "50-55k",
    postedAt: "29 min ago",
    experience: "2-4 years",
    openings: 3,
    skills: ["React", "TypeScript", "Node.js", "REST APIs", "CI/CD"],
    description:
      "Build, ship, and maintain product features end-to-end with a world-class engineering team. Collaborate closely with design and product to deliver high-quality experiences.",
    responsibilities: [
      "Design, build, and maintain scalable frontend features using React and TypeScript",
      "Collaborate with product, design, and backend engineers to ship features",
      "Write high-quality, testable code and participate in code reviews",
      "Improve performance and reliability across the stack",
      "Contribute to internal tooling, developer experience, and CI/CD",
    ],
    requirements: [
      "2+ years of professional software engineering experience",
      "Strong proficiency with React and modern JavaScript/TypeScript",
      "Experience with API design and integration",
      "Solid understanding of testing and code quality",
      "Ability to work in a fast-paced, product-focused environment",
    ],
    benefits: [
      "Competitive salary and stock options",
      "Health insurance and wellness stipend",
      "Flexible working hours and hybrid work policy",
      "Learning budget and conference allowance",
      "Top-notch gear and tools",
    ],
  },
  2: {
    id: 2,
    title: "Junior UI Designer",
    company: "Notion",
    companyLogo: "https://business.yell.com/tachyon/2020/07/Notion-a-free-productivity-app.png",
    website: "https://notion.so",
    location: "Madrid, Spain",
    workplace: "On-site",
    type: "Full time",
    salary: "30-32k",
    postedAt: "1 day ago",
    experience: "0-2 years",
    openings: 1,
    skills: ["Figma", "Prototyping", "UX", "Visual design", "User research"],
    description:
      "Create delightful, accessible interfaces and collaborate with cross-functional teams to build thoughtful product experiences.",
    responsibilities: [
      "Support product designers with wireframes, prototypes, and specs",
      "Collaborate with engineers to ensure implementation quality",
      "Contribute to design reviews and user testing",
      "Maintain and extend design systems and components",
    ],
    requirements: [
      "Strong portfolio showcasing product design work",
      "Experience with Figma and prototyping tools",
      "Understanding of usability and accessibility principles",
      "Excellent communication and collaboration skills",
    ],
    benefits: [
      "Health coverage",
      "Learning stipend",
      "Great office setup",
      "Catered lunches",
    ],
  },
  3: {
    id: 3,
    title: "Technical Support Engineer",
    company: "Spline studio",
    companyLogo:
      "https://cdn-1.webcatalog.io/catalog/spline/spline-icon-filled-256.png?v=1675594530708",
    website: "https://spline.design",
    location: "United States",
    workplace: "Remote",
    type: "Full time",
    salary: "50-52k",
    postedAt: "1 day ago",
    experience: "2+ years",
    openings: 2,
    skills: ["Customer support", "JavaScript", "3D tooling", "Docs"],
    description:
      "Help users succeed with Spline by solving issues, improving docs, and building tooling that makes support fast and delightful.",
    responsibilities: [
      "Investigate and resolve user-reported issues",
      "Create and maintain documentation and tutorials",
      "Collaborate with engineering to triage and fix bugs",
      "Identify trends and propose product improvements",
    ],
    requirements: [
      "Experience in technical support or developer experience",
      "Good debugging and communication skills",
      "JavaScript familiarity; 3D/webGL a plus",
    ],
    benefits: ["Remote-first", "Wellness stipend", "Learning budget"],
  },
};

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const job = useMemo(() => JOBS[Number(id)], [id]);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#fafafa] font-dm-sans">
        <Header />
        <div className="max-w-5xl mx-auto p-6">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-700">Job not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-dm-sans">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-4">
            <button
              onClick={() => window.open(job.website, "_blank")}
              className="hidden sm:block"
              title="Open company website"
            >
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="w-14 h-14 rounded-xl object-cover border border-gray-200 cursor-pointer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </button>
            <div className="flex-1">
              {/* Mobile: logo + job title in one line */}
              <div className="sm:hidden flex items-center gap-2 mb-2">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-8 h-8 rounded-lg object-cover border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="text-lg font-bold text-gray-800">{job.title}</span>
              </div>
              {/* Desktop/Tablet title */}
              <h1 className="hidden sm:block text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <button
                  onClick={() => window.open(job.website, "_blank")}
                  className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                  title="Open company website"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 11-12 0 6 6 0 0112 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35"/></svg>
                  {job.company}
                </button>
                <span className="px-2 py-1 bg-gray-100 rounded-md inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {job.location}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-md inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.5 21a6.5 6.5 0 0113 0"/></svg>
                  {job.workplace}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-md inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M9 8h6M5 6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6z"/></svg>
                  {job.type}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-md inline-flex items-center gap-1">
                  <span className="text-gray-700 font-medium">₹</span>
                  {job.salary}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-md inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22a10 10 0 100-20 10 10 0 000 20z"/></svg>
                  {job.experience}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-md inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  {job.postedAt}
                </span>
              </div>
              {/* Mobile actions directly below chips */}
              <div className="md:hidden mt-3 flex items-center gap-2">
                <button
                  onClick={() => setSaved((s) => !s)}
                  className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  title={saved ? "Saved" : "Save Job"}
                >
                  <svg className="w-5 h-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: job.title, text: `${job.title} at ${job.company}`, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  title="Share"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4m0 0L8 6m4-4v12" />
                  </svg>
                </button>
                <button className="bg-[#345773] text-white px-4 py-2 rounded-lg hover:bg-[#2a4560] transition-colors cursor-pointer">
                  Apply Now
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSaved((s) => !s)}
                className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                title={saved ? "Saved" : "Save Job"}
              >
                <svg className="w-5 h-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: job.title, text: `${job.title} at ${job.company}`, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                title="Share"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4m0 0L8 6m4-4v12" />
                </svg>
              </button>
              <button className="bg-[#345773] text-white px-5 py-2 rounded-lg hover:bg-[#2a4560] transition-colors cursor-pointer">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Job Overview</h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities?.length ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Requirements */}
            {job.requirements?.length ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {job.requirements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Skills */}
            {job.skills?.length ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Benefits */}
            {job.benefits?.length ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits</h3>
                <ul className="list-disc list-inside text-gray-700 columns-1 sm:columns-2 [column-fill:_balance]
                                *:mb-2 [li]:break-inside-avoid">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Right: sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Company</span>
                  <button
                    className="text-[#345773] hover:underline cursor-pointer"
                    onClick={() => window.open(job.website, "_blank")}
                  >
                    {job.company}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Location</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Workplace</span>
                  <span>{job.workplace}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Type</span>
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Experience</span>
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Openings</span>
                  <span>{job.openings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Compensation</span>
                  <span>₹{job.salary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Posted</span>
                  <span>{job.postedAt}</span>
                </div>
              </div>
              <button
                onClick={() => alert("Thanks for your feedback. We'll review this job.")}
                className="mt-4 text-xs text-gray-500 underline cursor-pointer self-start"
              >
                Report this job
              </button>
              {/* Removed Apply/Company Website from job details card as requested */}
            </div>

            {/* Company */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About {job.company}</h3>
              <div className="flex items-center gap-3 mb-3">
                <button onClick={() => window.open(job.website, "_blank")} title="Open company website">
                  <img src={job.companyLogo} alt={`${job.company} logo`} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" onError={(e)=>{e.currentTarget.style.display='none';}} />
                </button>
                <div className="text-sm">
                  <button onClick={() => window.open(job.website, "_blank")} className="font-medium text-gray-800 hover:underline cursor-pointer" title="Open company website">
                    {job.company}
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-sm">We focus on building world-class products and delivering delightful experiences for our users. Join a team that values quality, impact, and collaboration.</p>
            </div>

            {/* Similar jobs (static sample) */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Similar Jobs</h3>
              <div className="space-y-3 text-sm">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => router.push(`/job/${((Number(id) + n - 1) % 3) + 1}`)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-gray-800">{job.title}</div>
                    <div className="text-gray-600">{job.company} • {job.location}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile apply bar removed; actions shown near top for mobile */}
    </div>
  );
}
