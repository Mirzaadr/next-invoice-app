"use client"
import { onboardUser } from "@/actions/onboarding";
import SubmitButton from "@/components/auth/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/lib/zodSchemas";

const OnBoardingPage = () => {
  const [lastResult, action] = useActionState(onboardUser, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="grid gap-y-4" id={form.id} onSubmit={form.onSubmit} noValidate>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  name={fields.firstName.name}
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.value}
                  placeholder="John"
                />
                <p className="text-red-500 text-sm">{fields.firstName.errors}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input
                  name={fields.lastName.name}
                  key={fields.lastName.key}
                  defaultValue={fields.lastName.value}
                  placeholder="Doe"
                />
                <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.value}
                placeholder="Chad street 123"
              />
              <p className="text-red-500 text-sm">{fields.address.errors}</p>
            </div>

            <SubmitButton text="Finished onboarding"/>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default OnBoardingPage;