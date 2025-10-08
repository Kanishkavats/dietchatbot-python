/* eslint-disable react/no-unescaped-entities */
// "use client";

// import React from "react";
// import Image from "next/image";
// import { FaHandHoldingHeart, FaStar } from "react-icons/fa";
// import ContactForm from "./ContactForm";
// import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
// import AnimatedReveal from "@/src/animations/AnimatedReveal";
// import { useTranslation } from "react-i18next";
// import { useFetchApprovedFeedbacks } from "@/src/hooks/useFeedback";
// import { Feedback } from "@/src/types/feedback";

// const ContactUs = () => {
//   console.log('check')
//   const { t } = useTranslation();
//   const { data } = useFetchApprovedFeedbacks(1, 10, "all");
//   console.log("check", data);

//   return (
//     <div className="bg-white py-22 px-20 border ">
//       <div className=" grid lg:grid-cols-2 gap-12">
//         {/* Left Section */}
//         <AnimatedReveal className="flex-1 ">
//           <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
//             <FaHandHoldingHeart size={20} />
//             {t("Get In Touch")}
//           </p>
//           <h1 className="text-[30px] md:text-[40px] xl:text-[55px] font-nunito font-extrabold text-dark-green mb-1">{t("Contact Us")}</h1>
//           <p className="text-muted-gray font-nunito text-[16px]  capitalize leading-7 md:leading-8 mb-12">
//             {t("Your support makes a difference. If you would like to learn more about our work, make a donation, or find out how you can volunteer, you can contact us using the information below.")}
//           </p>

//           <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 mb-12 max-w-[700px] ">
//             {contactInfo.map((info, idx) => (
//               <ContactInfoBlock
//                 key={idx}
//                 icon={info.icon}
//                 title={info.title}
//                 lines={info.lines}
//                 isSocial={info.isSocial}
//               />
//             ))}
//           </div>

//           {/* Contact Image */}
//           <div className="w-full text-center mt-6 ">
//             <Image
//               src="/contact.png"
//               alt="Contact Illustration"
//               height={260}
//               width={516}
//               className="w-full  h-auto object-cover"
//             />
//           </div>
//         </AnimatedReveal>
//         {/* Right Section - Form */}

//         <AnimatedReveal className="flex-1 bg-white ">
//           <div className="p-10   rounded-xl border border-gray-200  ">
//             <h2 className="text-4xl font-bold mb-3">{t("Fill Up The Form")}</h2>
//             <p className="font-nunito text-base text-gray-500 mb-15">
//               {t("Your email address will not be published. Required fields are marked *")}
//             </p>
//             <ContactForm />
//           </div>
//         </AnimatedReveal>
//       </div>
//       {data?.feedback?.length > 0 && (
//         <div className=" mt-20">
//           <h2 className="text-3xl font-bold text-dark-green mb-6">What People Say</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {data.feedback.map((item: Feedback) => (
//               <div key={item.id} className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-lg transition">
//                 <div className="flex items-center gap-4 mb-4">
//                   {item.image && typeof item.image === "string" && (
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       width={50}
//                       height={50}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />)}
//                   <div>
//                     <h4 className="font-semibold text-lg">{item.name}</h4>
//                     <p className="text-sm text-gray-500">{item.designation}</p>
//                   </div>
//                 </div>
//                 <p className="text-foreground/60 text-sm leading-relaxed mb-4">{item.feedback}</p>
//                 <div className="flex gap-1 text-yellow">
//                   {[...Array(item.rating)].map((_, i) => (
//                     <FaStar key={i} />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactUs;



// "use client";

// import React from "react";
// import Image from "next/image";
// import { FaHandHoldingHeart, FaStar } from "react-icons/fa";
// import ContactForm from "./ContactForm";
// import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
// import AnimatedReveal from "@/src/animations/AnimatedReveal";
// import { useTranslation } from "react-i18next";
// import { useFetchApprovedFeedbacks } from "@/src/hooks/useFeedback";
// import { Feedback } from "@/src/types/feedback";

// // Import Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// const ContactUs = () => {
//   const { t } = useTranslation();
//   const { data } = useFetchApprovedFeedbacks(1, 10, "all");

//   return (
//     <div className="bg-white py-22 px-20 border">
//       <div className="grid lg:grid-cols-2 gap-12">
//         {/* Left Section */}
//         <AnimatedReveal className="flex-1">
//           <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
//             <FaHandHoldingHeart size={20} />
//             {t("Get In Touch")}
//           </p>
//           <h1 className="text-[30px] md:text-[40px] xl:text-[55px] font-nunito font-extrabold text-dark-green mb-1">
//             {t("Contact Us")}
//           </h1>
//           <p className="text-muted-gray font-nunito text-[16px] capitalize leading-7 md:leading-8 mb-12">
//             {t(
//               "Your support makes a difference. If you would like to learn more about our work, make a donation, or find out how you can volunteer, you can contact us using the information below."
//             )}
//           </p>

//           {/* 🟢 What People Say Swiper BEFORE contactInfo.map */}
//           {data?.feedback?.length > 0 && (
//             <div className="mb-14">
//               <h2 className="text-3xl font-bold text-dark-green mb-6">
//                 What People Say
//               </h2>

//               <Swiper
//                 modules={[Pagination, Autoplay]}
//                 pagination={{ clickable: true }}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 spaceBetween={30}
//                 slidesPerView={1}
//                 breakpoints={{
//                   640: { slidesPerView: 1 },
//                   768: { slidesPerView: 2 },
//                   1024: { slidesPerView: 3 },
//                 }}
//                 className="pb-10"
//               >
//                 {data.feedback.map((item: Feedback) => (
//                   <SwiperSlide key={item.id}>
//                     <div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-lg transition-all duration-300 h-full">
//                       <div className="flex items-center gap-4 mb-4">
//                         {item.image && typeof item.image === "string" && (
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             width={50}
//                             height={50}
//                             className="w-12 h-12 rounded-full object-cover"
//                           />
//                         )}
//                         <div>
//                           <h4 className="font-semibold text-lg">
//                             {item.name}
//                           </h4>
//                           <p className="text-sm text-gray-500">
//                             {item.designation}
//                           </p>
//                         </div>
//                       </div>
//                       {/* <p className="text-foreground/60 text-sm leading-relaxed mb-4">
//                         {item.feedback}
//                       </p> */}
//                       <p className="text-foreground/60 text-sm leading-relaxed mb-4">
//                         {item.feedback?.length > 120
//                           ? item.feedback.slice(0, 120) + "..."
//                           : item.feedback}
//                       </p>
//                       <div className="flex gap-1 text-yellow">
//                         {[...Array(item.rating)].map((_, i) => (
//                           <FaStar key={i} />
//                         ))}
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           )}

//           {/* Contact Info Blocks */}
//           <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 mb-12 max-w-[700px]">
//             {contactInfo.map((info, idx) => (
//               <ContactInfoBlock
//                 key={idx}
//                 icon={info.icon}
//                 title={info.title}
//                 lines={info.lines}
//                 isSocial={info.isSocial}
//               />
//             ))}
//           </div>

//           {/* Contact Image */}
//           <div className="w-full text-center mt-6">
//             <Image
//               src="/contact.png"
//               alt="Contact Illustration"
//               height={260}
//               width={516}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </AnimatedReveal>

//         {/* Right Section - Form */}
//         <AnimatedReveal className="flex-1 bg-white">
//           <div className="p-10 rounded-xl border border-gray-200">
//             <h2 className="text-4xl font-bold mb-3">{t("Fill Up The Form")}</h2>
//             <p className="font-nunito text-base text-gray-500 mb-15">
//               {t(
//                 "Your email address will not be published. Required fields are marked *"
//               )}
//             </p>
//             <ContactForm />
//           </div>
//         </AnimatedReveal>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;


// "use client";

// import React from "react";
// import Image from "next/image";
// import { FaHandHoldingHeart, FaStar } from "react-icons/fa";
// import ContactForm from "./ContactForm";
// import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
// import AnimatedReveal from "@/src/animations/AnimatedReveal";
// import { useTranslation } from "react-i18next";
// import { useFetchApprovedFeedbacks } from "@/src/hooks/useFeedback";
// import { Feedback } from "@/src/types/feedback";

// // Swiper imports
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// const ContactUs = () => {
//   const { t } = useTranslation();
//   const { data } = useFetchApprovedFeedbacks(1, 10, "all");

//   return (
//     <div className="bg-white py-22 px-20 border">
//       <div className="grid lg:grid-cols-2 gap-12">
//         {/* Left Section */}
//         <AnimatedReveal className="flex-1">
//           <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
//             <FaHandHoldingHeart size={20} />
//             {t("Get In Touch")}
//           </p>

//           <h1 className="text-[30px] md:text-[40px] xl:text-[55px] font-nunito font-extrabold text-dark-green mb-1">
//             {t("Contact Us")}
//           </h1>

//           <p className="text-muted-gray font-nunito text-[16px] capitalize leading-7 md:leading-8 mb-12">
//             {t(
//               "Your support makes a difference. If you would like to learn more about our work, make a donation, or find out how you can volunteer, you can contact us using the information below."
//             )}
//           </p>

//           {/* 🟢 What People Say Swiper - matching original UI exactly */}
//           {data?.feedback?.length > 0 && (
//             <div className="mt-12 mb-14">
//               <h2 className="text-3xl font-bold text-dark-green mb-6">
//                 What People Say
//               </h2>

//               <Swiper
//                 modules={[Autoplay]}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 spaceBetween={20}
//                 slidesPerView={1.2}
//                 breakpoints={{
//                   640: { slidesPerView: 1.2 },
//                   768: { slidesPerView: 2 },
//                   1024: { slidesPerView: 3 },
//                 }}
//                 grabCursor={true}
//                 loop={true}
//                 speed={800}
//               >
//                 {data.feedback.map((item: Feedback) => (
//                   <SwiperSlide key={item.id}>
//                     <div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-lg transition duration-300 h-full flex flex-col justify-between">
//                       <div>
//                         <div className="flex items-center gap-4 mb-4">
//                           {item.image && typeof item.image === "string" && (
//                             <Image
//                               src={item.image}
//                               alt={item.name}
//                               width={50}
//                               height={50}
//                               className="w-12 h-12 rounded-full object-cover"
//                             />
//                           )}
//                           <div>
//                             <h4 className="font-semibold text-lg text-black">
//                               {item.name}
//                             </h4>
//                             <p className="text-sm text-gray-500">
//                               {item.designation}
//                             </p>
//                           </div>
//                         </div>

//                         <p className="text-foreground/60 text-sm leading-relaxed mb-4 text-gray-700">
//                           {item.feedback?.length > 120
//                             ? item.feedback.slice(0, 120) + "..."
//                             : item.feedback}
//                         </p>
//                       </div>

//                       <div className="flex gap-1 text-yellow">
//                         {[...Array(item.rating)].map((_, i) => (
//                           <FaStar key={i} />
//                         ))}
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           )}

//           {/* Contact Info */}
//           <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 mb-12 max-w-[700px]">
//             {contactInfo.map((info, idx) => (
//               <ContactInfoBlock
//                 key={idx}
//                 icon={info.icon}
//                 title={info.title}
//                 lines={info.lines}
//                 isSocial={info.isSocial}
//               />
//             ))}
//           </div>

//           {/* Contact Image */}
//           <div className="w-full text-center mt-6">
//             <Image
//               src="/contact.png"
//               alt="Contact Illustration"
//               height={260}
//               width={516}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </AnimatedReveal>

//         {/* Right Section - Contact Form */}
//         <AnimatedReveal className="flex-1 bg-white">
//           <div className="p-10 rounded-xl border border-gray-200">
//             <h2 className="text-4xl font-bold mb-3">{t("Fill Up The Form")}</h2>
//             <p className="font-nunito text-base text-gray-500 mb-15">
//               {t(
//                 "Your email address will not be published. Required fields are marked *"
//               )}
//             </p>
//             <ContactForm />
//           </div>
//         </AnimatedReveal>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;



// "use client";

// import React from "react";
// import Image from "next/image";
// import { FaHandHoldingHeart, FaStar } from "react-icons/fa";
// import ContactForm from "./ContactForm";
// import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
// import AnimatedReveal from "@/src/animations/AnimatedReveal";
// import { useTranslation } from "react-i18next";
// import { useFetchApprovedFeedbacks } from "@/src/hooks/useFeedback";
// import { Feedback } from "@/src/types/feedback";

// // Import Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// const ContactUs = () => {
//   const { t } = useTranslation();
//   const { data } = useFetchApprovedFeedbacks(1, 10, "all");

//   // Limit feedbacks if needed
//   const limitedFeedback =
//     data?.feedback && Array.isArray(data.feedback)
//       ? data.feedback.slice(0, 6)
//       : [];

//   return (
//     <div className="bg-white py-22 px-6 md:px-12 xl:px-20 border">
//       <div className="grid lg:grid-cols-2 gap-12">
//         {/* Left Section */}
//         <AnimatedReveal className="flex-1">
//           <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
//             <FaHandHoldingHeart size={20} />
//             {t("Get In Touch")}
//           </p>
//           <h1 className="text-[30px] md:text-[40px] xl:text-[55px] font-nunito font-extrabold text-dark-green mb-1">
//             {t("Contact Us")}
//           </h1>
//           <p className="text-muted-gray font-nunito text-[16px] capitalize leading-7 md:leading-8 mb-12">
//             {t(
//               "Your support makes a difference. If you would like to learn more about our work, make a donation, or find out how you can volunteer, you can contact us using the information below."
//             )}
//           </p>

//           {/* 🟢 Feedback Swiper */}
//           {limitedFeedback.length > 0 && (
//             <div className="mb-14">
//               <h2 className="text-3xl font-bold text-dark-green mb-6">
//                 {t("What People Say")}
//               </h2>

//               <Swiper
//                 modules={[Pagination, Autoplay]}
//                 pagination={{ clickable: true }}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 spaceBetween={12}
//                 slidesPerView={1}
//                 breakpoints={{
                  
//                   320: { slidesPerView: 1, spaceBetween: 12 },
//                   480: { slidesPerView: 1, spaceBetween: 12 },
//                   640: { slidesPerView: 1, spaceBetween: 12 }, // vertical stack
//                   728: { slidesPerView: 2, spaceBetween: 12 },
//                   768: { slidesPerView: 2, spaceBetween: 12 },
//                   1024: { slidesPerView: 2, spaceBetween: 12 },
//                   1280: { slidesPerView: 3, spaceBetween: 12 },
//                   1536: { slidesPerView: 3, spaceBetween: 12 },

//                 }}
//                 className="pb-10"
//               >
//                 {limitedFeedback.map((item: Feedback) => (
//                   <SwiperSlide key={item.id}>
//                     <div className="relative bg-white border border-yellow rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 w-[291px] h-[445.6px] lg:w-[456px] lg:h-[385.6px] xl:w-[356px] xl:h-[415.6px] 2xl:w-[415.6px] 2xl:h-[385.6px] p-[20px] flex flex-col justify-between mx-auto">
//                       {/* Image + Name */}
//                       <div className="flex items-center gap-4 mb-4">
//                         {item.image && typeof item.image === "string" && (
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             width={60}
//                             height={60}
//                             className="w-14 h-14 rounded-full object-cover"
//                           />
//                         )}
//                         <div>
//                           <h4 className="font-semibold text-lg text-dark-green">
//                             {item.name}
//                           </h4>
//                           <p className="text-sm text-gray-500">
//                             {item.designation}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Feedback */}
//                       <p className="text-foreground/60 text-sm leading-relaxed mb-4 flex-grow">
//                         {item.feedback?.length > 120
//                           ? item.feedback.slice(0, 120) + "..."
//                           : item.feedback}
//                       </p>

//                       {/* Rating */}
//                       <div className="flex gap-1 text-yellow">
//                         {[...Array(item.rating || 5)].map((_, i) => (
//                           <FaStar key={i} />
//                         ))}
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           )}

//           {/* Contact Info Blocks */}
//           <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 mb-12 max-w-[700px]">
//             {contactInfo.map((info, idx) => (
//               <ContactInfoBlock
//                 key={idx}
//                 icon={info.icon}
//                 title={info.title}
//                 lines={info.lines}
//                 isSocial={info.isSocial}
//               />
//             ))}
//           </div>

//           {/* Contact Image */}
//           <div className="w-full text-center mt-6">
//             <Image
//               src="/contact.png"
//               alt="Contact Illustration"
//               height={260}
//               width={516}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </AnimatedReveal>

//         {/* Right Section - Form */}
//         <AnimatedReveal className="flex-1 bg-white">
//           <div className="p-10 rounded-xl border border-gray-200">
//             <h2 className="text-4xl font-bold mb-3">{t("Fill Up The Form")}</h2>
//             <p className="font-nunito text-base text-gray-500 mb-15">
//               {t(
//                 "Your email address will not be published. Required fields are marked *"
//               )}
//             </p>
//             <ContactForm />
//           </div>
//         </AnimatedReveal>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;


// "use client";

// import React from "react";
// import Image from "next/image";
// import { FaHandHoldingHeart, FaStar } from "react-icons/fa";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import ContactForm from "./ContactForm";
// import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
// import AnimatedReveal from "@/src/animations/AnimatedReveal";
// import { useTranslation } from "react-i18next";
// import { useFetchApprovedFeedbacks } from "@/src/hooks/useFeedback";
// import { Feedback } from "@/src/types/feedback";

// // Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const ContactUs = () => {
//   const { t } = useTranslation();
//   const { data } = useFetchApprovedFeedbacks(1, 10, "all");

//   const truncateText = (text: string, maxLength: number) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
//   };

//   const feedbacks =
//     data?.feedback && Array.isArray(data.feedback)
//       ? data.feedback.slice(0, 9)
//       : [];

//   return (
//     <div className="bg-white py-20 px-6 md:px-12 xl:px-20 border">
//       <div className="grid lg:grid-cols-2 gap-12">
//         {/* LEFT SECTION */}
//         <AnimatedReveal className="flex-1">
//           <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
//             <FaHandHoldingHeart size={20} />
//             {t("Get In Touch")}
//           </p>
//           <h1 className="text-[30px] md:text-[40px] xl:text-[55px] font-nunito font-extrabold text-dark-green mb-1">
//             {t("Contact Us")}
//           </h1>
//           <p className="text-muted-gray font-nunito text-[16px] capitalize leading-7 md:leading-8 mb-12">
//             {t(
//               "Your support makes a difference. If you would like to learn more about our work, make a donation, or find out how you can volunteer, you can contact us using the information below."
//             )}
//           </p>

//           {/* 🟡 SWIPER FEEDBACK SECTION */}
//           {feedbacks.length > 0 && (
//             <div className="mb-14">
//               <h2 className="text-3xl font-bold text-dark-green mb-8">
//                 {t("What People Say")}
//               </h2>

//               <Swiper
//                 spaceBetween={6}
//                 slidesPerView={1}
//                 breakpoints={{
//                   320: { slidesPerView: 1, spaceBetween: 2 },
//                   480: { slidesPerView: 1, spaceBetween: 3 },
//                   640: { slidesPerView: 1, spaceBetween: 3 },
//                   768: { slidesPerView: 1, spaceBetween: 3 },
//                   1024: { slidesPerView: 1, spaceBetween: 6 },
//                   1280: { slidesPerView: 2, spaceBetween: 6 },
//                   1536: { slidesPerView: 2, spaceBetween: 6 },
//                 }}
//                 navigation={{
//                   prevEl: ".prev-btn",
//                   nextEl: ".next-btn",
//                 }}
//                 loop
//                 autoplay={{
//                   delay: 3000,
//                   pauseOnMouseEnter: true,
//                   disableOnInteraction: false,
//                 }}
//                 speed={1000}
//                 modules={[Navigation, Autoplay]}
//                 className="pb-12"
//               >
//                 {feedbacks.map((item: Feedback, idx: number) => (
//                   <SwiperSlide key={`${item.id}-${idx}`}>
//                     <div className="relative bg-white border border-yellow rounded-3xl flex flex-col justify-between shadow-sm overflow-hidden px-[20px] py-[40px] w-[291px] h-[445.6px] lg:w-[456px] lg:h-[385.6px] xl:w-[356px] xl:h-[415.6px] 2xl:w-[315.6px] 2xl:h-[385.6px] sm:w-[246px] sm:h-[651.6px] md:w-[236px] md:h-[345.6px] mx-auto hover:shadow-lg transition-all duration-500">
//                       {/* Rating */}
//                       <div className="flex mb-4 px-4">
//                         {[...Array(item.rating || 5)].map((_, i) => (
//                           <FaStar
//                             key={i}
//                             className="text-yellow"
//                             size={20}
//                           />
//                         ))}
//                       </div>

//                       {/* Feedback */}
//                       <p className="text-[#667471] font-nunito text-base md:text-[16px] xl:text-[16px] leading-relaxed px-4 flex-grow">
//                         “{truncateText(item.feedback || "", 120)}”
//                       </p>

//                       {/* User Info */}
//                       <div className="flex flex-col sm:flex-row sm:items-center mt-6 px-4 gap-2">
//                         <div className="w-12 h-12 rounded-full overflow-hidden mx-auto sm:mx-0">
//                           {item.image && typeof item.image === "string" ? (
//                             <Image
//                               src={item.image}
//                               alt={item.name}
//                               width={48}
//                               height={48}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <Image
//                               src="/assets/author.png"
//                               alt="default"
//                               width={48}
//                               height={48}
//                               className="w-full h-full object-cover"
//                             />
//                           )}
//                         </div>
//                         <div className="flex flex-col items-center sm:items-start sm:ml-3">
//                           <h4 className="font-bold font-nunito text-[18px] text-foreground">
//                             {item.name}
//                           </h4>
//                           <p className="text-gray-500 font-nunito text-[14px]">
//                             {item.designation}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>

//               {/* Swiper Navigation Buttons */}
//               <div className="flex justify-center gap-4 mt-8">
//                 <button className="prev-btn w-14 h-14 rounded-full bg-[#122F2A] hover:bg-yellow hover:text-black text-white flex items-center justify-center transition-all duration-500 ease-in-out">
//                   <ArrowLeft size={28} />
//                 </button>
//                 <button className="next-btn w-14 h-14 rounded-full bg-yellow hover:bg-[#122f2A] text-black hover:text-white flex items-center justify-center transition-all duration-500 ease-in-out">
//                   <ArrowRight size={28} />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Contact Info */}
//           <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 mb-12 max-w-[700px]">
//             {contactInfo.map((info, idx) => (
//               <ContactInfoBlock
//                 key={idx}
//                 icon={info.icon}
//                 title={info.title}
//                 lines={info.lines}
//                 isSocial={info.isSocial}
//               />
//             ))}
//           </div>

//           {/* Image */}
//           <div className="w-full text-center mt-6">
//             <Image
//               src="/contact.png"
//               alt="Contact Illustration"
//               height={260}
//               width={516}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </AnimatedReveal>

//         {/* RIGHT SECTION */}
//         <AnimatedReveal className="flex-1 bg-white">
//           <div className="p-10 rounded-xl border border-gray-200">
//             <h2 className="text-4xl font-bold mb-3">{t("Fill Up The Form")}</h2>
//             <p className="font-nunito text-base text-gray-500 mb-15">
//               {t(
//                 "Your email address will not be published. Required fields are marked *"
//               )}
//             </p>
//             <ContactForm />
//           </div>
//         </AnimatedReveal>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

// "use client";
// import React from "react";
// import Image from "next/image";
// import { FaHandHoldingHeart, FaStar } from "react-icons/fa";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import ContactForm from "./ContactForm";
// import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
// import AnimatedReveal from "@/src/animations/AnimatedReveal";
// import { useTranslation } from "react-i18next";
// import { useFetchApprovedFeedbacks } from "@/src/hooks/useFeedback";
// import { Feedback } from "@/src/types/feedback";
// // Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// const ContactUs = () => {
//   const { t } = useTranslation();
//   const { data } = useFetchApprovedFeedbacks(1, 10, "all");
//   const truncateText = (text: string, maxLength: number) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
//   };
//   const feedbacks =
//     data?.feedback && Array.isArray(data.feedback)
//       ? data.feedback.slice(0, 9)
//       : [];
//   return (
//     <div className="bg-white  px-6 md:px-12 xl:px-20 border">
//       <div className="grid lg:grid-cols-2 gap-12">
//         {/* LEFT SECTION */}
//         <AnimatedReveal className="flex-1">
//           <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
//             <FaHandHoldingHeart size={20} />
//             {t("Get In Touch")}
//           </p>
//           <h1 className="text-[30px] md:text-[40px] xl:text-[55px] font-nunito font-extrabold text-dark-green mb-1">
//             {t("Contact Us")}
//           </h1>
//           <p className="text-muted-gray font-nunito text-[16px] capitalize leading-7 md:leading-8 mb-12">
//             {t(
//               "Your support makes a difference. If you would like to learn more about our work, make a donation, or find out how you can volunteer, you can contact us using the information below."
//             )}
//           </p>
//           {/* 🟡 SWIPER FEEDBACK SECTION */}
//           {feedbacks.length > 0 && (
//             <div className="mb-14">
//               <h2 className="text-3xl font-bold text-dark-green mb-8">
//                 {t("What People Say")}
//               </h2>
//               <Swiper
//                 spaceBetween={6}
//                 slidesPerView={1}
//                 breakpoints={{
//                   320: { slidesPerView: 1, spaceBetween: 2 },
//                   480: { slidesPerView: 1, spaceBetween: 3 },
//                   640: { slidesPerView: 1, spaceBetween: 3 },
//                   768: { slidesPerView: 1, spaceBetween: 3 },
//                   1024: { slidesPerView: 1, spaceBetween: 6 },
//                   1280: { slidesPerView: 2, spaceBetween: 6 },
//                   1536: { slidesPerView: 2, spaceBetween: 6 },
//                 }}
//                 navigation={{
//                   prevEl: ".prev-btn",
//                   nextEl: ".next-btn",
//                 }}
//                 loop
//                 autoplay={{
//                   delay: 3000,
//                   pauseOnMouseEnter: true,
//                   disableOnInteraction: false,
//                 }}
//                 speed={1000}
//                 modules={[Navigation, Autoplay]}
//                 className="pb-12"
//               >
//                 {feedbacks.map((item: Feedback, idx: number) => (
//                   <SwiperSlide key={`${item.id}-${idx}`}>
//                     <div className="relative bg-white border border-yellow rounded-3xl flex flex-col justify-between shadow-sm overflow-hidden px-[20px] py-[40px] w-[315px] h-[385px] mx-auto hover:shadow-lg transition-all duration-500">
//                       {/* Rating */}
//                       <div className="flex mb-4 px-4">
//                         {[...Array(item.rating || 5)].map((_, i) => (
                     
//                                             <FaStar
//                             key={i}
//                             className="text-yellow"
//                             size={20}
//                           />
//                         ))}
//                       </div>
//                       {/* Feedback */}
//                       <p className="text-[#667471] font-nunito text-base md:text-[16px] xl:text-[16px] leading-relaxed px-4 flex-grow overflow-hidden">
//                         "{truncateText(item.feedback || "", 120)}"
//                       </p>
//                       {/* User Info */}
//                       <div className="flex flex-col sm:flex-row sm:items-center mt-6 px-4 gap-2">
//                         <div className="w-12 h-12 rounded-full overflow-hidden mx-auto sm:mx-0">
//                           {item.image && typeof item.image === "string" ? (
//                             <Image
//                               src={item.image}
//                               alt={item.name}
//                               width={48}
//                               height={48}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <Image
//                               src="/assets/author.png"
//                               alt="default"
//                               width={48}
//                               height={48}
//                               className="w-full h-full object-cover"
//                             />
//                           )}
//                         </div>
                     
                        
//                         <div className="flex flex-col items-center sm:items-start sm:ml-3">
//                           <h4 className="font-bold font-nunito text-[18px] text-foreground">
//                             {item.name}
//                           </h4>
//                           <p className="text-gray-500 font-nunito text-[14px]">
//                             {item.designation}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//               {/* Swiper Navigation Buttons */}
//               <div className="flex justify-center gap-4 mt-8">
//                 <button className="prev-btn w-14 h-14 rounded-full bg-[#122F2A] hover:bg-yellow hover:text-black text-white flex items-center justify-center transition-all duration-500 ease-in-out">
//                   <ArrowLeft size={28} />
//                 </button>
//                 <button className="next-btn w-14 h-14 rounded-full bg-yellow hover:bg-[#122f2A] text-black hover:text-white flex items-center justify-center transition-all duration-500 ease-in-out">
//                   <ArrowRight size={28} />
//                 </button>
//               </div>
//             </div>
//           )}
//           {/* Contact Info */}
//           <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 mb-12 max-w-[700px]">
//             {contactInfo.map((info, idx) => (
//               <ContactInfoBlock
//                 key={idx}
//                 icon={info.icon}
//                 title={info.title}
//                 lines={info.lines}
//                 isSocial={info.isSocial}
//               />
//             ))}
//           </div>
//           {/* Image */}
//           <div className="w-full text-center mt-6">
//             <Image
//               src="/contact.png"
//               alt="Contact Illustration"
//               height={260}
//               width={516}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </AnimatedReveal>
//         {/* RIGHT SECTION */}
//         <AnimatedReveal className="flex-1 bg-white">
//           <div className="p-10 rounded-xl border border-gray-200">
//             <h2 className="text-4xl font-bold mb-3">{t("Fill Up The Form")}</h2>
//             <p className="font-nunito text-base text-gray-500 mb-15">
//               {t(
//                 "Your email address will not be published. Required fields are marked *"
//               )}
//             </p>
//             <ContactForm />
//           </div>
//         </AnimatedReveal>
//       </div>
//     </div>
//   );
// };
// export default ContactUs;

"use client";
import React from "react";
import Image from "next/image";
import { FaHandHoldingHeart, FaStar } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ContactForm from "./ContactForm";
import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { useTranslation } from "react-i18next";
import { useFetchApprovedFeedbacks } from "@/src/hooks/useFeedback";
import { Feedback } from "@/src/types/feedback";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ContactUs = () => {
  const { t } = useTranslation();
  const { data } = useFetchApprovedFeedbacks(1, 10, "all");

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const feedbacks =
    data?.feedback && Array.isArray(data.feedback)
      ? data.feedback.slice(0, 9)
      : [];

  return (
    <div className="bg-white px-4 sm:px-6 md:px-12 xl:px-20 py-12 border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* LEFT SECTION */}
        <AnimatedReveal className="flex-1">
          <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
            <FaHandHoldingHeart size={20} />
            {t("Get In Touch")}
          </p>
          <h1 className="text-[28px] sm:text-[34px] md:text-[40px] xl:text-[55px] font-nunito font-extrabold text-dark-green mb-3">
            {t("Contact Us")}
          </h1>
          <p className="text-muted-gray font-nunito text-[15px] sm:text-[16px] capitalize leading-7 md:leading-8 mb-10">
            {t(
              "Your support makes a difference. If you would like to learn more about our work, make a donation, or find out how you can volunteer, you can contact us using the information below."
            )}
          </p>

          {/* 🟡 SWIPER FEEDBACK SECTION */}
          {feedbacks.length > 0 && (
            <div className="mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark-green mb-6 sm:mb-8 text-center lg:text-left">
                {t("What People Say")}
              </h2>

              <Swiper
                spaceBetween={12}
                slidesPerView={1}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: 2, spaceBetween: 10 },
                  724: {slidesPerView:2, spaceBetween:6},
                  768: { slidesPerView: 2, spaceBetween: 12 },
                  1024: { slidesPerView: 2, spaceBetween: 12 },
                  1280: { slidesPerView: 2, spaceBetween: 12 },
                  1536: { slidesPerView: 2, spaceBetween: 12 },
                }}
                navigation={{
                  prevEl: ".prev-btn",
                  nextEl: ".next-btn",
                }}
                loop
                autoplay={{
                  delay: 3000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
                }}
                speed={1000}
                modules={[Navigation, Autoplay]}
                className="pb-12"
              >
                {feedbacks.map((item: Feedback, idx: number) => (
                  <SwiperSlide key={`${item.id}-${idx}`}> 
                    <div className="relative bg-white border border-yellow rounded-3xl flex flex-col justify-between shadow-sm overflow-hidden px-6 py-8 w-full sm:w-[280px] md:w-[315px] lg:w-[220px]  lg:h-[385.6px]  xl:h-[385.6px]  2xl:w-[315.6px] 2xl:h-[385.6px] xl:w-[230px] h-auto min-h-[340px] mx-auto hover:shadow-lg transition-all duration-500">
                      {/* Rating */}
                      <div className="flex mb-4 px-2">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow" size={18} />
                        ))}
                      </div>

                      {/* Feedback */}
                      <p className="text-[#667471] font-nunito text-sm sm:text-base leading-relaxed px-2 flex-grow">
                        "{truncateText(item.feedback || "", 120)}"
                      </p>

                      {/* User Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center mt-6 px-2 gap-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden mx-auto sm:mx-0">
                          <Image
                            src={
                              item.image && typeof item.image === "string"
                                ? item.image
                                : "/assets/author.png"
                            }
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col items-center sm:items-start sm:ml-3">
                          <h4 className="font-bold font-nunito text-[17px] text-foreground">
                            {item.name}
                          </h4>
                          <p className="text-gray-500 font-nunito text-[14px]">
                            {item.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Swiper Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-6 sm:mt-8">
                <button className="prev-btn  cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#122F2A] hover:bg-yellow hover:text-black text-white flex items-center justify-center transition-all duration-500 ease-in-out">
                  <ArrowLeft size={24} />
                </button>
                <button className="next-btn  cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow hover:bg-[#122F2A] text-black hover:text-white flex items-center justify-center transition-all duration-500 ease-in-out">
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 mb-10 max-w-[700px]">
            {contactInfo.map((info, idx) => (
              <ContactInfoBlock
                key={idx}
                icon={info.icon}
                title={info.title}
                lines={info.lines}
                isSocial={info.isSocial}
              />
            ))}
          </div>

          {/* Contact Image */}
          <div className="w-full text-center mt-6">
            <Image
              src="/assets/conatctusimage.jpg"
              alt="Contact Illustration"
              height={260}
              width={516}
              className="w-full h-auto object-cover"
            />
          </div>
        </AnimatedReveal>

        {/* RIGHT SECTION */}
        <AnimatedReveal className="flex-1 bg-white">
          <div className="p-6 sm:p-8 md:p-10 rounded-xl border border-gray-200">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {t("Fill Up The Form")}
            </h2>
            <p className="font-nunito text-base text-gray-500 mb-6">
              {t(
                "Your email address will not be published. Required fields are marked *"
              )}
            </p>
            <ContactForm />
          </div>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default ContactUs;
