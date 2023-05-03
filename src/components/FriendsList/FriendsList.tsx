"use client";

import { useDataStore } from "@/providers/User";
import { useToast } from "@/providers/ToastProvider";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import MinusIcon from "../../../public/icons/minus_sign_icon.svg";

interface FriendsListProps {
  canRemoveFriend: boolean;
}

const FriendsList: FC<FriendsListProps> = ({ canRemoveFriend }) => {
  const { friendsList, removeFriend } = useDataStore();
  const { showToast } = useToast();

  const handleClick = async (friendId: string) => {
    try {
      await removeFriend(friendId);
      showToast("Friend succesfully removed!", "success");
    } catch (error) {
      showToast("Failed to remove friend!", "error");
    }
  };

  let showFriends = null;

  if (friendsList) {
    showFriends = friendsList.map(({ username, id }, index: any) => {
      return (
        <div key={index}>
          <ListItem>
            <ListItemText primary={username} />
            {canRemoveFriend && (
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
                variant="styled"
                onClick={() => handleClick(id)}
              >
                <MinusIcon width="27px" height="27px" />
              </Button>
            )}
          </ListItem>
          <Divider />
        </div>
      );
    });
  }

  return (
    <Stack>
      <Typography textAlign="center" variant="h2">
        FriendsList
      </Typography>
      <List>
        <Divider />
        {showFriends ? showFriends : <>loading</>}
      </List>
    </Stack>
  );
};

export default FriendsList;
