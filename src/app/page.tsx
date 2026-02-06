import { HomePage } from '@/views';

/**
 * 메인 페이지 라우트
 * 
 * [FSD 아키텍처]
 * app 폴더의 page.tsx는 순수하게 라우팅 역할만 수행합니다.
 * 실제 페이지 렌더링은 views 레이어의 HomePage 컴포넌트가 담당합니다.
 */
export default function Page() {
  return <HomePage />;
}
