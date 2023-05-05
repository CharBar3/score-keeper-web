"use client";

import { Friend } from "@/models";
import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";

import { Button, Divider, ListItem, ListItemText, Stack } from "@mui/material";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import SearchBar from "../SearchBar/SearchBar";

interface SearchAddFriendProps {}

const FriendSearch: FC<SearchAddFriendProps> = () => {
  const { user, friendsList, addFriend, findFriend } = useDataStore();
  const { showToast } = useToast();
  const [searchResults, setSearchResults] = useState<Friend[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    async (searchTerm: string | null) => {
      try {
        if (searchTerm) {
          setSearchResults(await findFriend(searchTerm));
        } else {
          setSearchResults(null);
        }
        setIsSearching(false);
      } catch (error) {
        console.log(error);
      }
    },
    [findFriend]
  );

  const handleAddFriend = async (newFriendId: string) => {
    try {
      await addFriend(newFriendId);
      showToast("Friend added succesfully!", "success");
    } catch (error) {
      showToast("Failed to add friend!", "error");
    }
  };

  const showSearchResults = searchResults?.map(({ id, username }) => {
    if (!user) {
      return;
    }
    if (id === user.id || user.friends.includes(id)) {
      return;
    }

    return (
      <Fragment key={id}>
        <ListItem>
          <ListItemText
            // primaryTypographyProps={{ fontSize: "20pt", color: "#5A5A5A" }}
            primary={username}
          />
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "lightgreen",
              },
            }}
            variant="styled"
            onClick={() => handleAddFriend(id)}
          >
            {/* <Image
              src={plusIcon}
              width={27}
              height={27}
              alt="add friend icon"
            /> */}
            <PlusIcon width="27px" height="27px" />
          </Button>
        </ListItem>
        <Divider />
      </Fragment>
    );
  });

  useEffect(() => {
    return () => {};
  }, [friendsList]);

  return (
    <Stack>
      <SearchBar
        placeholder="Find Friends"
        onChangeSearch={handleSearch}
        debounce={1000}
        setIsSearching={setIsSearching}
      />

      <Divider />
      {isSearching && <h1>Loading...</h1>}
      {showSearchResults}
    </Stack>
  );
};

export default FriendSearch;
