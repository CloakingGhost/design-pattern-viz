"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib";

interface LogoProps {
  className?: string;
}
/* 로고 */

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center justify-center gap-3", className)}
    >
      <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
        <BookOpen className="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 className="font-bold">Design Pattern Visualizer</h1>
        <p className="text-sm text-slate-500">디자인 패턴과 시각적 이해</p>
      </div>
    </Link>
  );
}
