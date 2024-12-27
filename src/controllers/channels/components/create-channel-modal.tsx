import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateChannelModel } from "../store/use-create-channel-model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const CreateChannelModal = () => {
  const [open, setOpen] = useCreateChannelModel();
  const [name, setName] = useState("");

  const router = useRouter();
  const workSpaceId = useWorkSpaceId();
  const { mutate, isPending } = useCreateChannel();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, workSpaceId },
      {
        onSuccess: (id) => {
          handleClose();
          toast.success("Channel created successfully");
          router.push(`/workspace/${workSpaceId}/channel/${id}`);
        },
        onError: () => {
          toast.error("Failed to create channel");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            disabled={isPending}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g. plan-budget"
          />
          <div className="flex justify-end">
            <Button>Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
