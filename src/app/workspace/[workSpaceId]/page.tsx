"use client";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { UseGetWorkspace } from "@/screens/workspaces/api/use-get-workspace";
import React from "react";

const WorkSpaceId = () => {
  const workSpaceId = useWorkSpaceId();
  const { data } = UseGetWorkspace({ id: workSpaceId });

  return <div>Data :{JSON.stringify(data)}</div>;
};

export default WorkSpaceId;
