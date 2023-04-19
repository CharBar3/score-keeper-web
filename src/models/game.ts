import { Player } from "./player";

export interface Game {
  id: string;
  title: string; // title of the game. Example: Splendor
  info: string; // description if you want to add more info about the game (when/where)
  ownerId: string; // the logged in user who created the game
  playerIds: string[] | []; // players in the game who have admin privliges
  players: Player[];
  guestPlayers: Player[] | [];
}

export type GamePreview = Omit<
  Game,
  "ownerId" | "playerIds" | "players" | "guestPlayers"
>;

export type GameCreateParams = Omit<
  Game,
  "id" | "ownerId" | "playerIds" | "players" | "guestPlayers"
>;
