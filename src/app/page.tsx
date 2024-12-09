"use client";
import UserButton from "@/screens/auth/components/user-button";
import { useGetWorkspaces } from "@/screens/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModel } from "@/screens/workspaces/store/use-create-workspace-model";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
const Home = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModel();
  const { isLoading, data } = useGetWorkspaces();

  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workSpaceId) {
      router.replace(`/workspace/${workSpaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workSpaceId, isLoading, open, setOpen, router]);
  return <UserButton />;
};

export default Home;
