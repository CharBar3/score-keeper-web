import { ProtectedContextProvider } from "@/providers/Protected";
import { UserProvider } from "@/providers/User";

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
