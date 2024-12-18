import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { useRemoveWorkspace } from "@/controllers/workspaces/api/use-remove-workspaces";
import { useUpdateWorkspace } from "@/controllers/workspaces/api/use-update-workspaces";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface PrefrencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PrefrencesModal = ({
  open,
  setOpen,
  initialValue,
}: PrefrencesModalProps) => {
  const workSpaceId = useWorkSpaceId();
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();

  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to remove?",
    "This action is irreversible"
  );

  const handleUpdateWorkspace = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      {
        id: workSpaceId,
        name: value,
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          toast.success("Workspace updated successfully");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;
    removeWorkspace(
      {
        id: workSpaceId,
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          toast.success("Workspace removed successfully");
          router.replace("/");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <div className="px-5 py-4 bg-white rounded-lg border  hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Workspace name</p>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold cursor-pointer">
                      Edit
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Workspace Name</DialogTitle>
                    </DialogHeader>
                    <form
                      className="space-y-4"
                      onSubmit={handleUpdateWorkspace}
                    >
                      <Input
                        value={value}
                        disabled={isUpdatingWorkspace}
                        onChange={(e) => setValue(e.target.value)}
                        required
                        autoFocus
                        placeholder="Workspace Name"
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            disabled={isUpdatingWorkspace}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          onClick={() => {}}
                          disabled={isUpdatingWorkspace}
                        >
                          Save
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-sm">{value}</p>
            </div>

            <button
              onClick={handleRemove}
              disabled={isRemovingWorkspace}
              className="flex items-center gap-x-2 py-4 px-5 bg-white cursor-pointer rounded-lg border hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
