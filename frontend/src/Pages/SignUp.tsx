import { useEffect } from "react"
import { useNavigate } from "react-router"
import { SignForm } from "../components/sign-form"

const SignUp = ({setUserData}) => {

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
        <div className="w-[25%] justify-center items-center flex  p-5 border-1 rounded-lg">
            <SignForm setUserData={setUserData}/>
            </div>
            </div>
        </>
    )
}
export default SignUp