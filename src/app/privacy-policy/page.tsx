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
      {/* <section className="max-w-4xl mx-auto px-4 py-12 text-gray-700 leading-relaxed">
        {text[lang].sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-[18px] 2xl:text-2xl xl:text-2xl lg:text-2xl sm:text-text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="mb-6 text-[14px] 2xl:text-[16px] xl:text-[16px] lg:text-[16px] sm:text-[16px]">{section.content}</p>
            {section.list && (
              <ul className="list-disc list-outside pl-4 mb-6 space-y-2">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section> */}
    </div>
  );
};

export default PrivacyPolicy;
