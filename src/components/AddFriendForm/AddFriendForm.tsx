"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { DatabaseService } from "@/services/database-service";
import {
  Button,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";

interface SearchAddFriendProps {}

interface AddFriendSearchResults {
  username: string;
  id: string;
}

const SearchAddFriend: FC<SearchAddFriendProps> = () => {
  const { user } = UserAuth();

  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState<
    AddFriendSearchResults[] | []
  >([]);

  const handleClick = async () => {
    const firebaseResponse = await DatabaseService.findFriendsByUsername(
      searchWord
    );
    if (firebaseResponse.length === 0) {
      setSearchResults([{ username: "No Results", id: "No ID" }]);
    } else {
      setSearchResults(firebaseResponse);
    }
  };

  const handleAddFriend = async (newFriendId: string) => {
    if (user) {
      DatabaseService.addFriend(newFriendId, user.uid);
    }
  };

  const showSearchResults = searchResults.map(({ username, id }, index) => {
    return (
      <div key={index}>
        <ListItem>
          <ListItemText primary={username} />
          <Button variant="text" onClick={() => handleAddFriend(id)}>
            Add Friend
          </Button>
        </ListItem>
        <Divider />
      </div>
    );
  });

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
