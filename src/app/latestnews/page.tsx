// import Newslist from "@/src/components/Newslist";


import PageBanner from '../../components/common/PageBanner'
import { bannerBg } from "@/public/assets";
import Paginationlogic from '../../components/Paginationlogic'




export default function NewsPage() {
  return (
    <>

       
      <PageBanner bgImage={bannerBg} title="Latest news" />
      {/* <Newslist /> */}
       <Paginationlogic/> 
      
      
    </>
  );
}