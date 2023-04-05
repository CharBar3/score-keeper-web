import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { ProtectedContextProvider } from "@/contexts/ProtectedContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProtectedContextProvider>
        <DashboardNav />
        {children}
      </ProtectedContextProvider>
    </section>
  );
}
