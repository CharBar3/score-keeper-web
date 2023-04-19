"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { useDataStore } from "@/providers/DataStore";
import { useToast } from "@/providers/ToastProvider";
import { DatabaseService } from "@/services/database-service";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface GameListProps {}

const GameList: FC<GameListProps> = () => {
  const { fireUser: user } = UserAuth();
  const { gameList, getFriends } = useDataStore();
  const { showToast } = useToast();

  let showGames = null;

  if (gameList) {
    showGames = gameList.map(({ id, title, info }, index: any) => {
      return (
        <div key={index}>
          <ListItem>
            <ListItemText primary={title} />
            <Link href={`dashboard/games/${id}`}>
              <Button variant="text">Play Game!</Button>
            </Link>
          </ListItem>
          <Divider />
        </div>
      );
    });
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: "300px", sm: "300px", md: "500px", lg: "700px" },
        width: "100%",
        // margin: "auto",
      }}
    >
      <Typography variant="h2">GameList</Typography>
      <List>
        <Divider key={1} />
        {showGames ? showGames : <>loading</>}
      </List>
    </Box>
  );
};

export default GameList;
