// pages/privacy-policy.tsx

import React from 'react';
import Head from 'next/head';

export const privacyPolicySections = [
  {
    id: 1,
    title: "1. Introduction",
    heading: "Our Commitment to Your Privacy",
    banner: "Privacy Policy",
    content: "Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you engage with our website or services. By accessing our platform, you agree to the terms described below. We encourage you to read this policy carefully to understand how your information is handled."
  },
  {
    id: 2,
    title: "2. Information We Collect",
    content: "We collect both personal and non-personal information to improve your experience and ensure smooth operation of our website. This may include:",
    list: [
      "Personal details such as your name, email address, and phone number.",
      "Information submitted through forms, surveys, or sign-up processes.",
      "Usage data, including IP address, browser type, and pages visited.",
      "Cookies and similar tracking technologies to enhance site performance."
    ]
  },
  {
    id: 3,
    title: "3. How We Use Your Information",
    content: "The data we collect allows us to provide a seamless experience, improve our content, and communicate effectively with you. We use your information to:",
    list: [
      "Respond to inquiries, feedback, or service requests.",
      "Personalize and improve user experience on our platform.",
      "Send important updates, newsletters, or promotional materials (only if you opt-in).",
      "Monitor and analyze usage patterns to enhance website performance."
    ]
  },
  {
    id: 4,
    title: "4. Data Protection",
    content: "We prioritize the security of your personal data. All information is stored using secure servers and protected by appropriate administrative, technical, and physical safeguards. While we strive to ensure the highest level of security, please note that no method of electronic storage or transmission over the internet is 100% secure."
  },
  {
    id: 5,
    title: "5. Sharing Your Information",
    content: "We do not sell or rent your personal data to third parties. However, we may share limited information with trusted partners or service providers who help us operate our website or deliver services — always under strict confidentiality agreements and only for legitimate business purposes."
  },
  {
    id: 6,
    title: "6. Your Rights",
    content: "You have full control over your personal information. You may request access, correction, or deletion of your data at any time. You can also choose to unsubscribe from our emails or withdraw consent where applicable."
  },
  {
    id: 7,
    title: "7. Changes to This Policy",
    content: "We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any modifications will be posted on this page with an updated revision date."
  },
  {
    id: 8,
    title: "8. Contact Us",
    content: "If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at support@example.com. We are here to ensure your experience with us remains safe, transparent, and respectful of your privacy."
  }
];

export default function PrivacyPolicyPage() {

  return (
    <>
      {/* Main Content */}
      <section className="bg-gray-50 py-5 lg:py-16 lg:px-4">
        <div className="max-w-5xl mx-auto space-y-2 lg:space-y-12">
          {privacyPolicySections.map((section) => (
            <div
              key={section.id}
              className="bg-white lg:shadow-lg rounded-xl px-4 py-4 md:px-8 md:py-8 transition-transform duration-300 hover:scale-[1.02]"
            >
              <h2 className=" text-xl lg:text-2xl font-semibold text-gray-800 mb-4 ">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
              {section.list && (
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-200 py-12 lg:mt-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-xl font-medium text-gray-800">Still have questions?</h3>
          <p className="text-gray-600 mt-2">
            Contact our support team at{" "}
            <a href="mailto:support@example.com" className="text-blue-600 underline">
              support@example.com
            </a>{" "}
            and we’ll be happy to help.
          </p>
        </div>
      </section>
    </>
  );
}
