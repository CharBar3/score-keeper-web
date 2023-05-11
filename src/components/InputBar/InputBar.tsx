import { InputBase, styled } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";

const StyledSearchBox = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  borderWidth: "4px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  height: "50px",
  display: "flex",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(2),
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 0,
  height: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "20pt",
  flexGrow: 1,
  minWidth: "unset",
  "& .MuiInputBase-input": {
    display: "flex",
    marginLeft: theme.spacing(2),
  },
}));

interface InputBarProps {
  placeholder: string;
  defaultValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const InputBar: FC<InputBarProps> = ({
  placeholder,
  defaultValue,
  setInputValue,
}) => {
  return (
    <StyledSearchBox>
      <StyledInputBase
        placeholder={placeholder}
        defaultValue={defaultValue}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
      />
    </StyledSearchBox>
  );
};

export default InputBar;
