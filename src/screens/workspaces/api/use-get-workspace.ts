import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetWorkspacePrps {
  id: Id<"workspaces">;
}
export const useGetWorkspace = ({ id }: UseGetWorkspacePrps) => {
  const data = useQuery(api.workspaces.getById, { id });
  const isLoading = data === undefined;

  return { isLoading, data };
};
