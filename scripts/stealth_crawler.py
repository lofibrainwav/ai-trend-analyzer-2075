#!/usr/bin/env python3
"""
🕷️ Playwright 스텔스 크롤러
0.3초 간격으로 여러 번 클릭하는 고급 크롤러
"""

import asyncio
import random
from playwright.async_api import async_playwright
from typing import List, Dict, Any
import json
import time

class StealthCrawler:
    def __init__(self):
        self.stealth_options = {
            'user_agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'viewport': {'width': 1920, 'height': 1080},
            'locale': 'en-US',
            'timezone_id': 'America/New_York'
        }
    
    async def create_stealth_browser(self, playwright):
        """스텔스 브라우저 생성"""
        browser = await playwright.chromium.launch(
            headless=True,  # False로 하면 브라우저 창이 보임
            args=[
                '--disable-blink-features=AutomationControlled',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--disable-background-networking',
                '--disable-default-apps',
                '--disable-extensions',
                '--disable-sync',
                '--disable-translate',
                '--hide-scrollbars',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-default-browser-check',
                '--safebrowsing-disable-auto-update',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        )
        
        context = await browser.new_context(
            user_agent=self.stealth_options['user_agent'],
            viewport=self.stealth_options['viewport'],
            locale=self.stealth_options['locale'],
            timezone_id=self.stealth_options['timezone_id']
        )
        
        # 자바스크립트로 webdriver 감지 방지
        await context.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined,
            });
            
            window.chrome = {
                runtime: {},
            };
            
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5],
            });
            
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
        """)
        
        return browser, context
    
    async def smart_click_sequence(self, page, selectors: List[str], interval: float = 0.3):
        """스마트 클릭 시퀀스 (0.3초 간격)"""
        results = []
        
        for selector in selectors:
            try:
                # 요소가 로드될 때까지 대기
                await page.wait_for_selector(selector, timeout=5000)
                
                # 인간같은 마우스 움직임 시뮬레이션
                element = await page.query_selector(selector)
                if element:
                    # 요소의 중심점 계산
                    box = await element.bounding_box()
                    if box:
                        # 약간의 랜덤 오프셋 추가 (인간처럼)
                        x = box['x'] + box['width'] / 2 + random.uniform(-5, 5)
                        y = box['y'] + box['height'] / 2 + random.uniform(-5, 5)
                        
                        # 마우스 이동 후 클릭
                        await page.mouse.move(x, y)
                        await asyncio.sleep(random.uniform(0.1, 0.2))
                        await page.mouse.click(x, y)
                        
                        results.append({
                            'selector': selector,
                            'clicked': True,
                            'timestamp': time.time()
                        })
                        
                        print(f"✅ 클릭 성공: {selector}")
                    else:
                        print(f"❌ 요소 박스 없음: {selector}")
                else:
                    print(f"❌ 요소 없음: {selector}")
                
                # 간격 대기 (0.3초 + 랜덤)
                await asyncio.sleep(interval + random.uniform(0.05, 0.15))
                
            except Exception as e:
                print(f"❌ 클릭 실패 {selector}: {e}")
                results.append({
                    'selector': selector,
                    'clicked': False,
                    'error': str(e),
                    'timestamp': time.time()
                })
        
        return results
    
    async def extract_content(self, page, content_selectors: Dict[str, str]) -> Dict[str, Any]:
        """콘텐츠 추출"""
        content = {}
        
        for key, selector in content_selectors.items():
            try:
                elements = await page.query_selector_all(selector)
                if elements:
                    texts = []
                    for element in elements:
                        text = await element.inner_text()
                        if text.strip():
                            texts.append(text.strip())
                    content[key] = texts
                else:
                    content[key] = []
            except Exception as e:
                print(f"❌ 콘텐츠 추출 실패 {key}: {e}")
                content[key] = []
        
        return content
    
    async def crawl_with_multiple_clicks(self, url: str, click_selectors: List[str], content_selectors: Dict[str, str], max_clicks: int = 10) -> Dict[str, Any]:
        """멀티 클릭 크롤링"""
        print(f"🚀 스텔스 크롤링 시작: {url}")
        
        async with async_playwright() as playwright:
            browser, context = await self.create_stealth_browser(playwright)
            page = await context.new_page()
            
            try:
                # 페이지 로드
                await page.goto(url, wait_until='networkidle')
                await asyncio.sleep(2)  # 초기 로딩 대기
                
                # 스크롤 다운 (콘텐츠 로드)
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await asyncio.sleep(1)
                
                # 다중 클릭 실행
                click_results = await self.smart_click_sequence(
                    page, 
                    click_selectors[:max_clicks], 
                    interval=0.3
                )
                
                # 콘텐츠 추출
                content = await self.extract_content(page, content_selectors)
                
                # 페이지 정보 수집
                title = await page.title()
                current_url = page.url
                
                return {
                    'url': current_url,
                    'original_url': url,
                    'title': title,
                    'content': content,
                    'click_results': click_results,
                    'success': True,
                    'timestamp': time.time()
                }
                
            except Exception as e:
                print(f"❌ 크롤링 실패: {e}")
                return {
                    'url': url,
                    'title': '',
                    'content': {},
                    'click_results': [],
                    'success': False,
                    'error': str(e),
                    'timestamp': time.time()
                }
            
            finally:
                await browser.close()

# 실제 크롤링 실행 함수들
async def crawl_tech_news():
    """테크 뉴스 크롤링"""
    crawler = StealthCrawler()
    
    # 크롤링할 사이트들
    sites = [
        {
            'url': 'https://techcrunch.com/category/artificial-intelligence/',
            'click_selectors': [
                'a[href*="artificial-intelligence"]',
                'button[aria-label="Load more"]',
                '.load-more',
                '.show-more-button'
            ],
            'content_selectors': {
                'headlines': 'h2 a, h3 a, .post-title a',
                'summaries': '.excerpt, .summary, p:first-of-type',
                'dates': '.post-date, time, .published-date'
            }
        }
    ]
    
    results = []
    for site in sites:
        result = await crawler.crawl_with_multiple_clicks(
            site['url'],
            site['click_selectors'],
            site['content_selectors'],
            max_clicks=8
        )
        results.append(result)
        
        # 사이트 간 대기
        await asyncio.sleep(2)
    
    return results

async def crawl_youtube_trending():
    """YouTube 트렌딩 페이지 크롤링"""
    crawler = StealthCrawler()
    
    result = await crawler.crawl_with_multiple_clicks(
        'https://www.youtube.com/feed/trending',
        [
            'a#video-title',
            'button[aria-label="Show more"]',
            '.ytd-video-renderer a',
            '.compact-media-item a'
        ],
        {
            'video_titles': '#video-title',
            'channel_names': '.ytd-channel-name a',
            'view_counts': '.ytd-video-meta-block span:contains("views")',
            'upload_dates': '.ytd-video-meta-block span:contains("ago")'
        },
        max_clicks=12
    )
    
    return result

# 테스트 실행
async def test_stealth_crawler():
    print("🧪 스텔스 크롤러 테스트 시작")
    
    # 테크 뉴스 크롤링 테스트
    news_results = await crawl_tech_news()
    print(f"📰 뉴스 크롤링 결과: {len(news_results)}개 사이트")
    
    # YouTube 트렌딩 크롤링 테스트  
    youtube_result = await crawl_youtube_trending()
    print(f"🎬 YouTube 크롤링 결과: {youtube_result['success']}")
    
    return {
        'news_results': news_results,
        'youtube_result': youtube_result
    }

if __name__ == "__main__":
    asyncio.run(test_stealth_crawler())
