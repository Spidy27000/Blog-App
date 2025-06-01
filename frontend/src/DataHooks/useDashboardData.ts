import { useState, useEffect } from "react";

const useDashboardData = (url: string) => {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
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

export default useDashboardData;
