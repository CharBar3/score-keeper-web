"use client";
import GameView from "@/components/GameView/GameView";
import { useGame } from "@/providers/Game";
import { FC, useEffect } from "react";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const { setGameId } = useGame();
  useEffect(() => {
    setGameId(params.id);
  }, [params, setGameId]);

  return (
    <div>
      <GameView id={params.id} />
    </div>
  );
};

export default Page;
