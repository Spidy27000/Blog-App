import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import useSignUp from "@/DataHooks/useSignUp"
import { toast, Toaster } from "sonner"
import { Loader } from "lucide-react"

interface signUpData {
  username: string,
  email: string,
  password: string
}

interface SignFormProps extends React.ComponentProps<'div'> {
  setUserData: any;
}

export function SignForm({
  className,
  setUserData,
  ...props
}: SignFormProps) {


  let navigator = useNavigate();

  const [signUpData, setsignUpData] = useState<signUpData>({
    username: "",
    email: "",
    password: "",
  })

  const handleEmailChange = (e) => {
    setsignUpData((prev) => ({ ...prev, email: e.target.value }))
  }

  const handlePasswordChange = (e) => {
    setsignUpData((prev) => ({ ...prev, password: e.target.value }))
  }
  const handleUsernameChange = (e) => {
    setsignUpData((prev) => ({ ...prev, username: e.target.value }))
  }

  const { error, loading, fetchUserData } = useSignUp(signUpData.email, signUpData.password, signUpData.username)

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validating for missing fields
    if (signUpData.email == '' || signUpData.password == '' || signUpData.username == '') {
      toast.error("Please enter all the credentials");
      return;
    }
    try {

      //Signing up the user
      const response = await fetchUserData();

      //if any err, toast it
      if (error) {
        toast.error(error)
        return;
      }
      if (response) {
        localStorage.setItem('userData', JSON.stringify({
          userId: response.id,
          email: signUpData.email,
          username: signUpData.username
        }))
        setUserData(signUpData)
        navigator('/')
      }
      //stroing user details to localstorage

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
            <h1 className="text-6xl font-bold font-crimson"> BlogSpace</h1>

          </div>
          <div className="flex flex-col gap-6 font-santoshi-medium">
            <div className="grid gap-3">
              <Label htmlFor="username" className="text-lg">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
                className="h-10 text-md"
                onChange={handleUsernameChange} />
            </div>
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
              {loading ? <Loader className=" animate-spin"/> : "Sign Up"}
            </Button>
          </div>

        </div>
      </form>
      <div className="text-center text-sm font-santoshi">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          login
        </a>
      </div>
    </div></>
  )
}
