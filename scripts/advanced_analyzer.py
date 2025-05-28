        conn = self.get_db_connection()
        cursor = conn.cursor()
        
        try:
            # YouTube 영상 데이터 저장
            youtube_insert_query = """
                INSERT IGNORE INTO youtube_videos 
                (video_id, title, channel_name, view_count, like_count, comment_count, 
                 published_at, duration, transcript, summary, ai_keywords, trend_score)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            for video in youtube_data:
                cursor.execute(youtube_insert_query, (
                    video['video_id'],
                    video['title'][:500],  # 길이 제한
                    video['channel_name'][:255],
                    video['view_count'],
                    video['like_count'],
                    video['comment_count'],
                    video['published_at'],
                    video.get('duration', ''),
                    video.get('transcript', '')[:10000],  # 길이 제한
                    video.get('summary', '')[:2000],
                    json.dumps(video.get('ai_keywords', [])),
                    video.get('trend_score', 0)
                ))
            
            # 리서치 소스 데이터 저장
            research_insert_query = """
                INSERT INTO research_sources 
                (source_url, source_type, title, content, ai_insights, credibility_score)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            
            for research in research_data:
                content_text = json.dumps({
                    'headlines': research.get('headlines', [])[:50],  # 상위 50개만
                    'summaries': research.get('summaries', [])[:20],
                    'click_success_rate': research.get('click_success_rate', 0)
                })
                
                cursor.execute(research_insert_query, (
                    research['source_url'][:500],
                    'stealth_crawl',
                    research['title'][:500],
                    content_text,
                    research.get('ai_insights', '')[:2000],
                    research.get('credibility_score', 0)
                ))
            
            # 고급 트렌드 분석 저장
            trend_insert_query = """
                INSERT INTO trend_analysis 
                (trend_topic, confidence_score, supporting_sources, analysis_summary)
                VALUES (%s, %s, %s, %s)
            """
            
            supporting_sources = {
                'youtube_videos': len(youtube_data),
                'research_sources': len(research_data),
                'top_keywords': analysis['top_keywords'],
                'predictions': analysis['trend_predictions']
            }
            
            cursor.execute(trend_insert_query, (
                'Advanced AI Trends 2025',
                analysis['trend_score'],
                json.dumps(supporting_sources),
                analysis['summary'][:2000]
            ))
            
            conn.commit()
            print("✅ 모든 데이터 저장 완료!")
            
            # 저장된 데이터 통계 출력
            cursor.execute("SELECT COUNT(*) FROM youtube_videos")
            youtube_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM research_sources")
            research_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM trend_analysis")
            analysis_count = cursor.fetchone()[0]
            
            print(f"📊 데이터베이스 현황:")
            print(f"   YouTube 영상: {youtube_count}개")
            print(f"   리서치 소스: {research_count}개")
            print(f"   트렌드 분석: {analysis_count}개")
            
        except Exception as e:
            print(f"❌ 데이터베이스 저장 오류: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
    
    async def generate_final_report(self, analysis: Dict) -> str:
        """최종 리포트 생성"""
        report = f"""
🤖 AI 트렌드 분석 리포트 - {datetime.now().strftime('%Y-%m-%d %H:%M')}
{'='*80}

📊 분석 개요
- 총 분석 소스: {analysis['total_sources']}개
- YouTube 영상: {analysis['youtube_videos']}개
- 리서치 소스: {analysis['research_sources']}개
- 전체 트렌드 점수: {analysis['trend_score']}/1.0
- 신뢰도 점수: {analysis['credibility_score']}/1.0

🔥 상위 AI 트렌드 키워드
"""
        
        for i, (keyword, count) in enumerate(list(analysis['top_keywords'].items())[:10], 1):
            report += f"{i:2d}. {keyword:<30} (언급 {count}회)\n"
        
        report += f"""
🎯 트렌드 예측
"""
        
        for prediction in analysis['trend_predictions']:
            report += f"""
▶ {prediction['trend']}
  신뢰도: {prediction['confidence']:.1%}
  영향도: {prediction['impact_level']}
  예상 타임라인: {prediction['timeline']}
  예측: {prediction['prediction']}
"""
        
        report += f"""
📈 분석 결과 요약
{analysis['summary']}

⚡ 핵심 인사이트
- 현재 AI 분야에서 가장 주목받는 키워드는 '{list(analysis['top_keywords'].keys())[0] if analysis['top_keywords'] else 'N/A'}'입니다
- YouTube 트렌드 점수({analysis['youtube_trend_score']:.2f})와 리서치 신뢰도({analysis['credibility_score']:.2f})를 종합한 결과입니다
- {len(analysis['trend_predictions'])}개의 주요 트렌드에 대한 예측을 제공합니다

🚀 권장 액션
1. 상위 3개 트렌드 키워드에 대한 심화 연구 진행
2. 높은 신뢰도(>0.8)를 가진 예측에 대한 투자 검토
3. 향후 3-6개월 내 관련 기술 동향 모니터링 강화

{'='*80}
리포트 생성 시간: {analysis['analysis_timestamp']}
"""
        
        return report
    
    async def run_comprehensive_analysis(self):
        """종합 분석 실행"""
        print("🚀 2075년 레오나르도 다 빈치 스타일 AI 트렌드 분석 시작!")
        print("="*80)
        
        start_time = time.time()
        
        try:
            # Phase 1: YouTube 고급 리서치
            print("\n📺 Phase 1: YouTube 고급 분석")
            print("-" * 50)
            youtube_data = await self.advanced_youtube_research()
            
            # Phase 2: 20+ 소스 대규모 리서치
            print("\n🔍 Phase 2: 대규모 소스 리서치")
            print("-" * 50)
            research_data = await self.massive_source_research()
            
            # Phase 3: 고급 트렌드 분석
            print("\n📊 Phase 3: 고급 트렌드 분석")
            print("-" * 50)
            analysis = await self.advanced_trend_analysis(youtube_data, research_data)
            
            # Phase 4: 데이터 저장
            print("\n💾 Phase 4: 데이터 저장")
            print("-" * 50)
            await self.save_comprehensive_data(youtube_data, research_data, analysis)
            
            # Phase 5: 최종 리포트 생성
            print("\n📋 Phase 5: 최종 리포트 생성")
            print("-" * 50)
            final_report = await self.generate_final_report(analysis)
            
            # 리포트 파일 저장
            report_filename = f"/Users/Jadaking/DataLab/projects/ai_trend_analyzer/data/ai_trend_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
            with open(report_filename, 'w', encoding='utf-8') as f:
                f.write(final_report)
            
            # 결과 출력
            execution_time = time.time() - start_time
            
            print("\n" + "="*80)
            print("🎉 분석 완료!")
            print(f"⏱️  총 실행 시간: {execution_time:.1f}초")
            print(f"📁 리포트 저장: {report_filename}")
            print("="*80)
            
            print(final_report)
            
            return {
                'youtube_data': youtube_data,
                'research_data': research_data,
                'analysis': analysis,
                'report_file': report_filename,
                'execution_time': execution_time
            }
            
        except Exception as e:
            print(f"❌ 분석 실행 중 오류 발생: {e}")
            import traceback
            traceback.print_exc()
            return None

# 실행 함수
async def main():
    """메인 실행 함수"""
    print("🤖 고급 AI 트렌드 분석기 시작")
    print("Leonardo da Vinci 2075 Edition")
    print("="*80)
    
    analyzer = AdvancedAITrendAnalyzer()
    result = await analyzer.run_comprehensive_analysis()
    
    if result:
        print("\n🎯 분석 성공!")
        print(f"📊 수집된 YouTube 영상: {len(result['youtube_data'])}개")
        print(f"🔍 리서치된 소스: {len(result['research_data'])}개")
        print(f"📈 최종 트렌드 점수: {result['analysis']['trend_score']:.3f}")
        print(f"📁 리포트 파일: {result['report_file']}")
    else:
        print("❌ 분석 실패")

if __name__ == "__main__":
    # 이벤트 루프 실행
    asyncio.run(main())
