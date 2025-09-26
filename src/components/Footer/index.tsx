
"use client";
import { Icon } from "@iconify/react";
import Newsletter from "./Newsletter";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { footerData } from "@/src/staticResource";
import { logoLight, spade2, spradeBase,spreadLight } from "@/public/assets";
import Divider from "../common/HorizontalDevider";
import { useTranslation } from "react-i18next";

const Footer = () => {

  // ref for the whole footer
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const{t}=useTranslation();

  // Parent container animation (for stagger effect)
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25, 
      },
    },
  };

  // Each item animation
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Common base for underline effect
  const underlineBase =
    "relative inline-flex items-center gap-2 text-white/50  before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:w-full before:bg-yellow before:block before:scale-x-0 before:origin-center before:transition-transform";

  // Variant: triggers from parent group
  const underlineOnGroupHover = `${underlineBase} text-white transition-colors group-hover:text-yellow before:duration-500 group-hover:before:scale-x-100`;

  // Variant: triggers on element itself
  const underlineOnHover = `${underlineBase} cursor-pointer hover:text-yellow before:duration-300 hover:before:scale-x-100`;


  return (
    <footer ref={ref} className="bg-dark-green text-white py-5 px-[3%] xl:px-6 relative">
      <Newsletter />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[29%] xl:top-[25%] left-0 xl:left-8 transform -translate-y-1/2 text-yellow"
      >
        <img
          src={spade2.src}
          alt="Logo"
          className="w-12 xl:w-18 h-12 xl:h-18"
        />
      </motion.div>


      {/* Main Grid */}
      <motion.div
        className="xl:p-20 mx-auto lg:ml-10 py-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Brand */}
        <motion.div variants={item} className="lg:mb-20 xl:mb-10">
          <div className="h-10 w-50 xl:h-12 xl:w-55 relative">
            <Image src={logoLight} fill alt={footerData.brand.name} />
          </div>
          <p className="mt-8 text-white/50 text-sm xl:text-lg font-nunito tracking-tight leading-7 xl:leading-9">
            {t(footerData.brand.description)}
          </p>
          <div className="flex gap-3 mt-6">
            {footerData.brand.socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-10 xl:w-13 h-10 xl:h-13 flex items-center justify-center border border-white/10 transition duration-200 rounded-full hover:bg-yellow hover:text-green"
              >
                <Icon icon={s.icon} className="h-4 w-4 xl:h-5 xl:w-5" />
              </a>
            ))}
          </div>
        </motion.div>
        {/* Quick links */}
        <motion.div variants={item} className="xl:ml-20 ">
          <h3 className="text-xl font-nunito xl:text-3xl font-bold mb-4">{t("Quick Links")}</h3>
          <div className="w-[35%] mb-6">
            <Divider />
          </div>

          <ul className="space-y-3 xl:space-y-4">
            {footerData.quickLinks.map((link, i) => (
              <li key={i} className="relative group text-sm font-nunito xl:text-xl ">
                <a
                  href={link.href}
                  className={underlineOnGroupHover}
                >
                  <Icon icon="mingcute:arrow-up-fill" width={18} height={18} className="rotate-45" />
                  {t(link.label)}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div variants={item}>
          <h3 className="text-xl font-nunito  xl:text-3xl font-bold xl:mb-4 ps-1">
            {t("Our Services")}
          </h3>
          <div className="w-[35%] mb-6">
            <Divider />
          </div>
          <ul className="space-y-3 xl:space-y-4  ">
            {footerData.services.map((service, i) => (
              <li key={i} className="relative group text-sm font-nunito xl:text-xl">
                <a
                  href={service.href}
                  className={underlineOnGroupHover}
                >
                  <Icon icon="mingcute:arrow-up-fill" className="rotate-45" width={18} height={18} />

                  {t(service.label)}
                </a>
              </li>

            ))}
          </ul>



        </motion.div>

        {/* Contact */}
        <motion.div variants={item} className="text-white relative">
          <h3 className="text-xl font-nunito  xl:text-3xl font-bold mb-4 text-white">
            {t("Get In Touch")}
          </h3>
          <div className="w-[35%] mb-6">
            <Divider />
          </div>
          <div className="space-y-3 xl:space-y-4 flex flex-col">

            <p
              className={`${underlineOnHover} text-sm font-nunito font-light xl:text-xl  xl:gap-5`}
            >
              <Icon icon="ion:location" width="30" height="30" className="text-yellow" />
              <span>{footerData.contact.address}</span>
            </p>

            <p
              className={`${underlineOnHover} text-sm font-nunito font-light xl:text-xl  xl:gap-5`}
            >
              <Icon icon="mdi:phone" width="20" height="30" className="text-yellow" />
              <span>{footerData.contact.phone}</span>
            </p>

            <p
              className={`${underlineOnHover} text-sm font-nunito font-light xl:text-xl  xl:gap-5`}
            >
              <Icon icon="mdi:email" width="20" height="30" className="text-yellow" />
              <span>{footerData.contact.email}</span>
            </p>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[29%] xl:top-[30%] right-40 xl:right-18 transform -translate-y-1/2  size-14 text-white"
          >
            <img src={spreadLight.src} alt="decoration" className="w-12 xl:w-18 h-12 xl:h-18" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className="border-t border-white/10 mt-8 py-6"
        variants={item}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <div className=" xl:ml-25 font-nunito
         flex flex-col lg:flex-row items-center justify-between lg:justify-center xl:justify-between gap-4 lg:gap-20 xl:gap-base ">
          <p className="text-center text-sm xl:text-lg xl:text-left">
            Copyright ©{" "}
            <span className="text-yellow hover:text-white cursor-pointer">Charifund</span>. All Rights
            Reserved.
          </p>
          <div className="flex flex-wrap text-sm xl:text-lg justify-center xl:mr-10 text-white gap-6">
            {footerData.bottomLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={` relative inline-flex items-center gap-2  before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:w-full before:bg-yellow before:block before:scale-x-0 before:origin-center before:transition-transform cursor-pointer hover:text-yellow before:duration-300 hover:before:scale-x-100 text-white`}
              >
                {t(link.label)}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
