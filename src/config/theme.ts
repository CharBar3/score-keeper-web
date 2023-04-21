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
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    actionButton: true;
  }
}

export const theme = createTheme({
  // palette: {
  //   // primary: {
  //   // main: "#EBEBEB",
  //   // light: "#EBEBEB",
  //   // dark: "blue",
  //   // },
  //   // secondary: { main: "#999999" },
  //   // text: { primary: "#5A5A5A" },
  // },
  components: {
    MuiStack: {
      defaultProps: {
        sx: {
          maxWidth: { sm: "600px", md: "700px", lg: "800px" },
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
        // {
        //   props: { variant: "text" },
        //   style: {
        //     backgroundColor: "#EBEBEB",
        //     color: "#5A5A5A",
        //     fontSize: "15pt",
        //     borderRadius: "8px",
        //     paddingTop: "10px",
        //     paddingBottom: "10px",
        //     // "&:hover": {
        //     //   backgroundColor: "black",
        //     // },
        //   },
        // },
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
    //       // style: { backgroundColor:  },
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
    //   MuiCard: {
    //     variants: [
    //       {
    //         props: { variant: "playerCard" },
    //         style: { backgroundColor: "red", maxWidth: "400px" },
    //       },
    //     ],
    //   },
  },
});
