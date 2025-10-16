

"use client";

import React from "react";
import Banner from "@/src/components/PageBanner/Banner";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Banner
        Heading={t("PrivacyPolicy.Heading")}
        BannerMoto={t("PrivacyPolicy.BannerMoto")}
      />

      <section className="max-w-4xl mx-auto px-4 py-12 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPolicy.IntroductionTitle")}
        </h2>
        <p className="mb-6">{t("PrivacyPolicy.IntroductionText")}</p>

        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPolicy.InformationTitle")}
        </h2>
        <p className="mb-6">{t("PrivacyPolicy.InformationText")}</p>
        <ul className="list-disc list-outside pl-4 mb-6 space-y-2">
          {t("PrivacyPolicy.InformationList", { returnObjects: true }).map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPolicy.UsageTitle")}
        </h2>
        <p className="mb-6">{t("PrivacyPolicy.UsageText")}</p>
        <ul className="list-disc list-outside pl-4 mb-6 space-y-2">
          {t("PrivacyPolicy.UsageList", { returnObjects: true }).map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPolicy.DataProtectionTitle")}
        </h2>
        <p className="mb-6">{t("PrivacyPolicy.DataProtectionText")}</p>

        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPolicy.SharingTitle")}
        </h2>
        <p className="mb-6">{t("PrivacyPolicy.SharingText")}</p>

        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPolicy.RightsTitle")}
        </h2>
        <p className="mb-6">{t("PrivacyPolicy.RightsText")}</p>

        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPolicy.ChangesTitle")}
        </h2>
        <p className="mb-6">{t("PrivacyPolicy.ChangesText")}</p>

        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPolicy.ContactTitle")}
        </h2>
        <p>
          {t("PrivacyPolicy.ContactText", { email: "support@example.com" })}
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
