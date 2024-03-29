"use client";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";

interface AboutProps {}

const About: FC<AboutProps> = () => {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "auto",
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <Typography variant="h1" textAlign="center" gutterBottom>
        About Score Deck
      </Typography>
      <Typography variant="body1" textAlign="center" gutterBottom>
        Score Deck is an full stack web application designed around the idea
        that one person {`shouldn't`} have to keep score during board game
        night. Instead, everyone playing can create an account, join the same
        game, and keep track of their own score!
      </Typography>
      <Typography variant="h2" textAlign="center">
        Main Features
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
          <ListItemText
            primary="The math is done for you!"
            secondary="No more losing focus on the game when you have to calculate your new score in between rounds."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
          <ListItemText
            primary="Everyone keeps track of their own score!"
            secondary="As soon as a player finishes their turn it’s very easy to update their score individually."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
          <ListItemText
            primary="Real time score updates!"
            secondary="As soon as your score is updated everyone in the game can see it."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
          <ListItemText
            primary="Custom colors!"
            secondary="Everyone can adjust their color all the way down to the RGB values."
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default About;
