"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { Friend } from "@/models";
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
  const { user, friendsList, addFriend, findFriend } = useDataStore();
  const { showToast } = useToast();

  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState<Friend[] | null>(null);

  const handleClick = async () => {
    try {
      // const res = await findFriend(searchWord);
      // if (res === undefined) {
      //   setSearchResults(null);
      // } else {
      //   setSearchResults(res);
      // }
      setSearchResults(await findFriend(searchWord));
    } catch (error) {}
  };

  const handleAddFriend = async (
    e: React.MouseEvent<HTMLElement>,
    newFriendId: string
  ) => {
    try {
      await addFriend(newFriendId);
      showToast("Friend added succesfully!", "success");
    } catch (error) {
      showToast("Failed to add friend!", "error");
    }
  };

  const showSearchResults = searchResults?.map(({ id, username }, index) => {
    if (!user) {
      return;
    }
    if (id === user.id || user.friends.includes(id)) {
      return;
    }

    return (
      <div key={index}>
        <ListItem>
          <ListItemText primary={username} />
          <Button variant="text" onClick={(e) => handleAddFriend(e, id)}>
            Add Friend
          </Button>
        </ListItem>
        <Divider />
      </div>
    );
  });

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
