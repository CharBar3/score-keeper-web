import GameView from "@/components/GameView/GameView";
import { FC } from "react";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  return <GameView id={params.id} />;
};

export default Page;
