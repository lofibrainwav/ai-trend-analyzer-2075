#!/usr/bin/env python3
"""
🧪 간단한 테스트 스크립트
"""

import sys
import os
from datetime import datetime

def test_basic_functionality():
    print("🚀 AI 트렌드 분석기 기본 테스트 시작")
    print("="*50)
    
    # Python 버전 확인
    print(f"🐍 Python 버전: {sys.version}")
    
    # 현재 디렉토리 확인
    print(f"📁 현재 디렉토리: {os.getcwd()}")
    
    # MySQL 연결 테스트
    try:
        import mysql.connector
        config = {
            'host': 'localhost',
            'port': 24,
            'user': 'root',
            'password': '',
            'database': 'ai_trends_db'
        }
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        
        # 테이블 확인
        cursor.execute('SHOW TABLES')
        tables = cursor.fetchall()
        print(f"✅ MySQL 연결 성공!")
        print(f"📋 테이블 수: {len(tables)}개")
        
        for table in tables:
            cursor.execute(f'SELECT COUNT(*) FROM {table[0]}')
            count = cursor.fetchone()[0]
            print(f"   {table[0]}: {count}개 레코드")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ MySQL 연결 실패: {e}")
    
    # 필수 모듈 확인
    modules_to_check = ['asyncio', 'json', 'aiohttp', 'mysql.connector']
    
    print(f"\n📦 모듈 확인:")
    for module in modules_to_check:
        try:
            __import__(module)
            print(f"   ✅ {module}")
        except ImportError:
            print(f"   ❌ {module} (설치 필요)")
    
    # 프로젝트 구조 확인
    project_files = [
        '/Users/Jadaking/DataLab/projects/ai_trend_analyzer/scripts/ai_trend_analyzer.py',
        '/Users/Jadaking/DataLab/projects/ai_trend_analyzer/scripts/stealth_crawler.py',
        '/Users/Jadaking/DataLab/projects/ai_trend_analyzer/scripts/advanced_analyzer.py',
        '/Users/Jadaking/DataLab/projects/ai_trend_analyzer/scripts/real_api_connector.py'
    ]
    
    print(f"\n📄 프로젝트 파일 확인:")
    for file_path in project_files:
        if os.path.exists(file_path):
            print(f"   ✅ {os.path.basename(file_path)}")
        else:
            print(f"   ❌ {os.path.basename(file_path)} (누락)")
    
    print(f"\n🎉 테스트 완료 - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*50)
    
    return True

if __name__ == "__main__":
    test_basic_functionality()
