import { PencilLine } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NotebookText } from 'lucide-react';
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
import { LogOut } from 'lucide-react';

const NavBar = () => {
    let navigator = useNavigate()
    const logOut = () => {
        localStorage.removeItem("userData");
        navigator("/login")
    }

    return (
        <>
            <nav className="p-6 pr-8 pl-8 flex justify-between  items-center sticky top-0 bg-white z-20">
                <div>
                    <a href="/"  className=" font-crimson font-bold text-3xl">BlogSpace</a>
                </div>
                <div className='flex md:gap-8 gap-4'>

                    <a href="/write" className="font-santoshi-bold bg-accent hover:bg-[#eee] transition-all ease duration-300 p-2 flex justify-center items-center gap-3 md:pr-5 md:pl-5 pr-3 pl-3 rounded-sm active:scale-90"> <PencilLine width={19} height={19} /> <span className='hidden md:block'>Write</span></a>
                    <Popover>
                        <PopoverTrigger className='bg-accent p-2 hover:bg-[#eee] transition-all ease duration-300 rounded-sm cursor-pointer active:scale-90'><User /></PopoverTrigger>
                        <PopoverContent className='flex flex-col w-auto gap-1 font-santoshi-medium p-2 mt-2 mr-2'>
                            <a href="/admin" className='hover:bg-accent rounded-sm h-full transition-all ease duration-300 p-2 pr-5 pl-5 flex justify-between items-center gap-2 active:scale-90'>My Post <NotebookText size={19} className='h-full flex justify-center items-center'/></a>
                            <AlertDialog>
                                <AlertDialogTrigger className='hover:bg-accent rounded-sm transition-all ease cursor-pointer duration-300 p-2 pr-5 pl-5 flex justify-between items-center gap-4 active:scale-90 hover:text-red-700'>Log out  <LogOut size={19}/></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Do you want to log out?</AlertDialogTitle>

                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={logOut} className='cursor-pointer'>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </PopoverContent>
                    </Popover>
                </div>
            </nav>
        </>
    )
}
export default NavBar