import NavBar from "@/components/navbar"
import { Skeleton } from "@/components/ui/skeleton"
import UserBlogs from "@/components/userBlog"
import useUserPosts from "@/DataHooks/useUserPosts"
import { useEffect } from "react"
import { toast, Toaster } from "sonner"


interface personalData {
    id: string,
    title: string,
    image_url: string,
    short_description: string,
    creation_date: string
}
const Admin = () => {

    // getting username (This is for testing in prod, we will take the userId from the localStorage and make requested based on it)
    const user: any = localStorage.getItem('userData')
    console.log(JSON.parse(user).username)
    //Load user created posts
    const { data, loading, error } = useUserPosts("https://jsonplaceholder.typicode.com/todos")
    console.log(data)

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    //dummy data
    const personalData: personalData[] = [{
        id: 'abcd',
        title: 'Why youtube is harder nowadays',
        image_url: '/img',
        short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
        creation_date: `January 12th 2024`
    },
    {
        id: 'abc',
        title: 'Why it is super good to be a youtube nowadaysa kansdansldnasd',
        image_url: '/img',
        short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
        creation_date: `January 12th 2024`

    },]
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
                {!loading && (personalData.map(data =>
                    <UserBlogs key={data.id} id={data.id} title={data.title} image_url={data.image_url} short_description={data.short_description} creation_date={data.creation_date} />
                ))}
            </div>
        </>
    )
}
export default Admin