import { Db } from "@/backend/database";
import { useState } from "react";

const useSignUp = (username:string, email: string, password: string) => {
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchUserData = async () => {
      setLoading(true);
      try {
        let db: Db = Db.inst;
        let res = await db.signup(email, password, username);
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
export default useSignUp;
