import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/screens/members/api/user-current-member";
import { useGetWorkspace } from "@/screens/workspaces/api/use-get-workspace";
import { AlertTriangle, Loader } from "lucide-react";

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

  return <div>workspace sidebari</div>;
};
