import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Publica el alto de la ventana en `--alto-ventana` y lo deja QUIETO
            mientras sólo se mueva la barra del navegador. `svh` debería ser el
            viewport chico y fijo, pero en navegadores dentro de apps en iPhone
            se comporta como `dvh`. Va sin diferir: la variable tiene que
            existir antes del primer pintado o la página se re-maqueta. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{const r=document.documentElement,t=matchMedia("(pointer: coarse)");let a=innerWidth;const p=()=>{a=innerWidth;r.style.setProperty("--alto-ventana",innerHeight+"px")};p();addEventListener("resize",()=>{if(t.matches&&innerWidth===a)return;p();requestAnimationFrame(p)})})()`,
          }}
        />
        <meta name="theme-color" content="#0B111D" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
