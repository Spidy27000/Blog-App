import { useState, useEffect } from "react";

interface response{
  blogId: string,
  title: string,
  author: string,
  shortDescription: string,
  image_uri: string,
  creationDate: number
}

const useDashboardData = (url: string) => {
  const [responseData, setResponseData] = useState<response[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setResponseData(json.blogs);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { responseData, loading, error };
};

export default useDashboardData;
