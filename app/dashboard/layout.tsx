import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg"
import DashboardLinks from "./DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/hooks";

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select:{
      firstName: true,
      lastName: true,
      address: true,
    }
  });

  if (
    !data?.firstName ||
    !data?.lastName ||
    !data?.address
  ) {
    redirect("/onboarding")
  }
  return data;
}

const DashboardLayout = async ({
  children
}: { children: React.ReactNode}) => {
  const session = await requireUser()
  const data = await getUser(session.id as string);
  return (
    <>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex flex-col max-h-screen h-full gap-2">
          <div className="h-14 flex w-full items-center justify-center border-b lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center justify-center">
              <Image src={Logo} alt="logo" className="size-12 mr-2"/>
              <p className="text-2xl font-bold">
                Invoice
                <span className="text-blue-600">App</span>
              </p>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="items-start grid px-2 text-sm font-medium lg:px-4">
              <DashboardLinks />
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 px-3 items-center gap-4 border-b bg-muted/40 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-2 mt-10">
                <DashboardLinks />
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="outline">
                  <User2 />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/invoices">Invoices</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form 
                    action={async () => {
                      "use server";
                      await signOut({
                        redirectTo: "/login"
                      });
                    }}
                    className="w-full"
                  >
                    <button className="w-full text-left">
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
      </div>
    </>
  )
}

export default DashboardLayout;