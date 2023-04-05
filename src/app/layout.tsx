import Nav from "@/components/Nav/Nav";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import Providers from "@/providers/Providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthContextProvider>
            <Nav />
            {children}
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
