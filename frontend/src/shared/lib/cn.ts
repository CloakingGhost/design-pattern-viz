/**
 * cn 유틸리티 함수
 * Tailwind CSS 클래스를 조건부로 병합하는 헬퍼
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', className)
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
