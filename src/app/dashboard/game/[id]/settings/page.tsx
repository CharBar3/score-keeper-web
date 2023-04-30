"use client";

import GameSettingsView from "@/components/GameSettingsView/GameSettingsView";

import { FC } from "react";

interface GameSettingsPageProps {
  params: { id: string };
}

const GameSettingsPage: FC<GameSettingsPageProps> = ({ params }) => {
  return (
    <div>
      <GameSettingsView gameId={params.id} />
    </div>
  );
};

export default GameSettingsPage;
