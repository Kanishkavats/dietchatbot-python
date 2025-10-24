"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const CookiePolicy = () => {
  const router = useRouter();

  const handleAcceptPolicy = () => {
    localStorage.setItem(
      "cookie_consent",
      JSON.stringify({
        necessary: true,
        analytics: true,
        functional: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    router.push("/"); 
  };

  return (
    <section className="min-h-screen bg-white text-gray-800 px-6 sm:px-10 md:px-20 lg:px-32 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold  mb-6">
          Cookie Policy
        </h1>

        <p className="text-base leading-7 mb-6 text-gray-700">
            This Cookie Policy explains how <strong>Charifund</strong> uses cookies and similar technologies on our website. By using our site, you consent to the use of cookies as described in this policy.
        </p>

        <h2 className="text-2xl font-semibold  mb-3">
          What Are Cookies?
        </h2>
        <p className="text-base mb-6 text-gray-700">
          Cookies are small text files stored on your device when you visit a
          website. They help us enhance user experience, analyze website traffic,
          and deliver personalized content or ads.
        </p>

        <h2 className="text-2xl font-semibold  mb-3">
          Types of Cookies We Use
        </h2>

        <div className="space-y-5 mb-8">
          <div>
            <h3 className="text-xl font-semibold">
              1. Necessary Cookies
            </h3>
            <p className="text-gray-700">
              These cookies are essential for the website to function correctly.
              They enable basic features like page navigation and access to secure
              areas. The website cannot function properly without these cookies.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold ">
              2. Functional Cookies
            </h3>
            <p className="text-gray-700">
              Functional cookies allow us to remember your preferences and provide
              enhanced, more personalized features such as language selection and
              saved donation details.
            </p>
          </div>
          
        </div>

        <h2 className="text-2xl font-semibold  mb-3">
          Managing Cookies
        </h2>
        <p className="text-base mb-6 text-gray-700">
          You can manage or disable cookies through your browser settings.
          However, disabling certain cookies may affect your experience on our
          website. You can also update your preferences at any time using the{" "}
          <a href="#" className=" font-semibold hover:underline">
            Cookie Settings
          </a>{" "}
          link in the footer.
        </p>

        <h2 className="text-2xl font-semibold  mb-3">
          Updates to This Policy
        </h2>
        <p className="text-base mb-6 text-gray-700">
          We may update this Cookie Policy periodically to reflect changes in our
          practices or for other operational, legal, or regulatory reasons. Please
          review this page regularly for updates.
        </p>

        <p className="text-base text-gray-600 mb-10">
          Last Updated: <strong>October 2025</strong>
        </p>

        {/*  Accept Policy Button */}
        <div className="text-center">
          <button
            onClick={handleAcceptPolicy}
            className="px-6 py-3 cursor-pointer bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Accept Cookie Policy
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CookiePolicy;
