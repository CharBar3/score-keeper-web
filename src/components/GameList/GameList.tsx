"use client";

import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
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
  const { gameList, getFriends } = useDataStore();
  const { showToast } = useToast();

  let showGames = null;

  // if (gameList) {
  //   showGames = gameList.map(({ id, title, info }) => {
  //     return (
  //       <div key={id}>
  //         <ListItem>
  //           <ListItemText primary={title} />
  //           <Link href={`dashboard/games/${id}`}>
  //             <Button variant="text">Play Game!</Button>
  //           </Link>
  //         </ListItem>
  //         <Divider />
  //       </div>
  //     );
  //   });
  // }

  if (gameList) {
    showGames = gameList.map(({ id, title, info }) => {
      return (
        <Box
          key={id}
          sx={{
            border: "5px solid orange",
            borderRadius: "7px",
            width: "130px",
            height: "140px",
            boxShadow: "0px 20px 0px darkorange",
            marginBottom: "20px",
          }}
        >
          <Typography>{title}</Typography>
          <Typography>{info}</Typography>
        </Box>
      );
    });
  }

  return (
    <Box
      sx={{
        // maxWidth: { xs: "300px", sm: "300px", md: "500px", lg: "700px" },
        width: "100%",
        // margin: "auto",
      }}
    >
      <Typography variant="h2">GameList</Typography>
      {/* <List>
        <Divider key={1} />
        {showGames ? showGames : <>loading</>}
      </List> */}
      {showGames ? showGames : <>loading</>}
    </Box>
  );
};

export default GameList;
