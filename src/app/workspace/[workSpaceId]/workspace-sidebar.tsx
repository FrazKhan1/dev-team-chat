import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/screens/members/api/user-current-member";
import { useGetWorkspace } from "@/screens/workspaces/api/use-get-workspace";
import {
  AlertTriangle,
  Loader,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkSpaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workSpaceId: workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
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
    </div>
  );
};
