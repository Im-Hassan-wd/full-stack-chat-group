import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password, photoURL, online) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      "https://full-stack-chat-group-backend.vercel.app/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          email,
          password,
          photoURL,
          online,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }
    if (response.ok) {
      // save user to localStorage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsPending(false);
    }
  };

  return { signup, isPending, error };
};
