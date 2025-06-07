import { Db } from "@/backend/database";
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

const useFetchPostDetails = (id: number) => {
  const [responseData, setResponseData] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let db: Db = Db.inst;
        const response = await db.getblog(id);
        if (response) {
          setLoading(false);
          setResponseData(response);
          console.log(response);
        }
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
