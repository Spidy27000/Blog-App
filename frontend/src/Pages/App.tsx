import NavBar from "@/components/navbar"
import Posts from "@/components/posts"

function App() {
  return (
    <>
      <NavBar/>
      {/* all users posts */}
      <div className="w-full h-full mt-20 flex justify-center items-center flex-col gap-15">
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
      </div>
    </>
  )
}

export default App
