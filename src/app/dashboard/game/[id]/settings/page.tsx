import GameSettingsView from "@/components/GameSettingsView/GameSettingsView";

import { FC } from "react";

interface GameSettingsPageProps {
  params: { id: string };
}

const GameSettingsPage: FC<GameSettingsPageProps> = ({ params }) => {
  return <GameSettingsView gameId={params.id} />;
};

export default GameSettingsPage;
