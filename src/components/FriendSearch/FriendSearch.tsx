"use client";

import { Friend } from "@/models";
import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import SearchBar from "../SearchBar/SearchBar";

interface SearchAddFriendProps {}

const FriendSearch: FC<SearchAddFriendProps> = () => {
  const { user, friendsList, addFriend, findFriend } = useDataStore();
  const { showToast } = useToast();
  const [searchResults, setSearchResults] = useState<Friend[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    async (searchTerm: string | null) => {
      try {
        if (searchTerm) {
          setSearchResults(await findFriend(searchTerm));
        } else {
          setSearchResults(null);
        }
        setIsSearching(false);
      } catch (error) {
        console.log(error);
      }
    },
    [findFriend]
  );

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
      <ListItem key={id} sx={{ padding: "0px" }}>
        <ListItemText
          primary={username}
          sx={{
            fontSize: "16px",
            backgroundColor: "#EDEDED",
            borderRadius: "7px",
            paddingLeft: 2,
          }}
        />

        <Button
          variant="blue"
          onClick={() => handleAddFriend(id)}
          sx={{
            width: "40px",
            height: "24px",
            minWidth: "unset",
            padding: "12px",
            marginLeft: 1,
          }}
        >
          <PlusIcon />
        </Button>
      </ListItem>
    );
  });

  useEffect(() => {
    return () => {};
  }, [friendsList]);

  return (
    <Stack spacing={1}>
      <Typography textAlign="center" variant="h3">
        Add New Friends
      </Typography>
      <SearchBar
        placeholder="Find Friends"
        onChangeSearch={handleSearch}
        debounce={1000}
        setIsSearching={setIsSearching}
      />
      <List>
        {isSearching && <h1>Loading...</h1>}
        {showSearchResults}
      </List>
    </Stack>
  );
};

export default FriendSearch;
