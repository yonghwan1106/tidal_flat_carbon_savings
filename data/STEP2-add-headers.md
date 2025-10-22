# Step 2: 헤더 추가 (각 시트에)

## users 시트

1. `users` 시트 탭 클릭
2. 첫 번째 행(A1~F1)에 다음 헤더 입력:

| A1 | B1 | C1 | D1 | E1 | F1 |
|----|----|----|----|----|-----|
| user_id | name | address | created_at | total_points | profile_type |

## activities 시트

1. `activities` 시트 탭 클릭
2. 첫 번째 행에 다음 헤더 입력:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 | K1 | L1 | M1 |
|----|----|----|----|----|----|----|----|----|----|----|----|----|
| activity_id | title | description | date | start_time | duration_hours | location_name | latitude | longitude | max_participants | points_per_hour | image_url | status |

## participations 시트

1. `participations` 시트 탭 클릭
2. 첫 번째 행에 다음 헤더 입력:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 |
|----|----|----|----|----|----|----|----|-----|
| participation_id | user_id | activity_id | applied_at | checked_in_at | verified_at | actual_hours | earned_points | status |

## transactions 시트

1. `transactions` 시트 탭 클릭
2. 첫 번째 행에 다음 헤더 입력:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
|----|----|----|----|----|----|----|-----|
| transaction_id | user_id | type | amount | balance_after | reference_id | description | created_at |

## partners 시트

1. `partners` 시트 탭 클릭
2. 첫 번째 행에 다음 헤더 입력:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 |
|----|----|----|----|----|----|----|----|----|----|
| partner_id | name | category | address | latitude | longitude | phone | description | image_url | status |

## environment_data 시트

1. `environment_data` 시트 탭 클릭
2. 첫 번째 행에 다음 헤더 입력:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
|----|----|----|----|----|----|----|----|
| data_id | measurement_date | location | carbon_absorption_rate | vegetation_area | biodiversity_index | improvement_rate | notes |

---

**팁**: 복사 붙여넣기를 사용하면 더 빠릅니다!
- 위 표에서 헤더 복사
- Google Sheets의 A1 셀 클릭
- Ctrl+V로 붙여넣기

**완료되면 제게 "Step 2 완료"라고 알려주세요!**
