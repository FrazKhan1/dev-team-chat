import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetMembersProps {
  workSpaceId: Id<"workspaces">;
}

export const useGetMembers = ({ workSpaceId }: UseGetMembersProps) => {
  const data = useQuery(api.members.get, {
    workSpaceId,
  });

  const isLoading = data === undefined;

  return { isLoading, data };
};
