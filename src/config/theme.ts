import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: { primary: { main: "#2C6B9C" } },
  components: {
    MuiTextField: {
      styleOverrides: {
        // root: { borderRadius: "30px" },
      },
      defaultProps: {
        variant: "outlined",
        // style: { backgroundColor: "red", borderRadius: "8px" },
      },
    },
  },
});
