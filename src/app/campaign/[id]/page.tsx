
// "use client";

// import React, { useMemo, useState, useRef } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useFetchSingleCampaign, useFetchAllCampaigns } from "@/src/hooks/useCampaigns";
// import AnimatedProgressBar from "@/src/components/common/AnimatedProgressBar";
// import Button from "@/src/components/common/Buttons/Button";
// import DonationCard from "@/src/components/common/card/DonationCard";
// import FadeUpCard from "@/src/animations/FadeButtomUp";
// import { useInView } from "framer-motion";

// const CampaignDetails: React.FC = () => {
//   const params = useParams();
//   const id = Array.isArray(params.id) ? params.id[0] : params.id;
//   const router = useRouter();

//   if (!id) return <p>No campaign ID provided.</p>;

//   const { data, isLoading, isError } = useFetchSingleCampaign(id);

//   // ==== For showing all campaigns under details ====
//   const [page] = useState(1);
//   const { data: allCampaigns } = useFetchAllCampaigns(page, 6);
//   const sectionRef = useRef<HTMLElement>(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

//   const campaignsToDisplay = useMemo(() => {
//     if (!allCampaigns?.campaigns) return [];
//     return allCampaigns.campaigns.map((campaign: any) => ({
//       id: campaign._id || campaign.id,
//       image: campaign.images?.[0] || "/default-image.jpg",
//       category: campaign.category,
//       title: campaign.title,
//       description: campaign.description,
//       progress: (campaign.raisedAmount / campaign.goalAmount) * 100,
//       raised: `$${campaign.raisedAmount}`,
//       goal: `$${campaign.goalAmount}`,
//     }));
//   }, [allCampaigns]);

//   const handleCardClick = (cardId: string) => {
//     router.push(`/campaign/${cardId}`);
//   };

//   if (isLoading) return <p>Loading campaign details...</p>;
//   if (isError) return <p>Failed to load campaign details.</p>;
//   if (!data) return <p>No campaign found.</p>;

//   return (
//     <div className="container mx-auto py-10 px-4">
//       {/* === Campaign Details === */}
//       <div className="flex flex-col md:flex-row gap-10">
//         {/* Left Side: Image */}
//         <div className="w-full md:w-1/3 flex justify-center">
//           <img
//             src={data.images?.[0] || "/default-image.jpg"}
//             alt={data.title}
//             className="w-[350px] h-[400px] object-cover rounded-2xl shadow-md"
//           />
//         </div>

//         {/* Right Side: Details */}
//         <div className="w-full md:w-2/3">
//           <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
//           <p className="text-gray-600 mb-6">{data.description}</p>

//           <div className="bg-gray-100 p-4 rounded-lg mb-6">
//             <p><strong>Category:</strong> {data.category}</p>
//             <p><strong>Goal:</strong> ${data.goalAmount}</p>
//             <p><strong>Raised:</strong> ${data.raisedAmount}</p>
//           </div>

//           <div className="mb-6">
//             <p className="font-medium">Donation Collect</p>
//             <AnimatedProgressBar
//               progress={(data.raisedAmount / data.goalAmount) * 100}
//               isInView={true}
//             />
//           </div>

//           {data.keyPoints && data.keyPoints.length > 0 && (
//             <ul className="grid grid-cols-2 gap-2 my-6 text-sm">
//               {data.keyPoints.map((point: string, idx: number) => (
//                 <li key={idx} className="flex items-center gap-2">
//                   ✅ {point}
//                 </li>
//               ))}
//             </ul>
//           )}

//           <Button
//             text="Buy Now"
//             bgColor="bg-yellow-400"
//             textColor="text-black"
//             hoverTextColor="text-white"
//             hoverBg="before:bg-black"
//             rounded="rounded-full"
//             paddingx="px-6"
//             paddingy="py-3"
//             icon="→"
//           />
//         </div>
//       </div>

//       {/* === Other Campaigns Section === */}
//       <section ref={sectionRef} className="relative py-20">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
//               <span className="text-gray-800">More </span>
//               <span className="text-yellow-400">Campaigns</span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {campaignsToDisplay.map((card, index) => (
//               <FadeUpCard key={card.id || index} delay={index * 0.2}>
//                 <DonationCard
//                   card={card}
//                   isInView={isInView}
//                   hoveredCard={null}
//                   onMouseEnter={() => {}}
//                   onMouseLeave={() => {}}
//                   onCardClick={handleCardClick}
//                 />
//               </FadeUpCard>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CampaignDetails;

"use client";

import CampaignDetails from "@/src/components/campaign/CampaignDetails";

const CampaignPage = () => {
  return <CampaignDetails />;
};

export default CampaignPage;







