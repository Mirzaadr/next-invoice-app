"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  text?: string
}

const SubmitButton = ({
  text
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <Button disabled className="w-full">
        <Loader2 className="size-4 mr-2 animate-spin" />
        Please Wait..
      </Button>
    )
  }
  return (
    <Button type="submit" className="w-full">
      {text || "Submit"}
    </Button>
  )
}

export default SubmitButton;