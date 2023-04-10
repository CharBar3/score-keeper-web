"use client";
import { redirect } from "next/navigation";
import { FC, ReactNode, createContext, useEffect } from "react";
import { UserAuth } from "./AuthContext";

const ProtectedContext = createContext(null);

interface ProtectedContextProviderProps {
  children: ReactNode;
}
export const ProtectedContextProvider: FC<ProtectedContextProviderProps> = ({
  children,
}) => {
  const { user, isLoading } = UserAuth();

  useEffect(() => {
    if (isLoading) {
    } else if (!user) {
      redirect("/login");
    }
    // first;
    // return () => {
    //   second;
    // };
  }, [user, isLoading]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <ProtectedContext.Provider value={null}>
      {children}
    </ProtectedContext.Provider>
  );
};
