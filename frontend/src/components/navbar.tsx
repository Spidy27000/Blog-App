import { PencilLine } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { User } from 'lucide-react';
import { useNavigate } from 'react-router';

const NavBar = () => {
    let navigator = useNavigate()
    const logOut = () => {
        localStorage.removeItem("userData");
        navigator("/login")
    }

    return (
        <>
            <nav className="p-6 pr-8 pl-8 flex justify-between  items-center sticky top-0 bg-white">
                <div>
                    <a href="/" className=" font-crimson font-bold text-3xl">BlogSpace</a>
                </div>
                <div className='flex gap-8'>

                    <a href="/write" className="font-santoshi-bold bg-accent hover:bg-[#eee] transition-all ease duration-300 p-2 flex justify-center items-center gap-3 pr-5 pl-5 rounded-sm active:scale-90"> <PencilLine width={19} height={19} /> <span className='hidden md:block'>Write</span></a>
                    <Popover>
                        <PopoverTrigger className='bg-accent p-2 hover:bg-[#eee] transition-all ease duration-300 rounded-full cursor-pointer'><User /></PopoverTrigger>
                        <PopoverContent className='flex flex-col w-auto gap-1 font-santoshi-medium p-2 mt-2 mr-2'>
                            <a href="/admin" className='hover:bg-accent rounded-sm transition-all ease duration-300 p-2 pr-5 pl-5'>My Post</a>
                            <button className='hover:bg-accent rounded-sm transition-all ease cursor-pointer duration-300 p-2 pr-5 pl-5' onClick={logOut}>Log out</button>
                        </PopoverContent>
                    </Popover>
                </div>
            </nav>
        </>
    )
}
export default NavBar