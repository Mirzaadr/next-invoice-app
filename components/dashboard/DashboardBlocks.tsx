import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { formatCurrency } from "@/lib/formatCurrency";

async function getData(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: { userId: userId },
      select: { total: true },
    }),
    prisma.invoice.findMany({
      where: { userId: userId, status: "PENDING" },
      select: { id: true },
    }),
    prisma.invoice.findMany({
      where: { userId: userId, status: "PAID" },
      select: { id: true }
    }),
  ]);

  return {
    data,
    openInvoices,
    paidInvoices,
  }
}

const DashboardBlocks = async () => {
  const session = await requireUser();
  const { data, openInvoices, paidInvoices } = await getData(session.id as string);
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8'>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">{formatCurrency({
            amount: data.reduce((acc, invoice) => acc + invoice.total, 0)
          })
          }</h2>
          <p className="text-xs text-muted-foreground">Based on the last 30 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invoices Issued</CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length.toString()}</h2>
          <p className="text-xs text-muted-foreground">Total Invoices Issued!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidInvoices.length.toString()}</h2>
          <p className="text-xs text-muted-foreground">Total Invoices which have been paid</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{openInvoices.length.toString()}</h2>
          <p className="text-xs text-muted-foreground">Invoices which are currently pending</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardBlocks;