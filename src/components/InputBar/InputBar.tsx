import { InputBase, SxProps, Theme, styled, useTheme } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import EyeIcon from "../../../public/icons/eye_icon_01.svg";

const StyledSearchBox = styled("div")(({ theme }) => ({
  display: "flex",
  borderWidth: "4px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "7px",
  height: "40px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(1),
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
  value: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  sx?: SxProps<Theme>;
  sxInputBase?: SxProps<Theme>;
  inputType?: InputType;
  showIcon?: boolean;
  toggleFunction?: Function;
}

type InputType = "password" | "email" | "text";

const InputBar: FC<InputBarProps> = ({
  placeholder,
  value,
  setInputValue,
  sx,
  sxInputBase,
  inputType = "text",
  showIcon = false,
  toggleFunction,
}) => {
  const theme = useTheme();
  return (
    <StyledSearchBox sx={sx}>
      <StyledInputBase
        sx={sxInputBase}
        placeholder={placeholder}
        value={value}
        type={inputType}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
      />
      {showIcon && toggleFunction && (
        <SearchIconWrapper onClick={() => toggleFunction()}>
          <EyeIcon fill="lightgrey" />
        </SearchIconWrapper>
      )}
    </StyledSearchBox>
  );
};

export default InputBar;
