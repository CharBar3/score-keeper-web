import FriendsList from "@/components/FriendsList/FriendsList";
import GameList from "@/components/GameList/GameList";
import { Typography } from "@mui/material";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div>
      <FriendsList />
      <GameList />
    </div>
  );
};

export default Dashboard;
