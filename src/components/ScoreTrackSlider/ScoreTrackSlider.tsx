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

  const values: number[] = cloneDeepPlayers.map(({ score }) => {
    return score;
  });

  const colors = cloneDeepPlayers.map(({ color }, index) => {
    return {
      [`& .MuiSlider-thumb[data-index="${index}"]`]: {
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
        paddingLeft: "42px",
        display: "flex",
      }}
    >
      <Box
        sx={{
          position: "relative",
          // zIndex: "1",
          left: "8px",
          top: "1px",
          borderRadius: "0px",
          width: "0px",
          height: "0px",
          borderTop: "14px solid transparent",
          borderBottom: "14px solid transparent",
          borderLeft: "24px solid #EDEDED",
        }}
      ></Box>

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
            // [`& .MuiSlider-thumb[data-index="0"]`]: {
            //   // all: "unset",
            //   backgroundColor: "transparent",
            //   position: "relative",
            //   left: "24px",
            //   borderRadius: "0px",
            //   width: "0px",
            //   height: "0px",
            //   borderTop: "14px solid transparent",
            //   borderBottom: "14px solid transparent",
            //   borderLeft: "24px solid #EDEDED",
            // },
          },
          { "& .MuiSlider-rail": { color: "#EDEDED", opacity: 1 } },
        ]}
        disabled={true}
      />
    </Box>
  );

  return <></>;
};

export default ScoreTrackSlider;
