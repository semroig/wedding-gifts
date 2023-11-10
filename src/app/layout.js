import { Providers } from "./providers";

export const metadata = {
  title: "Sem & Vicky",
  description: "App de regalos para los novios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
