"use client"
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { HomeIcon, LucideIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type DashboardLinksProps = {
  id: number;
  name: string;
  href: string;
  icon?: LucideIcon | undefined;
}

export const dashboardLinks: DashboardLinksProps[] = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2
  },
]

const DashboardLinks = ({
  withSheetClose
}: { withSheetClose?:  boolean }) => {
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];
  const pathname = usePathname()
  return (
    <>
      {dashboardLinks.map((link) => (
        <SheetCloseWrapper {...sheetCloseWrapperProps} key={link.id}>
          <Link 
            href={link.href} 
            key={link.id} 
            className={cn(
            pathname === link.href 
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}>
            {link.icon  && (
              <link.icon className="size-4 mr-2"/>
            )}
            {link.name}
          </Link>
        </SheetCloseWrapper>
      ))}
    </>
  )
}

export default DashboardLinks;