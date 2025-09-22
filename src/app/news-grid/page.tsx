
import PageBanner from '../../components/common/PageBanner'
import { bannerBg } from "@/public/assets";
import Paginationlogic from '../../components/Paginationlogic'
import LatestNews from '../../components/Latestnews';



export default function NewsPage() {
    return (
        <>
            <PageBanner bgImage={bannerBg} title="Latest news" />
            <LatestNews />
            {/* <Paginationlogic/> */}




        </>
    );
}
