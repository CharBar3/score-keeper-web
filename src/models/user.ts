export interface User {
  id: string;
  username: string;
  friends: string[];
  games: string[];
  usernameSearchTerms: string[];
}

// interface FriendIDAndStatus {
//   id: string;
//   status: FriendRequestStatus;
// }

// enum FriendRequestStatus {
//   Pending = "pending",
//   Accepted = "accepted",
//   Blocked = "blocked",
// }
