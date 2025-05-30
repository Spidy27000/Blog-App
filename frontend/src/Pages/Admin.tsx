import NavBar from "@/components/navbar"
import Posts from "@/components/posts"
import UserBlogs from "@/components/userBlog"


interface personalData {
    id: string,
    title: string,
    image_url: string,
    short_description: string,
    creation_date: string
}
const Admin = () => {

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
            <NavBar />
            <div className="w-full mt-8 flex justify-center items-center flex-col gap-10">
                <h1 className="md:text-left text-center md:max-w-[38rem] w-full text-7xl font-crimson">Your Blogs</h1>
                {personalData.map(data =>
                    <UserBlogs key={data.id} id={data.id} title={data.title} image_url={data.image_url} short_description={data.short_description} creation_date={data.creation_date} />
                )}
            </div>
        </>
    )
}
export default Admin