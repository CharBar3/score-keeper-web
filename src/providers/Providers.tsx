"use client";

import { theme } from "@/config/theme";
import { ThemeProvider } from "@mui/material";
import { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Providers;
