import Logo from "@/components/Logo/Logo";
import NavBar from "@/components/NavBar/NavBar";
import Toast from "@/components/Toast/Toast";
import { AuthProvider } from "@/providers/Auth";
import Providers from "@/providers/Providers";
import { ToastProvider } from "@/providers/ToastProvider";
import "./globals.css";

export const metadata = {
  title: "Score Deck",
  description: "An app for keeping track of your score!",
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
          <ToastProvider>
            <AuthProvider>
              <Logo />
              <NavBar />
              {children}
              {/* div for extra space at the bottom to accomodate navbar */}
              <div style={{ height: "106px" }}></div>
              <Toast />
            </AuthProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
