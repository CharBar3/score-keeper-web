"use client";

import { Friend, FriendShowParams } from "@/models";
import { useDataStore } from "@/providers/User";
import { Box, List, Skeleton, Stack, Typography } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import FriendListItem from "../FriendListItem/FriendListItem";
import SearchBar from "../SearchBar/SearchBar";

interface SearchAddFriendProps {}

const FriendSearch: FC<SearchAddFriendProps> = () => {
  const { user, friendsList, findFriend } = useDataStore();

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
    searchResults.sort();
    // const organizedResults = [];

    // for (const result of searchResults) {
    //   if (!user || result.id === user.id) {
    //     break;
    //   }

    //   if (user.friends.includes(result.id)) {
    //     organizedResults.push(result);
    //   } else {
    //     organizedResults.unshift(result);
    //   }
    // }

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
        <FriendListItem
          key={id}
          id={id}
          username={username}
          inFriendsList={inFriendsList}
          status={status}
        />
      );
    });
  }

  useEffect(() => {
    return () => {};
  }, [friendsList]);

  return (
    <Stack spacing={1} sx={{ maxWidth: "600px", margin: "auto" }}>
      <Typography textAlign="center" variant="h3">
        Add New Friends
      </Typography>
      <SearchBar
        placeholder="Search"
        onChangeSearch={handleSearch}
        debounce={1000}
        setIsSearching={setIsSearching}
      />
      {searchResults && (
        <Typography textAlign="center">Click to add</Typography>
      )}
      <List sx={{ padding: 0 }}>
        {isSearching && (
          <Box>
            <Skeleton
              variant="rounded"
              animation="pulse"
              height={"32px"}
              sx={{ marginBottom: 1 }}
            />
            <Skeleton
              variant="rounded"
              animation="pulse"
              height={"32px"}
              sx={{ marginBottom: 1 }}
            />
            <Skeleton
              variant="rounded"
              animation="pulse"
              height={"32px"}
              sx={{ marginBottom: 1 }}
            />
          </Box>
        )}
        {showSearchResults}
      </List>
    </Stack>
  );
};

export default FriendSearch;
