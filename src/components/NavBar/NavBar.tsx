"use client";

import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";

import { FC } from "react";
import NavButtons from "../NavButtons/NavButtons";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
        height: "106px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        [theme.breakpoints.up("sm")]: {
          position: "static",
          justifyContent: "space-between",
        },
      }}
    >
      <Box
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        <Typography variant="h2" textAlign="center">
          ScoreDeck
        </Typography>
      </Box>
      <NavButtons />
    </Box>
  );
};

export default NavBar;
