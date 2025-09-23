import RecentPosts from "../RecentPosts";
import AuthorCard from "./AuthorCard";
import Categories from "./Categories";
import PopularTags from "./PopularTags";
import SearchBox from "./SearchBox";

export default function SideAllCom() {
    return(
        <div className=" w-full">
         <AuthorCard />
        <SearchBox  />
        <RecentPosts />
        <Categories />
        <PopularTags />
        </div>
    )
}