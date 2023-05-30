"use client";

import { Color, Role } from "@/models";
import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import NotesDialog from "../NotesDialog/NotesDialog";
import ScoreFormDialog from "../ScoreFormDialog/ScoreFormDialog";
import PlayerSettingsDialog from "../PlayerSettingsDialog/PlayerSettingsDialog";
import { useGame } from "@/providers/Game";

interface PlayerCardProps {
  id: string;
  name: string;
  role: Role;
  score: number;
  notes: string;
  color: Color;
}

const PlayerCard: FC<PlayerCardProps> = ({
  id,
  name,
  score,
  notes,
  role,
  color,
}) => {
  const theme = useTheme();
  const { activePlayer } = useGame();

  let hasPermission = false;

  if (activePlayer?.role === Role.Owner || activePlayer?.id === id) {
    hasPermission = true;
  }

  const boxShadowColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
  const borderColor = `rgba(${color.red}, ${color.green}, ${color.blue}, .6)`;
  const isLessThan670px = useMediaQuery(theme.breakpoints.down(670));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderStyle: "solid",
        borderRadius: "7px",
        border: `10px solid ${borderColor}`,
        boxShadow: `0px 20px ${boxShadowColor}`,
        marginBottom: "20px",
        aspectRatio: "13/14",
        width: "290px",
        [theme.breakpoints.down(670)]: {
          width: "130px",
          height: "140px",
          border: `5px solid ${borderColor}`,
          boxShadow: `0px 10px ${boxShadowColor}`,
          marginBottom: "10px",
        },
      }}
    >
      <CardContent
        sx={{
          paddingBottom: "0px",
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          noWrap
          gutterBottom
          sx={{
            [theme.breakpoints.down(670)]: {
              fontSize: "15px",
            },
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h1"
          textAlign="center"
          sx={{
            [theme.breakpoints.down(670)]: {
              fontSize: "15px",
            },
          }}
        >
          {score}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          // padding: "0px",
          display: "flex",
          justifyContent: "center",
          [theme.breakpoints.down(670)]: {
            padding: "0px",
          },
        }}
        disableSpacing={true}
      >
        <Grid
          container
          spacing={isLessThan670px ? 0.5 : 2}
          sx={{ width: "100%" }}
        >
          <Grid xs={12}>
            <NotesDialog
              notes={notes}
              id={id}
              name={name}
              sx={{
                width: "100%",
                height: "44px",
                display: "flex",
                margin: "0px 0px 8px 0px",
                justifyContent: "space-between",
                [theme.breakpoints.down(670)]: {
                  height: "22px",
                },
              }}
            />
          </Grid>

          <Grid xs={12} sx={{ display: "flex" }}>
            <Stack
              direction="row"
              sx={{ width: "100%" }}
              spacing={{ xs: 0.5, sm: 1 }}
            >
              {hasPermission && (
                <PlayerSettingsDialog
                  id={id}
                  name={name}
                  role={role}
                  color={color}
                />
              )}
              <ScoreFormDialog
                playerId={id}
                sx={{
                  width: "100%",
                  height: "44px",
                  [theme.breakpoints.down(670)]: {
                    height: "22px",
                  },
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
