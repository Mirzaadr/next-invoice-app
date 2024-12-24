import DashboardBlocks from "@/components/dashboard/DashboardBlocks";
import InvoiceGraph from "@/components/dashboard/InvoiceGraph";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import { requireUser } from "@/lib/hooks";

const DashboardPage = async () => {
  const session = await requireUser();
  return (
    <>
      <DashboardBlocks />
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <InvoiceGraph />
        <RecentInvoices />
      </div>
    </>
  )
}

export default DashboardPage;