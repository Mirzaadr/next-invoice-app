import CreateInvoices from "@/components/dashboard/CreateInvoices";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    }
  });

  return data;
}

const InvoiceCreationPage = async () => {
  const session = await requireUser();
  const data = await getUserData(session.id as string);
  return (
    <CreateInvoices 
      firstName={data?.firstName as string}
      lastName={data?.lastName as string}
      email={data?.email as string}
      address={data?.address as string}
    />
  )
}

export default InvoiceCreationPage;