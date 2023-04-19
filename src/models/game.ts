interface CreateGame {
  title: string;
  info: string;
}

interface Game {
  id: string;
  title: string; // title of the game. Example: Splendor
  info: string; // description if you want to add more info about the game (when/where)
  ownerId: string; // the logged in user who created the game
  adminIds: string[] | []; // players in the game who have admin privliges
  canEditIds: string[] | [];
  players: Player[];
  guestPlayers: GuestPlayer[] | [];
}

type GameCreateParams = Omit<Game, "id">;

interface Player {
  playerId: string; // the players id.
  name: string; // defaults to the players username but can be updated
  isAdmin: boolean; // admins can edit all players
  canEdit: boolean; // if they can edit their own score card or not
  score: number;
  notes: string;
}

interface GuestPlayer {
  id: string;
  name: string;
  score: number;
  notes: string;
}

type GuestPlayerCreatePerams = Omit<GuestPlayer, "id">;

interface GamePreview {
  gameId: string;
  gameTitle: string;
  gameInfo: string;
}
