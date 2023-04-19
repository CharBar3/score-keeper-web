import { Role } from "./role";

export interface Player {
  id: string; // the players id.
  name: string; // defaults to the players username but can be updated
  role: Role;
  score: number;
  notes: string;
}

export type GuestPlayerCreateParams = Omit<Player, "id">;
