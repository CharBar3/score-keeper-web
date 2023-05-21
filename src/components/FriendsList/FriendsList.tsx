"use client";

import { useDataStore } from "@/providers/User";
import {
  Box,
  Button,
  Collapse,
  List,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FC, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import FriendListItem from "../FriendListItem/FriendListItem";
import SearchBar from "../SearchBar/SearchBar";

interface FriendsListProps {}

const FriendsList: FC<FriendsListProps> = () => {
  const { user } = useDataStore();
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

  if (user) {
    user.friends.sort((a, b) => a.username.localeCompare(b.username));
    user.friends.sort((a, b) => b.status.localeCompare(a.status));

    showFriends = user.friends
      .filter(({ username }) =>
        username.toLowerCase().includes(friendFilter.toLowerCase())
      )
      .map(({ username, id, status }) => {
        return (
          <Collapse key={id}>
            <FriendListItem
              id={id}
              username={username}
              inFriendsList={true}
              status={status}
            />
          </Collapse>
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

      <Collapse in={user?.friends.length == 0}>
        <Box
          sx={{
            margin: "auto",
            padding: 4,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ marginBottom: 1 }}>
            Oops you have no friends
          </Typography>
          <Link href="/dashboard/friends/add">
            <Button variant="blue">Add Friends</Button>
          </Link>
        </Box>
      </Collapse>

      <List sx={{ padding: 0 }}>
        {showFriends ? (
          <TransitionGroup>{showFriends}</TransitionGroup>
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
