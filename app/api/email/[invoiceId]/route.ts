import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;
  
    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.id,
      },
    });
  
    if(!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
    }
  
    // TODO: send email remainder
    const emailContent = {
      from: "sender",
      to: invoiceData.clientEmail,
      subject: "Reminder Invoice Payment",
      text: "Hey you forgot to pay the invoice",
    };
    console.log(emailContent);
  
    return NextResponse.json({ success: true })
    
  } catch (error) {
    return NextResponse.json({ success: false, error: "Fail to send email reminder" }, { status: 500 })
  }
}