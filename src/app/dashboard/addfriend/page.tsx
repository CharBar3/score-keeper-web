import SearchAddFriend from "@/components/AddFriend/SearchAddFriend";
import { FC } from "react";

interface AddFriendProps {}

const AddFriend: FC<AddFriendProps> = () => {
  return (
    <div>
      <SearchAddFriend />
    </div>
  );
};

export default AddFriend;
