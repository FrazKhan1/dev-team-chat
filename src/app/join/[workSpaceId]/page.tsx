"use client";
import { Button } from "@/components/ui/button";
import { useGetWorkspaceInfo } from "@/controllers/workspaces/api/use-get-workspace-info";
import { useJoin } from "@/controllers/workspaces/api/use-join";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";

const JoinPage = () => {
  const workSpaceId = useWorkSpaceId();
  const router = useRouter();
  const { data, isLoading } = useGetWorkspaceInfo({ id: workSpaceId });
  const { mutate, isPending } = useJoin();
  const [checkMember, setCheckMember] = useState(false);

  const isMember = useMemo(() => data?.isMember, [data?.isMember]);

  useEffect(() => {
    if (isMember) {
      setCheckMember(true);
    }
  }, [isMember, router, workSpaceId]);

  const handleComplete = (value: string) => {
    mutate(
      { workSpaceId, joinCode: value },
      {
        onSuccess: (id) => {
          router.replace(`/workspace/${id}`);
          toast.success("Workspace joined successfully");
        },
        onError: () => {
          toast.error("Invalid join Code");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="relative h-full w-full">
      <div
        className={cn(
          "h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md transition duration-300",
          checkMember && "backdrop-blur-sm opacity-50 pointer-events-none"
        )}
      >
        <Image width={60} height={60} src="/logo.svg" alt="logo" />
        <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
          <div className="flex flex-col gap-y-2 items-center justify-center">
            <h1 className="text-2xl font-bold">Join {data?.name}</h1>
            <p className="text-md text-muted-foreground">
              Enter the workspace code to join
            </p>
          </div>
          <VerificationInput
            onComplete={handleComplete}
            length={6}
            classNames={{
              container: cn(
                "flex gap-x-2",
                isPending && "opacity-50 cursor-not-allowed"
              ),
              character:
                "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500 ",
              characterInactive: "bg-muted",
              characterSelected: "bg-white text-black",
              characterFilled: "bg-white text-black",
            }}
            autoFocus
          />
        </div>
        <div className="flex gap-x-4">
          <Button size="lg" variant="outline" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>

      {checkMember && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
          <p className="text-white text-lg mb-5 font-bold">
            You cannot join this workspace because you are already a member of
            this workspace
          </p>
          <div className="flex gap-x-4">
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinPage;
