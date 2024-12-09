"use client";
import React from "react";
import { Toolbar } from "./toolbar";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}
const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
  return (
    <div>
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkSpaceIdLayout;
