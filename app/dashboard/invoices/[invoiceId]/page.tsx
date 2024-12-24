import EditInvoice from '@/components/dashboard/EditInvoice';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/hooks';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId: userId },
  });

  if(!data) {
    return notFound();
  }

  return data;
};

const EditInvoicePage = async ({ params }: { params: Promise<{ invoiceId: string }>}) => {
  const { invoiceId } = await params;
  const session = await requireUser();
  const data = await getData(invoiceId, session.id as string);

  return (
    <EditInvoice data={data}/>
  )
}

export default EditInvoicePage;