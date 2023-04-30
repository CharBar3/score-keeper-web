import CreateGameForm from "@/components/CreateGameForm/CreateGameForm";
import NewGameView from "@/components/NewGameView/NewGameView";
import { FC } from "react";

interface newGameProps {}

const newGame: FC<newGameProps> = () => {
  return (
    <div>
      {/* <CreateGameForm /> */}
      <NewGameView />
    </div>
  );
};

export default newGame;
