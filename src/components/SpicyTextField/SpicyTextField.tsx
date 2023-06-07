import { useToast } from "@/providers/ToastProvider";
import { CircularProgress, Collapse, InputBase, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";
import SearchIcon from "../../../public/icons/Magnifying_glass_icon-09.svg";
import { theme } from "../../config/theme";

const StyledSearchBox = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  borderWidth: "4px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  flexGrow: 1,
  height: "40px",
  display: "flex",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(0.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "20pt",
  flexGrow: 1,
  minWidth: "unset",
  "& .MuiInputBase-input": {
    display: "flex",
    marginLeft: theme.spacing(1),
  },
}));

interface SpicyTextFieldProps {
  placeholder: string;
  onChangeSearch: (value: string | null) => void;
  debounce: number | null;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>> | null;
  isSearching: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SpicyTextField: FC<SpicyTextFieldProps> = ({
  placeholder,
  onChangeSearch,
  debounce,
  setIsSearching = null,
  isSearching,
  setValue,
}) => {
  const [searchString, setSearchString] = useState<string | null>(null);

  useEffect(() => {
    let searchTimer: NodeJS.Timeout | undefined;

    if (debounce) {
      searchTimer = setTimeout(() => {
        onChangeSearch(searchString);
      }, debounce);
    } else {
      onChangeSearch(searchString);
    }
    return () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
    };
  }, [searchString, onChangeSearch, debounce]);

  return (
    <StyledSearchBox>
      <StyledInputBase
        placeholder={placeholder}
        onChange={(e) => {
          const searchInput = e.currentTarget.value;
          if (setIsSearching) {
            if (searchInput != "") {
              setIsSearching(true);
            } else {
              setIsSearching(false);
            }
          }
          setValue(searchInput);
          setSearchString(searchInput);
        }}
      />
      <Collapse in={isSearching}>
        <SearchIconWrapper>
          <CircularProgress size={32} />
        </SearchIconWrapper>
      </Collapse>
    </StyledSearchBox>
  );
};

export default SpicyTextField;
