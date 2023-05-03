"use client";

import { useDataStore } from "@/providers/User";
import { Container, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { FC, useState } from "react";
import GameCard from "../GameCard/GameCard";
import SearchBar from "../SearchBar/SearchBar";

interface GameListProps {}

const GameList: FC<GameListProps> = () => {
  const { gameList } = useDataStore();
  const [gameFilter, setGameFilter] = useState<string>("");

  let showGames = null;

  if (gameList) {
    showGames = gameList
      .filter(({ title }) =>
        title.toLowerCase().includes(gameFilter.toLowerCase())
      )
      .map(({ id, title, playerIds, color }) => {
        return (
          <Grid key={id} xs={6} sm={6} md={4} lg={3} xl={3}>
            <Link href={`dashboard/game/${id}`}>
              <GameCard title={title} playerIds={playerIds} color={color} />
            </Link>
          </Grid>
        );
      });
  }

  const filterGames = (searchTerm: string | null) => {
    // startTransition(() => {
    if (searchTerm) {
      setGameFilter(searchTerm);
    } else {
      setGameFilter("");
    }
    // });
  };

  return (
    // <Container>
    <Stack spacing={1}>
      <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 3 }}>
        <Grid xs={12}>
          <SearchBar
            placeholder="Search Games"
            onChangeSearch={filterGames}
            debounce={null}
          />
        </Grid>
        {showGames}
      </Grid>
    </Stack>
    // </Container>
  );
};

export default GameList;
