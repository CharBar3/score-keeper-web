import { Player } from "./player";

export interface Game {
  id: string;
  title: string;
  info: string;
  ownerId: string;
  playerIds: string[];
  players: Player[];
  color: Color;
  joinCode: string;
}

export type GameCreateParams = Omit<Game, "id">;
export interface Color {
  red: number;
  green: number;
  blue: number;
}
