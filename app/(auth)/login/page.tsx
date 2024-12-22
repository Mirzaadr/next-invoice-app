import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center px-4'>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <Input 
                placeholder="test@mail.com"
                type="email"
              />
            </div>
            <Button>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;