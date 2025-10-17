'use client'
import Recent from "./Recent";
import SearchBox from "./SearchBox";
import { useFetchAllCampaigns } from "@/src/hooks/useCampaigns";
import { usePathname } from "next/navigation";
import { useFetchAllBlogs } from "@/src/hooks/useBlog";
import { useState } from "react";
import useDebounce from "@/src/hooks/useDebounce";
import { useTranslation } from 'react-i18next';

interface props{
 pathName?:string;
 as?: "Recent Cause" | "Recent Post";
 bgColor?:string;
}
export default function Sidebar({pathName,as='Recent Cause',bgColor='bg-white'}:props) {
    const[searchText,setSearchtext]=useState<string>('');
    const debounceValue=useDebounce(searchText,100);
    const { t } = useTranslation();

    const pathname=usePathname();
    const routeName = pathname.split("/")[1];

    let apiType;
    if (routeName === "donate-us"||routeName === "campaign") {
    apiType = "campaign";
    }else if (routeName === "news-details") {
        apiType = "blogs";
    }
    console.log(debounceValue)
    const {data,isLoading,isError}=routeName==='donate-us'?useFetchAllCampaigns(1, 4,debounceValue): routeName === 'campaign'? useFetchAllCampaigns(1,4,debounceValue):useFetchAllBlogs(1, 4,debounceValue);
    
    return(
        <div className="space-y-6">
            <SearchBox bgColor={bgColor} setSearchtext={setSearchtext} searchText={searchText}/>
            <Recent bgColor={bgColor} name={as} causes={data} route={routeName} />
        </div>
    )
}