// contexts/authContext.tsx
import User from "@/types/User";
import React, { createContext, useState, useEffect, FC } from "react";

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>(null as unknown as User);

  useEffect(() => {
    console.log("dans useEffect from context");
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage && userFromStorage !== "undefined") {
      console.log("userFromStorage", userFromStorage);
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
