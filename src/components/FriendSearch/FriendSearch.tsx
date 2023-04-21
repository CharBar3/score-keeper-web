"use client";

import { Friend } from "@/models";
import { useDataStore } from "@/providers/User";
import { useToast } from "@/providers/ToastProvider";

import {
  Button,
  Divider,
  InputBase,
  ListItem,
  ListItemText,
  OutlinedInput,
  Stack,
  TextField,
  alpha,
  styled,
} from "@mui/material";
import Image from "next/image";
import { FC, Fragment, useEffect, useState } from "react";
import searchIcon from "../../../public/icons/magnifying_glass_icon.svg";
import plusIcon from "../../../public/icons/plus_sign_icon.svg";

interface SearchAddFriendProps {}

const Search = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  border: "4px solid #999999",
  height: "50px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
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
  padding: theme.spacing(0, 2),
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    display: "flex",
    width: "unset",
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
  },
}));

const FriendSearch: FC<SearchAddFriendProps> = () => {
  const { user, friendsList, addFriend, findFriend } = useDataStore();
  const { showToast } = useToast();

  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState<Friend[] | null>(null);

  const handleClick = async () => {
    try {
      setSearchResults(await findFriend(searchWord));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFriend = async (newFriendId: string) => {
    try {
      await addFriend(newFriendId);
      showToast("Friend added succesfully!", "success");
    } catch (error) {
      showToast("Failed to add friend!", "error");
    }
  };

  const showSearchResults = searchResults?.map(({ id, username }) => {
    if (!user) {
      return;
    }
    if (id === user.id || user.friends.includes(id)) {
      return;
    }

    return (
      <Fragment key={id}>
        <ListItem>
          <ListItemText
            // primaryTypographyProps={{ fontSize: "20pt", color: "#5A5A5A" }}
            primary={username}
          />
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "lightgreen",
              },
            }}
            variant="actionButton"
            onClick={() => handleAddFriend(id)}
          >
            <Image
              src={plusIcon}
              width={27}
              height={27}
              alt="add friend icon"
            />
          </Button>
        </ListItem>
        <Divider />
      </Fragment>
    );
  });

  useEffect(() => {
    return () => {};
  }, [friendsList]);

  return (
    <Stack>
      <Search>
        <StyledInputBase
          placeholder="SEARCH FOR FRIENDS!"
          sx={{ fontSize: "20pt", color: "#999999" }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <SearchIconWrapper onClick={() => handleClick()}>
          {/* <SearchIcon /> */}
          <Image src={searchIcon} width={27} height={27} alt="search icon" />
        </SearchIconWrapper>
      </Search>
      <Divider />
      {showSearchResults}
    </Stack>
  );
};

export default FriendSearch;
