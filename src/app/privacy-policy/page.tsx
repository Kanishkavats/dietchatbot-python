"use client";

import React from "react";
import Banner from "@/src/components/PageBanner/Banner";

const PrivacyPolicy = () => {
  return (
    <div>
      {/* Reuse the same banner as About page */}
      <Banner
        Heading="Our Commitment to Your Privacy"
        BannerMoto="Privacy Policy"
      />

      {/* Text content only */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-gray-700 leading-relaxed">
      {/* <section className="w-full mx-0 px-4 sm:px-8 py-12 text-gray-700 leading-relaxed"> */}
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-6">
          Your privacy matters to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you engage
          with our website or services. By accessing our platform, you agree to
          the terms described below. We encourage you to read this policy
          carefully to understand how your information is handled.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          2. Information We Collect
        </h2>
        <p className="mb-6">
          We collect both personal and non-personal information to improve your
          experience and ensure smooth operation of our website. This may
          include:
        </p>
        {/* <ul className="list-disc list-inside mb-6 space-y-2"> */}
        <ul className="list-disc list-outside pl-4 mb-6 space-y-2">

          <li>Personal details such as your name, email address, and phone number.</li>
          <li>Information submitted through forms, surveys, or sign-up processes.</li>
          <li>Usage data, including IP address, browser type, and pages visited.</li>
          <li>Cookies and similar tracking technologies to enhance site performance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          3. How We Use Your Information
        </h2>
        <p className="mb-6">
          The data we collect allows us to provide a seamless experience,
          improve our content, and communicate effectively with you. We use your
          information to:
        </p>
        {/* <ul className="list-disc list-inside mb-6 space-y-2"> */}
        <ul className="list-disc list-outside pl-4 mb-6 space-y-2">

          <li>Respond to inquiries, feedback, or service requests.</li>
          <li>Personalize and improve user experience on our platform.</li>
          <li>Send important updates, newsletters, or promotional materials (only if you opt-in).</li>
          <li>Monitor and analyze usage patterns to enhance website performance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Data Protection</h2>
        <p className="mb-6">
          We prioritize the security of your personal data. All information is
          stored using secure servers and protected by appropriate
          administrative, technical, and physical safeguards. While we strive to
          ensure the highest level of security, please note that no method of
          electronic storage or transmission over the internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Sharing Your Information</h2>
        <p className="mb-6">
          We do not sell or rent your personal data to third parties. However,
          we may share limited information with trusted partners or service
          providers who help us operate our website or deliver services — always
          under strict confidentiality agreements and only for legitimate
          business purposes.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p className="mb-6">
          You have full control over your personal information. You may request
          access, correction, or deletion of your data at any time. You can also
          choose to unsubscribe from our emails or withdraw consent where
          applicable.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy periodically to reflect changes in
          our practices or for other operational, legal, or regulatory reasons.
          Any modifications will be posted on this page with an updated revision
          date.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests related to this
          Privacy Policy, please contact us at{" "}
          <strong>support@example.com</strong>. We are here to ensure your
          experience with us remains safe, transparent, and respectful of your
          privacy.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
