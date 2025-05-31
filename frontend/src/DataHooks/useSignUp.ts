import { useState } from "react";

const useSignUp = (signUpData, url) => {
  const signUpUser = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(signUpData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      return json;
    } catch (err: any) {
      return err;
    }
  };
  return signUpUser;
};
export default useSignUp;
