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

export const CreateChannelModal = () => {
  const [open, setOpen] = useCreateChannelModel();
  const [name, setName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            value={name}
            disabled={false}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g. plan-budget"
          />
        </form>
        <div className="flex justify-end">
          <Button>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
