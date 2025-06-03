const Posts = ({ title, image_url, short_description, author, creation_date, id }) => {
    return (
        <>
            <a href={`/post/${id}`} className="w-full h-full flex flex-col">
                <div className="w-full h-[full]">
                     <img src={image_url}  className=" h-[13.8rem] w-full object-cover rounded-t-md" />

                </div>
                <div className="flex pt-4 gap-10 flex-col p-5 justify-between h-full">
                    <div className="flex flex-col w-[100%] justify-center gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="bg-accent text-[0.85rem] font-santoshi-bold pr-2 pl-2 rounded text-[#6c6c6c]">AI</p>
                            <p className="bg-accent text-[0.85rem] font-santoshi-bold pr-2 pl-2 rounded text-[#6c6c6c]">Science</p>
                            <p className="bg-accent text-[0.85rem] font-santoshi-bold pr-2 pl-2 rounded text-[#6c6c6c]">Music</p>
                            <p className="bg-accent text-[0.85rem] font-santoshi-bold pr-2 pl-2 rounded text-[#6c6c6c]">AI</p>
                            <p className="bg-accent text-[0.85rem] font-santoshi-bold pr-2 pl-2 rounded text-[#6c6c6c]">AI</p>
                            
                            
                            
                        </div>
                        <h2 className="font-santoshi-bold md:text-[1.5rem] text-xl group-hover:underline line-clamp-2">
                            {title}
                        </h2>
                        <p className=" text-[#4f4f4f] select-none line-clamp-3 font-santoshi">{short_description}</p>
                    </div>
                    <div className="text-[0.95rem] flex items-center gap-3">
                        <img src="https://picsum.photos/200" alt="" className="h-[1.8rem] rounded-full"/>
                       <p className="text-[#6d6d6d] select-none flex items-center font-santoshi-medium">{author}, {creation_date}</p>
                    </div>
                </div>
            </a>
        </>
    )
}
export default Posts

