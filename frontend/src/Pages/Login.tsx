import { LoginForm } from "@/components/login-form copy"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const Login = ({setUserData}) => 
{
    let navigator = useNavigate()
    useEffect(() => {
        const storedValue = localStorage.getItem('userData')
        if (storedValue)
        {
            navigator("/")
        }
    },[])

    return(
        <>
           <div className="w-full h-screen flex justify-center items-center ">
                <div className="w-[28%] justify-center items-center flex  p-5 border-1 rounded-lg">
                    <LoginForm setUserData={setUserData}/>
                </div>
            </div>
        </>
    )
}
export default Login