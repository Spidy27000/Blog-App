const Posts = () => {
    return (
        <>
            <a href="/" className="w-[40%] font-santoshi h-[12rem] border-b-1">
                <div>
                    <p className="text-[#6d6d6d]">Marques Brownlee, 15th January</p>
                </div>
                <div className="flex pt-4 gap-5">
                    <div className="flex flex-col w-[70%]">
                        <h2 className="font-santoshi-bold text-3xl">
                            Why becoming a youtuber is hard nowadays
                        </h2>
                        <p className=" truncate pt-4 text-[#4f4f4f]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, modi. Magni assumenda officiis consequatur minima error vitae facilis, aut numquam, sit facere asperiores. Alias hic eaque quo quam eius voluptatibus.</p>
                    </div>
                    <div className="bg-amber-600 w-full">
                        img
                    </div>
                </div>
            </a>
        </>
    )
}
export default Posts