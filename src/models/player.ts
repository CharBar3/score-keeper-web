import { Color } from "./game";
import { Role } from "./role";

export interface Player {
  id: string; // the players id.
  name: string; // defaults to the players username but can be updated
  role: Role;
  score: number;
  notes: string;
  color: Color;
}

export type PlayerAddParams = Omit<Player, "score" | "notes" | "color">;

export type GuestPlayerCreateParams = Omit<Player, "id">;
export type AddPlayerParams = Omit<Player, "id" | "name" | "score" | "notes">;
