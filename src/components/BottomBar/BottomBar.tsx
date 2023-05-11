"use client";

import { Box } from "@mui/material";
import React, { ReactNode } from "react";

import { FC } from "react";

interface BottomBarProps {
  children: ReactNode;
}

const BottomBar: FC<BottomBarProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "white",
        // borderTop: "1px solid black",
        // borderTop: `1px solid ${theme.palette.primary.dark}`,
      }}
    >
      {children}
    </Box>
  );
};

export default BottomBar;
