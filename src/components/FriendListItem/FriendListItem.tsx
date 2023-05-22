import { Friend, FriendStatus } from "@/models";
import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Box,
  Button,
  ButtonProps,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Collapse,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import XIcon from "../../../public/icons/X_icon_01-24.svg";
import CheckMarkIcon from "../../../public/icons/check_mark_icon_01.svg";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

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
  const { removeFriend, addFriend, acceptFriend, user } = useDataStore();
  const { showToast } = useToast();

  const theme = useTheme();
  const path = usePathname().split("/").at(-1);
  const [isEditing, setIsEditing] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusText, setStatusText] = useState(status);

  useEffect(() => {
    setShowStatus(false);
    setTimeout(() => {
      setStatusText(status);
      setShowStatus(true);
    }, 300);
  }, [status]);

  const handleRemoveFriend = async () => {
    setIsEditing(false);
    setIsLoading(true);

    setTimeout(async () => {
      try {
        await removeFriend(id);
        if (status === FriendStatus.Pending) {
          showToast("Request cancelled", "info");
        } else {
          showToast(`${username} unfriended`, "success");
        }
      } catch (error) {
        if (status === FriendStatus.Pending) {
          showToast("Failed to cancel request", "error");
        } else {
          showToast(`Failed to unfriend ${username}`, "error");
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleAddFriend = async () => {
    setIsEditing(false);
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await addFriend(id);
        showToast("Request sent", "success");
      } catch (error) {
        showToast("Failed to send request", "error");
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleAcceptFriend = async () => {
    setIsEditing(false);
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await acceptFriend(id);
        showToast("Request accepted!", "success");
      } catch (error) {
        showToast("Failed to accept request", "error");
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    minWidth: "unset",
    width: "40px",
    height: "24px",
    margin: "0px 0px 8px 0px",
    padding: "0px",
  }));

  let chipColor = theme.palette.background.default;

  if (statusText === FriendStatus.Accepted) {
    chipColor = "rgba(35, 174, 115, 0.6)";
  } else if (statusText === FriendStatus.Requested) {
    chipColor = "rgba(20, 159, 229, 0.6)";
  } else if (statusText === FriendStatus.Pending) {
    chipColor = "rgba(255, 204, 5, 0.6)";
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsEditing(false);
        setShowStatus(true);
      }}
    >
      <ListItem
        key={id}
        id={id}
        sx={{
          padding: "4px 0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            height: "32px",
            borderRadius: "7px",
            "&:hover": {
              cursor: isloading ? "wait" : "pointer",
            },
          }}
          onClick={() => {
            if (!isloading) {
              setShowStatus((prev) => !prev);
              setIsEditing((prev) => !prev);
            }
          }}
        >
          <ListItemText
            primary={username}
            sx={{
              fontSize: "16px",
              paddingLeft: 2,
              width: "0px",
            }}
          />
          {isloading && (
            <Box
              sx={{
                margin: 0.5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <CircularProgress size={"24px"} />
            </Box>
          )}

          <Collapse in={showStatus && !!status} orientation="horizontal">
            <Chip
              label={
                statusText != FriendStatus.Accepted && statusText
                  ? statusText.charAt(0).toUpperCase() + statusText.slice(1)
                  : "Friends"
              }
              sx={{
                borderRadius: "7px",
                backgroundColor: chipColor,
                color: theme.palette.primary.dark,
                minWidth: "87px",
              }}
            />
          </Collapse>
        </Box>

        <Collapse in={isEditing} orientation="horizontal">
          {inFriendsList ? (
            <Stack direction="row" spacing={1} sx={{ marginLeft: 1 }}>
              <ConfirmationDialog actionFunction={handleRemoveFriend}>
                <StyledButton variant="red">
                  <XIcon color="white" width="14px" height="14px" />
                </StyledButton>
              </ConfirmationDialog>
              {status === FriendStatus.Requested && (
                <Box>
                  <StyledButton variant="blue" onClick={handleAcceptFriend}>
                    <CheckMarkIcon color="white" height="16px" />
                  </StyledButton>
                </Box>
              )}
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} sx={{ marginLeft: 1 }}>
              <StyledButton variant="blue" onClick={handleAddFriend}>
                <PlusIcon color="white" width="16px" height="16px" />
              </StyledButton>
            </Stack>
          )}
        </Collapse>
      </ListItem>
    </ClickAwayListener>
  );
};

export default FriendListItem;
