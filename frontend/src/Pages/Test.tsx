// this is my test ing file plze dont change it
import { useEffect, useState } from "react";
import {Db} from "../backend/database"

const useLogin = (email:string,password:string) => {
  const fetchUserData = async () => {
      let db: Db = Db.inst;
      let res = await db.login(email, password); 
      if (typeof res === "string"){
        return res;
      } else {
        return "Login Success";
      }
  };
  return { fetchUserData };
};

const Test = () => {
  const [result, setResult] = useState("");
  const {fetchUserData } = useLogin("hello", "Tanish");
  useEffect(() => {
    (async () => {
      let res = await fetchUserData();
      setResult(res);
    })()
  },[]);
  
  return (
    <>
    { result }
    </>
  );
}
export default Test
