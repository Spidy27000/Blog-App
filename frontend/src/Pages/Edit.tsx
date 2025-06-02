import NavBar from "@/components/navbar";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { AutosizeTextarea } from "@/components/ui/AutoSizeTextBox";
import { useNavigate, useParams } from "react-router";
import { generateJSON } from '@tiptap/core'
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension"
import { Link } from "@/components/tiptap-extension/link-extension"
import { Selection } from "@/components/tiptap-extension/selection-extension"
import { useEffect, useState } from "react";
import useFetchPostDetails from "@/DataHooks/useFetchPostDetails";

const Edit = () => {

    let { id } = useParams();

    let navigator = useNavigate()
    const [title, setTitle] = useState();
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const { responseData, loading, error } = useFetchPostDetails(`http://localhost:5000/blog/${id}`)
    //TODO: Verify on load that the blog id belongs to the locally stored userId

    useEffect(() => {
        const storedUserId = JSON.parse(localStorage.getItem('userData')).userId
        if (responseData || responseData?.user._id != storedUserId) {
            console.log(responseData?.user._id, storedUserId)
            return;
        }
    }, [responseData])

    const content = () => {
        console.log('asdu')
        if (responseData) {
            console.log("hello")
            const jsonContent = generateJSON(responseData?.blog.content, [Document,
                Paragraph,
                Text,
                StarterKit,
                TextAlign.configure({ types: ["heading", "paragraph"] }),
                Underline,
                TaskList,
                TaskItem.configure({ nested: true }),
                Highlight.configure({ multicolor: true }),
                Image,
                Typography,
                Superscript,
                Subscript,

                Selection,
                ImageUploadNode.configure({
                    accept: "image/*",
                    maxSize: MAX_FILE_SIZE,
                    limit: 3,
                    upload: handleImageUpload,
                    onError: (error) => console.error("Upload failed:", error),
                }),
                TrailingNode,
                Link.configure({ openOnClick: false }),
            ])
            return jsonContent
        }

    }


    return (
        <>
            <NavBar />
            <div className="w-full flex justify-center items-center h-auto">
                <div className="p-10 w-[50rem] min-h-[30rem]">

                    <AutosizeTextarea className="bg-none border-0 drop-shadow-none shadow-none outline-0 h-[8rem] focus-visible:ring-0 md:text-6xl text-4xl font-crimson" placeholder="Title" onChange  ={handleTitleChange} maxLength={66} value={responseData?.blog.title} />
                    {!loading && <SimpleEditor id={id} title={title} edit_content={content()} />}

                </div>
            </div>
        </>
    )
}
export default Edit