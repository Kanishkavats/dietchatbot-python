"use client";
import React, { JSX, useState } from "react";
import AdminSideBarTab from "./AdminSidebarTab";
import Dashboard from "../Dashboard";
import Notifications from "../Notifications";
import Members from "../Members";
import Help from "../Help";
import Guide from "../Guide";
import Settings from "../Settings";

const AdminTab = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const Tab: { [key: string]: JSX.Element } = {
    dashboard: <Dashboard />,
    notifications: <Notifications />,
    members: <Members />,
    help: <Help />,
    guide: <Guide />,
    settings: <Settings />,
  };
  return (
    <div>
      <div className="relative flex gap-2 h-screen">
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
