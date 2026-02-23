/**
 * 공통 상수 정의
 */

// 재생 속도 옵션
export const PLAY_SPEED_OPTIONS = [
  { label: '0.5x', value: 3000 },
  { label: '1x', value: 2000 },
  { label: '2x', value: 1000 },
  { label: '3x', value: 500 },
] as const;

// 패턴 카테고리 라벨
export const PATTERN_CATEGORY_LABELS = {
  creational: '생성 패턴',
  structural: '구조 패턴',
  behavioral: '행위 패턴',
} as const;

// 패턴 카탈로그 및 기본 패턴
export { PATTERN_CATALOG, DEFAULT_PATTERN_BY_CATEGORY } from './patterns';

// 색상 테마 (라이트 모드)
export const THEME_COLORS = {
  // 배경색
  background: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
  },
  // 텍스트 색상
  text: {
    primary: '#1E293B',
    secondary: '#475569',
    tertiary: '#94A3B8',
  },
  // 강조 색상
  accent: {
    primary: '#3B82F6',    // Blue
    secondary: '#10B981',  // Green
    warning: '#F59E0B',    // Amber
    error: '#EF4444',      // Red
  },
  // 코드 하이라이트 색상
  highlight: {
    line: '#DBEAFE',
    border: '#3B82F6',
  },
  // 애니메이션 객체 색상
  animation: {
    singleton: '#8B5CF6',  // Purple
    strategy: '#06B6D4',   // Cyan
    active: '#22C55E',     // Green
    inactive: '#CBD5E1',   // Gray
  },
} as const;

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  defaultDuration: 2,
  springStiffness: 300,
  springDamping: 30,
} as const;
