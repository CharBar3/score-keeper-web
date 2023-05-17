import GameView from "@/components/GameView/GameView";
import { FC } from "react";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params: { id } }) => {
  return (
    <>
      <GameView id={id} />
    </>
  );
};

export default Page;
