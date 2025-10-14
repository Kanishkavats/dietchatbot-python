'use client'
import { tags } from "@/src/staticResource";
import Recent from "./Recent";
import SearchBox from "./SearchBox";
import TagList from "./TagList";
import { useFetchAllCampaigns } from "@/src/hooks/useCampaigns";
import { usePathname } from "next/navigation";
import { useFetchAllBlogs } from "@/src/hooks/useBlog";
import { useState } from "react";
import useDebounce from "@/src/hooks/useDebounce";
const page=1;
interface props{
 pathName?:string;
 as?: "Recent Cause" | "Recent Post";
 bgColor?:string;
}
export default function Sidebar({pathName,as='Recent Cause',bgColor='bg-white'}:props) {
    const[searchText,setSearchtext]=useState<string>('');
    const debounceValue=useDebounce(searchText,100);

    const pathname=usePathname();
    const routeName = pathname.split("/")[1];

    let apiType;
    if (routeName === "donate-us"||routeName === "campaign") {
    apiType = "campaign";
    }else if (routeName === "news-details") {
        apiType = "blogs";
    }
    console.log(debounceValue)
    const {data,isLoading,isError}=routeName==='donate-us'?useFetchAllCampaigns(page, 10,debounceValue): routeName === 'campaign'? useFetchAllCampaigns(page,10,debounceValue):useFetchAllBlogs(page, 10,debounceValue);
    return(
        <div className="space-y-6">
            <SearchBox bgColor={bgColor} setSearchtext={setSearchtext} searchText={searchText}/>
            <Recent bgColor={bgColor} name={as} causes={data} route={routeName} />
            <TagList
                bgColor={bgColor}
                tags={tags}
                onClick={(tag: string) => console.log("Clicked tag:", tag)}
              />
        </div>
    )
}