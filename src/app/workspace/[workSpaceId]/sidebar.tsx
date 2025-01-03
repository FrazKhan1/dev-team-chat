import UserButton from "@/controllers/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col items-center gap-y-4 pt-[9px] pb-4 ">
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label="Home" isActive={true} />
      <SidebarButton icon={MessagesSquare} label="Dms" isActive={false} />
      <SidebarButton icon={Bell} label="Activity" isActive={false} />
      <SidebarButton icon={MoreHorizontal} label="More" isActive={false} />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
