
import Ourteam from "@/src/components/Ourteam";
import PageBanner from '../../components/common/PageBanner'
import { ourteambanner } from "@/public/assets";



  


const OurteamPage = () => {
  return (
    <>
      <PageBanner bgImage={ourteambanner} title="Our Team" />
      <Ourteam />
    </>
          

          
     
  );
};

export default OurteamPage;