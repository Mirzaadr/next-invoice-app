import { deleteInvoice } from "@/actions/invoice";
import SubmitButton from "@/components/auth/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import Warning from "@/public/warning.gif";
import { redirect } from "next/navigation";

async function authorize(invoiceId:string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    }
  });

  if(!data) {
    return redirect("/dashboard/invoices");
  }
}

const DeleteInvoicePage = async ({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) => {
  const { invoiceId } = await params;
  const session = await requireUser();
  await authorize(invoiceId, session.id as string);

  return <div className="flex flex-1 justify-center items-center">
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle>Delete Invoice</CardTitle>
        <CardDescription>Are you sure you want ot delete this invoice?</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={Warning} alt="warning-gif" className="rounded-lg"/>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Link href="/dashboard/invoices" className={buttonVariants({variant: "secondary"})}>
          Cancel
        </Link>

        <form action={async () => {
          "use server"
          await deleteInvoice(invoiceId);
        }}>
          <SubmitButton text="Delete Invoice" variant="destructive"/>
        </form>
      </CardFooter>
    </Card>
  </div>;
};
export default DeleteInvoicePage;
