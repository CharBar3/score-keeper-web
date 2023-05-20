import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Box,
  Button,
  ButtonProps,
  Collapse,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { FC, useState } from "react";
import MinusIcon from "../../../public/icons/minus_icon_55px.svg";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import { usePathname } from "next/navigation";

interface FriendListItemProps {
  id: string;
  username: string;
  inFriendsList: boolean;
}

const FriendListItem: FC<FriendListItemProps> = ({
  id,
  username,
  inFriendsList,
}) => {
  const { removeFriend, addFriend } = useDataStore();
  const { showToast } = useToast();
  const path = usePathname().split("/").at(-1);

  console.log(path);
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const handleRemoveFriend = async () => {
    // setIsEditing(false);
    try {
      await removeFriend(id);
      showToast("Friend succesfully removed!", "success");
    } catch (error) {
      showToast("Failed to remove friend!", "error");
    }
  };

  const handleAddFriend = async () => {
    // setIsEditing(false);
    try {
      await addFriend(id);
      showToast("Friend added succesfully!", "success");
    } catch (error) {
      showToast("Failed to add friend!", "error");
    }
  };

  const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: "40px",
    height: "24px",
    minWidth: "unset",
    margin: "0px 0px 8px 8px",
    padding: "12px",
  }));

  return (
    <ListItem key={id} sx={{ padding: "0px" }}>
      <ListItemText
        primary={
          inFriendsList && path === "add"
            ? `${username} - in friends list`
            : username
        }
        sx={{
          fontSize: "16px",
          height: "32px",
          backgroundColor:
            inFriendsList && path === "add"
              ? "rgba(34, 174, 115, 0.3)"
              : theme.palette.background.default,
          borderRadius: "7px",
          paddingLeft: 2,
        }}
        onClick={() => setIsEditing((prev) => !prev)}
      />
      <Collapse in={isEditing} orientation="horizontal">
        {inFriendsList ? (
          <StyledButton variant="red" onClick={handleRemoveFriend}>
            <MinusIcon />
          </StyledButton>
        ) : (
          <StyledButton variant="blue" onClick={handleAddFriend}>
            <PlusIcon />
          </StyledButton>
        )}
      </Collapse>
    </ListItem>
  );
};

export default FriendListItem;
