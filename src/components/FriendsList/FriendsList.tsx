"use client";

import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import MinusIcon from "../../../public/icons/minus_icon_55px.svg";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

interface FriendsListProps {
  canRemoveFriend: boolean;
}

const FriendsList: FC<FriendsListProps> = ({ canRemoveFriend }) => {
  const { friendsList, removeFriend } = useDataStore();
  const { showToast } = useToast();
  const theme = useTheme();

  console.log(friendsList);

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
    showFriends = friendsList.map(({ username, id }) => {
      return (
        <ListItem key={id} sx={{ padding: " 0px" }}>
          <ListItemText
            primary={username}
            sx={{
              fontSize: "16px",
              backgroundColor: "#EDEDED",
              borderRadius: "7px",
              paddingLeft: 2,
            }}
          />
          {canRemoveFriend && (
            <ConfirmationDialog actionFunction={() => handleClick(id)}>
              <Button
                variant="red"
                // onClick={() => handleClick(id)}
                sx={{
                  width: "40px",
                  height: "24px",
                  minWidth: "unset",
                  padding: "12px",
                  marginLeft: 1,
                }}
              >
                <MinusIcon />
              </Button>
            </ConfirmationDialog>
          )}
        </ListItem>
      );
    });
  }

  return (
    <Stack sx={{ maxWidth: "600px", margin: "auto" }}>
      {/* <Box
        sx={{
          width: "100%",
          height: "40px",
          backgroundColor: "rgba(34, 174, 115, 0.3)",
        }}
      >
        <Typography>Friend Added</Typography>
      </Box> */}
      <Typography
        textAlign="center"
        variant="h3"
        sx={{ color: theme.palette.text.primary }}
      >
        My Friends
      </Typography>
      <List>{showFriends ? showFriends : <>loading</>}</List>
    </Stack>
  );
};

export default FriendsList;
