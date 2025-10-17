import Sidebar from "../common/sideBar";
import AuthorCard from "./AuthorCard";
import { useTranslation } from "react-i18next";

export default function SideAllCom() {
    const { t } = useTranslation();
    return(
        <div className=" w-full space-y-5">
         {/* <AuthorCard /> */}
        
        <Sidebar pathName="news-details" as={t("Recent Post")} bgColor="bg-light-gray"  />
        </div>
    )
}