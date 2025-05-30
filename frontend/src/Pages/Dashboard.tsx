import NavBar from "@/components/navbar"
import Posts from "@/components/posts"
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Skeleton } from "@/components/ui/skeleton";
const Dashboard = () => {
  const [loading, setLoading] = useState(false)
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

  }, {
    title: 'Why youtube is harder nowadays',
    image_url: '/img',
    short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
    author: 'Marques Brownlee',
    creation_date: `January 12th 2024`
  }, {
    title: 'Why youtube is harder nowadays',
    image_url: '/img',
    short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
    author: 'Marques Brownlee',
    creation_date: `January 12th 2024`
  },]

  const headingRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const checkFonts = async () => {
      try {
        // Wait for fonts to load
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
      <NavBar />

      {/* all users posts */}
      <div className="w-full mt-8 flex justify-center items-center flex-col gap-10 ">
        <h1 className="md:text-left text-center md:max-w-[38rem] w-full text-7xl font-crimson heading select-none " ref={headingRef}>Hello, Anurag</h1>

        {/* skeleton card */}
        {loading && (<>
<div className="w-[38rem] h-[10rem] flex justify-center items-center gap-5 mt-5">
            <div className="w-full h-full flex flex-col gap-5 justify-center">
            <Skeleton className="h-[20px] w-[100%] rounded-md" />
            <Skeleton className="h-[20px] w-[80%] rounded-md" />
            </div>
            
            <div className="w-[32%] h-[70%] flex justify-center items-center">
                <Skeleton className="h-[100%] w-[100%] rounded-md" />
            </div>
        </div>
        <div className="w-[38rem] h-[10rem] flex justify-center items-center gap-5">
            <div className="w-full h-full flex flex-col gap-5 justify-center">
            <Skeleton className="h-[20px] w-[100%] rounded-md" />
            <Skeleton className="h-[20px] w-[80%] rounded-md" />
            </div>
            
            <div className="w-[32%] h-[70%] flex justify-center items-center">
                <Skeleton className="h-[100%] w-[100%] rounded-md" />
            </div>
        </div>
        <div className="w-[38rem] h-[10rem] flex justify-center items-center gap-5">
            <div className="w-full h-full flex flex-col gap-5 justify-center">
            <Skeleton className="h-[20px] w-[100%] rounded-md" />
            <Skeleton className="h-[20px] w-[80%] rounded-md" />
            </div>
            
            <div className="w-[32%] h-[70%] flex justify-center items-center">
                <Skeleton className="h-[100%] w-[100%] rounded-md" />
            </div>
        </div>
        </>
        )}
        
        {!loading && (homepageData.map(data =>
          <Posts title={data.title} image_url={data.image_url} short_description={data.short_description} author={data.author} creation_date={data.creation_date} />))}
        

      </div>
    </>
  )
}

export default Dashboard