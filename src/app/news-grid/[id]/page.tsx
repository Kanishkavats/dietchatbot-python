"use client";
import React from "react";
import Newsdetails from "@/src/components/Newsdetail";
import { bannerBg } from "@/public/assets";
import PageBanner from "@/src/components/common/PageBanner";
import SideAllCom from "@/src/components/Latestnews/AllSideComponent";
import { useTranslation } from "react-i18next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function SingleBlogPreview({ params }: Props) {
  const { t } = useTranslation();
  const [id, setId] = React.useState<string>("");
  
  React.useEffect(() => {
    params.then(({ id: paramId }) => setId(paramId));
  }, [params]);
  
  if (!id) return <div>Loading...</div>;
  
  return (
    <section>
      <PageBanner bgImage={bannerBg} title={t("Blog Details")} />
      <section className="bg-white py-16  text-gray-green flex justify-center items-center w-full">
        <div className="max-w-7xl xl:max-w-[1440px] xl:px-20 xl:py-18 px-2 py-10 md:px-18 md:py-15 ">
          <div className=" grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 relative">
              <Newsdetails id={id} />
            </div>
            <div className="col-span-1 space-y-5">
              <SideAllCom />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
