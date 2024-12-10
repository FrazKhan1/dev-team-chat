"use client";
import React from "react";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}
const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
  return (
    <div>
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId="fa-workspace">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E3C5F]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
