import { Friend } from "./friend";

export interface User {
  id: string;
  username: string;
  friends: Friend[];
  games: string[];
  usernameSearchTerms: string[];
}
