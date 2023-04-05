import { ProtectedContextProvider } from "@/contexts/ProtectedContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProtectedContextProvider>{children}</ProtectedContextProvider>
    </section>
  );
}
