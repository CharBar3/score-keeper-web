"use client";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useTheme } from "@mui/material/styles";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "106px",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up("sm")]: { display: "none" },
      }}
    >
      <Typography variant="h2" textAlign="center">
        Score Deck
      </Typography>
    </Box>
  );
};

export default Logo;
