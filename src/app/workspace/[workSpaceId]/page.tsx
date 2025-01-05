"use client";
import { useGetChannels } from "@/controllers/channels/api/use-get-channels";
import { useCreateChannelModel } from "@/controllers/channels/store/use-create-channel-model";
import { useCurrentMember } from "@/controllers/members/api/user-current-member";
import { useGetWorkspace } from "@/controllers/workspaces/api/use-get-workspace";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const WorkSpaceId = () => {
  const router = useRouter();
  const workSpaceId = useWorkSpaceId();
  const [open, setOpen] = useCreateChannelModel();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workSpaceId,
  });

  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workSpaceId,
  });

  const { data: member, isLoading: membersLoading } = useCurrentMember({
    workSpaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      membersLoading ||
      !member ||
      !workspace
    )
      return;
    if (channelId) {
      router.push(`/workspace/${workSpaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelId,
    workspaceLoading,
    channelsLoading,
    membersLoading,
    member,
    workspace,
    router,
    open,
    workSpaceId,
    setOpen,
    isAdmin,
  ]);

  if (workspaceLoading || channelsLoading || membersLoading) {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex flex-col items-center justify-center gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">No Channel Found</span>
    </div>
  );
};

export default WorkSpaceId;
