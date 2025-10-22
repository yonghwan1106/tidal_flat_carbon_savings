# Step 3: Google Cloud Service Account 생성

## 1. Google Cloud Console 접속

1. 브라우저에서 이 링크 열기: https://console.cloud.google.com/
2. 로그인 (sanoramyun8@gmail.com)

## 2. 새 프로젝트 만들기

1. 상단의 **프로젝트 선택** 클릭
2. **새 프로젝트** 클릭
3. 프로젝트 이름 입력: `tidal-flat-carbon-savings`
4. **만들기** 버튼 클릭
5. 프로젝트가 생성될 때까지 기다림 (30초 정도)
6. 상단 알림에서 **프로젝트 선택** 클릭하여 방금 만든 프로젝트 선택

## 3. Google Sheets API 활성화

1. 왼쪽 메뉴 **≡** 클릭
2. **API 및 서비스** → **라이브러리** 선택
3. 검색창에 `Google Sheets API` 입력
4. **Google Sheets API** 클릭
5. **사용 설정** 버튼 클릭

## 4. Service Account 만들기

1. 왼쪽 메뉴 **≡** 클릭
2. **IAM 및 관리자** → **서비스 계정** 선택
3. 상단의 **+ 서비스 계정 만들기** 클릭

### 4-1. 서비스 계정 세부정보
- **서비스 계정 이름**: `sheets-api-service`
- **서비스 계정 ID**: 자동 생성됨
- **설명**: `Google Sheets API 접근용`
- **만들기 및 계속하기** 클릭

### 4-2. 역할 부여 (선택사항)
- 이 단계는 **건너뛰기** (계속 클릭)

### 4-3. 사용자 액세스 권한 (선택사항)
- 이 단계도 **건너뛰기** (완료 클릭)

## 5. JSON 키 다운로드

1. 방금 만든 서비스 계정 클릭 (sheets-api-service@...)
2. 상단 탭에서 **키** 선택
3. **키 추가** → **새 키 만들기** 클릭
4. **JSON** 선택
5. **만들기** 클릭
6. JSON 파일이 자동으로 다운로드됩니다!

**중요**: 다운로드된 JSON 파일을 안전한 곳에 보관하세요!
파일명 예: `tidal-flat-carbon-savings-1a2b3c4d5e6f.json`

## 6. Service Account 이메일 복사

JSON 파일을 텍스트 에디터로 열어서 `client_email` 값을 복사하세요:

```json
{
  "type": "service_account",
  "project_id": "tidal-flat-carbon-savings",
  "client_email": "sheets-api-service@tidal-flat-carbon-savings.iam.gserviceaccount.com",
  ...
}
```

**복사할 이메일 예시**:
`sheets-api-service@tidal-flat-carbon-savings.iam.gserviceaccount.com`

---

**완료되면 제게 "Step 3 완료"라고 알려주세요!**
그리고 **Service Account 이메일**을 복사해두세요 (다음 단계에서 필요합니다).
