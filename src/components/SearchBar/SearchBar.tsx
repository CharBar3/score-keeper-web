import { InputBase, styled } from "@mui/material";
import SearchIcon from "../../../public/icons/Magnifying_glass_icon-09.svg";
import { theme } from "../../config/theme";

const StyledSearchBox = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  borderWidth: "4px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  height: "50px",
  display: "flex",
  // justifyContent: "space-between",
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  // marginLeft: 0,
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(1),
  //   width: "auto",
  // },
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

import { FC, useEffect, useState } from "react";
import { useToast } from "@/providers/ToastProvider";

interface SearchInputProps {
  placeholder: string;
  onChangeSearch: (value: string | null) => void;
  debounce: number | null;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>> | null;
  // Leaving this as an example for how i'd implement
  // searching on click of the search icon
  // onClickSearch?: (value: string) => void;
}

const SearchBar: FC<SearchInputProps> = ({
  placeholder,
  onChangeSearch,
  debounce,
  setIsSearching = null,

  // Leaving this as an example for how i'd implement
  // searching on click of the search icon
  // onClickSearch,
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

          // if (onChangeSearch) {
          // onChangeSearch(e.currentTarget.value);
          // }
          // Leaving this as an example for how i'd implement
          // searching on click of the search icon
          // else {
          //   setSearchString(e.currentTarget.value);
          // }
        }}
      />
      <SearchIconWrapper>
        <SearchIcon
          height="80%"
          color={theme.palette.primary.main}
          // Leaving this as an example for how i'd implement
          // searching on click of the search icon
          // onClick={() => {
          //   if (searchString && onClickSearch) {
          //     onClickSearch(searchString);
          //   } else {
          //     showToast("No search provided", "error");
          //   }
          // }}
        />
      </SearchIconWrapper>
    </StyledSearchBox>
  );
};

export default SearchBar;
