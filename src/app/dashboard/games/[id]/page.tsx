import GameView from "@/components/GameView/GameView";
import { FC } from "react";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  return (
    <div>
      <GameView id={params.id} />
    </div>
  );
};

export default Page;
