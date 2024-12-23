import { requireUser } from "@/lib/hooks";

const DashboardPage = async () => {
  const session = await requireUser();
  return (
    <div className='w-full'>
      Hello from dashboard
    </div>
  )
}

export default DashboardPage;