import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { requireUser } from "@/lib/hooks";

const DashboardPage = async () => {
  const session = await requireUser();
  return (
    <div className='h-screen w-full'>
      <div className="w-full flex items-center justify-between p-4 bg-blue-500 shadow-md">
        <h1 className="text-2xl font-semibold">
          Hello
          <span className="text-white">App</span>
        </h1>
        <form action={async () => {
          "use server"
          await signOut({
            redirectTo: "/login"
          })
        }}>
          <Button type="submit" variant="outline">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage;