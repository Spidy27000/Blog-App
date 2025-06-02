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

  //checking the skeleton component
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   },2000)
  // },[])

  // // dummy data
  // const homepageData: homepageData[] = [{
  //   id: '101112',
  //   title: 'Why YouTube is harder nowadays',
  //   image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop',
  //   short_description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ea culpa aliquam, neque a veritatis, delectus recusandae adipisci`,
  //   author: 'Marques Brownlee',
  //   creation_date: `January 12th 2024`
  // },
  // {
  //   id: '101113',
  //   title: 'The Rise of AI in Web Development',
  //   image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
  //   short_description: `Exploring how artificial intelligence is transforming the way we build websites and applications, from code generation to automated testing`,
  //   author: 'Sarah Chen',
  //   creation_date: `February 8th 2024`
  // },
  // {
  //   id: '101114',
  //   title: 'React vs Vue: Battle of the Frameworks',
  //   image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
  //   short_description: `A comprehensive comparison of React and Vue.js, examining performance, learning curve, and ecosystem to help you choose the right framework`,
  //   author: 'Alex Rodriguez',
  //   creation_date: `March 15th 2024`
  // },
  // {
  //   id: '101115',
  //   title: 'Blender 4.0: Game-Changing Features',
  //   image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop',
  //   short_description: `Dive into the revolutionary updates in Blender 4.0, including improved rendering engines and new modeling tools that will boost your workflow`,
  //   author: 'Maya Patel',
  //   creation_date: `April 3rd 2024`
  // },
  // {
  //   id: '101116',
  //   title: 'CSS Grid vs Flexbox: When to Use What',
  //   image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
  //   short_description: `Understanding the differences between CSS Grid and Flexbox layouts, with practical examples to help you choose the right tool for your project`,
  //   author: 'David Kim',
  //   creation_date: `May 20th 2024`
  // },
  // {
  //   id: '101117',
  //   title: 'The Future of JavaScript: ES2024 Features',
  //   image_url: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
  //   short_description: `Exploring the latest JavaScript features in ES2024, including new array methods, improved async handling, and performance optimizations`,
  //   author: 'Emma Thompson',
  //   creation_date: `June 7th 2024`
  // },
  // {
  //   id: '101118',
  //   title: 'Building Accessible Web Applications',
  //   image_url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop',
  //   short_description: `A complete guide to web accessibility, covering ARIA labels, keyboard navigation, and screen reader compatibility for inclusive design`,
  //   author: 'Jordan Lee',
  //   creation_date: `July 14th 2024`
  // },
  // {
  //   id: '101119',
  //   title: 'Vite vs Webpack: Modern Build Tools Compared',
  //   image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
  //   short_description: `Comparing Vite and Webpack build tools, analyzing speed, configuration complexity, and developer experience in modern web development`,
  //   author: 'Chris Johnson',
  //   creation_date: `August 22nd 2024`
  // },
  // {
  //   id: '101120',
  //   title: 'Mastering 3D Animation Principles',
  //   image_url: 'https://picsum.photos/400/250?random=10',
  //   short_description: `Learn the fundamental principles of 3D animation, from timing and spacing to character rigging and realistic motion in digital environments`,
  //   author: 'Lisa Zhang',
  //   creation_date: `September 5th 2024`
  // },
  // {
  //   id: '101121',
  //   title: 'Database Design for Modern Web Apps',
  //   image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
  //   short_description: `Essential database design patterns for web applications, covering normalization, indexing strategies, and choosing between SQL and NoSQL solutions`,
  //   author: 'Michael Brown',
  //   creation_date: `October 18th 2024`
  // }]

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
        <div className="w-full mt-8 flex justify-center items-center flex-col gap-5">
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