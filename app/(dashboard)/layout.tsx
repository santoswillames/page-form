import React, { ReactNode } from "react";

import { UserButton } from "@clerk/nextjs";

import ThemeSwitcher from "@/components/theme-switcher";
import Logo from "@/components/logo";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton afterSwitchSessionUrl="/sign-in" />
        </div>
      </nav>
      <main className="flex w-full flex-grow px-4">{children}</main>
    </div>
  );
}

export default Layout;
