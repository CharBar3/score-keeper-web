import AnonSignupDialog from "@/components/AnonSignupForm/AnonSignupDialog";
import GameList from "@/components/GameList/GameList";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <>
      <GameList />
    </>
  );
};

export default Dashboard;
