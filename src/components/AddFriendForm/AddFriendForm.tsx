"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { useDataStore } from "@/providers/DataStore";
import { useToast } from "@/providers/ToastProvider";
import { DatabaseService } from "@/services/database-service";
import {
  Button,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

interface SearchAddFriendProps {}

const SearchAddFriend: FC<SearchAddFriendProps> = () => {
  const { fireUser } = UserAuth();
  const { user, friendsList, addFriend } = useDataStore();
  const { showToast } = useToast();

  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState<Friend[] | null>(null);

  const handleClick = async () => {
    if (!fireUser) {
      return;
    }
    const firebaseResponse = await DatabaseService.findFriendByUsername(
      searchWord,
      fireUser.uid
    );
    if (firebaseResponse.length === 0) {
      setSearchResults(null);
    } else {
      setSearchResults(firebaseResponse);
    }
  };

  const handleAddFriend = async (
    e: React.MouseEvent<HTMLElement>,
    newFriendId: string
  ) => {
    const clickedButton = e.currentTarget;
    try {
      await addFriend(newFriendId);
      showToast("Friend added succesfully!", "success");
      clickedButton.innerText = "Friend Added";
    } catch (error) {
      showToast("Failed to add friend!", "error");
    }
  };

  const showSearchResults = searchResults?.map(
    ({ friendId, friendUsername }, index) => {
      if (!user) {
        return;
      }
      if (friendId === user.id || user.friends.includes(friendId)) {
        return;
      }

      return (
        <div key={index}>
          <ListItem>
            <ListItemText primary={friendUsername} />
            <Button
              variant="text"
              onClick={(e) => handleAddFriend(e, friendId)}
            >
              Add Friend
            </Button>
          </ListItem>
          <Divider />
        </div>
      );
    }
  );

  useEffect(() => {
    return () => {};
  }, [friendsList]);

  return (
    <Stack
      sx={{
        maxWidth: { sm: "300px", md: "500px", lg: "700px" },
        width: "100%",
        margin: "auto",
      }}
      spacing={2}
    >
      <TextField
        id="outlined-basic"
        label="Enter Username"
        variant="outlined"
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <Button variant="contained" onClick={() => handleClick()}>
        Search
      </Button>
      {showSearchResults}
    </Stack>
  );
};

export default SearchAddFriend;
