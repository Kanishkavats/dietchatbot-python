'use client'
import { tags } from "@/src/staticResource";
import Recent from "./Recent";
import SearchBox from "./SearchBox";
import TagList from "./TagList";
import { useFetchAllCampaigns } from "@/src/hooks/useCampaigns";
import { usePathname } from "next/navigation";
import { useFetchAllBlogs } from "@/src/hooks/useBlog";
const page=1;
interface props{
 pathName?:string;
 as?: "Recent Cause" | "Recent Post";
 bgColor?:string;
}
export default function Sidebar({pathName,as='Recent Cause',bgColor='bg-white'}:props) {

    const pathname=usePathname();
    const routeName = pathname.split("/")[1];

    let apiType;
    if (routeName === "donate-us"||routeName === "campaign") {
    apiType = "campaign";
    }else if (routeName === "news-details") {
        apiType = "blogs";
    }
    const {data,isLoading,isError}=routeName==='donate-us'?useFetchAllCampaigns(page, 10): routeName === 'campaign'? useFetchAllCampaigns(page,10):useFetchAllBlogs(page, 10);
    return(
        <div className="space-y-6">
            <SearchBox bgColor={bgColor}/>
            <Recent bgColor={bgColor} name={as} causes={data} route={routeName} />
            <TagList
                bgColor={bgColor}
                tags={tags}
                onClick={(tag: string) => console.log("Clicked tag:", tag)}
              />
        </div>
    )
}