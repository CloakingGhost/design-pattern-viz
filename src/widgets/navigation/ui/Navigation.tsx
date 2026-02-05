'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Boxes, 
  Network, 
  Workflow
} from 'lucide-react';
import { cn } from '@/shared/lib';

/**
 * 네비게이션 탭 정의
 */
const navTabs = [
  {
    id: 'home',
    label: '홈',
    href: '/',
    icon: Home,
  },
  {
    id: 'creational',
    label: '생성 패턴',
    href: '/creational/singleton',
    icon: Boxes,
    description: '객체 생성 메커니즘',
  },
  {
    id: 'structural',
    label: '구조 패턴',
    href: '/structural/composite',
    icon: Network,
    description: '클래스/객체 구성',
  },
  {
    id: 'behavioral',
    label: '행위 패턴',
    href: '/behavioral/strategy',
    icon: Workflow,
    description: '객체 간 상호작용',
  },
];

/**
 * Navigation 컴포넌트 Props
 */
interface NavigationProps {
  className?: string;
}

/**
 * Navigation 컴포넌트
 * 
 * [역할 - Widgets 레이어]
 * 전역 네비게이션을 담당하는 위젯입니다.
 * 홈, 생성 패턴, 구조 패턴, 행위 패턴 탭을 제공합니다.
 */
export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  // 현재 활성화된 탭 확인
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        const active = isActive(tab.href);

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              active
                ? 'bg-blue-100 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * 네비게이션 탭 내보내기 (다른 곳에서 사용 가능)
 */
export { navTabs };
