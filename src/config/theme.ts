import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {}
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dark: true;
    red: true;
    blue: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    primary: { main: "#787D8C", light: "#F5F5F5", dark: "#4B4F59" },
    text: { primary: "#787D8C" },
    background: { default: "#EDEDED" },
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
  typography: {
    fontFamily: "nunito, sans-serif",
  },
});

export const theme = responsiveFontSizes(
  createTheme({
    ...defaultTheme,
    components: {
      MuiTypography: {
        styleOverrides: { root: { color: defaultTheme.palette.primary.main } },
      },
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
            props: { variant: "dark" },
            style: {
              color: "white",
              backgroundColor: defaultTheme.palette.primary.main,
              boxShadow: `0px 8px ${defaultTheme.palette.primary.dark}`,
              height: "40px",
              margin: defaultTheme.spacing(1),
              marginBottom: defaultTheme.spacing(2),
              borderRadius: "7px",
              textTransform: "initial",
              fontSize: "16px",
              minWidth: "88px",
              "&:hover": {
                backgroundColor: defaultTheme.palette.primary.dark,
              },
              "@media (hover: hover)": {
                "&:hover": {
                  backgroundColor: defaultTheme.palette.primary.dark,
                },
              },
            },
          },
          {
            props: { variant: "blue" },
            style: {
              backgroundColor: "#149FE5",
              color: "white",
              boxShadow: " 0px 8px #107CB3",
              margin: defaultTheme.spacing(1),
              marginBottom: defaultTheme.spacing(2),
              borderRadius: "7px",
              textTransform: "initial",
              fontSize: "16px",
              minWidth: "88px",
              "&:hover": {
                backgroundColor: "#107CB3",
              },
              "@media (hover: hover)": {
                "&:hover": {
                  backgroundColor: "#107CB3",
                },
              },
            },
          },
          {
            props: { variant: "red" },
            style: {
              backgroundColor: "#EA5028",
              color: "white",
              boxShadow: "0px 8px #B83F1F",
              margin: defaultTheme.spacing(1),
              marginBottom: defaultTheme.spacing(2),
              borderRadius: "7px",
              textTransform: "initial",
              fontSize: "16px",
              minWidth: "88px",
              "&:hover": {
                backgroundColor: "#B83F1F",
              },
              "@media (hover: hover)": {
                "&:hover": {
                  backgroundColor: "#B83F1F",
                },
              },
            },
          },
        ],
      },
      MuiTextField: {
        styleOverrides: {},
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
