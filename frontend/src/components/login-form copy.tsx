import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router"


interface loginData {
  username: string,
  password: string,
  email: string
}
interface LoginFormProps extends React.ComponentProps<"div"> {
  setUserData: any; // or whatever specific type you need
}


export function LoginForm({
  className,
  setUserData,
  ...props
}: LoginFormProps) {

  let navigator = useNavigate()

  const [loginData, setLoginData] = useState<loginData>({
    username: 'anurag',
    password: "",
    email: ""
  })

  const handleEmailChange = (e) => {
    setLoginData((prev) => ({ ...prev, email: e.target.value }))
  }

  const handlePasswordChange = (e) => {
    setLoginData((prev) => ({ ...prev, password: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(loginData))
    setUserData(loginData)
    navigator('/')
    console.log(loginData)
  }


  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <form>
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2"
            >


            </a>
            <h1 className="text-6xl font-bold font-crimson w-full"> Welcome Back</h1>

          </div>
          <div className="flex flex-col gap-6 font-santoshi-medium">
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-lg">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="h-10 text-md"
                onChange={handleEmailChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-lg">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                className="h-10 text-md"
                onChange={handlePasswordChange}
              />
            </div>
            <Button type="submit" className="w-full text-md cursor-pointer" onClick={handleSubmit}>
              Login
            </Button>
          </div>

        </div>
      </form>
      <div className="text-center text-sm font-santoshi">
        Don't have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign Up
        </a>
      </div>
    </div>
  )
}
