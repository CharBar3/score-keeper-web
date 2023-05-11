import DashboardNav from "@/components/DashboardNav/DashboardNav";
import GameList from "@/components/GameList/GameList";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div>
      <GameList />
      <DashboardNav />
    </div>
  );
};

export default Dashboard;
