"use client";
import GameView from "@/components/GameView/GameView";
import { useLiveGame } from "@/providers/LiveGame";
import { FC, useEffect } from "react";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const { setGameId } = useLiveGame();
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
