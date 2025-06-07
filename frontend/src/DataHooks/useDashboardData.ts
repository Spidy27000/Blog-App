import  { Db } from "@/backend/database";
import { useState, useEffect } from "react";
interface response {
  id: number;
  title: string;
  shortDescription: string;
  image_uri: string;
  created_at: string;
  tag: any;
  user: {
    id: any;
    username: string;
    email: string;
  };
}

const useDashboardData = () => {
  const [responseData, setResponseData] = useState<response[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let db: Db = Db.inst;
      let res = await db.getBlogs()
      if (res)
      {
        setResponseData(res)
        setLoading(false)
      }
      
    };

    fetchData();
  }, []);

  return { responseData, loading, error };
};

export default useDashboardData;
