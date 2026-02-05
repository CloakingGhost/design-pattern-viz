'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib';

/**
 * Button 컴포넌트 Props
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isActive?: boolean;
}

/**
 * 공통 버튼 컴포넌트
 * 라이트 모드 테마에 맞춘 스타일링
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  isActive = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  // 기본 스타일
  const baseStyles = 
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // 변형별 스타일
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 border border-slate-200',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200',
    icon: 'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200 p-2',
  };

  // 크기별 스타일
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant !== 'icon' && sizeStyles[size],
        isActive && 'ring-2 ring-blue-500',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
