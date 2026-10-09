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

  // Some browser extensions inject <script bis_use> into <head> and stamp
  // bis_skin_checked onto every div before React hydrates, which triggers
  // hydration mismatches. Clean both up until hydration is done.
  const extensionCleaner = `
    (function () {
      var attr = "bis_skin_checked";
      function clean(root) {
        if (root.nodeType !== 1) return;
        if (root.tagName === "SCRIPT" && root.hasAttribute("bis_use")) {
          root.remove();
          return;
        }
        if (root.hasAttribute(attr)) root.removeAttribute(attr);
        var injected = root.querySelectorAll("script[bis_use]");
        for (var i = 0; i < injected.length; i++) injected[i].remove();
        var marked = root.querySelectorAll("[" + attr + "]");
        for (var j = 0; j < marked.length; j++) marked[j].removeAttribute(attr);
      }
      clean(document.documentElement);
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          if (m.type === "attributes") {
            clean(m.target);
          } else {
            for (var j = 0; j < m.addedNodes.length; j++) clean(m.addedNodes[j]);
          }
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [attr, "bis_use"],
        childList: true,
        subtree: true,
      });
      window.addEventListener("load", function () {
        setTimeout(function () { observer.disconnect(); }, 3000);
      });
    })();
  `;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: extensionCleaner }} suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} suppressHydrationWarning />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
