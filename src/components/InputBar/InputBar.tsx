import { InputBase, SxProps, Theme, styled } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

const StyledSearchBox = styled("div")(({ theme }) => ({
  display: "flex",
  borderWidth: "4px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "7px",
  height: "40px",
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
  fontSize: "16px",
  flexGrow: 1,
  minWidth: "unset",
  "& .MuiInputBase-input": {
    marginLeft: theme.spacing(1),
  },
}));

interface InputBarProps {
  placeholder: string;
  defaultValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  sx?: SxProps<Theme>;
  sxInputBase?: SxProps<Theme>;
  isPasswordInput?: boolean;
}

const InputBar: FC<InputBarProps> = ({
  placeholder,
  defaultValue,
  setInputValue,
  sx,
  sxInputBase,
  isPasswordInput = false,
}) => {
  return (
    <StyledSearchBox sx={sx}>
      <StyledInputBase
        sx={sxInputBase}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={isPasswordInput ? "password" : "text"}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
      />
    </StyledSearchBox>
  );
};

export default InputBar;
