import NavBar from "@/components/navbar"
import Posts from "@/components/posts"
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Skeleton } from "@/components/ui/skeleton";
import useDashboardData from "@/DataHooks/useDashboardData";
import { Toaster, toast } from 'sonner'
import { Search } from "lucide-react";
const Dashboard = () => {


  //loading actual data from the server
  const { responseData, loading, error } = useDashboardData()
  const [logedIn, setLogedIn] = useState<boolean | null>(false)

  console.log(responseData)
  useEffect(() => {
    if (localStorage.getItem('userData') == null) {
      setLogedIn(false)
      
    }
    else {
      setLogedIn(true)
    }
  }, [])

  //handling error with sonner
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])



  function formatDate(dateString) {
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();
  
  const options = { 
    month: 'long', 
    day: 'numeric' 
  };
  
  // Add year if it's not current year
  if (dateYear !== currentYear) {
    options.year = 'numeric';
  }
  
  return date.toLocaleDateString('en-US', options);
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

    gsap.from(".inputField", {
      width: 0,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out"
    })

    // Cleanup function
    return () => {
      split.revert();
    };
  }, [fontsLoaded]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <NavBar isLoged={logedIn} />
      <div className="w-[100%]">
        <div className="flex justify-center items-center flex-col">
          <h1 className="md:text-left text-center mt-8 font-crimson heading select-none md:text-7xl text-6xl -z-20 pb-10 md:pb-5 w-[81%]" ref={headingRef}>Latest Blogs</h1>
          <div className="inputField mt-2 w-[81%] pt-2 pb-2 pr-4 pl-4 border-2 rounded-md font-santoshi-medium flex gap-3 items-center">
            <Search width={20} height={20} className="text-[#bbbbbb]" />
            <input type="text" placeholder="Search here" className="border-none outline-0 w-full text-[1.1rem] " />
          </div>
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
            {!loading && (responseData.map(data => <div key={data.id} className="md:max-w-[25rem] font-santoshi md:h-[31.6rem] h-[31rem] border-1  w-[80%] group  flex flex-wrap justify-center s p- items-center rounded-md hover:shadow-lg transition-all duration-300 ease">
              <Posts title={data.title} id={data.id} image_url={data.image_uri} short_description={data.shortDescription} author={data.user} creation_date={formatDate(data.created_at)} /> </div>))}


          </div>
        }
      </div>

    </>
  )
}

export default Dashboard