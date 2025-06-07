import { Db } from "@/backend/database";
import { useState } from "react";

interface userData {
  id: number;
  email: string;
  username: string;
}

interface error {
  message: string;
}

const useLogin = (email: string, password: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchUserData = async () => {
    setLoading(true);
    try {
      let db: Db = Db.inst;
      let res = await db.login(email, password);
      if (res) {
        setLoading(false);
        return res;
      }
    } catch (err) {
      setError(err);
    }
  };

  return { error, loading, fetchUserData };
};
export default useLogin;
