import { prisma } from "@/lib/db";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { requireUser } from "@/lib/hooks";
import { formatCurrency } from "@/lib/formatCurrency";

async function getData(userId:string) {
  const data = await prisma.invoice.findMany({
    where: { userId: userId },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}
const RecentInvoices = async () => {
  const session = await requireUser();
  const data = await getData(session.id as string);

  return (
    <Card className='xl:col-span-1'>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback>{item.clientName.slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">{item.clientName}</p>
              <p className="text-sm text-muted-foreground">{item.clientEmail}</p>
            </div>
            <div className="ml-auto font-medium">+{formatCurrency({amount: item.total, currency: item.currency as any})}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentInvoices;