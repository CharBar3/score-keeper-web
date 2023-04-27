"use client";

import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Box,
  InputBase,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import plusIcon from "../../../public/icons/plus_sign_icon.svg";
import { FC, useState, useTransition } from "react";
import GameCard from "../GameCard/GameCard";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

interface GameListProps {}

const GameList: FC<GameListProps> = () => {
  const { showToast } = useToast();
  const { gameList, getFriends } = useDataStore();
  const [isPending, startTransition] = useTransition();
  const [gameFilter, setGameFilter] = useState<string>("");

  let showGames = null;

  if (gameList) {
    showGames = gameList
      .filter(({ title }) =>
        title.toLowerCase().includes(gameFilter.toLowerCase())
      )
      .map(({ id, title, info }) => {
        return (
          <Grid key={id} xs={6} sm={6} md={6} lg={6} xl={6}>
            <Link href={`dashboard/game/${id}`}>
              <GameCard key={id} title={title} />
            </Link>
          </Grid>
        );
      });
  }

  const filterGames = (searchTerm: string | null) => {
    startTransition(() => {
      if (searchTerm) {
        setGameFilter(searchTerm);
      } else {
        setGameFilter("");
      }
    });
  };

  return (
    <Stack spacing={1}>
      <SearchBar
        placeholder="Search Games"
        onChangeSearch={filterGames}
        debounce={null}
      />
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 4, lg: 4 }}
        sx={{
          margin: "auto",
          maxWidth: "1536px",
        }}
      >
        {showGames}
      </Grid>
    </Stack>
  );
};

export default GameList;
