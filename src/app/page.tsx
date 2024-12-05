"use client";
import UserButton from "@/screens/auth/components/user-button";
import { UseGetWorkspaces } from "@/screens/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModel } from "@/screens/workspaces/store/use-create-workspace-model";
import React, { useEffect, useMemo } from "react";
const Home = () => {
  const [open, setOpen] = useCreateWorkspaceModel();
  const { isLoading, data } = UseGetWorkspaces();

  const workspaceID = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceID) {
      console.log("Redirect workspace");
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceID, isLoading, open, setOpen]);
  return <UserButton />;
};

export default Home;
