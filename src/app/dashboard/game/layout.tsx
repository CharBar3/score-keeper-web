import { GameProvider } from "@/providers/Game";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
