// this is my test ing file plze dont change it
import { useEffect, useState } from "react";
import {Db} from "../backend/database"

const useLogin = (email:string,password:string) => {
  const fetchUserData = async () => {
      let db: Db = Db.inst;
      // let res = await db.login(email, password); 
      let res = await db.getBlogs();
      return res;
  };  
  return { fetchUserData };
};

const Test = () => {
  const [result, setResult] = useState<string>();
  const {fetchUserData } = useLogin("hello", "Tanish");
  useEffect(() => {
    (async () => {
      let res = await fetchUserData();
      if (typeof res !== "string"){
        console.log((new Date(res[0].created_at.slice(0,23))).getTime());
        setResult(JSON.stringify(res));
      }
    })();
  },[]);
  
  return (
    <>
    { result }
    </>
  );
}
export default Test
