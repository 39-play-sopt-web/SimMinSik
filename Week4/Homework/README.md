# 4주차 게시판 과제

TanStack Query로 게시글 조회와 작성·수정·삭제를 연습하는 과제입니다.

화면은 익숙한 Tailwind로 작성하고, 공통 색상과 전역 스타일은 Emotion으로 관리합니다.

## 실행

이 폴더에서 다음 명령어를 실행합니다.

```bash
npm install
cp .env.example .env
npm run dev
```

API에서 허용한 주소에 맞춰 http://localhost:5173 에서 실행합니다.
실습 서버가 같은 포트를 사용 중이면 먼저 종료해야 합니다.

환경 변수는 API 주소만 사용합니다. 회원 코드는 발급 성공 시 브라우저의 localStorage에 저장합니다.
코드가 없으면 작성·수정 경로 진입 시 안내 후 발급 화면으로 이동합니다.
라우트 가드는 화면 진입을 제어하며, 실제 수정·삭제 권한은 서버에서 확인합니다.
브라우저에 포함되는 VITE 환경 변수에는 비밀 키를 넣지 않습니다.

## 확인

```bash
npm run typecheck
npm run lint
npm run build
```
