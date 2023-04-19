import { LiveGameProvider } from "@/providers/LiveGame";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LiveGameProvider>
      <section>{children}</section>
    </LiveGameProvider>
  );
}
