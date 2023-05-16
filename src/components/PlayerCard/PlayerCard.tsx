"use client";

import { Color, Role } from "@/models";
import { useGame } from "@/providers/Game";
import { useDataStore } from "@/providers/User";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import NotesDialog from "../NotesDialog/NotesDialog";
import ScoreChangePopover from "../ScoreChangePopover/ScoreChangePopover";

interface PlayerCardProps {
  id: string; // the players id.
  name: string; // defaults to the players username but can be updated
  // role: Role;
  score: number;
  notes: string;
  color: Color;
  // adminIds: string[];
  hasPermission: boolean;
}

enum Action {
  Increase = "increase",
  Decrease = "decrease",
}

const PlayerCard: FC<PlayerCardProps> = ({
  id,
  name,
  score,
  notes,
  color,
  hasPermission,
}) => {
  const theme = useTheme();

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
          padding: "0px",
        }}
        disableSpacing={true}
      >
        <Grid
          container
          spacing={isLessThan670px ? 1 : 2}
          sx={{
            paddingBottom: 2,
            [theme.breakpoints.down(670)]: {
              paddingBottom: "8px",
              ["& GridBaseProps.spacing"]: "8px",
            },
          }}
        >
          <Grid
            xs={12}
            sx={{
              [theme.breakpoints.down(670)]: {
                // padding: "4px",
              },
            }}
          >
            <NotesDialog
              notes={notes}
              hasPermission={hasPermission}
              id={id}
              name={name}
              sx={{
                width: "100%",
                height: "44px",
                display: "flex",
                justifyContent: "space-between",
                [theme.breakpoints.down(670)]: {
                  height: "22px",
                  // boxShadow: "0px 3px",
                },
              }}
            />
          </Grid>
          <Grid xs={6}>
            {hasPermission && (
              <ScoreChangePopover
                action={Action.Decrease}
                playerId={id}
                color={boxShadowColor}
                sx={{
                  width: "100%",
                  height: "44px",
                  [theme.breakpoints.down(670)]: {
                    minWidth: "0px",
                    height: "22px",
                    // boxShadow: "0px 3px",
                  },
                }}
              />
            )}
          </Grid>
          <Grid xs={6}>
            {hasPermission && (
              <ScoreChangePopover
                action={Action.Increase}
                playerId={id}
                color={boxShadowColor}
                sx={{
                  width: "100%",
                  height: "44px",
                  [theme.breakpoints.down(670)]: {
                    minWidth: "0px",
                    height: "22px",
                    // boxShadow: "0px 3px",
                  },
                }}
              />
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
