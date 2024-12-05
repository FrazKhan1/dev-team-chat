import { Input } from "@/components/ui/input";
import { useCreateWorkspaceModel } from "../store/use-create-workspace-model";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CreateWorkSpaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModel();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form>
          <Input
            value=""
            placeholder="e.g Work, Home, Product, Meetings"
            minLength={3}
            autoFocus
            disabled={false}
            required
          />
        </form>
        <div className="flex justify-end">
          <Button>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
