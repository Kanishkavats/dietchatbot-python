import { MdOutlineDashboardCustomize, MdNotificationsActive, MdCampaign, MdCategory } from "react-icons/md";
import { FaBloggerB, FaComments } from "react-icons/fa";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";

export const sidebarAd = [
  {
    icon: MdOutlineDashboardCustomize,
    lable: "Dashboard",
    nav: "dashboard",
    link: "/admin/dashboard",
},
{
    icon: FaBloggerB,
    lable: "Blog",
    nav: "blog",
    link: "/admin/blog",
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
    icon: FaComments ,
    lable: "Comments",
    nav: "comments",
    link: "/admin/comments",
  },
  {
    icon: PiFlagBannerFill,
    lable: "Banner",
    nav: "banner",
    link: "/admin/banner",
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
    icon: IoSettings,
    lable: "Settings",
    nav: "settings",
    link: "/admin/settings",
  },

];
