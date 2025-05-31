import { useState } from "react";

const useLogin = (url: string) => {
  const [loading, setLoading] = useState(false);
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();
      return(json)
    } catch (err: any) {
      return err
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchUserData };
};
export default useLogin;
