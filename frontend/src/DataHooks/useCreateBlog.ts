const useCreateBlog = (blogData, url) =>{
    const createBlog = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(blogData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      return JSON.parse(json.message);
    } catch (err: any) {
      return err;
    }
  };
  return createBlog;
}
export default useCreateBlog