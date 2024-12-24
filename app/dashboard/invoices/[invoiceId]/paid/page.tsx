import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import PaidGif from "@/public/paid.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/components/auth/SubmitButton";
import { markAsPaid } from "@/actions/invoice";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/hooks";

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

const PaidInvoicePage = async ({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) => {
  const session = await requireUser();
  const { invoiceId } = await params;
  await authorize(invoiceId, session.id as string);
  return (
    <div className='flex flex-1 justify-center items-center'>
      <Card className="mx-w-[500px]">
        <CardHeader>
          <CardTitle>Mark as Paid?</CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={PaidGif} alt="paid-gif" className="rounded-lg"/>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link href={"/dashboard/invoices"}
          className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>

          <form action={async () => {
            "use server"
            await markAsPaid(invoiceId);
          }}>
            <SubmitButton text="Mark as Paid" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PaidInvoicePage;