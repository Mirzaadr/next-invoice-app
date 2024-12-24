import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Graph from "./Graph";
import { requireUser } from "@/lib/hooks";
import EmptyState from "./EmptyState";

async function getInvoices(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      userId: userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  // group and aggregate data by date
  const aggregatedData = rawData.reduce(
    (acc: {[key: string]: number}, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      acc[date] = (acc[date] || 0) + curr.total;
      return acc;
    }, {});

    // transform to array from the object
    const transformedData = Object.entries(aggregatedData).map(([date, amount]) => (
      {
        date,
        amount,
        originalDate: new Date(date + ", " + new Date().getFullYear()),
      }
    )).sort((a, b) => a.originalDate.getTime()).map(({ date, amount }) => ({
      date, amount
    }))

  return transformedData;
}

const InvoiceGraph = async () => {
  const session = await requireUser();
  const data = await getInvoices(session.id as string);
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length < 1 ? (
          <div className="h-[500px]">
            <EmptyState
              title="No data to show"
              description="Complete some invoice to get analytics"
            />
          </div>
        ) : (
          <Graph data={data}/>
        )}
      </CardContent>
    </Card>
  );
}

export default InvoiceGraph;