"use client";
import { Navigation, Logo } from "@/widgets";

/* 헤더 */
export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-18 py-4">
        <Logo />
        {/* 네비게이션 */}
        <Navigation />
      </div>
    </header>
  );
}
