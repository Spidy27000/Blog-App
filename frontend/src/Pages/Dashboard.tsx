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
      <div className="w-[100%]">
        <div className="flex justify-center items-center">
 <h1 className="md:text-left text-center mt-8 font-crimson heading select-none md:text-7xl text-6xl -z-20 pb-10 md:pb-5 w-[81%]" ref={headingRef}>Latest Blogs</h1>
 </div>
 
      {/* all users posts */}
      {
        <div className="w-full mt-8  justify-center items-center flex flex-wrap md:gap-5 gap-8">
         

          {/* skeleton card */}
          {loading && (<>
            <div className="md:max-w-[25rem] md:h-[31.6rem] h-[31rem] flex justify-center flex-col items-center md:mt-10 mt-5 w-[80%] rounded-md  shadow-md">
              <div className="w-full h-full flex rounded-t-md">
                <Skeleton className="md:h-[14rem] w-[100%] rounded-none" />
              </div>
              <div className="w-full h-full flex flex-col gap-5 p-5 justify-between">
                <div className="flex flex-col gap-5">
                <Skeleton className="h-[20px] w-[100%] rounded-md" />
                <Skeleton className="h-[20px] w-[80%] rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-[20px] w-[60%] rounded-md" />
                </div>
              </div>

              
            </div>
            <div className="md:max-w-[25rem] md:h-[31.6rem] h-[31rem] flex justify-center flex-col items-center md:mt-10 mt-5 w-[80%] rounded-md  shadow-md">
              <div className="w-full h-full flex rounded-t-md">
                <Skeleton className="md:h-[14rem] w-[100%] rounded-none" />
              </div>
              <div className="w-full h-full flex flex-col gap-5 p-5 justify-between">
                <div className="flex flex-col gap-5">
                <Skeleton className="h-[20px] w-[100%] rounded-md" />
                <Skeleton className="h-[20px] w-[80%] rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-[20px] w-[60%] rounded-md" />
                </div>
              </div>

              
            </div>
            <div className="md:max-w-[25rem] md:h-[31.6rem] h-[31rem] flex justify-center flex-col items-center md:mt-10 mt-5 w-[80%] rounded-md  shadow-md">
              <div className="w-full h-full flex rounded-t-md">
                <Skeleton className="md:h-[14rem] w-[100%] rounded-none" />
              </div>
              <div className="w-full h-full flex flex-col gap-5 p-5 justify-between">
                <div className="flex flex-col gap-5">
                <Skeleton className="h-[20px] w-[100%] rounded-md" />
                <Skeleton className="h-[20px] w-[80%] rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-[20px] w-[60%] rounded-md" />
                </div>
              </div>

              
            </div>
            <div className="md:max-w-[25rem] md:h-[31.6rem] h-[31rem] flex justify-center flex-col items-center md:mt-10 mt-5 w-[80%] rounded-md  shadow-md">
              <div className="w-full h-full flex rounded-t-md">
                <Skeleton className="md:h-[14rem] w-[100%] rounded-none" />
              </div>
              <div className="w-full h-full flex flex-col gap-5 p-5 justify-between">
                <div className="flex flex-col gap-5">
                <Skeleton className="h-[20px] w-[100%] rounded-md" />
                <Skeleton className="h-[20px] w-[80%] rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-[20px] w-[60%] rounded-md" />
                </div>
              </div>

              
            </div>


          </>
          )}

          {/* Contents */}
          {!loading && (responseData.map(data => <div key={data.blogId} className="md:max-w-[25rem] font-santoshi md:h-[31.6rem] h-[31rem] border-1  w-[80%] group  flex flex-wrap justify-center s p- items-center rounded-md hover:shadow-lg transition-all duration-300 ease">
            <Posts title={data.title} id={data.blogId} image_url={data.image_uri} short_description={data.shortDescription} author={data.author} creation_date={convertToDate(data.creationDate)} /> </div>))}


        </div>
      }
      </div>

    </>
  )
}

export default Dashboard