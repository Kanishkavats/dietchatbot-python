// pages/terms-and-conditions.tsx

import React from 'react';
import Head from 'next/head';
import PageBanner from '@/src/helper/PageBanner';
import { termsAndConditions } from '@/public/assets';

export const termsSections = [
  {
    id: 1,
    title: "1. Introduction",
    content:
      "Welcome to our website. These Terms and Conditions govern your use of our platform. By accessing or using our services, you agree to comply with these terms. Please read them carefully before proceeding."
  },
  {
    id: 2,
    title: "2. Use of the Site",
    content:
      "You agree to use the site for lawful purposes only and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the site. Prohibited behavior includes harassing or causing distress to any person, transmitting obscene or offensive content, or disrupting normal flow of dialogue."
  },
  {
    id: 3,
    title: "3. Intellectual Property",
    content:
      "All content on this website, including text, graphics, logos, and images, is the property of the company or its licensors and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or exploit any content without prior written permission."
  },
  {
    id: 4,
    title: "4. User Accounts",
    content:
      "If you create an account on our platform, you are responsible for maintaining the confidentiality of your login information and for all activities that occur under your account."
  },
  {
    id: 5,
    title: "5. Limitation of Liability",
    content:
      "We are not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages."
  },
  {
    id: 6,
    title: "6. Termination",
    content:
      "We reserve the right to terminate or suspend your access to our website or services at any time, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users or the business."
  },
  {
    id: 7,
    title: "7. Changes to These Terms",
    content:
      "We may modify these Terms and Conditions from time to time. Any changes will be effective immediately upon posting. Continued use of the site indicates your acceptance of the updated terms."
  },
  {
    id: 8,
    title: "8. Contact Us",
    content:
      "If you have any questions about these Terms and Conditions, please contact us at support@example.com. We are here to help and provide clarity where needed."
  }
];

export default function TermsAndConditionsPage() {
  return (
    <>
        <PageBanner title='Terms & Condtions' bgImage={termsAndConditions} />

      {/* Main Content */}
      <section className="bg-gray-50 py-5 lg:py-16 lg:px-4">
        <div className="max-w-5xl mx-auto space-y-2 lg:space-y-12">
          {termsSections.map((section) => (
            <div
              key={section.id}
              className="bg-white lg:shadow-lg rounded-xl px-4 py-4 md:px-8 md:py-8 transition-transform duration-300 hover:scale-[1.02]"
            >
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-200 py-12 lg:mt-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-xl font-medium text-gray-800">Questions about our terms?</h3>
          <p className="text-gray-600 mt-2">
            Contact us at{" "}
            <a href="mailto:support@example.com" className="text-blue-600 underline">
              support@example.com
            </a>{" "}
            and we’ll get back to you shortly.
          </p>
        </div>
      </section>
    </>
  );
}
