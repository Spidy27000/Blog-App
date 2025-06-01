import NavBar from "@/components/navbar";
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { AutosizeTextarea } from "@/components/ui/AutoSizeTextBox";
import { useState } from "react";

const Write = () => {
    const [title, setTitle] = useState();
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    return (
        <>
            <NavBar />
            <div className="w-full flex justify-center items-center h-auto">
                <div className="p-10 w-[50rem] min-h-[30rem]">

                    <AutosizeTextarea onChange={handleTitleChange} className="bg-none border-0 drop-shadow-none shadow-none outline-0 h-[8rem] focus-visible:ring-0 md:text-6xl text-4xl font-crimson" placeholder="Title" maxLength={66}/>
                    <SimpleEditor title={title}/>
                </div>
            </div>
        </>
    )
}
export default Write