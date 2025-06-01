import { useState, useEffect } from "react";

interface response {
  blog: {
    _id: string;
    title: string;
    shortDescription: string;
    image_uri: string;
    userId: string;
    content: string;
    creationDate: number;
    updateDate: number;
    __v: 0;
  };
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    __v: 0;
  };
}

const useFetchPostDetails = (url: string) => {
  const [responseData, setResponseData] = useState<response>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setResponseData(json);
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

export default useFetchPostDetails;
