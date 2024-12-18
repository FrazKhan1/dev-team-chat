import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelsProps {
  workSpaceId: Id<"workspaces">;
}

export const useGetChannels = ({ workSpaceId }: UseGetChannelsProps) => {
  const data = useQuery(api.channels.get, {
    workSpaceId,
  });

  const isLoading = data === undefined;

  return { isLoading, data };
};
