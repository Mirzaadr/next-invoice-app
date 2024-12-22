"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const LoginButton = () => {
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
      Submit
    </Button>
  )
}

export default LoginButton;