
import Ourteam from "@/src/components/Ourteam";
import PageBanner from '../../components/common/PageBanner'
import { bannerBg } from "@/public/assets";



  


const OurteamPage = () => {
  return (
    <>
      <PageBanner bgImage={bannerBg} title="Our Team" />
      <Ourteam />
    </>
          

          
     
  );
};

export default OurteamPage;