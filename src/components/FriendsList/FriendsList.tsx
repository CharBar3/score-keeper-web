"use client";

import { FriendStatus } from "@/models";
import { useDataStore } from "@/providers/User";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  List,
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

  let showPendingAndRequestedFriends = null;
  let showFriends = null;

  if (user) {
    user.friends.sort((a, b) => a.username.localeCompare(b.username));
    user.friends.sort((a, b) => b.status.localeCompare(a.status));

    const pendingAndRequestedFriends = [];
    const friends = [];

    for (const friend of user.friends) {
      if (friend.status === FriendStatus.Accepted) {
        friends.push(friend);
      } else {
        pendingAndRequestedFriends.push(friend);
      }
    }

    showFriends = friends
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
    showPendingAndRequestedFriends = pendingAndRequestedFriends
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
      <Box>
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
        <Collapse in={!showFriends || !showPendingAndRequestedFriends}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "32px",
            }}
          >
            <Typography>Loading</Typography>
            <CircularProgress size={"24px"} sx={{ marginLeft: 1 }} />
          </Box>
        </Collapse>
      </Box>

      <List sx={{ padding: 0 }}>
        <TransitionGroup>{showPendingAndRequestedFriends}</TransitionGroup>
        <TransitionGroup>{showFriends}</TransitionGroup>
      </List>
    </Stack>
  );
};

export default FriendsList;
