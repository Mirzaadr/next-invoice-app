"use client"
import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link";
import { toast } from "sonner";

interface InvoiceActionsProps {
  invoiceId?: string;
}

const InvoiceActions = ({
  invoiceId
}: InvoiceActionsProps) => {

  const handleSendReminder = () => {
    toast.promise(fetch(`/api/email/${invoiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/icon"
      }
    }),
    {
      loading: "Sending reminder email...",
      success: "Reminder email sent successfully",
      error: "Failed to send reminder email",
    }
  )
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${invoiceId}`}>
            <Pencil className="size-4 mr-2" />
            Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${invoiceId}`} target="_blank">
            <DownloadCloudIcon className="size-4 mr-2" />
            Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Mail className="size-4 mr-2" />
          Reminder Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${invoiceId}/delete`}>
            <Trash className="size-4 mr-2" />
            Delete
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/">
            <CheckCircle className="size-4 mr-2" />
            Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default InvoiceActions