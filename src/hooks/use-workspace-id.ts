import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useWorkSpaceId = () => {
  const params = useParams();
  return params.workSpaceId as Id<"workspaces">;
};
