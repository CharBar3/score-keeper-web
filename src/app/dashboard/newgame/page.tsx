import NewGameView from "@/components/NewGameView/NewGameView";
import { FC } from "react";

interface newGameProps {}

const newGame: FC<newGameProps> = () => {
  return (
    <div>
      <NewGameView />
    </div>
  );
};

export default newGame;
