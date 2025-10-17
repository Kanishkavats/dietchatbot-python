
"use client";
import PageBanner from '../../components/common/PageBanner'
import { latestnewsbanner } from "@/public/assets";
import Paginationlogic from '../../components/Paginationlogic'
import LatestNews from '../../components/Latestnews';
import { useTranslation } from 'react-i18next';



export default function NewsPage() {
    const { t } = useTranslation();
    return (
        <>
            <PageBanner bgImage={latestnewsbanner} title={t("Latest news")} />
            <LatestNews />
            {/* <Paginationlogic/> */}




        </>
    );
}
