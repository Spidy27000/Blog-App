

const Posts = ({title, image_url, short_description, author, creation_date}) => {
    return (
        <>
            <a href="/" className="md:max-w-[38rem] font-santoshi md:h-[14rem] h-[10rem] border-b-1 w-[80%] group pb-5 flex flex-col justify-center">
                <div className=" text-[0.95rem]">
                    <p className="text-[#6d6d6d] select-none">{author} {creation_date}</p>
                </div>
                <div className="flex pt-4 gap-10">
                    <div className="flex flex-col w-[70%]">
                        <h2 className="font-santoshi-bold md:text-3xl text-xl group-hover:underline select-none">
                            {title}
                        </h2>
                        <p className=" truncate pt-4 text-[#4f4f4f]">{short_description}</p>
                    </div>
                    <div className="bg-[#f9f9f9] w-full h-[5rem] md:h-[7rem] mt-2 md:mt-0 flex justify-center select-none items-center">
                        img
                    </div>
                </div>
            </a>
        </>
    )
}
export default Posts