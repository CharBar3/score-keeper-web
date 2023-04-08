import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { ProtectedContextProvider } from "@/contexts/ProtectedContext";
import { DataStoreProvider } from "@/providers/DataStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProtectedContextProvider>
        <DataStoreProvider>
          <DashboardNav />
          {children}
        </DataStoreProvider>
      </ProtectedContextProvider>
    </section>
  );
}
