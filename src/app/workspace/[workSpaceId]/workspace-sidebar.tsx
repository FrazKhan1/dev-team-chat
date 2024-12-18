import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/controllers/members/api/user-current-member";
import { useGetWorkspace } from "@/controllers/workspaces/api/use-get-workspace";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { useGetChannels } from "@/controllers/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";
import { useGetMembers } from "@/controllers/channels/api/use-get-members";
import { UserItem } from "./user-item";

export const WorkspaceSidebar = () => {
  const workSpaceId = useWorkSpaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workSpaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workSpaceId,
  });

  const { data: channels, isLoading: channelLoading } = useGetChannels({
    workSpaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workSpaceId,
  });

  if (memberLoading || workspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!member || !workspace) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5  text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem lable="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem lable="Drafts & Sent" icon={SendHorizontal} id="drafts" />
      </div>
      <WorkspaceSection label="Channels" hint="new channel" onNew={() => []}>
        {channels?.map((item) => {
          return (
            <SidebarItem
              key={item?._id}
              lable={item?.name}
              icon={HashIcon}
              id={item?._id}
            />
          );
        })}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="new direct message"
        onNew={() => []}
      >
        {members?.map((item) => {
          return (
            <UserItem
              key={item?._id}
              id={item?._id}
              label={item.user.name}
              image={item?.user.image}
            />
          );
        })}
      </WorkspaceSection>
    </div>
  );
};
