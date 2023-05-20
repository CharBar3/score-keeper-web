import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Box,
  Button,
  ButtonProps,
  Chip,
  Collapse,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { FC, useState } from "react";
import MinusIcon from "../../../public/icons/minus_icon_55px.svg";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import CheckMarkIcon from "../../../public/icons/check_mark_icon_01.svg";
import { usePathname } from "next/navigation";
import { FriendStatus } from "@/models";

interface FriendListItemProps {
  id: string;
  username: string;
  status: string | null;
  inFriendsList: boolean;
}

const FriendListItem: FC<FriendListItemProps> = ({
  id,
  username,
  status,
  inFriendsList,
}) => {
  const { removeFriend, addFriend, acceptFriend } = useDataStore();
  const { showToast } = useToast();
  const path = usePathname().split("/").at(-1);
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const handleRemoveFriend = async () => {
    setIsEditing(false);

    setTimeout(async () => {
      try {
        await removeFriend(id);
        showToast("Friend succesfully removed!", "success");
      } catch (error) {
        showToast("Failed to remove friend!", "error");
      }
    }, 500);
  };

  const handleAddFriend = async () => {
    setIsEditing(false);

    setTimeout(async () => {
      try {
        await addFriend(id);
        showToast("Friend request sent!", "success");
      } catch (error) {
        showToast("Failed to send request!", "error");
      }
    }, 500);
  };
  const handleAcceptFriend = async () => {
    setIsEditing(false);

    setTimeout(async () => {
      try {
        await acceptFriend(id);
        showToast("Friend request accepted!", "success");
      } catch (error) {
        showToast("Failed to accept friend request", "error");
      }
    }, 500);
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          height: "32px",
          borderRadius: "7px",
        }}
      >
        <ListItemText
          primary={username}
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            width: "0px",
          }}
          onClick={() => setIsEditing((prev) => !prev)}
        />
        <Collapse in={!isEditing} orientation="horizontal">
          {status && status != FriendStatus.Accepted && (
            <Chip
              label={status}
              sx={{
                borderRadius: "7px",
                backgroundColor: "rgba(34, 174, 115, 0.3)",
              }}
            />
          )}
        </Collapse>
      </Box>

      <Collapse in={isEditing} orientation="horizontal">
        {inFriendsList ? (
          <Stack direction="row">
            {status === FriendStatus.Requested && (
              <StyledButton variant="blue" onClick={handleAcceptFriend}>
                <CheckMarkIcon color="white" />
              </StyledButton>
            )}
            <StyledButton variant="red" onClick={handleRemoveFriend}>
              <MinusIcon />
            </StyledButton>
          </Stack>
        ) : (
          <>
            <StyledButton variant="blue" onClick={handleAddFriend}>
              <PlusIcon />
            </StyledButton>
          </>
        )}
      </Collapse>
    </ListItem>
  );
};

export default FriendListItem;
