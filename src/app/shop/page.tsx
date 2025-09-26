
import Checkout from "@/src/components/Checkout";
import PageBanner from '../../components/common/PageBanner'
import { bannerBg } from "@/public/assets";



  


const shopPage = () => {
  return (
    <>
      <PageBanner bgImage={bannerBg} title="Checkout" />
      <Checkout />
    </>
          

          
     
  );
};

export default shopPage;