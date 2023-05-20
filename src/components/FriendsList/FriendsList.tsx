"use client";

import { useDataStore } from "@/providers/User";
import { Box, Button, List, Skeleton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC, useState } from "react";
import FriendListItem from "../FriendListItem/FriendListItem";
import SearchBar from "../SearchBar/SearchBar";

interface FriendsListProps {}

const FriendsList: FC<FriendsListProps> = () => {
  const { friendsList } = useDataStore();
  const [friendFilter, setFriendFilter] = useState("");

  const filterFriends = (searchTerm: string | null) => {
    // startTransition(() => {
    if (searchTerm) {
      setFriendFilter(searchTerm);
    } else {
      setFriendFilter("");
    }
    // });
  };

  let showFriends = null;

  if (friendsList) {
    showFriends = friendsList
      .filter(({ username }) =>
        username.toLowerCase().includes(friendFilter.toLowerCase())
      )
      .map(({ username, id }) => {
        return (
          <FriendListItem
            key={id}
            id={id}
            username={username}
            inFriendsList={true}
          />
        );
      });
  }

  return (
    <Stack spacing={1} sx={{ margin: "auto", maxWidth: "600px" }}>
      <Typography textAlign="center" variant="h3">
        My Friends
      </Typography>

      <SearchBar
        placeholder="Search"
        debounce={null}
        onChangeSearch={filterFriends}
      />

      {friendsList?.length == 0 ? (
        <Box
          sx={{
            margin: "auto",
            padding: 4,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography>Oops you have no friends</Typography>
          <Link href="/dashboard/friends/add">
            <Button variant="blue">Add Friends</Button>
          </Link>
        </Box>
      ) : (
        <Typography textAlign="center">Click to remove</Typography>
      )}

      <List sx={{ padding: 0 }}>
        {showFriends ? (
          showFriends
        ) : (
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
      </List>
    </Stack>
  );
};

export default FriendsList;
