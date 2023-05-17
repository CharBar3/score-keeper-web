"use client";

import { Friend } from "@/models";
import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import SearchBar from "../SearchBar/SearchBar";
import { theme } from "@/config/theme";

interface SearchAddFriendProps {}

const FriendSearch: FC<SearchAddFriendProps> = () => {
  const { user, friendsList, addFriend, findFriend } = useDataStore();
  const { showToast } = useToast();
  const [searchResults, setSearchResults] = useState<Friend[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  console.log(friendsList);

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

  let showSearchResults = null;

  if (searchResults) {
    searchResults.sort();
    const organizedResults = [];

    for (const result of searchResults) {
      if (!user || result.id === user.id) {
        break;
      }

      if (user.friends.includes(result.id)) {
        organizedResults.push(result);
      } else {
        organizedResults.unshift(result);
      }
    }

    showSearchResults = organizedResults.map(({ id, username }) => {
      if (!user || id === user.id) {
        return;
      }

      let inFriendsList = false;

      if (user.friends.includes(id)) {
        inFriendsList = true;
      }

      return (
        <ListItem key={id} sx={{ padding: "0px" }}>
          <ListItemText
            primary={
              inFriendsList
                ? `${username} - is in your friends list!`
                : username
            }
            sx={{
              fontSize: "16px",
              backgroundColor: inFriendsList
                ? "rgba(34, 174, 115, 0.3)"
                : theme.palette.background.default,
              borderRadius: "7px",
              paddingLeft: 2,
            }}
          />

          {!inFriendsList && (
            <Button
              variant="blue"
              onClick={() => handleAddFriend(id)}
              sx={{
                width: "40px",
                height: "24px",
                minWidth: "unset",
                padding: "12px",
                margin: "0px 0px 8px 8px",
              }}
            >
              <PlusIcon />
            </Button>
          )}
        </ListItem>
      );
    });
  }

  useEffect(() => {
    return () => {};
  }, [friendsList]);

  return (
    <Stack sx={{ maxWidth: "600px", margin: "auto" }}>
      <Typography textAlign="center" variant="h1">
        Add New Friends
      </Typography>
      <SearchBar
        placeholder="Search"
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
