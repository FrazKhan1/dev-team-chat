import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/controllers/workspaces/api/use-new-join-code";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workSpaceId = useWorkSpaceId();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate the current invite code and generate new invite code"
  );

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workSpaceId}`;

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite copied successfully"));
  };
  const { mutate, isPending } = useNewJoinCode();

  const handleNewCode = async () => {
    const ok = await confirm();
    if (!ok) return;
    mutate(
      { workSpaceId },
      {
        onSuccess: () => {
          toast.success("New join code generated successfully");
        },
        onError: () => {
          toast.error("failed to generate join codeI");
        },
      }
    );
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite peoplw to your {name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="text-4xl font-bold tracking-widest uppercase">
              {joinCode}
            </p>
            <Button onClick={handleCopy} variant="ghost" size="sm">
              Copy Link <CopyIcon className="size-4 ml-2" />{" "}
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <Button
              onClick={handleNewCode}
              disabled={isPending}
              variant="outline"
            >
              New Code <RefreshCcw className="size-4 ml-2" />{" "}
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
