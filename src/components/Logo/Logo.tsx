"use client";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useTheme } from "@mui/material/styles";
import ScoreDeckLogo from "../../../public/Score-Deck-logo-02.svg";
import Link from "next/link";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "106px",
        display: "flex",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <Link href="/">
        <ScoreDeckLogo height="100%" width="200px" />
      </Link>
    </Box>
  );
};

export default Logo;
