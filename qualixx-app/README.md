# Qualixx Web App (데모)

로그인 → Dashboard → Work Process → Risk Management(ISO 14971) 흐름의 프런트엔드 프로토타입입니다.
서버 없이 동작하며, 데이터는 사용자의 브라우저(localStorage)에만 저장됩니다.

## 파일 구성

```
app/
  index.html   진입 페이지
  styles.css   디자인 (Statly 스타일 참고: 회색 배경, 흰색 카드, 좌측 사이드바, 인디고 강조색)
  data.js      기준 데이터 (심각도·확률 등급, 위해요인 라이브러리, 안전 특성 질문, 샘플 제품)
  app.js       화면과 동작 (라우팅, 위험 판정, 완료 조건 점검, 보고서, 감사추적)
```

## 웹사이트(qualixx.ai)에 올리는 방법

1. GitHub 저장소 `lokifather/qualixx`의 최상위에 `app` 폴더를 그대로 복사합니다.
2. 커밋 후 push하면 GitHub Pages가 자동 배포합니다.
3. `https://qualixx.ai/app/`으로 접속합니다.
4. 랜딩페이지에 버튼을 추가하려면: `<a href="/app/">Sign in</a>`

빌드 과정이 없는 순수 HTML/CSS/JS라서 그대로 올리면 동작합니다. 로컬에서는 `app/index.html`을 더블클릭해도 열립니다.

## 데모 계정

- 이메일: `demo@qualixx.ai`
- 비밀번호: `qualixx1234`

데모 계정 정보는 `data.js`의 `DEMO_USERS`에서 바꿀 수 있습니다.

## 화면 흐름

| 경로 | 화면 |
| --- | --- |
| `#/login` | 로그인 |
| `#/dashboard` | 대시보드 (위험관리 요약 KPI, 위험관리 파일 목록) |
| `#/process` | Work Process (프로세스 목록, Risk Management만 활성) |
| `#/process/risk` | 위험관리 파일 목록 |
| `#/process/risk/{id}/{step}` | 위험관리 단계: overview · plan · char · analysis · control · review · report · audit |

## 주의 사항 (중요)

- **보안**: 데모 로그인은 화면 전환용입니다. 비밀번호가 코드에 들어 있어 실제 보안 기능은 없습니다. 실제 고객 데이터나 기밀 정보는 입력하지 마세요.
- **데이터 보관**: 브라우저 데이터를 지우면 입력 내용이 사라집니다. 다른 PC와 공유되지 않습니다.
- **정식 버전**: 계획된 NestJS + PostgreSQL + AWS 구조로 옮길 때 실제 인증, 서버 저장, 서버 측 감사추적, 21 CFR Part 11 수준 전자서명을 구현해야 합니다.
- 위해요인 라이브러리와 안전 특성 질문은 ISO 14971 부속서 C, ISO/TR 24971 부속서 A의 분류를 참고해 직접 작성한 요약이며, 표준 원문이 아닙니다.
- 기본 위험 수용 기준(심각도 × 확률 ≤ 6)은 예시입니다. Plan 단계에서 회사 정책에 맞게 바꾸세요.
