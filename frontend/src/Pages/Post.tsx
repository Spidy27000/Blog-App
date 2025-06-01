import NavBar from "@/components/navbar"
import { Skeleton } from "@/components/ui/skeleton"
import useFetchPostDetails from "@/DataHooks/useFetchPostDetails"
import { useEffect } from "react"
import { useParams } from "react-router"
import { toast, Toaster } from "sonner"

const Post = () => {

    //getting the post id from param
    let { id } = useParams()

    //fetching the details blog with param id
    const { responseData, loading, error } = useFetchPostDetails(`http://localhost:5000/blog/${id}`)

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (
        <>
            <div>
                <Toaster />
                <NavBar />
                {loading && (<div className="w-full flex justify-center items-center">
                    <div className="p-10 w-[50rem] min-h-[30rem] flex flex-col gap-10">
                        <Skeleton className="h-[120px] w-[100%]"/>
                        <Skeleton className="h-[20px] w-[60%]"/>
                        <div className="mt-10 flex flex-col gap-5">
                            <Skeleton className="h-[20px] w-[100%]"/>
                            <Skeleton className="h-[20px] w-[100%]"/>
                            <Skeleton className="h-[20px] w-[100%]"/>
                            <Skeleton className="h-[20px] w-[100%]"/>
                            <Skeleton className="h-[20px] w-[100%]"/>
                            <Skeleton className="h-[20px] w-[100%]"/>

                        </div>
                    </div>
                </div>)}
                {!loading && (<div className="w-full flex justify-center items-center">
                    <div className="p-10 w-[50rem] min-h-[30rem]">
                        
                        <h1 className="font-crimson md:text-6xl text-4xl">{responseData?.blog.title}</h1>
                        
                        <p className=" pb-5 mb-15 pt-10 border-b-1 text-[#5f5f5f] flex  items-center">{responseData?.user.username}  <span className="h-full pr-2 pl-2 text-[#a7a4a4] text-[0.8rem] text-center">●</span>  {formatTimestamp(responseData?.blog.creationDate)}</p>
                        
                        <div className="md:text-[1.3rem] text-[1.2rem] font-crimson min-h-[20rem]" dangerouslySetInnerHTML={{ __html: responseData?.blog.content }}></div>
                    </div>
                </div>)}
                
            </div>
        </>
    )
}
export default Post