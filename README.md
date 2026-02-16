# Design Pattern Visualization

디자인 패턴을 시각적 애니메이션과 코드 예시를 통해 쉽게 이해할 수 있도록 돕는 학습 플랫폼입니다.

[https://design-pattern-viz.vercel.app](https://design-pattern-viz.vercel.app)

## 프로젝트 소개 (Project Overview)

- **Description**: 디자인 패턴을 시각적 애니메이션과 코드 예시를 통해 쉽게 이해할 수 있도록 돕는 학습 플랫폼입니다.
- **Key Features**:
    - 단계별 애니메이션을 통한 동작 원리 시각화
    - 실제 코드 예시 (Java/TypeScript 등) 제공
    - 반응형 디자인 및 다크 모드 지원

## 기술 스택 (Tech Stack)

- **Architecture**: FSD (Feature-Sliced Design)
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion (애니메이션)
- **State Management**: Zustand
- **Deployment & Analytics**: Vercel, Vercel Analytics/Speed Insights

<!--
## 기술적 의사결정 (Technical Decisions & Interview Prep)


*면접관이 주목할 만한 핵심 내용입니다. 본인의 경험에 맞게 수정하여 작성해주세요.*

### State Management: Why Zustand?
> "Redux의 복잡한 보일러플레이트(Action, Reducer 등)를 피하고, **애니메이션 상태와 같이 빈번하게 변하는 데이터**를 React 컴포넌트 외부에서 효율적으로 관리하기 위해 도입했습니다. Context API 대비 불필요한 리렌더링을 방지할 수 있어 성능 최적화에 유리했습니다."

### Animation: Why Framer Motion?
> "CSS Keyframes로는 구현하기 힘든 **복잡한 시퀀스 애니메이션(순차적 실행)**과 Drag & Drop 상호작용을 선언형 코드로 직관적으로 구현하기 위해 선택했습니다. Canvas API는 접근성(a11y) 문제와 구현 비용이 높아, DOM 기반이면서 성능이 우수한 Framer Motion이 적합했습니다."

### Architecture: Why FSD (Feature-Sliced Design)?
> "**장점**: 기능(Feature) 단위로 코드를 응집시켜, 특정 디자인 패턴(예: Builder, Singleton) 관련 로직을 독립적으로 관리할 수 있습니다. 프로젝트 규모가 커져도 유지보수가 용이합니다.
> **단점**: 초기 러닝 커브와 파일 구조의 복잡함이 있지만, 확장성을 위해 채택했습니다."
-->

<!--
## 성능 최적화 및 트러블슈팅 (Optimization)


- **렌더링 최적화**: `useEffect` 의존성 배열 관리 실수를 수정하여 무한 루프 방지 및 메모리 누수 해결.
- **정량적 지표 (Metrics)**: (예시 - 추후 Lighthouse 점수 첨부 추천)
    - *Core Web Vitals*: Vercel Speed Insights를 통해 LCP, CLS 모니터링 체계 구축.
- **SEO**: Next.js Metadata API를 활용한 동적 Open Graph 이미지 생성.
-->

## 프로젝트 구조 및 기여 (Structure & Contribution)

- **License**: MIT License
- **Contribution**: GitHub Issues를 통해 버그 제보 및 기능 제안 환영.
- **Contact**: project0858@gmail.com
