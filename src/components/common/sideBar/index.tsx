'use client'
import { tags } from "@/src/staticResource";
import Recent from "./Recent";
import SearchBox from "./SearchBox";
import TagList from "./TagList";
import { useFetchAllCampaigns } from "@/src/hooks/useCampaigns";
import { usePathname } from "next/navigation";
const page=1;
interface props{
 diss?:string;
}
export default function Sidebar({diss}:props) {

    const pathname=usePathname();
    const routeName = pathname.split("/")[1];

    let apiType;
    if (routeName === "donate-us"||routeName === "campaigns") {
    apiType = "campaigns";
    }else if (routeName === "blog") {
        apiType = "blogs";
    }

    const {data,isLoading,isError}=routeName==='donate-us'?useFetchAllCampaigns(page, 10):useFetchAllCampaigns(page,10)
    return(
        <div className="space-y-6">
            <SearchBox/>
            <Recent bgColor={'bg-white'} name={'Recent Cause'} causes={data} route={routeName} />
            <TagList
                tags={tags}
                onClick={(tag: string) => console.log("Clicked tag:", tag)}
              />
        </div>
    )
}