import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Roboto } from "next/font/google";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: "PetMate",
  description:
    "A platform offering expert pet care tips and heartwarming stories about the deep bond between pets and their owners. Learn how to take better care of your furry friends with tips on nutrition, grooming, and more.",
};

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const poppins = Poppins({
  weight: ["400", "600"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
