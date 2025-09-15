import { MdOutlineDashboardCustomize, MdNotificationsActive, MdIntegrationInstructions, MdCampaign, MdCategory } from "react-icons/md";
import { FaBloggerB, FaHandsHelping } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { IconType } from "react-icons";

interface SidebarItem {
  icon?: IconType;
  lable: string;
  nav?: string;
  link: string;
}

export const sidebarAd = [
  {
    icon: MdOutlineDashboardCustomize,
    lable: "Dashboard",
    nav: "dashboard",
    link: "/admin/dashboard",
},
{
    icon: MdCampaign ,
    lable: "Campaign",
    nav: "campaign",
    link: "/admin/campaign",
  },
{
    icon: MdCategory  ,
    lable: "Category",
    nav: "category",
    link: "/admin/category",
  },
{
    icon: FaBloggerB,
    lable: "Blog",
    nav: "blog",
    link: "/admin/blog",
  },
{
    icon: MdNotificationsActive,
    lable: "Notifications",
    nav: "notifications",
    link: "/admin/notifications",
},
{
    icon: HiUsers,
    lable: "Members",
    nav: "members",
    link: "/admin/members",
},
{
    icon: FaHandsHelping,
    lable: "Help",
    nav: "help",
    link: "/admin/help",
},
{
    icon: MdIntegrationInstructions,
    lable: "Guide & Instructions",
    nav: "guide",
    link: "/admin/guide",
},
{
    icon: IoSettings,
    lable: "Settings",
    nav: "settings",
    link: "/admin/settings",
  },

];
