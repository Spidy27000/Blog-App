import { Db } from "@/backend/database";

interface blogData {
  title:string,
  content:string,
  image_uri:string,
  userId: number,
  tag: string
}

const useCreateBlog = (blogData) =>{
    const createBlog = async () => {
    try {
       let db: Db = Db.inst;
       const response = await db.createBlog(blogData.title, blogData.content, blogData.image_uri, blogData.userId, blogData.tag)
       return response
    } catch (err: any) {
      return err;
    }
  };
  return createBlog;
}
export default useCreateBlog