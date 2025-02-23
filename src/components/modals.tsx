"use client";
import { CreateChannelModal } from "@/controllers/channels/components/create-channel-modal";
import { CreateWorkSpaceModal } from "@/controllers/workspaces/components/create-workspace-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <CreateChannelModal />
      <CreateWorkSpaceModal />
    </>
  );
};
