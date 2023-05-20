export interface Friend {
  id: string;
  username: string;
  status: FriendStatus;
}

export type FriendShowParams = Omit<Friend, "status">;

export enum FriendStatus {
  Accepted = "accepted",
  Requested = "requested",
  Pending = "pending",
  Blocked = "blocked",
}
