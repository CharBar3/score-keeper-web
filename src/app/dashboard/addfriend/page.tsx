import AddFriendForm from "@/components/AddFriendForm/AddFriendForm";
import { FC } from "react";

interface AddFriendProps {}

const AddFriend: FC<AddFriendProps> = () => {
  return (
    <div>
      <AddFriendForm />
    </div>
  );
};

export default AddFriend;
