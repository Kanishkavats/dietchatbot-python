// // "use client";

// // import React from "react";
// // import DonationCard from "../common/card/DonationCard";

// // interface DynamicDonationCardsProps {
// //   campaigns: any[]; // Backend se aane wali campaigns array
// //   maxCards?: number; // Optional: kitne cards show karne hai
// // }

// // const DynamicDonationCards: React.FC<DynamicDonationCardsProps> = ({
// //   campaigns,
// //   maxCards = 3, // Default 3 cards
// // }) => {
// //   if (!campaigns || campaigns.length === 0) return null;

// //   return (
// //     <div className="flex flex-col gap-8">
// //       {campaigns.slice(0, maxCards).map((campaign) => (
// //         <DonationCard
// //           key={campaign._id || campaign.id}
// //           backgroundImage={campaign.images?.[0] || "/default-image.jpg"}
// //           subtitle={campaign.category}
// //           title={campaign.title}
// //           buttonText="Donate Now"
// //           onButtonClick={() => {
// //             window.location.href = `/campaign/${campaign._id || campaign.id}`;
// //           }}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default DynamicDonationCards;



// "use client";

// import React from "react";
// import DonationCard from "../common/card/DonationCard";

// interface DynamicDonationCardsProps {
//   campaigns: any[]; // Backend se aane wali campaigns
//   maxCards?: number; // Kitne cards show karne hain (default 3)
// }

// const DynamicDonationCards: React.FC<DynamicDonationCardsProps> = ({
//   campaigns,
//   maxCards = 3,
// }) => {
//   if (!campaigns || campaigns.length === 0) return null;

//   return (
//     <div className="flex flex-col gap-8">
//       {campaigns.slice(0, maxCards).map((campaign) => (
//         <DonationCard
//          ={c keyampaign._id || campaign.id}
//           backgroundImage={campaign.images?.[0] || "/default-image.jpg"} // Dynamic background
//           subtitle={campaign.category || "No Category"}               // Dynamic subtitle
//           title={campaign.title || "Untitled Campaign"}               // Dyna
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default DynamicDonationCards;





"use client";
import React from "react";
import Image from "next/image";
import Button from "../common/Buttons/Button";
import { DonationCardProps } from "@/src/types/donateUs";
import FadeInUp from "@/src/animations/FadeInUp";

const DonationCard: React.FC<DonationCardProps> = ({
  icon,
  subtitle,
  title,
  buttonText,
  onButtonClick,
  backgroundImage,
}) => {
  return (
    <FadeInUp className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center text-center">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
    
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* ✅ Content */}
      <div className="relative z-10 text-white p-6 flex flex-col items-center justify-center space-y-5">
        {/* Icon */}
        {icon && (
          <div className="mb-7 w-20 h-20 relative">
            <Image src={icon} alt="Card Icon" fill className="object-contain" />
          </div>
        )}

        {/* Subtitle */}
        <p className="text-sm text-gray-200 mb-2">{subtitle}</p>

        {/* Title */}
        <h3 className="text-3xl font-bold leading-snug mb-12">{title}</h3>

        {/* Button */}
        <div className="w-fit">
          <Button text={buttonText} onClick={onButtonClick} />
        </div>
      </div>
    </FadeInUp>
  );
};

export default DonationCard;


