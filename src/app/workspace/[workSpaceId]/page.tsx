"use client";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import React from "react";

const WorkSpaceId = () => {
  const workSpaceId = useWorkSpaceId();

  return <div>ID :{workSpaceId}</div>;
};

export default WorkSpaceId;
