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

    const headinngAttr = (content: string | undefined) => {
        if(responseData)
        {
            let h1 = content?.replace(/<h1(\s[^>]*)?>/gi, '<h1 class=" text-4xl pb-5 font-crimson font-bold">')
            let h2 = h1?.replace(/<h2(\s[^>]*)?>/gi, '<h2 class=" pb-4 text-3xl font-crimson font-bold">')
            let h3 = h2?.replace(/<h3(\s[^>]*)?>/gi, '<h3 class=" text-2xl font-crimson font-bold pb-5"><br>')
            let h4 = h3?.replace(/<h4(\s[^>]*)?>/gi, '<h4 class=" text-xl font-crimson font-bold pb-5"><br>')
            let h5 = h4?.replace(/<h5(\s[^>]*)?>/gi, '<h5 class=" text-lg font-crimson font-bold pb-5"><br>')
            let h6 = h5?.replace(/<h5(\s[^>]*)?>/gi, '<h6 class=" text-md font-crimson font-bold pb-5"><br>')
            let sup = h6?.replace(/<sup(\s[^>]*)?>/gi, '<sup class=" text-[#b5b5b5]">')
            let p = sup?.replace(/<p(\s[^>]*)?>/gi, '<p class=" pb-10 text-[1.2rem] leading-8">')
            return p?.replace(/<img(\s[^>]*)?>/gi, '<img$1 class=" mb-10">')
        }
    }
    return (
        <>
            <div>
                <Toaster />
                <NavBar />
                {loading && (<div className="w-full flex justify-center items-center">
                    <div className="p-10 w-[50rem] min-h-[30rem] flex flex-col gap-10">
                        <Skeleton className="h-[120px] w-[100%]" />
                        <Skeleton className="h-[20px] w-[60%]" />
                        <div className="mt-10 flex flex-col gap-5">
                            <Skeleton className="h-[20px] w-[100%]" />
                            <Skeleton className="h-[20px] w-[100%]" />
                            <Skeleton className="h-[20px] w-[100%]" />
                            <Skeleton className="h-[20px] w-[100%]" />
                            <Skeleton className="h-[20px] w-[100%]" />
                            <Skeleton className="h-[20px] w-[100%]" />

                        </div>
                    </div>
                </div>)}
                {!loading && (<div className="w-full flex justify-center items-center">
                    <div className="p-10 w-[50rem] min-h-[30rem]">

                        <h1 className="font-crimson md:text-6xl text-4xl">{responseData?.blog.title}</h1>

                        <p className=" pb-5 mb-10 pt-10 border-b-1 text-[#5f5f5f] flex  items-center">{responseData?.user.username}  <span className="h-full pr-2 pl-2 text-[#a7a4a4] text-[0.8rem] text-center">●</span>  {formatTimestamp(responseData?.blog.creationDate)}</p>

                        <div className="md:text-[1.3rem] text-[1.2rem] font-source-serif min-h-[20rem] textContent" dangerouslySetInnerHTML={{ __html: headinngAttr(responseData?.blog.content) }}></div>
                    </div>
                </div>)}

            </div>
        </>
    )
}
export default Post