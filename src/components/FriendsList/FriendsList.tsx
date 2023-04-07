"use client";

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
    <div key={index}>
      <ListItem>
        <ListItemText primary={friendUsername} />
      </ListItem>
      <Divider />
    </div>
  );
});

const FriendsList: FC<FriendsListProps> = () => {
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
