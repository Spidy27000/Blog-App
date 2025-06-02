import NavBar from "@/components/navbar"
import { Skeleton } from "@/components/ui/skeleton"
import UserBlogs from "@/components/userBlog"
import useUserPosts from "@/DataHooks/useUserPosts"
import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"


const Admin = () => {

    const user: any = localStorage.getItem('userData')
    const stroredUserId = JSON.parse(user).userId
    const url = `http://localhost:5000/blogs/${stroredUserId}`


    //Load user created posts
    const { data, loading, error } = useUserPosts(`http://localhost:5000/blogs/${stroredUserId}`)


    const convertToDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    return (
        <>
            <Toaster />
            <NavBar />
            <div className="w-full mt-8 flex justify-center items-center flex-col gap-10">
                <h1 className="md:text-left text-center md:max-w-[38rem] w-full md:text-7xl text-6xl font-crimson">Your Blogs</h1>
                {loading && (<>
                    <div className="md:w-[38rem] w-[20rem] h-[5rem] flex justify-center items-center gap-5 mt-20">
                        <div className="w-full h-full flex flex-col gap-5 justify-center">
                            <Skeleton className="h-[20px] w-[100%] rounded-md" />
                            <Skeleton className="h-[20px] w-[80%] rounded-md" />
                        </div>

                        <div className="w-[32%] h-[70%] flex justify-center items-center">
                            <Skeleton className="md:h-[6rem] h-[4.5rem] w-[100%] rounded-md" />
                        </div>
                    </div>
                    <div className="md:w-[38rem] w-[20rem] h-[5rem] flex justify-center items-center gap-5 mt-15">
                        <div className="w-full h-full flex flex-col gap-5 justify-center">
                            <Skeleton className="h-[20px] w-[100%] rounded-md" />
                            <Skeleton className="h-[20px] w-[80%] rounded-md" />
                        </div>

                        <div className="w-[32%] h-[70%] flex justify-center items-center">
                            <Skeleton className="md:h-[6rem] h-[4.5rem] w-[100%] rounded-md" />
                        </div>
                    </div>
                    <div className="md:w-[38rem] w-[20rem] h-[5rem] flex justify-center items-center gap-5 mt-10">
                        <div className="w-full h-full flex flex-col gap-5 justify-center">
                            <Skeleton className="h-[20px] w-[100%] rounded-md" />
                            <Skeleton className="h-[20px] w-[80%] rounded-md" />
                        </div>

                        <div className="w-[32%] h-[70%] flex justify-center items-center">
                            <Skeleton className="md:h-[6rem] h-[4.5rem] w-[100%] rounded-md" />
                        </div>
                    </div>

                </>
                )}
                {!loading && data && (data.map(data =>
                    <UserBlogs key={data.blogId} id={data.blogId} title={data.title} image_url={data.image_uri} short_description={data.shortDescription} creation_date={convertToDate(data.creationDate)} />
                ))}

                {!loading && (data.length == 0) && (<div><p className="text-[#747474] font-santoshi-medium pt-10">You have created no blogs</p></div>)}
            </div>
        </>
    )
}
export default Admin