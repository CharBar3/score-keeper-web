"use client";
import { FC } from "react";
import { LinearProgress } from "@mui/material";
import Logo from "../../../public/Score-Deck-logo-02.svg";

interface LoadingScreenProps {}

const LoadingScreen: FC<LoadingScreenProps> = () => {
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
};

export default LoadingScreen;
