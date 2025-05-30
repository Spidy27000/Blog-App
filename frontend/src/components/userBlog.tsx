
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Ellipsis } from 'lucide-react';
import { Button } from "./ui/button";
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useNavigate } from "react-router";


const UserBlogs = ({ title, image_url, short_description, author, creation_date, id }) => {

    let navigator = useNavigate();

    const editPageRedirect = () => {
        navigator(`/edit/${id}`)
    }

    return (
        <>
            <div className="md:max-w-[38rem] font-santoshi md:h-[15rem] h-[10rem] border-b-1 w-[80%] group pb-5 flex flex-col justify-center relative">
                <div className="flex justify-end group-hover:opacity-100 opacity-0 transition-all duration-300 ease"><Popover>
                    <PopoverTrigger className="bg-[#f9f9f9] p-1 rounded-sm border-1 cursor-pointer"> <Ellipsis /></PopoverTrigger>
                    <PopoverContent className="w-auto p-2 flex flex-col gap-2 font-santoshi-medium"><Button onClick={editPageRedirect} className="flex justify-between items-center gap-8 w-full bg-[#f8f8f8] text-black border-1 hover:bg-[#eee] cursor-pointer">Edit <Pencil /></Button><AlertDialog>
                        <AlertDialogTrigger ><Button className="flex justify-between items-center gap-5 w-full bg-[#f8f8f8] text-black border-1 hover:bg-[#eee] hover:text-red-600 cursor-pointer">Delete <Trash /></Button></AlertDialogTrigger>
                        <AlertDialogContent className="font-santoshi-bold">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-2xl">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className="font-santoshi-medium">
                                    This action will delete the blog permanently
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog></PopoverContent>
                </Popover></div>
                <a href="/" className="">
                    <div className=" text-[0.95rem]">
                        <p className="text-[#6d6d6d]">{author} {creation_date}</p>
                    </div>
                    <div className="flex pt-4 gap-10">
                        <div className="flex flex-col w-[70%]">
                            <h2 className="font-santoshi-bold md:text-3xl text-xl group-hover:underline">
                                {title}
                            </h2>
                            <p className=" truncate pt-4 text-[#4f4f4f]">{short_description}</p>
                        </div>
                        <div className="bg-[#eee] w-full h-[5rem] md:h-[7rem] mt-2 md:mt-0 flex justify-center items-center">
                            img
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}
export default UserBlogs