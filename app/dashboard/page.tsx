import DashboardBlocks from "@/components/dashboard/DashboardBlocks";
import EmptyState from "@/components/dashboard/EmptyState";
import InvoiceGraph from "@/components/dashboard/InvoiceGraph";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { Suspense } from "react";
import DashboardSkeleton from "./_components/DashboardSkeleton";

async function getData(userId: string) {
  const data = await prisma.invoice.count({
    where: {
      userId: userId,
    }
  })

  return data < 1;
}

const DashboardPage = async () => {
  const session = await requireUser();
  const isEmpty = await getData(session.id as string);

  if (isEmpty) {
    return (
      <EmptyState 
        title={"No Invoices Found"}
        description={"Create an invoice to see it right here"}
        buttonText={"Create Invoice"}
        href={"/dashboard/invoices/create"}
      />
    );
  }
  
  return (
    <Suspense fallback={<DashboardSkeleton/>}>
      <DashboardBlocks />
      <div className="grid gap-4 xl:grid-cols-3 md:gap-8 h-full">
        <InvoiceGraph />
        <RecentInvoices />
      </div>
    </Suspense>
  )
}

export default DashboardPage;