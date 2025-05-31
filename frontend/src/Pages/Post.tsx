import NavBar from "@/components/navbar"

const Post = () =>
{
    return(
        <>
        <div>
            <NavBar/>
            <div className="w-full flex justify-center items-center">
                            <div className="p-10 w-[50rem] min-h-[30rem]">
            
                                <h1 className="font-crimson text-6xl">What's inside a Black Hole?</h1>
                                <p className=" pb-5 mb-15 pt-10 border-b-1 text-[#5f5f5f]">Marques brownlee, June 88th</p>
                                <div className="text-[1.3rem] font-crimson min-h-[20rem]" dangerouslySetInnerHTML={{__html: `<p>This is the new way i am doing the ajsnd askjdajsd asjdnasjd asjdnasj jnasjd  jasdja sd n as asjda ajsdja sd ja sdja sd asdj ajs daj sd <strong>work </strong>it is not <em>that </em><s>much</s> and</p><p style="text-align: center"><mark data-color="#f06060" style="background-color: #f06060; color: inherit">i dont think</mark></p><pre><br><code>is that so???</code></pre><p></p>`}}></div>
                            </div>
                        </div>
            </div>
        </>
    )
}
export default Post