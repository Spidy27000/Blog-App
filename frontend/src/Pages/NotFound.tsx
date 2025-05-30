import NavBar from "@/components/navbar"

const NotFound = () => {
    return(
        <>
        <NavBar/>  
            <div className=" w-full h-screen flex justify-center items-center flex-col">
                <h1 className="font-crimson font-bold text-7xl pb-2">404</h1>
                <p className="font-crimson">page not found</p>
            </div>
        </>
    )
}
export default NotFound