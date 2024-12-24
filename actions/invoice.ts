"use server"

import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/formatCurrency";
import { requireUser } from "@/lib/hooks"
import { invoiceSchema } from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function createInvoice(prevState: any, formData:FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data =  await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.id,
    }
  });

  // TODO: send invoice email to client
  // const template_variables = {
  //   invoiceNumber: data.invoiceNumber,
  //   invoiceDueDate: new Intl.DateTimeFormat("en-US", {
  //     dateStyle: "long"
  //   }).format(new Date(data.date)),
  //   invoiceAmount: formatCurrency({
  //     amount: data.total,
  //     currency: data.currency as any,
  //   }),
  //   invoiceLink: `http://localhost:3000/api/invoice/${data.id}`
  // }

  return redirect("/dashboard/invoices")
}
export async function editInvoice(prevState: any, formData:FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // console.log(submission.value)

  const data =  await prisma.invoice.update({
    where: { id: formData.get("id") as string, userId: session.id },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    }
  });

  // TODO: send invoice email to client
  // const template_variables = {
  //   invoiceNumber: data.invoiceNumber,
  //   invoiceDueDate: new Intl.DateTimeFormat("en-US", {
  //     dateStyle: "long"
  //   }).format(new Date(data.date)),
  //   invoiceAmount: formatCurrency({
  //     amount: data.total,
  //     currency: data.currency as any,
  //   }),
  //   invoiceLink: `http://localhost:3000/api/invoice/${data.id}`
  // }

  return redirect("/dashboard/invoices")
}

export async function deleteInvoice(invoiceId: string) {
  const session = await requireUser();
  
  const data = await prisma.invoice.delete({
    where: {
      id: invoiceId,
      userId: session.id,
    }
  });
  
  return redirect("/dashboard/invoices")
}

export async function markAsPaid(invoiceId: string) {
  const session = await requireUser();
  
  const data = await prisma.invoice.update({
    where: {
      id: invoiceId,
      userId: session.id,
    },
    data: {
      status: "PAID",
    }
  });
  
  return redirect("/dashboard/invoices")
}