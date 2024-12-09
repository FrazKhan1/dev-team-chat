"use client";
import React from "react";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}
const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
  return (
    <div>
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
