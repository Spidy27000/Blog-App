import { SignForm } from "../components/sign-form"

const SignUp = () => {
    return(
        <>
        <div className="w-full h-screen flex justify-center items-center ">
        <div className="w-[25%] justify-center items-center flex  p-5 border-1 rounded-lg">
            <SignForm/>
            </div>
            </div>
        </>
    )
}
export default SignUp