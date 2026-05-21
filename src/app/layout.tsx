import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hari Shankar Limbu | App & Full Stack Developer",
  description: "Portfolio of Hari Shankar Limbu, app and full stack developer focused on AI automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitializer = `
    (function () {
      try {
        var storedTheme = localStorage.getItem("theme");
        var shouldUseDark = storedTheme ? storedTheme === "dark" : true;
        document.documentElement.classList.toggle("dark", shouldUseDark);
      } catch (e) {
        document.documentElement.classList.add("dark");
      }
    })();
  `;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
