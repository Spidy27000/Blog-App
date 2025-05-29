

const Posts = ({title, image_url, short_description, author, creation_date}) => {
    return (
        <>
            <a href="/" className="md:max-w-[38rem] font-santoshi md:h-[12rem] h-[10rem] border-b-1 w-[80%] group pb-15">
                <div>
                    <p className="text-[#6d6d6d]">{author} {creation_date}</p>
                </div>
                <div className="flex pt-4 gap-10">
                    <div className="flex flex-col w-[70%]">
                        <h2 className="font-santoshi-bold md:text-3xl text-xl group-hover:underline">
                            {title}
                        </h2>
                        <p className=" truncate pt-4 text-[#4f4f4f]">{short_description}</p>
                    </div>
                    <div className="bg-[#eee] w-full h-[5rem] md:h-auto mt-2 md:mt-0 flex justify-center items-center">
                        img
                    </div>
                </div>
            </a>
        </>
    )
}
export default Posts