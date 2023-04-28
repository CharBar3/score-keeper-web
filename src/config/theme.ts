import { createTheme, responsiveFontSizes } from "@mui/material";
// declare module "@mui/material/Card" {
//   interface CardPropsVariantOverrides {
//     yeet: true;
//   }
// }

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    actionButton: true;
    customStyle: true;
  }
}

export const theme = responsiveFontSizes(
  createTheme({
    breakpoints: {
      keys: ["xxs", "xs", "sm", "md", "lg", "xl"],
      values: { xxs: 0, xs: 400, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
    palette: {
      primary: {
        main: "#787D8C",

        // light: "#EBEBEB",
        // dark: "blue",
      },
      // secondary: { main: "#999999" },
      // text: { primary: "#5A5A5A" },
    },
    components: {
      MuiStack: {
        defaultProps: {
          sx: {
            maxWidth: { sm: "600px", md: "800px", lg: "1000px", xl: "1200px" },
            width: "100%",
            margin: "auto",
            // backgroundColor: "blue",
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "actionButton" },
            style: {
              backgroundColor: "#EBEBEB",
              color: "#5A5A5A",
              fontSize: "15pt",
              borderRadius: "8px",
              paddingTop: "10px",
              paddingBottom: "10px",
              // "&:hover": {
              //   backgroundColor: "black",
              // },
            },
          },
          {
            props: { variant: "customStyle" },
            style: {
              backgroundColor: "#C0C5CA",
              color: "#9A9FA4",
              display: "flex",
              flexGrow: 1,
              height: "25px",
              boxShadow: "0px 3px #9A9FA4",
              // marginBottom: "3px",
              minWidth: "unset",
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
