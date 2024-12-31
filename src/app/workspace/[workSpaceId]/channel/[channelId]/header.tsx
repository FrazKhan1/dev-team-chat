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
import { useRemoveChannel } from "@/controllers/channels/api/use-remove-channel";
import { useUpdateChannel } from "@/controllers/channels/api/use-update-channel";
import { useCurrentMember } from "@/controllers/members/api/user-current-member";
import { useChannelId } from "@/hooks/use-channel-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete this channel",
    "This will permanently delete the channel and all its messages"
  );
  const [value, setValue] = useState(title);
  const [editOpen, setEditOpen] = useState(false);

  const channelId = useChannelId();
  const workSpaceId = useWorkSpaceId();

  const { data: member } = useCurrentMember({ workSpaceId });
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  const { mutate: updateChannel, isPending: updatingChannel } =
    useUpdateChannel();

  const { mutate: removeChannel, isPending: removingChannel } =
    useRemoveChannel();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChannel(
      { id: channelId, name: value },
      {
        onSuccess: () => {
          toast.success("Channel updated successfully");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update channel");
        },
      }
    );
  };

  const handleOpen = (value: boolean) => {
    if (!isAdmin) return;

    setEditOpen(value);
  };

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    removeChannel(
      { id: channelId },
      {
        onSuccess: () => {
          toast.success("Channel deleted successfully");
          router.push(`/workspace/${workSpaceId}`);
        },
        onError: () => {
          toast.error("Failed to delete channel");
        },
      }
    );
  };
  return (
    <>
      <ConfirmDialog />
      <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-lg font-semibold px-2 overflow-hidden w-auto"
            >
              <span className="truncate"># {title}</span>
              <FaChevronDown className="size-2.5 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white">
              <DialogTitle># {title}</DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <div className="px-5 py-4 bg-white rounded-lg border hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold"> Channel Name </p>
                  <Dialog open={editOpen} onOpenChange={handleOpen}>
                    <DialogTrigger>
                      {isAdmin && (
                        <p className="text-sm cursor-pointer  text-[#1264a3] hover:underline font-semibold ">
                          Edit
                        </p>
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rename Channel</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          value={value}
                          required
                          autoFocus
                          onChange={handleChange}
                          disabled={updatingChannel || removingChannel}
                          maxLength={80}
                          minLength={3}
                          placeholder="e.g. plan-budget"
                        />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              disabled={updatingChannel || removingChannel}
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button disabled={updatingChannel || removingChannel}>
                            Save
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-sm"> # {title} </p>
              </div>
              [isAdmin && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 text-rose-600 "
              >
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete Channel</p>
              </button>
              )]
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Header;
