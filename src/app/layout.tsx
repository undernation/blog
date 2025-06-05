import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

// 타입스크립트 선언문법!
// 변수명 : 타입 = 값
// Metadata 타입은 next/types 패키지에 정의되어 있음
export const metadata = {
  title: "My Blog",
  description: "개인 블로그입니다",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = [
  { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}