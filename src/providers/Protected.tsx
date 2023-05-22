"use client";
import { redirect } from "next/navigation";
import { FC, ReactNode, createContext, useEffect } from "react";
import { useAuth } from "./Auth";
import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import Logo from "../../public/Score-Deck-logo-02.svg";

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
    return (
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "300px", marginBottom: "100px" }}>
          <div style={{ marginBottom: "24px" }}>
            <Logo width="100%" />
          </div>
          <LinearProgress />
        </div>
      </div>
    );
  }

  return (
    <ProtectedContext.Provider value={null}>
      {children}
    </ProtectedContext.Provider>
  );
};
