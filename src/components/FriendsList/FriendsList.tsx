"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { useDataStore } from "@/providers/DataStore";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FC, useEffect } from "react";

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

const FriendsList: FC<FriendsListProps> = () => {
  const { friendsList, getFriends } = useDataStore();

  const showFriends = friendsList?.map(({ username, userId }, index: any) => {
    return (
      <div key={index}>
        <ListItem>
          <ListItemText primary={username} />
        </ListItem>
        <Divider />
      </div>
    );
  });

  useEffect(() => {
    getFriends();

    // return () => {
    //   second
    // }
  });

  return (
    <Box
      sx={{
        maxWidth: { xs: "300px", sm: "300px", md: "500px", lg: "700px" },
        width: "100%",
        // margin: "auto",
      }}
    >
      <Typography variant="h2">FriendsList</Typography>
      <List>
        <Divider key={1} />
        {showFriends}
      </List>
      <Link href="/dashboard/addfriend">
        <Button variant="contained">Add Friend</Button>
      </Link>
    </Box>
  );
};

export default FriendsList;
