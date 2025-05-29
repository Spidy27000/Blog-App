import { LoginForm } from "@/components/login-form copy"

const Login = () => 
{
    return(
        <>
           <div className="w-full h-screen flex justify-center items-center ">
                <div className="w-[28%] justify-center items-center flex  p-5 border-1 rounded-lg">
                    <LoginForm/>
                </div>
            </div>
        </>
    )
}
export default Login