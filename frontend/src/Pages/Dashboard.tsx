import NavBar from "@/components/navbar"
import Posts from "@/components/posts"
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Skeleton } from "@/components/ui/skeleton";
import useDashboardData from "@/DataHooks/useDashboardData";
import { Toaster, toast } from 'sonner'
const Dashboard = () => {

  const username: string = JSON.parse(localStorage.getItem('userData')).username
  if (!username) {
    toast.error("Something went wrong")
  }

  let user_name = ''

  if(username){
    const upperCaseUsernName = username.charAt(0).toUpperCase() + username.slice(1);
    user_name = upperCaseUsernName
  }

  //loading actual data from the server
  const { responseData, loading, error } = useDashboardData("http://localhost:5000/blogs/")
  console.log(responseData)
  //handling error with sonner
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const convertToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  const headingRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  //waiting for fonts to load for text animation
  useEffect(() => {
    const checkFonts = async () => {
      try {
        await document.fonts.ready;
        setFontsLoaded(true);
      } catch (error) {
        setTimeout(() => setFontsLoaded(true), 100);
      }
    };

    checkFonts();
  }, []);
  useGSAP(() => {
    // Only run animation after fonts are loaded and element exists
    if (!fontsLoaded || !headingRef.current) return;
    const split = new SplitText(headingRef.current, {
      type: "chars",
      charsClass: "char"
    });
    gsap.fromTo(split.chars,
      {

        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        stagger: 0.05,
        ease: "power2.inOut"
      }
    );

    // Cleanup function
    return () => {
      split.revert();
    };
  }, [fontsLoaded]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <NavBar />

      {/* all users posts */}
      {username &&
        <div className="w-full mt-8 flex justify-center items-center flex-col md:gap-5 gap-10">
          <h1 className="md:text-left text-center md:max-w-[38rem] w-full font-crimson heading select-none md:text-7xl text-6xl -z-20 pb-10 md:pb-5" ref={headingRef}>Hello, {user_name}</h1>

          {/* skeleton card */}
          {loading && (<>
            <div className="md:w-[38rem] w-[20rem] h-[10rem] flex justify-center items-center gap-5 md:mt-10 mt-5">
              <div className="w-full h-full flex flex-col gap-5 justify-center">
                <Skeleton className="h-[20px] w-[100%] rounded-md" />
                <Skeleton className="h-[20px] w-[80%] rounded-md" />
              </div>

              <div className="w-[32%] h-[70%] flex justify-center items-center">
                <Skeleton className="md:h-[100%] h-[60%] w-[100%] rounded-md" />
              </div>
            </div>
            <div className="md:w-[38rem] w-[20rem] h-[10rem] flex justify-center items-center gap-5 mt-5">
              <div className="w-full h-full flex flex-col gap-5 justify-center">
                <Skeleton className="h-[20px] w-[100%] rounded-md" />
                <Skeleton className="h-[20px] w-[80%] rounded-md" />
              </div>

              <div className="w-[32%] h-[70%] flex justify-center items-center">
                <Skeleton className="md:h-[100%] h-[60%] w-[100%] rounded-md" />
              </div>
            </div>
            <div className="md:w-[38rem] w-[20rem] h-[10rem] flex justify-center items-center gap-5 mt-5">
              <div className="w-full h-full flex flex-col gap-5 justify-center">
                <Skeleton className="h-[20px] w-[100%] rounded-md" />
                <Skeleton className="h-[20px] w-[80%] rounded-md" />
              </div>

              <div className="w-[32%] h-[70%] flex justify-center items-center">
                <Skeleton className="md:h-[100%] h-[60%] w-[100%] rounded-md" />
              </div>
            </div>

          </>
          )}

          {/* Contents */}
          {!loading && (responseData.map(data => <div key={data.blogId} className="md:max-w-[38rem] font-santoshi md:h-[14rem] h-[10rem] border-b-1 w-[80%] group pb-5 flex flex-col justify-center content">
            <Posts title={data.title} id={data.blogId} image_url={data.image_uri} short_description={data.shortDescription} author={data.author} creation_date={convertToDate(data.creationDate)} /> </div>))}


        </div>
      }

    </>
  )
}

export default Dashboard