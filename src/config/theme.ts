import { createTheme, responsiveFontSizes } from "@mui/material";
// declare module "@mui/material/Card" {
//   interface CardPropsVariantOverrides {
//     yeet: true;
//   }
// }

declare module "@mui/material/styles" {
  interface BreakpointOverrides {}
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    styled: true;
  }
}

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#787D8C",

        // light: "#EBEBEB",
        // dark: "blue",
      },
      // secondary: { main: "#999999" },
      // text: { primary: "#5A5A5A" },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,

        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiStack: {
        defaultProps: {
          sx: {
            maxWidth: { sm: "800px", md: "800px", lg: "1000px", xl: "1200px" },
            margin: "auto",
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "styled" },
            style: {
              backgroundColor: "#C0C5CA",
              color: "#9A9FA4",
              boxShadow: " 0px 6px #9A9FA4",
            },
          },
        ],
      },
      MuiDivider: {
        defaultProps: {
          // sx: { border: "1px solid grey" },
        },
      },
      MuiListItemText: {
        defaultProps: {
          primaryTypographyProps: { fontSize: "20px", color: "#5A5A5A" },
        },
      },

      //   MuiTypography: {
      //     defaultProps: { color: "#5A5A5A" },
      //   },
      //   MuiAppBar: {
      //     defaultProps: {
      //       variant: "elevation",
      //       // style: { backgroundColor:  },∏
      //     },
      //   },
      //   MuiTextField: {
      //     styleOverrides: {
      //       root: { borderRadius: "30px" },
      //     },
      //     defaultProps: {
      //       variant: "outlined",
      //       style: {},
      //     },
      //   },
    },
  })
);
