"use client";
import Image, { StaticImageData } from "next/image";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import Comments from "./Comments";
import LeaveComment from "./LeaveComment";


interface CharityContentProps {
  charityId: number;
  blogId: string;
}

interface CharityData {
  title: string;
  description: string;
  summary: string;
  image: string;
  location: string;
  keyPoints: string[];
  createdDate: string;
}

const getCharityData = (id: number): CharityData => {
  const charityDataMap: Record<number, CharityData> = {
    1: {
      title: "Healthy Food Initiative",
      description: "Our Healthy Food Initiative is dedicated to providing nutritious meals to children in need. We believe that proper nutrition is fundamental to a child's physical and mental development. Through our comprehensive program, we ensure that every child has access to balanced, healthy meals that support their growth and learning.",
      summary: "We provide daily nutritious meals to over 10,000 children across 50 communities. Our program includes breakfast, lunch, and snacks that meet nutritional standards and dietary requirements. We work with local farmers and suppliers to source fresh, organic ingredients whenever possible.",
      image: "/assets/aboutsection/photo2.png",
      location: "Multiple Locations",
      keyPoints: [
        "Daily nutritious meals for 10,000+ children",
        "Fresh, organic ingredients from local farmers",
        "Nutritional education for families",
        "Regular health check-ups and monitoring",
        "Community kitchen programs",
        "Emergency food assistance during crises"
      ],
      createdDate: "2024-01-15"
    },
    2: {
      title: "Medical Care Program",
      description: "Our Medical Care Program provides essential healthcare services to children and families who cannot afford medical treatment. We operate mobile clinics, provide free medical consultations, and ensure access to life-saving medications and treatments.",
      summary: "We have established 25 medical centers and operate 15 mobile clinics that serve remote communities. Our program includes preventive care, emergency medical services, vaccination drives, and specialized treatments for chronic conditions.",
      image: "/assets/aboutsection/photo3.png",
      location: "25 Medical Centers",
      keyPoints: [
        "Free medical consultations and treatments",
        "Mobile clinics for remote areas",
        "Vaccination programs for children",
        "Emergency medical response",
        "Specialized care for chronic conditions",
        "Health education and awareness programs"
      ],
      createdDate: "2024-02-01"
    },
    3: {
      title: "Child Education Support",
      description: "Our Child Education Support program focuses on providing quality education to children from underprivileged backgrounds. We build schools, provide educational materials, train teachers, and create learning environments that inspire and empower young minds.",
      summary: "We have established 30 schools and learning centers that serve over 15,000 children. Our program includes primary and secondary education, vocational training, digital literacy programs, and scholarship opportunities for higher education.",
      image: "/assets/aboutsection/photo4.png",
      location: "30 Schools & Learning Centers",
      keyPoints: [
        "Free education for 15,000+ children",
        "Modern learning facilities and equipment",
        "Trained and qualified teachers",
        "Digital literacy and computer education",
        "Scholarship programs for higher education",
        "After-school tutoring and support"
      ],
      createdDate: "2024-01-20"
    }
  };

  return charityDataMap[id] || charityDataMap[3]; // Default to education
};

export default function CharityContent({ charityId, blogId }: CharityContentProps) {
  const charityData = getCharityData(charityId);

  return (
    <div>
      {/* Banner Image */}
      <div className="relative rounded-lg overflow-hidden h-48 sm:h-64 md:h-80 lg:h-96 w-full">
        <Image 
          src={charityData.image} 
          alt={charityData.title} 
          fill 
          className="object-cover" 
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-foreground mb-3 sm:mb-4 md:mb-6">
          <span className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
            <IoCalendarSharp className="text-yellow text-sm sm:text-base" /> {charityData.createdDate}
          </span>
          <span className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
            <IoLocationSharp className="text-yellow text-sm sm:text-base" /> {charityData.location}
          </span>
        </div>
        
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-3 sm:mb-4 md:mb-6 leading-tight font-nunito">
          {charityData.title}
        </h1>
        
        <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 font-nunito  font-normal text-xl sm:text-normal leading-relaxed">
          {charityData.description}
        </p>
        
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-foreground mb-2 sm:mb-3 md:mb-4 font-nunito">
          Summary
        </h2>
        
        <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 font-nunito text-xl sm:text-normal leading-relaxed">
          {charityData.summary}
        </p>
        
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-foreground font-nunito  font-bold mb-4 sm:mb-6 md:mb-8">
          {charityData.keyPoints.map((item: string, index: number) => (
            <div key={index} className="flex items-start gap-2 font-nunito text-xl sm:text-sm md:text-base">
              <FaRegCheckCircle className="text-green text-sm sm:text-lg md:text-xl flex-shrink-0 mt-0.5" /> 
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        {/* Two Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          <div className="relative rounded-lg overflow-hidden h-48 sm:h-64 md:h-80 w-full">
            <Image 
              src="/assets/charity_with_difference/pp-one.png" 
              alt="Charity Impact Image 1" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-48 sm:h-64 md:h-80 w-full">
            <Image 
              src="/assets/charity_with_difference/pp-two.png" 
              alt="Charity Impact Image 2" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6 sm:mt-8 md:mt-12">
        <Comments campaignId={blogId} />
      </div>

      {/* Leave Comment Section */}
      <div className="mt-4 sm:mt-6 md:mt-8">
        <LeaveComment blogId={blogId} />
      </div>
    </div>
  );
}
