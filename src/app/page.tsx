"use client";
import UserButton from "@/screens/auth/components/user-button";
import { UseGetWorkspaces } from "@/screens/workspaces/api/use-get-workspaces";
import React, { useEffect, useMemo } from "react";
const Home = () => {
  const { isLoading, data } = UseGetWorkspaces();

  const workspaceID = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceID) {
      console.log("Redirect workspace");
    } else {
      console.log("Redirect sign-in");
    }
  }, [workspaceID, isLoading]);
  return <UserButton />;
};

export default Home;
