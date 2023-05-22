"use client";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { redirect } from "next/navigation";
import { FC, ReactNode, createContext, useEffect } from "react";
import { useAuth } from "./Auth";

const ProtectedContext = createContext(null);

interface ProtectedContextProviderProps {
  children: ReactNode;
}
export const ProtectedContextProvider: FC<ProtectedContextProviderProps> = ({
  children,
}) => {
  const { fireUser, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
    } else if (!fireUser) {
      redirect("/login");
    }
  }, [fireUser, isLoading]);

  if (isLoading) {
    // return <LoadingScreen />;
    <></>;
  }

  return (
    <ProtectedContext.Provider value={null}>
      {children}
    </ProtectedContext.Provider>
  );
};
