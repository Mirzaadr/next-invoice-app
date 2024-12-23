"use server"
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { onboardingSchema } from "@/lib/zodSchemas";
import {parseWithZod} from "@conform-to/zod"; 
import { redirect } from "next/navigation";

export const onboardUser = async (prevState:any, formData: FormData) => {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply()
  }

  const data = await prisma.user.update({
    where: { id: session.id },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    }
  });

  return redirect("/dashboard");
}