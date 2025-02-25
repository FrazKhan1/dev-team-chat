import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseWorkspaceIdProps {
  workSpaceId: Id<"workspaces">;
}

export const useCurrentMember = ({ workSpaceId }: UseWorkspaceIdProps) => {
  const data = useQuery(api.members.current, { workSpaceId });
  const isLoading = data === undefined;

  return { isLoading, data };
};
