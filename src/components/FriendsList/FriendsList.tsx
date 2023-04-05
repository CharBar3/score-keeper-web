"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface FriendsListProps {}

const seedData = [
  {
    friendUsername: "SpicyMeatball",
    friendId: "SpicyMeatballId",
  },
  {
    friendUsername: "BlandMeatball",
    friendId: "BlandMeatballId",
  },
  {
    friendUsername: "JustOkayMeatball",
    friendId: "JustOkayMeatballId",
  },
];

const showFriends = seedData.map(({ friendUsername, friendId }, index) => {
  return (
    <Box key={index}>
      <Typography variant="h6">{friendUsername}</Typography>
    </Box>
  );
});

const FriendsList: FC<FriendsListProps> = () => {
  return (
    <div>
      <Typography variant="h2">FriendsList</Typography>
      <Stack spacing={2}>{showFriends}</Stack>
      <Link href="/dashboard/addfriend">
        <Button variant="contained">Add Friend</Button>
      </Link>
    </div>
  );
};

export default FriendsList;
