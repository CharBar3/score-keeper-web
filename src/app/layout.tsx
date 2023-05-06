import Nav from "@/components/Nav/Nav";
import "./globals.css";
import { AuthProvider } from "@/providers/Auth";
import Providers from "@/providers/Providers";
import Toast from "@/components/Toast/Toast";
import { ToastProvider } from "@/providers/ToastProvider";

export const metadata = {
  title: "Score Keeper",
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
              <Nav />
              {children}
              <Toast />
            </AuthProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
