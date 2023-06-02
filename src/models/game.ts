import { Player } from "./player";

export enum IconNames {
  Cards = "cards",
  Castle = "castle",
  GamePeices = "gamepeices",
  Jewel = "jewel",
  MoneySign = "moneysign",
  Train = "train",
}

export interface Game {
  id: string;
  title: string;
  info: string;
  ownerId: string;
  playerIds: string[];
  players: Player[];
  color: Color;
  joinInfo: { code: string; createdAt: string } | null;
  createdAt: string;
  icon: IconNames;
}

export type GameCreateParams = Omit<Game, "id">;
export interface Color {
  red: number;
  green: number;
  blue: number;
}
