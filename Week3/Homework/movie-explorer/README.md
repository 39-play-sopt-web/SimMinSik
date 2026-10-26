# 3주차 영화 탐색 과제

지난 과제에서 Emotion을 사용해봤지만, 필요한 스타일을 바로 조합할 수 있는 Tailwind가 저에게는 더 편했습니다. 그래서 이번에는 화면 스타일을 Tailwind로 작성하고, 과제 조건인 ThemeProvider와 GlobalStyle은 Emotion으로 적용했습니다.

## 실행

```sh
npm install
npm run dev
```

프로젝트 폴더의 `.env`에 아래 값을 설정합니다. `.env`는 커밋하지 않습니다.
API 키 문구는 예시이므로 본인이 발급받은 키로 바꿔 넣습니다.
`VITE_` 환경 변수는 브라우저에 전달되므로 서버 전용 비밀값을 넣으면 안 됩니다.

```dotenv
VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_API_KEY="이거슨_저의_api_키 입니다."
```

## 검사

```sh
npm run typecheck
npm run lint
npm run build
```

현재 공통 레이아웃과 목록·상세 페이지의 라우팅을 구성했습니다. 영화 조회는 다음 단계에서 추가합니다.
