import Sidebar from "../common/sideBar";

import AuthorCard from "./AuthorCard";
import Categories from "./Categories";
import PopularTags from "./PopularTags";


export default function SideAllCom() {
    return(
        <div className=" w-full space-y-5">
         {/* <AuthorCard /> */}
        
        <Sidebar pathName="news-details" as="Recent Post" bgColor="bg-light-gray"  />
        <Categories />
        <PopularTags />
        </div>
    )
}