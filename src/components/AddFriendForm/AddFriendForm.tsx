"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { useDataStore } from "@/providers/DataStore";
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
  const { user } = UserAuth();
  const { friendsList, getFriends } = useDataStore();

  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState<Friend[] | null>(null);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const firebaseResponse = await DatabaseService.findFriendByUsername(
      searchWord,
      user.uid
    );
    if (firebaseResponse.length === 0) {
      setSearchResults(null);
    } else {
      setSearchResults(firebaseResponse);
    }
  };

  const handleAddFriend = async (
    e: React.SyntheticEvent,
    newFriendId: string
  ) => {
    if (!user) {
      return;
    }
    e.currentTarget.textContent = "Friend Added!";
    try {
      await DatabaseService.addFriend(newFriendId, user.uid);
      getFriends();
    } catch (error) {
      alert("failed to add friend");
    }
  };

  const showSearchResults = searchResults?.map(
    ({ friendId, friendUsername }, index) => {
      console.log("loop reload check");

      if (!user) {
        return;
      }
      if (friendId === user.uid) {
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
