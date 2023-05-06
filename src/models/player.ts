import { Color } from "./game";
import { Role } from "./role";

export interface Player {
  id: string;
  name: string;
  role: Role;
  score: number;
  notes: string;
  color: Color;
}
