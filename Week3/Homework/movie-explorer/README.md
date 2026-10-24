# 3주차 영화 탐색 과제

React + TypeScript + Vite로 구성했습니다.
화면 스타일은 Tailwind, 테마와 전역 스타일은 Emotion을 사용합니다.

## 실행

```sh
npm install
npm run dev
```

프로젝트 폴더의 `.env`에 아래 값을 설정합니다. `.env`는 커밋하지 않습니다.
`VITE_` 환경 변수는 브라우저에 전달되므로 서버 전용 비밀값을 넣으면 안 됩니다.

```dotenv
VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_API_KEY=발급받은_API_키
```

## 검사

```sh
npm run typecheck
npm run lint
npm run build
```

현재는 초기 실행 환경만 구성했습니다. 영화 조회와 라우팅은 다음 단계에서 추가합니다.
