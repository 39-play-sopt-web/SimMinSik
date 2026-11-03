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

현재 환경 변수는 API 주소만 사용합니다. 회원 코드는 다음 단계에서 발급받아 관리할 예정입니다.
브라우저에 포함되는 VITE 환경 변수에는 비밀 키를 넣지 않습니다.

## 확인

```bash
npm run typecheck
npm run lint
npm run build
```
