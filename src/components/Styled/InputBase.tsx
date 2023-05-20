import { InputBase, InputBaseProps, styled } from "@mui/material";

export const StyledInputBase = styled(InputBase)<InputBaseProps>(
  ({ theme }) => ({
    // display: "flex",
    borderWidth: "4px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "7px",
    height: "48px",
    color: theme.palette.primary.main,
    fontSize: "36px",
    minWidth: "unset",
    width: "100%",
    marginBottom: theme.spacing(2),
    textAlign: "center",
    "& .MuiInputBase-input": {
      marginLeft: theme.spacing(1),
    },
  })
);
