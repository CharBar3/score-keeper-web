import { GameProvider } from "@/providers/Game";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <section>{children}</section>
    </GameProvider>
  );
}
