import NavBar from "@/components/navbar"
import Posts from "@/components/posts"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
     interface homepageData {
    title: string,
    image_url: string,
    short_description: string,
    author: string,
    creation_date: string
  }

  const homepageData: homepageData[] = [{
    title: 'Why youtube is harder nowadays',
    image_url: '/img',
    short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
    author: 'Marques Brownlee',
    creation_date: `January 12th 2024`
  },
  {
    title: 'Why it is super good to be a youtube nowadaysa kansdansldnasd',
    image_url: '/img',
    short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
    author: 'Marques Brownlee',
    creation_date: `January 12th 2024`
    
  },{title: 'Why youtube is harder nowadays',
    image_url: '/img',
    short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
    author: 'Marques Brownlee',
    creation_date: `January 12th 2024`
  },{title: 'Why youtube is harder nowadays',
    image_url: '/img',
    short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
    author: 'Marques Brownlee',
    creation_date: `January 12th 2024`
  },]

  return (
    <>
      <NavBar />

      {/* all users posts */}
      <div className="w-full mt-8 flex justify-center items-center flex-col gap-10">
        <h1 className="md:text-left text-center md:max-w-[38rem] w-full text-7xl font-crimson">Hello, Anurag</h1>
        
        {/* skeleton card */}
        {/* <div className="w-[38rem] h-[10rem] flex justify-center items-center gap-5">
            <div className="w-full h-full flex flex-col gap-5 justify-center">
            <Skeleton className="h-[20px] w-[100%] rounded-md" />
            <Skeleton className="h-[20px] w-[80%] rounded-md" />
            </div>
            
            <div className="w-[32%] h-[70%] flex justify-center items-center">
                <Skeleton className="h-[100%] w-[100%] rounded-md" />
            </div>
        </div> */}

        {homepageData.map(data =>
          <Posts title={data.title} image_url={data.image_url} short_description={data.short_description} author={data.author} creation_date={data.creation_date} />
        )}

      </div>
    </>
  )
}

export default Dashboard