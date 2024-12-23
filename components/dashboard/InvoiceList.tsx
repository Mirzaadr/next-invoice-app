import { prisma } from "@/lib/db";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import InvoiceActions from "./InvoiceActions";
import { requireUser } from "@/lib/hooks";
import { formatCurrency } from "@/lib/formatCurrency";
import { Badge } from "../ui/badge";
async function getData(userId:string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return data
}

const InvoiceList = async () => {
  const session = await requireUser();
  const data = await getData(session.id as string);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>#{row.invoiceNumber}</TableCell>
            <TableCell>{row.clientName}</TableCell>
            <TableCell>{formatCurrency({amount: row.total, currency: row.currency as any})}</TableCell>
            <TableCell><Badge>{row.status}</Badge></TableCell>
            <TableCell>{new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium"
            }).format(row.createdAt)}</TableCell>
            <TableCell className="text-right">
              <InvoiceActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default InvoiceList;