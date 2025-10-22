"""
Google Sheets 데이터베이스 유틸리티
"""
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
import os
from typing import List, Dict, Optional
from core.config import settings
from datetime import datetime, timedelta

class SheetsDatabase:
    """Google Sheets를 데이터베이스로 사용하기 위한 클래스"""

    def __init__(self):
        self.client = None
        self.spreadsheet = None
        # 캐싱 추가 (API 할당량 초과 방지)
        self._cache = {}
        self._cache_timeout = 300  # 5분 캐시
        self._connect()

    def _connect(self):
        """Google Sheets에 연결"""
        try:
            credentials_json = settings.GOOGLE_SHEETS_CREDENTIALS
            sheet_id = settings.GOOGLE_SHEET_ID

            if not credentials_json or not sheet_id:
                raise ValueError("Google Sheets credentials not configured")

            # JSON 파싱
            creds_dict = json.loads(credentials_json)

            # 인증
            scope = [
                'https://spreadsheets.google.com/feeds',
                'https://www.googleapis.com/auth/drive'
            ]
            creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
            self.client = gspread.authorize(creds)

            # Spreadsheet 열기
            self.spreadsheet = self.client.open_by_key(sheet_id)

        except Exception as e:
            print(f"Google Sheets 연결 실패: {e}")
            raise

    def get_worksheet(self, sheet_name: str):
        """워크시트 가져오기"""
        try:
            return self.spreadsheet.worksheet(sheet_name)
        except gspread.exceptions.WorksheetNotFound:
            raise ValueError(f"Sheet '{sheet_name}' not found")

    def _is_cache_valid(self, cache_key: str) -> bool:
        """캐시가 유효한지 확인"""
        if cache_key not in self._cache:
            return False

        cache_time = self._cache[cache_key].get('timestamp')
        if not cache_time:
            return False

        # 캐시 만료 시간 확인
        expiry = cache_time + timedelta(seconds=self._cache_timeout)
        return datetime.now() < expiry

    def _get_from_cache(self, cache_key: str):
        """캐시에서 데이터 가져오기"""
        if self._is_cache_valid(cache_key):
            return self._cache[cache_key]['data']
        return None

    def _set_cache(self, cache_key: str, data):
        """캐시에 데이터 저장"""
        self._cache[cache_key] = {
            'data': data,
            'timestamp': datetime.now()
        }

    def get_all_records(self, sheet_name: str) -> List[Dict]:
        """시트의 모든 레코드를 딕셔너리 리스트로 반환 (캐싱 적용)"""
        cache_key = f"all_records_{sheet_name}"

        # 캐시 확인
        cached_data = self._get_from_cache(cache_key)
        if cached_data is not None:
            return cached_data

        # 캐시 미스 - Google Sheets에서 읽기
        ws = self.get_worksheet(sheet_name)
        data = ws.get_all_records()

        # 캐시 저장
        self._set_cache(cache_key, data)

        return data

    def get_record_by_id(self, sheet_name: str, id_column: str, id_value: str) -> Optional[Dict]:
        """ID로 특정 레코드 찾기"""
        records = self.get_all_records(sheet_name)
        for record in records:
            if str(record.get(id_column)) == str(id_value):
                return record
        return None

    def _invalidate_cache(self, sheet_name: str):
        """특정 시트의 캐시 무효화"""
        cache_key = f"all_records_{sheet_name}"
        if cache_key in self._cache:
            del self._cache[cache_key]

    def add_record(self, sheet_name: str, data: Dict) -> bool:
        """새 레코드 추가"""
        try:
            ws = self.get_worksheet(sheet_name)
            # 헤더 가져오기
            headers = ws.row_values(1)
            # 데이터를 헤더 순서에 맞게 정렬
            row = [data.get(header, '') for header in headers]
            ws.append_row(row)
            # 캐시 무효화
            self._invalidate_cache(sheet_name)
            return True
        except Exception as e:
            print(f"레코드 추가 실패: {e}")
            return False

    def update_record(self, sheet_name: str, id_column: str, id_value: str, updates: Dict) -> bool:
        """레코드 업데이트"""
        try:
            ws = self.get_worksheet(sheet_name)
            records = ws.get_all_records()
            headers = ws.row_values(1)

            # ID 컬럼의 인덱스 찾기
            try:
                id_col_index = headers.index(id_column)
            except ValueError:
                print(f"Column '{id_column}' not found")
                return False

            # 레코드 찾기 (행 번호는 1-based이고 헤더가 1행이므로 +2)
            for idx, record in enumerate(records, start=2):
                if str(record.get(id_column)) == str(id_value):
                    # 업데이트할 셀들 찾기
                    for key, value in updates.items():
                        if key in headers:
                            col_index = headers.index(key) + 1  # 1-based
                            ws.update_cell(idx, col_index, value)
                    # 캐시 무효화
                    self._invalidate_cache(sheet_name)
                    return True

            print(f"Record with {id_column}={id_value} not found")
            return False

        except Exception as e:
            print(f"레코드 업데이트 실패: {e}")
            return False

    def find_records(self, sheet_name: str, filters: Dict) -> List[Dict]:
        """필터 조건에 맞는 레코드들 찾기"""
        records = self.get_all_records(sheet_name)
        filtered = []

        for record in records:
            match = True
            for key, value in filters.items():
                if str(record.get(key)) != str(value):
                    match = False
                    break
            if match:
                filtered.append(record)

        return filtered

# 싱글톤 인스턴스
_db_instance = None

def get_db() -> SheetsDatabase:
    """데이터베이스 인스턴스 가져오기 (싱글톤)"""
    global _db_instance
    if _db_instance is None:
        _db_instance = SheetsDatabase()
    return _db_instance
