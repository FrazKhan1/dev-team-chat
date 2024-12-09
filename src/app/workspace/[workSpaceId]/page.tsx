"use client";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/screens/workspaces/api/use-get-workspace";
import React from "react";

const WorkSpaceId = () => {
  const workSpaceId = useWorkSpaceId();
  const { data } = useGetWorkspace({ id: workSpaceId });
  return <div>Data </div>;
};

export default WorkSpaceId;
