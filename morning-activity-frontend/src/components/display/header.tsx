"use client";
import { usePathname } from "next/navigation";
import { sidebarRoutes } from "@/components/constants/sidebar-route";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function getPageTitleandSubTitle(pathname: string): { title: string, subTitle: string } {
  for (const route of sidebarRoutes) {
    for (const link of route.links) {
      if (link.href === pathname) return { title: link.label, subTitle: link.subTitle };
    }
  }
  return { title: "GhoonaCamp", subTitle: "" };
}

export default function Header() {
  const pathname = usePathname();
  const { title, subTitle } = getPageTitleandSubTitle(pathname);

  return (
    <header className="w-full h-[45px] flex items-center justify-between px-4 bg-[--header-background] border-b border-[--header-border] shadow-lg z-10">
      <div className="flex gap-4 items-end">
        <h1 className="text-xl text-foreground font-bold">{title}</h1>
        <span className="text-muted-foreground text-sm font-bold">{subTitle}</span>
      </div>
      <div className="flex items-center gap-2 relative">
        <ThemeToggle />
        <span className="text-muted-foreground font-bold">test</span>
        <img
          src={
            "/images/profile/sampleProfileIcon.png"
          }
          alt="test"
          className="w-[32px] h-[32px] rounded-full border border-border object-cover cursor-pointer"
        />
      </div>
    </header>
  );
}
