"use client";

import { DatabaseService } from "@/services/database-service";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";

interface SearchAddFriendProps {}

const SearchAddFriend: FC<SearchAddFriendProps> = () => {
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([
    { id: "no id yet", username: "no username yet" },
  ]);

  const handleClick = async () => {
    console.log(searchWord);
    const searchResults = await DatabaseService.findFriendsByUsername(
      searchWord
    );

    setResults(searchResults);
  };

  const showResults = results.map(({ id, username }) => {
    return (
      <div key={id}>
        <h4>{username}</h4>
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
    >
      <Typography variant="h3">SearchAddFriend</Typography>
      <TextField
        id="outlined-basic"
        label="Search for Friend by username"
        variant="outlined"
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <Button variant="contained" onClick={() => handleClick()}>
        Search
      </Button>
      <Typography variant="h3">Result</Typography>
      {showResults}
    </Stack>
  );
};

export default SearchAddFriend;
