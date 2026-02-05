import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 메타데이터 설정
 */
export const metadata: Metadata = {
  title: "Design Pattern Visualizer | 디자인 패턴 시각화 학습",
  description: "디자인 패턴의 동작 원리를 시각적 애니메이션으로 이해하세요. Singleton, Strategy 등 주요 패턴을 단계별로 학습합니다.",
  keywords: ["디자인 패턴", "Design Pattern", "Singleton", "Strategy", "시각화", "학습"],
};

/**
 * 루트 레이아웃
 * 
 * [FSD 아키텍처]
 * app 폴더는 순수하게 라우팅만 담당합니다.
 * 실제 페이지 구성은 pages 레이어에서 처리합니다.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 라이트 모드 강제 적용: class="light" 추가
    <html lang="ko" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
