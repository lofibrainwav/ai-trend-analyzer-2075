#!/usr/bin/env python3
"""
🎯 AI 트렌드 분석기 런처
모든 기능을 통합한 실행 스크립트
"""

import asyncio
import os
import sys
import json
from datetime import datetime

# 프로젝트 루트 경로 추가
project_root = "/Users/Jadaking/DataLab/projects/ai_trend_analyzer"
sys.path.append(f"{project_root}/scripts")

def print_banner():
    """배너 출력"""
    banner = """
🚀 AI TREND ANALYZER 2075 🚀
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Leonardo da Vinci Edition - 최고급 AI 트렌드 분석 시스템
    
    ✨ 기능:
    • YouTube 영상 자동 수집 & 자막 분석
    • 20+ 소스 스텔스 크롤링 (0.3초 간격)
    • Firecrawl + Brave Search 통합 리서치
    • AI 기반 트렌드 예측 & 인사이트 생성
    • MySQL 데이터베이스 자동 저장
    
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
    print(banner)

def print_menu():
    """메뉴 출력"""
    menu = """
🎯 분석 모드 선택:

1. 🚀 완전 통합 분석 (권장)
   - YouTube + Brave Search + Firecrawl
   - 실제 API 연동
   - 20+ 소스 리서치
   - 최고 품질 결과

2. 🧪 시뮬레이션 분석 (테스트)
   - 샘플 데이터 기반
   - 빠른 실행
   - 시스템 테스트용

3. 🕷️ 스텔스 크롤링 테스트
   - Playwright 스텔스 기능 테스트
   - 0.3초 간격 멀티 클릭
   - 봇 감지 방지 확인

4. 📊 데이터베이스 상태 확인
   - MySQL 연결 테스트
   - 저장된 데이터 통계
   - 테이블 상태 확인

5. ❌ 종료
"""
    print(menu)

async def run_complete_analysis():
    """완전 통합 분석 실행"""
    print("🚀 완전 통합 분석 시작...")
    
    try:
        from real_api_connector import run_complete_analysis
        result = await run_complete_analysis()
        
        if result:
            print("✅ 완전 통합 분석 성공!")
            return True
        else:
            print("❌ 완전 통합 분석 실패")
            return False
            
    except ImportError as e:
        print(f"❌ 모듈 임포트 오류: {e}")
        print("💡 필요한 패키지를 설치해주세요:")
        print("   pip install aiohttp youtube-transcript-api")
        return False
    except Exception as e:
        print(f"❌ 실행 오류: {e}")
        return False

async def run_simulation_analysis():
    """시뮬레이션 분석 실행"""
    print("🧪 시뮬레이션 분석 시작...")
    
    try:
        from advanced_analyzer import AdvancedAITrendAnalyzer
        analyzer = AdvancedAITrendAnalyzer()
        result = await analyzer.run_comprehensive_analysis()
        
        if result:
            print("✅ 시뮬레이션 분석 성공!")
            return True
        else:
            print("❌ 시뮬레이션 분석 실패")
            return False
            
    except Exception as e:
        print(f"❌ 시뮬레이션 분석 오류: {e}")
        return False

async def test_stealth_crawler():
    """스텔스 크롤링 테스트"""
    print("🕷️ 스텔스 크롤링 테스트 시작...")
    
    try:
        from stealth_crawler import test_stealth_crawler
        result = await test_stealth_crawler()
        
        if result:
            print("✅ 스텔스 크롤링 테스트 성공!")
            print(f"📰 뉴스 크롤링: {len(result.get('news_results', []))}개 결과")
            print(f"🎬 YouTube 크롤링: {'성공' if result.get('youtube_result', {}).get('success') else '실패'}")
            return True
        else:
            print("❌ 스텔스 크롤링 테스트 실패")
            return False
            
    except ImportError as e:
        print(f"❌ Playwright 모듈 없음: {e}")
        print("💡 Playwright 설치 필요:")
        print("   pip install playwright")
        print("   playwright install")
        return False
    except Exception as e:
        print(f"❌ 스텔스 크롤링 오류: {e}")
        return False

def check_database_status():
    """데이터베이스 상태 확인"""
    print("📊 데이터베이스 상태 확인...")
    
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
        
        # 테이블 목록 확인
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        print(f"📋 테이블 수: {len(tables)}개")
        
        # 각 테이블 데이터 수 확인
        for (table_name,) in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            count = cursor.fetchone()[0]
            print(f"   {table_name}: {count}개 레코드")
        
        # 최근 분석 정보
        cursor.execute("SELECT * FROM trend_analysis ORDER BY created_at DESC LIMIT 3")
        recent_analyses = cursor.fetchall()
        
        if recent_analyses:
            print(f"\n📈 최근 분석 {len(recent_analyses)}개:")
            for analysis in recent_analyses:
                print(f"   • {analysis[1]} (점수: {analysis[2]:.3f})")
        
        cursor.close()
        conn.close()
        
        print("✅ 데이터베이스 연결 성공!")
        return True
        
    except mysql.connector.Error as e:
        print(f"❌ MySQL 연결 오류: {e}")
        print("💡 XAMPP MySQL이 실행 중인지 확인해주세요")
        return False
    except Exception as e:
        print(f"❌ 데이터베이스 확인 오류: {e}")
        return False

def check_prerequisites():
    """사전 요구사항 확인"""
    print("🔍 시스템 환경 확인...")
    
    issues = []
    
    # Python 패키지 확인
    required_packages = [
        'mysql.connector',
        'asyncio',
        'aiohttp',
        'json',
        'datetime'
    ]
    
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            issues.append(f"Python 패키지 누락: {package}")
    
    # MySQL 연결 확인
    try:
        import mysql.connector
        config = {
            'host': 'localhost',
            'port': 24,
            'user': 'root',
            'password': ''
        }
        conn = mysql.connector.connect(**config)
        conn.close()
    except:
        issues.append("MySQL 연결 실패 (XAMPP 확인 필요)")
    
    # 디렉토리 구조 확인
    required_dirs = [
        f"{project_root}/data",
        f"{project_root}/scripts"
    ]
    
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            issues.append(f"디렉토리 누락: {dir_path}")
    
    if issues:
        print("⚠️ 발견된 문제:")
        for issue in issues:
            print(f"   • {issue}")
        print("\n💡 문제 해결 후 다시 실행해주세요")
        return False
    else:
        print("✅ 모든 사전 요구사항 충족!")
        return True

async def main():
    """메인 실행 함수"""
    print_banner()
    
    # 사전 요구사항 확인
    if not check_prerequisites():
        return
    
    while True:
        print_menu()
        
        try:
            choice = input("🎯 선택하세요 (1-5): ").strip()
            
            if choice == '1':
                print("\n" + "="*60)
                success = await run_complete_analysis()
                if success:
                    print("\n🎉 완전 통합 분석이 완료되었습니다!")
                else:
                    print("\n😞 분석 중 오류가 발생했습니다.")
                
            elif choice == '2':
                print("\n" + "="*60)
                success = await run_simulation_analysis()
                if success:
                    print("\n🎉 시뮬레이션 분석이 완료되었습니다!")
                else:
                    print("\n😞 시뮬레이션 중 오류가 발생했습니다.")
                
            elif choice == '3':
                print("\n" + "="*60)
                success = await test_stealth_crawler()
                if success:
                    print("\n🎉 스텔스 크롤링 테스트가 완료되었습니다!")
                else:
                    print("\n😞 크롤링 테스트 중 오류가 발생했습니다.")
                
            elif choice == '4':
                print("\n" + "="*60)
                success = check_database_status()
                if not success:
                    print("\n😞 데이터베이스 확인 중 오류가 발생했습니다.")
                
            elif choice == '5':
                print("\n👋 AI 트렌드 분석기를 종료합니다.")
                print("🎨 Leonardo da Vinci도 만족할 분석이었기를!")
                break
                
            else:
                print("\n❌ 잘못된 선택입니다. 1-5 중에서 선택해주세요.")
            
            if choice in ['1', '2', '3', '4']:
                input("\n⏸️  Enter 키를 눌러 계속...")
                
        except KeyboardInterrupt:
            print("\n\n👋 사용자가 종료를 요청했습니다.")
            break
        except Exception as e:
            print(f"\n❌ 예상치 못한 오류: {e}")
            input("\n⏸️  Enter 키를 눌러 계속...")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n👋 프로그램이 종료되었습니다.")
    except Exception as e:
        print(f"❌ 치명적 오류: {e}")
