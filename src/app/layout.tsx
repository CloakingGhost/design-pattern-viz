import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const baseUrl = domain ? new URL(domain) : new URL('http://localhost:3000');

/**
 * 메타데이터 설정
 */
export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: "Design Pattern Visualizer | 디자인 패턴 시각화 학습",
  description:
    "디자인 패턴의 동작 원리를 시각적 애니메이션으로 이해하세요. Singleton, Strategy 등 주요 패턴을 단계별로 학습합니다.",
  keywords: [
    "디자인 패턴",
    "Design Pattern",
    "Singleton",
    "Strategy",
    "시각화",
    "학습",
  ],
  openGraph: {
    title: "Design Pattern Visualizer | 디자인 패턴 시각화 학습",
    description:
      "디자인 패턴의 동작 원리를 시각적 애니메이션으로 이해하세요. Singleton, Strategy 등 주요 패턴을 단계별로 학습합니다.",
    url: baseUrl,
    siteName: "Design Pattern Visualizer",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://placehold.co/1200x630/png?text=Design+Pattern+Visualizer",
        width: 1200,
        height: 630,
        alt: "Design Pattern Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Pattern Visualizer | 디자인 패턴 시각화 학습",
    description:
      "디자인 패턴의 동작 원리를 시각적 애니메이션으로 이해하세요. Singleton, Strategy 등 주요 패턴을 단계별로 학습합니다.",
    images: [
      "https://placehold.co/1200x630/png?text=Design+Pattern+Visualizer",
    ],
  },
};

/**
 * 루트 레이아웃
 *
 * [FSD 아키텍처]
 * app 폴더는 순수하게 라우팅만 담당합니다.
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
