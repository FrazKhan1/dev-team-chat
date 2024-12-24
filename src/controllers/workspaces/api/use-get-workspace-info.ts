import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetWorkspaceInfoPrps {
  id: Id<"workspaces">;
}
export const useGetWorkspaceInfo = ({ id }: UseGetWorkspaceInfoPrps) => {
  const data = useQuery(api.workspaces.getInfoById, { id });
  const isLoading = data === undefined;

  return { isLoading, data };
};
