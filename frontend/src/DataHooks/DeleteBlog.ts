const DeleteBlog = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return JSON.parse(json.message);
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default DeleteBlog;
