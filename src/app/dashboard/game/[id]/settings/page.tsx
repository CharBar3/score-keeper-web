import { FC } from "react";

interface GameSettingsPageProps {
  params: { id: string };
}

const GameSettingsPage: FC<GameSettingsPageProps> = ({ params }) => {
  return (
    <div>
      <h1>{params.id}</h1>
      <h1>Game Settings Page</h1>
    </div>
  );
};

export default GameSettingsPage;
