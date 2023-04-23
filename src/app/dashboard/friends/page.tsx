import FriendSearch from "@/components/FriendSearch/FriendSearch";
import FriendsList from "@/components/FriendsList/FriendsList";
import { FC } from "react";

interface FriendsProps {}

const Friends: FC<FriendsProps> = () => {
  return (
    <div>
      <FriendsList canRemoveFriend={true} />
    </div>
  );
};

export default Friends;
