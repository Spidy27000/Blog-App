import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router"
import useLogin from "../DataHooks/useLogin"
import { Loader } from 'lucide-react';

import { toast, Toaster } from "sonner"


interface loginData {
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
    password: "",
    email: ""
  })

  const handleEmailChange = (e) => {
    setLoginData((prev) => ({ ...prev, email: e.target.value }))
  }

  const handlePasswordChange = (e) => {
    setLoginData((prev) => ({ ...prev, password: e.target.value }))
  }

  const {error,  loading, fetchUserData } = useLogin(loginData.email, loginData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.email == '' || loginData.password == '') {
      toast.error("Please fill all the required data");
      return;
    }
    //validating from the server
    try {
      const response = await fetchUserData();
      if (error) {
        toast.error(error)
        return;
      }
      //stroing user details to localstorage
      if (response) {
        console.log(loading)
        localStorage.setItem('userData', JSON.stringify({
          userId: response.id,
          email: response.email,
          username: response.username
        }))
        console.log(response)
        setUserData(loginData)
        navigator('/')
        console.log(loginData)
      }


    }
    catch (err) {
      toast.error("Something went wrong" + err)
      console.log(err)
    }


  }


  return (
    <><Toaster richColors position="top-center" /><div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <form>
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2"
            >


            </a>
            <h1 className="md:text-6xl text-5xl font-bold font-crimson w-full"> Welcome Back</h1>

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
                onChange={handleEmailChange} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-lg">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                className="h-10 text-md"
                onChange={handlePasswordChange} />
            </div>
            <Button type="submit" className="w-full text-md cursor-pointer" onClick={handleSubmit}>
              {loading ? <Loader className=" animate-spin"/> : "Login"}
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
    </div></>
  )
}
