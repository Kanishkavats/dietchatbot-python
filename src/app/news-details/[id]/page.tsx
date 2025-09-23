import Newsdetails from "@/src/components/Newsdetail";
import { bannerBg } from "@/public/assets";
import PageBanner from "@/src/components/common/PageBanner";
import SideAllCom from "@/src/components/Latestnews/AllSideComponent";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function SingleBlogPreview({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <PageBanner bgImage={bannerBg} title="Blog Details" />
      {/* <Newsdetails id={id} />  */}
      <div className="container mt-0 max-[719px]:mt-20 md:p-15 lg:pt-25 lg:pl-16 lg:pr-16 p-1 sm:p-4 mx-auto">
        <div className="grid grid-cols-1 xl:grid xl:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Newsdetails id={id} />
          </div>
          <div className="col-span-1">
            <SideAllCom />
          </div>
        </div>
      </div>
    </div>
  );
}
