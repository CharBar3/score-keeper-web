import { createTheme } from "@mui/material";
// declare module "@mui/material/Card" {
//   interface CardPropsVariantOverrides {
//     yeet: true;
//   }
// }

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    playerCard: true;
  }
}

export const theme = createTheme({
  palette: {
    // primary: {
    // main: "#EBEBEB",
    // light: "#EBEBEB",
    // dark: "blue",
    // },
    // secondary: { main: "#999999" },
    // text: { primary: "#5A5A5A" },
  },
  components: {
    MuiTypography: {
      defaultProps: { color: "#5A5A5A" },
    },
    MuiAppBar: {
      defaultProps: {
        variant: "elevation",
        // style: { backgroundColor:  },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { borderRadius: "30px" },
      },
      defaultProps: {
        variant: "outlined",
        style: {},
      },
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "playerCard" },
          style: { backgroundColor: "red", maxWidth: "400px" },
        },
      ],
    },
  },
});
