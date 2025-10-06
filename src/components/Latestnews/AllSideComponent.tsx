import Sidebar from "../common/sideBar";
import RecentPosts from "../RecentPosts";
import AuthorCard from "./AuthorCard";
import Categories from "./Categories";
import PopularTags from "./PopularTags";
import SearchBox from "./SearchBox";

export default function SideAllCom() {
    return(
        <div className=" w-full space-y-5">
         <AuthorCard />
        {/* <SearchBox  />
        <RecentPosts /> */}
        <Sidebar pathName="news-details" as="Recent Post" bgColor="bg-light-gray"  />
        <Categories />
        <PopularTags />
        </div>
    )
}