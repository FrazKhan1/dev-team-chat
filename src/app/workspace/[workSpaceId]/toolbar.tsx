import { Button } from "@/components/ui/button";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/controllers/workspaces/api/use-get-workspace";
import { Info, Search } from "lucide-react";

export const Toolbar = () => {
  const workSpaceId = useWorkSpaceId();
  const { data } = useGetWorkspace({ id: workSpaceId });
  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5 ">
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-sx">Search {data?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className=" size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
