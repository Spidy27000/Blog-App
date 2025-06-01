import { useState, useEffect } from "react";

interface userBlogs{
  blogId: string,
  title: string,
  author: string,
  shortDescription: string,
  image_uri: string,
  creationDate: number
}

const useUserPosts = (url: string) => {
  const [data, setData] = useState<userBlogs[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.blogs);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useUserPosts;
