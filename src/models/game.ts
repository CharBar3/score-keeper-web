import { Player } from "./player";

export interface Game {
  id: string;
  title: string;
  info: string;
  ownerId: string;
  playerIds: string[];
  players: Player[];
}

export type GamePreview = Omit<
  Game,
  "ownerId" | "playerIds" | "players" | "guestPlayers"
>;

export type GameCreateParams = Omit<
  Game,
  "id" | "ownerId" | "playerIds" | "players" | "guestPlayers"
>;
