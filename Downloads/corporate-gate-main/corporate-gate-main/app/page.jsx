import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import GroupShowcase from "./_components/GroupShowcase";
import ResumeMakerSection from "./_components/ResumeMakerSection";
import ResumeAnalysis from "./_components/ResumeAnalysis";
import JobMatchingSection from "./_components/JobMatchingSection";
import AIInterviewSection from "./_components/AIInterviewSection";
import CategoriesSection from "./_components/CategoriesSection";
import Footer from "./_components/Footer";
import SkillAssessmentSection from "./_components/SkillAssessmentSection";
import LinkedInOptimizerSection from "./_components/LinkedInOptimizerSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-poppins">
      <main className="w-full overflow-x-hidden">
        <HeroSection />
        <GroupShowcase />
        <ResumeMakerSection />
        <ResumeAnalysis />
        <JobMatchingSection />
        <AIInterviewSection />
        <SkillAssessmentSection />
        <LinkedInOptimizerSection />
        <CategoriesSection />
      </main>
    </div>
  );
}


