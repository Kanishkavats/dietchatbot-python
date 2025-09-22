import Newsdetails from "@/src/components/Newsdetail";
import { bannerBg } from "@/public/assets";
import PageBanner from "@/src/components/common/PageBanner";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function SingleBlogPreview({params}:Props) {
    const { id } = await params;
    return(
        <div>
             <PageBanner bgImage={bannerBg} title="Blog Details" />
             <Newsdetails id={id} /> 
        </div>
    )
}