"use client";

import { FriendShowParams } from "@/models";
import { useDataStore } from "@/providers/User";
import {
  Box,
  CircularProgress,
  Collapse,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import FriendListItem from "../FriendListItem/FriendListItem";
import SearchBar from "../SearchBar/SearchBar";

interface SearchAddFriendProps {}

const FriendSearch: FC<SearchAddFriendProps> = () => {
  const { user, findFriend } = useDataStore();

  const [searchResults, setSearchResults] = useState<FriendShowParams[] | null>(
    null
  );
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

  let showSearchResults = null;

  if (searchResults) {
    searchResults.sort((a, b) => a.username.localeCompare(b.username));

    showSearchResults = searchResults.map(({ id, username }) => {
      if (!user || id === user.id) {
        return;
      }

      let inFriendsList = false;
      let status = null;

      user.friends.find((friend) => {
        if (friend.id === id) {
          inFriendsList = true;
          status = friend.status;
        }
      });

      return (
        <Collapse key={id}>
          <FriendListItem
            id={id}
            username={username}
            inFriendsList={inFriendsList}
            status={status}
          />
        </Collapse>
      );
    });
  }

  return (
    <Stack spacing={1} sx={{ maxWidth: "600px", margin: "auto" }}>
      <Typography textAlign="center" variant="h3">
        Add New Friends
      </Typography>
      <SearchBar
        placeholder="Search Username"
        onChangeSearch={handleSearch}
        debounce={1000}
        setIsSearching={setIsSearching}
      />

      <Collapse in={isSearching}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "32px",
          }}
        >
          <>
            <Typography>Searching</Typography>
            <CircularProgress size={"24px"} sx={{ marginLeft: 1 }} />
          </>
        </Box>
      </Collapse>

      <List sx={{ padding: 0 }}>
        <TransitionGroup>{showSearchResults}</TransitionGroup>
      </List>
    </Stack>
  );
};

export default FriendSearch;
