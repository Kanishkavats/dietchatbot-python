"use client";
import Newsdetails from "@/src/components/Newsdetail";
import PageBanner from '../../components/common/PageBanner'
import { bannerBg } from "@/public/assets";
import { useTranslation } from "react-i18next";

export default function Newsdetail() {
  const { t } = useTranslation();
  return (
    <>
      <PageBanner bgImage={bannerBg} title={t("Blog Details")} />
      <Newsdetails id='' />
    </>
  );
}
