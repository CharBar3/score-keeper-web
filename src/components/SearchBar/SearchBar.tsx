import { useToast } from "@/providers/ToastProvider";
import { InputBase, styled } from "@mui/material";
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
  marginRight: theme.spacing(0.5),
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
    marginLeft: theme.spacing(1),
  },
}));

interface SearchInputProps {
  placeholder: string;
  onChangeSearch: (value: string | null) => void;
  debounce: number | null;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>> | null;
}

const SearchBar: FC<SearchInputProps> = ({
  placeholder,
  onChangeSearch,
  debounce,
  setIsSearching = null,
}) => {
  const { showToast } = useToast();

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
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          const searchInput = e.currentTarget.value;
          if (setIsSearching) {
            setIsSearching(true);
          }

          setSearchString(searchInput);
        }}
      />
      <SearchIconWrapper>
        <SearchIcon height="80%" color={theme.palette.primary.main} />
      </SearchIconWrapper>
    </StyledSearchBox>
  );
};

export default SearchBar;
