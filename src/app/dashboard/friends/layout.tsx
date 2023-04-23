import FriendNav from "@/components/FriendNav/FriendNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <FriendNav />
      {children}
    </section>
  );
}
