import { Box, Slider } from "@mui/material";
import { FC } from "react";
import { Player } from "@/models";
import * as _ from "lodash";
import { BorderBottom } from "@mui/icons-material";

interface ScoreTrackSliderProps {
  players: Player[];
}

const ScoreTrackSlider: FC<ScoreTrackSliderProps> = ({ players }) => {
  const cloneDeepPlayers = _.cloneDeep(players);

  cloneDeepPlayers.sort((a, b) => {
    return a.score - b.score;
  });

  let lowestScore = 0;

  const values: number[] = cloneDeepPlayers.map(({ score }) => {
    if (score < lowestScore) {
      lowestScore = score;
    }

    return score;
  });

  values.unshift(lowestScore);

  const colors = cloneDeepPlayers.map(({ color }, index) => {
    return {
      [`& .MuiSlider-thumb[data-index="${index + 1}"]`]: {
        backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
      },
    };
  });

  values.find((number: number) => number < 0);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        padding: "50px",
        display: "flex",
      }}
    >
      <Slider
        track={false}
        value={values}
        max={values.at(-1)}
        min={values.find((number: number) => number < 0) ? values[0] : 0}
        // marks={[
        //   { value: 0, label: "0" },
        //   { value: values.at(-1) as number, label: `${values.at(-1)}` },
        // ]}
        sx={[
          ...colors,
          // { "& .MuiSlider-thumb": { "&:hover": { cursor: "auto" } } },
          {
            [`& .MuiSlider-thumb[data-index="0"]`]: {
              backgroundColor: "transparent",
              position: "relative",
              left: "24px",
              borderRadius: "0px",
              width: "0px",
              height: "0px",
              borderTop: "14px solid transparent",
              borderBottom: "14px solid transparent",
              borderLeft: "24px solid #EDEDED",
            },
          },
          { "& .MuiSlider-rail": { color: "#EDEDED", opacity: 1 } },
        ]}
        disabled={true}
      />
    </Box>
  );
};

export default ScoreTrackSlider;
