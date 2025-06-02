const Posts = ({ title, image_url, short_description, author, creation_date, id }) => {
    return (
        <>
            <a href={`/post/${id}`} className="">
                <div className=" text-[0.95rem]">
                    <p className="text-[#6d6d6d] select-none">{author} {creation_date}</p>
                </div>
                <div className="flex pt-4 gap-10">
                    <div className="flex flex-col w-[70%] justify-center">
                        <h2 className="font-santoshi-bold md:text-3xl text-xl group-hover:underline">
                            {title}
                        </h2>
                        <p className=" truncate pt-4 text-[#4f4f4f] select-none">{short_description}</p>
                    </div>
                    <div className="max-w-[30%] h-[5rem] md:h-[6rem] mt-2 md:mt-0 flex justify-center select-none items-center ">
                        <img src={image_url} alt="no image" className="object-cover w-[100%] h-[70%] md:h-[100%]" onError={(e) => {
                            e.target.style.display = 'none';
                        }} />
                    </div>
                </div>
            </a>
        </>
    )
}
export default Posts