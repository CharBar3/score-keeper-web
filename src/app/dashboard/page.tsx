import GameList from "@/components/GameList/GameList";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div>
      <GameList />
    </div>
  );
};

export default Dashboard;
