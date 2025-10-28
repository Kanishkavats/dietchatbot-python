"use client";
import React, { JSX, useState } from "react";
import AdminSideBarTab from "./AdminSidebarTab";
import Dashboard from "../Dashboard";
import Notifications from "../Notifications";
import Members from "../Members";
import Settings from "../Settings";
import Campaign from "../Campaign";
import Category from "../Category";
import Blog from "../Blog";
import Comments from "../comments";
import Banner from "../Banner";
import Queries from "../Queries";
import Feedback from "../Feedback";
import Event from "../event";

const AdminTab = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const Tab: { [key: string]: JSX.Element } = {
    dashboard: <Dashboard />,
    // notifications: <Notifications />,
    members: <Members />,
    settings: <Settings />,
    campaign: <Campaign />,
    event:<Event />,
    category: <Category />,
    blog:<Blog />,
    comments: <Comments />,
    banner:<Banner />,
    queries:<Queries />,
    feedback:<Feedback />
  };
  return (
    <div>
      <div className="relative md:flex gap-2 h-screen ">
        <AdminSideBarTab
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="pt-12  max-h-screen  overflow-y-scroll w-full px-5">{Tab[activeTab]}</div>
      </div>
    </div>
  );
};

export default AdminTab;
