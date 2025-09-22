import Newsdetails from "@/src/components/Newsdetail";

import PageBanner from '../../components/common/PageBanner'
import { bannerBg } from "@/public/assets";




export default function Newsdetail() {
  return (
    <>
      <PageBanner bgImage={bannerBg} title="Blog Details" />
      <Newsdetails id='' />


    </>
  );
}
