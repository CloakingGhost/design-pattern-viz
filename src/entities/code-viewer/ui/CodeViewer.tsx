'use client';

import React, { useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/shared/lib';

/**
 * CodeViewer 컴포넌트 Props
 */
interface CodeViewerProps {
  /** Java 코드 배열 (각 요소가 한 라인) */
  code: string[];
  /** 하이라이트할 라인 번호들 */
  highlightLines?: number[];
  /** 언어 (기본: java) */
  language?: string;
  /** 라인 번호 표시 여부 */
  showLineNumbers?: boolean;
  /** 최대 높이 (스크롤 가능) */
  maxHeight?: string;
  className?: string;
}

/**
 * CodeViewer 컴포넌트
 *
 * [역할 - Entities 레이어]
 * 코드 뷰어는 "비즈니스 엔티티"입니다.
 * 코드라는 도메인 개념을 표현하며, 사용자 인터랙션 없이 데이터를 표시합니다.
 *
 * [기능]
 * - Java (또는 다른 언어) 코드를 구문 강조와 함께 표시
 * - 현재 실행 중인 라인을 하이라이트
 * - 라인 번호 표시
 */
export function CodeViewer({
  code,
  highlightLines = [],
  language = 'java',
  showLineNumbers = true,
  className,
}: CodeViewerProps) {
  // 코드 배열을 문자열로 합치기
  const codeString = useMemo(() => code.join('\n'), [code]);

  // 하이라이트 라인을 Set으로 변환 (빠른 조회)
  const highlightSet = useMemo(() => new Set(highlightLines), [highlightLines]);

  // 코드 길이에 따른 높이 계산 (라인당 약 24px, fontSize 0.875rem + lineHeight 1.5 + padding)
  const calculatedMaxHeight = useMemo(() => {
    const lineHeight = 24; // px
    const padding = 32; // 1rem top + 1rem bottom = 32px
    const contentHeight = code.length * lineHeight + padding;
    return contentHeight;
  }, [code.length]);

  // 라인 Props 생성 함수 (하이라이트 적용)
  const lineProps = (lineNumber: number) => {
    const isHighlighted = highlightSet.has(lineNumber);
    return {
      style: {
        display: 'block',
        width: '100%',
        backgroundColor: isHighlighted ? '#dbeafe' : 'transparent',
        borderLeft: isHighlighted ? '4px solid #3b82f6' : '4px solid transparent',
        marginLeft: isHighlighted ? '-16px' : '0',
        paddingLeft: isHighlighted ? '12px' : '0',
        transition: 'all 0.2s ease',
      },
    };
  };

  // 라인 번호 스타일
  const lineNumberStyle = {
    minWidth: '2.5em',
    paddingRight: '1em',
    textAlign: 'right' as const,
    userSelect: 'none' as const,
    color: '#94a3b8',
  };

  // 커스텀 스타일 (라이트 테마 기반)
  const customStyle = {
    ...oneLight,
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '1rem',
      fontSize: '0.875rem',
      lineHeight: '1.5',
    },
    'code[class*="language-"]': {
      ...oneLight['code[class*="language-"]'],
      background: 'transparent',
    },
  };

  return (
    <div
      className={cn(
        'relative overflow-auto rounded-lg border border-slate-200 bg-slate-50 font-mono text-sm',
        className
      )}
      style={{ 
        minHeight: '500px',
        maxHeight: `${Math.max(500, calculatedMaxHeight)}px`
      }}
    >
      <SyntaxHighlighter
        language={language}
        style={customStyle}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={lineNumberStyle}
        wrapLines={true}
        lineProps={(lineNumber) => lineProps(lineNumber)}
        customStyle={{
          margin: 0,
          background: 'transparent',
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
