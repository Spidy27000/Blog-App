import NavBar from "@/components/navbar"
import Posts from "@/components/posts"

interface homepageData{
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
}]


function App() {
  return (
    <>
      <NavBar/>
     
      {/* all users posts */}
      <div className="w-full mt-8 flex justify-center items-center flex-col gap-10">
         <h1 className="text-left md:max-w-[38rem] w-full text-6xl font-crimson">Hello, Anurag</h1>
         {homepageData.map(data => 
          <Posts title={data.title} image_url={data.image_url} short_description={data.short_description} author={data.author} creation_date={data.creation_date}/>
         )}
        
      </div>
    </>
  )
}

export default App
