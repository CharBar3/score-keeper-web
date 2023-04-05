import CreateGameForm from "@/components/CreateGameForm/CreateGameForm";
import { FC } from "react";

interface newGameProps {}

const newGame: FC<newGameProps> = () => {
  return (
    <div>
      <CreateGameForm />
    </div>
  );
};

export default newGame;
