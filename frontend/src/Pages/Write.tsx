import NavBar from "@/components/navbar";
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { AutosizeTextarea } from "@/components/ui/AutoSizeTextBox";
import { useEffect, useState } from "react";

const Write = () => {
    const [title, setTitle] = useState();
    const [imageSrc, setImageSrc] = useState("");
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleRemove = () => {
        setSelectedFile(undefined)
    }
    return (
        <>
            <NavBar />
            <div className="w-full flex justify-center items-center h-auto">
                <div className="p-10 w-[50rem] min-h-[30rem]">

                    <AutosizeTextarea onChange={handleTitleChange} className="bg-none border-0 drop-shadow-none shadow-none outline-0 h-[8rem] focus-visible:ring-0 md:text-6xl text-4xl font-crimson mb-8" placeholder="Title" maxLength={66}/>
                    <label htmlFor="fileUpload" className=" bg-[#f5f5f5] p-2 pr-4 pl-4 rounded-sm hover:bg-[#eee] text-[#7f7f7f] border-1 font-santoshi-medium text-[0.85rem] cursor-pointer active:scale-95 transition-all duration-300 ease">{ selectedFile ? "Change Cover" : "+ Add Cover"}</label>
                    {selectedFile && <button className=" bg-[#f8f8f8] ml-2 p-2 pr-4 pl-4 rounded-sm hover:bg-[#eee] text-[#7f7f7f] border-1 font-santoshi-medium text-[0.85rem] cursor-pointer active:scale-95 transition-all duration-300 ease" onClick={handleRemove}>Remove</button>}
                    {selectedFile && <img src={preview} className=" w-full mt-6 max-h-[28rem] object-cover"/>}
                    <input type="file" id="fileUpload" onChange={onSelectFile} className="hidden"/>
                    <SimpleEditor title={title}/>
                </div>
            </div>
        </>
    )
}
export default Write