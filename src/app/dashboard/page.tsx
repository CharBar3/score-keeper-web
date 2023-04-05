import FriendsList from "@/components/FriendsList/FriendsList";
import { Typography } from "@mui/material";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div>
      <FriendsList />
    </div>
  );
};

export default Dashboard;
