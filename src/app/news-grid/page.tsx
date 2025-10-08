
import PageBanner from '../../components/common/PageBanner'
import { latestnewsbanner } from "@/public/assets";
import Paginationlogic from '../../components/Paginationlogic'
import LatestNews from '../../components/Latestnews';



export default function NewsPage() {
    return (
        <>
            <PageBanner bgImage={latestnewsbanner} title="Latest news" />
            <LatestNews />
            {/* <Paginationlogic/> */}




        </>
    );
}
