"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import NavButtons from "../NavButtons/NavButtons";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        zIndex: 2,
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
        },
      }}
    >
      <NavButtons />
    </Box>
  );
};

export default NavBar;
