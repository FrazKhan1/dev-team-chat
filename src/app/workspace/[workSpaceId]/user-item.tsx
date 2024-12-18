import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 overflow-hidden text-sm",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
}

export const UserItem = ({ id, label, image, variant }: UserItemProps) => {
  const workSpaceId = useWorkSpaceId();
  const avatarFallback = label?.charAt(0).toUpperCase();
  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(userItemVariants({ variant }))}
      asChild
    >
      <Link href={`/workspace/${workSpaceId}/channel/${id}`}>
        <Avatar className="size-5 rounded-mg mr-1">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
