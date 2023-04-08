"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { useDataStore } from "@/providers/DataStore";
import { DatabaseService } from "@/services/database-service";
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

const FriendsList: FC<FriendsListProps> = () => {
  const { user } = UserAuth();
  const { friendsList, getFriends } = useDataStore();

  const removeFriend = async (friendId: string) => {
    if (!user) {
      return;
    }
    await DatabaseService.removeUserFriend(friendId, user.uid);
    getFriends();
  };

  let showFriends = null;

  if (friendsList) {
    showFriends = friendsList?.map(
      ({ friendUsername, friendId }, index: any) => {
        return (
          <div key={index}>
            <ListItem>
              <ListItemText primary={friendUsername} />
              <Button variant="text" onClick={() => removeFriend(friendId)}>
                Remove Friend
              </Button>
            </ListItem>
            <Divider />
          </div>
        );
      }
    );
  }

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
        {showFriends ? showFriends : <>loading</>}
      </List>
      <Link href="/dashboard/addfriend">
        <Button variant="contained">Add Friend</Button>
      </Link>
    </Box>
  );
};

export default FriendsList;
