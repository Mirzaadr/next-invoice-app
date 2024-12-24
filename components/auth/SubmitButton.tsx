"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  text?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const SubmitButton = ({
  text, variant
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <Button disabled className="w-full" variant={variant}>
        <Loader2 className="size-4 mr-2 animate-spin" />
        Please Wait..
      </Button>
    )
  }
  return (
    <Button type="submit" className="w-full" variant={variant}>
      {text || "Submit"}
    </Button>
  )
}

export default SubmitButton;