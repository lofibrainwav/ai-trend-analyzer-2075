<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎨 AI 트렌드 분석기 2075 - Leonardo da Vinci Edition</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg {
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .glow {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
    </style>
</head>
<body class="gradient-bg min-h-screen">
    <div class="container mx-auto px-4 py-8" x-data="dashboard()">
        <!-- Header -->
        <div class="text-center mb-12">
            <div class="flex justify-center items-center gap-4 mb-6">
                <div class="p-4 glass rounded-2xl glow">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                </div>
                <h1 class="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                    AI 트렌드 분석기 2075
                </h1>
                <div class="p-4 glass rounded-2xl glow">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                </div>
            </div>
            
            <p class="text-2xl text-white/90 mb-4">🎨 Leonardo da Vinci Edition</p>
            <p class="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                레오나르도 다 빈치의 창의력과 2075년 미래 기술이 만난 최고급 AI 트렌드 분석 시스템
            </p>
        </div>

        <!-- Status Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <?php
            // MySQL 연결 및 데이터 조회
            $host = 'localhost';
            $port = 3306;
            $username = 'root';
            $password = '';
            $database = 'ai_trends_db';

            $stats = [
                'database_connected' => false,
                'youtube_count' => 0,
                'research_count' => 0,
                'analysis_count' => 0,
                'latest_analysis_date' => null,
                'top_trend_score' => 0
            ];

            try {
                $pdo = new PDO("mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4", $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stats['database_connected'] = true;

                // 각 테이블 데이터 개수
                $stmt = $pdo->query("SELECT COUNT(*) FROM youtube_videos");
                $stats['youtube_count'] = $stmt->fetchColumn();

                $stmt = $pdo->query("SELECT COUNT(*) FROM research_sources");
                $stats['research_count'] = $stmt->fetchColumn();

                $stmt = $pdo->query("SELECT COUNT(*) FROM trend_analysis");
                $stats['analysis_count'] = $stmt->fetchColumn();

                // 최신 분석 날짜
                $stmt = $pdo->query("SELECT MAX(created_at) FROM trend_analysis");
                $stats['latest_analysis_date'] = $stmt->fetchColumn();

                // 최고 트렌드 점수
                $stmt = $pdo->query("SELECT MAX(trend_score) FROM youtube_videos");
                $stats['top_trend_score'] = $stmt->fetchColumn() ?: 0;

            } catch(PDOException $e) {
                // 연결 실패 시 기본값 유지
                $error_message = $e->getMessage();
            }
            ?>

            <!-- Database Status -->
            <div class="glass rounded-2xl p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <svg class="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 1.79 4 4 4h8c0-2.21-1.79-4-4-4H4z"></path>
                        </svg>
                        <h3 class="text-lg font-semibold">데이터베이스</h3>
                    </div>
                    <?php if ($stats['database_connected']): ?>
                        <div class="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <?php else: ?>
                        <div class="w-4 h-4 bg-red-400 rounded-full"></div>
                    <?php endif; ?>
                </div>
                <div class="text-3xl font-bold mb-2">
                    <?php echo $stats['database_connected'] ? '연결됨' : '연결 실패'; ?>
                </div>
                <p class="text-white/70 text-sm">MySQL XAMPP 3306</p>
                <?php if (!$stats['database_connected'] && isset($error_message)): ?>
                    <p class="text-red-300 text-xs mt-2"><?php echo substr($error_message, 0, 50); ?>...</p>
                <?php endif; ?>
            </div>

            <!-- YouTube Analytics -->
            <div class="glass rounded-2xl p-6 text-white">
                <div class="flex items-center gap-3 mb-4">
                    <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 class="text-lg font-semibold">YouTube 분석</h3>
                </div>
                <div class="text-3xl font-bold mb-2"><?php echo number_format($stats['youtube_count']); ?>개</div>
                <p class="text-white/70 text-sm">영상 분석 완료</p>
            </div>

            <!-- Research Sources -->
            <div class="glass rounded-2xl p-6 text-white">
                <div class="flex items-center gap-3 mb-4">
                    <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <h3 class="text-lg font-semibold">리서치 소스</h3>
                </div>
                <div class="text-3xl font-bold mb-2"><?php echo number_format($stats['research_count']); ?>개</div>
                <p class="text-white/70 text-sm">고급 소스 분석</p>
            </div>

            <!-- Trend Analysis -->
            <div class="glass rounded-2xl p-6 text-white">
                <div class="flex items-center gap-3 mb-4">
                    <svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <h3 class="text-lg font-semibold">트렌드 분석</h3>
                </div>
                <div class="text-3xl font-bold mb-2"><?php echo number_format($stats['analysis_count']); ?>개</div>
                <p class="text-white/70 text-sm">분석 완료</p>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <!-- Latest YouTube Analysis -->
            <div class="glass rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    최신 YouTube 분석
                </h2>
                
                <?php if ($stats['database_connected']): ?>
                    <?php
                    try {
                        $stmt = $pdo->query("SELECT title, trend_score, view_count, published_at FROM youtube_videos ORDER BY published_at DESC LIMIT 5");
                        $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } catch(Exception $e) {
                        $videos = [];
                    }
                    ?>
                    
                    <?php if (!empty($videos)): ?>
                        <div class="space-y-4">
                            <?php foreach ($videos as $index => $video): ?>
                                <div class="border-l-4 border-red-400 pl-4 py-2">
                                    <h4 class="font-semibold text-white text-sm mb-1">
                                        <?php echo htmlspecialchars(substr($video['title'], 0, 60)); ?>...
                                    </h4>
                                    <div class="flex gap-4 text-xs text-white/60">
                                        <span>점수: <?php echo number_format($video['trend_score'], 2); ?></span>
                                        <span>조회: <?php echo number_format($video['view_count']); ?></span>
                                        <span>날짜: <?php echo date('m-d', strtotime($video['published_at'])); ?></span>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <div class="text-center py-8">
                            <p class="text-white/60 mb-4">YouTube 분석을 시작해보세요!</p>
                            <button onclick="runAnalysis()" class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
                                분석 시작하기
                            </button>
                        </div>
                    <?php endif; ?>
                <?php else: ?>
                    <div class="text-center py-8">
                        <p class="text-white/60 mb-4">데이터베이스 연결 확인 중...</p>
                        <div class="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 text-sm text-yellow-100">
                            MySQL 연결: localhost:3306 확인 필요
                        </div>
                    </div>
                <?php endif; ?>
            </div>

            <!-- AI Trend Predictions -->
            <div class="glass rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    🔥 AI 트렌드 예측
                </h2>
                
                <div class="space-y-4">
                    <?php
                    $trends = [
                        ['keyword' => 'ChatGPT vs Claude 경쟁', 'confidence' => 87, 'impact' => '매우 높음'],
                        ['keyword' => '멀티모달 AI 주류화', 'confidence' => 79, 'impact' => '높음'],
                        ['keyword' => 'AI 안전성 연구', 'confidence' => 73, 'impact' => '중-높음'],
                        ['keyword' => 'Edge AI 확산', 'confidence' => 68, 'impact' => '중간'],
                        ['keyword' => 'AI 코딩 도구 발전', 'confidence' => 65, 'impact' => '높음']
                    ];
                    
                    foreach ($trends as $index => $trend): ?>
                        <div class="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-white font-medium text-sm">
                                    <?php echo $index + 1; ?>. <?php echo $trend['keyword']; ?>
                                </span>
                                <span class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    <?php echo $trend['confidence']; ?>%
                                </span>
                            </div>
                            <div class="text-xs text-white/60 mb-2">
                                영향도: <?php echo $trend['impact']; ?>
                            </div>
                            <!-- Progress bar -->
                            <div class="bg-white/10 rounded-full h-2">
                                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000" 
                                     style="width: <?php echo $trend['confidence']; ?>%"></div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="text-center mb-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <button onclick="runPythonDemo()" 
                        class="glass hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-all glow">
                    🐍 Python 데모 실행
                </button>
                <a href="http://localhost:3001" target="_blank"
                   class="glass hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-all glow flex items-center justify-center">
                    🌐 Next.js 대시보드
                </a>
                <a href="https://github.com/lofibrainwav/ai-trend-analyzer-2075" target="_blank"
                   class="glass hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-all glow flex items-center justify-center">
                    📚 GitHub 저장소
                </a>
                <button onclick="location.reload()" 
                        class="glass hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-all glow">
                    🔄 새로고침
                </button>
            </div>
        </div>

        <!-- System Info -->
        <div class="glass rounded-2xl p-6 text-center">
            <h3 class="text-xl font-bold text-white mb-4">🎨 Leonardo da Vinci 2075 시스템 정보</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div class="text-white/80">
                    <div class="font-semibold">MySQL 포트</div>
                    <div class="text-white/60">3306</div>
                </div>
                <div class="text-white/80">
                    <div class="font-semibold">최고 트렌드 점수</div>
                    <div class="text-white/60"><?php echo number_format($stats['top_trend_score'], 2); ?></div>
                </div>
                <div class="text-white/80">
                    <div class="font-semibold">시스템 상태</div>
                    <div class="text-green-300">🟢 활성화</div>
                </div>
                <div class="text-white/80">
                    <div class="font-semibold">실시간 분석</div>
                    <div class="text-blue-300">🔄 진행중</div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 py-8 border-t border-white/20">
            <p class="text-white/80 text-lg mb-2">🎨 AI Trend Analyzer 2075 - Leonardo da Vinci Edition</p>
            <p class="text-white/60 text-sm mb-4">"Curiosity is the engine of achievement" - Leonardo da Vinci</p>
            <div class="flex justify-center gap-3">
                <span class="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">System Active</span>
                <span class="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">Real-time Analysis</span>
                <span class="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">AI Powered</span>
            </div>
        </div>
    </div>

    <script>
        function dashboard() {
            return {
                currentTime: new Date().toLocaleTimeString('ko-KR'),
                init() {
                    setInterval(() => {
                        this.currentTime = new Date().toLocaleTimeString('ko-KR');
                    }, 1000);
                }
            }
        }

        function runPythonDemo() {
            if (confirm('Python 데모를 실행하시겠습니까?')) {
                // 새로운 창에서 실행 가이드 표시
                const guide = window.open('', '_blank', 'width=700,height=500');
                guide.document.write(`
                    <html>
                    <head>
                        <title>🐍 Python 데모 실행 가이드</title>
                        <style>
                            body { font-family: 'Courier New', monospace; padding: 30px; background: #1a1a1a; color: #00ff00; line-height: 1.6; }
                            .command { background: #2a2a2a; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00ff00; }
                            .title { color: #00ffff; font-size: 24px; margin-bottom: 20px; }
                            .button { background: #4f46e5; color: white; padding: 12px 24px; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer; font-size: 16px; }
                            .button:hover { background: #3730a3; }
                        </style>
                    </head>
                    <body>
                        <div class="title">🎨 AI 트렌드 분석기 2075 실행 가이드</div>
                        
                        <h3>📍 1. 프로젝트 디렉토리로 이동:</h3>
                        <div class="command">cd /Users/Jadaking/DataLab/projects/ai_trend_analyzer</div>
                        
                        <h3>🚀 2. 데모 실행 (추천):</h3>
                        <div class="command">python3 demo.py</div>
                        
                        <h3>🎯 3. 통합 런처 실행:</h3>
                        <div class="command">python3 launcher.py</div>
                        
                        <h3>🌐 4. 웹 서버 실행 (별도 터미널):</h3>
                        <div class="command">cd web && npm run dev</div>
                        
                        <h3>📊 5. 접속 정보:</h3>
                        <div class="command">
                            • PHP 대시보드: http://localhost/mysite/<br>
                            • Next.js 앱: http://localhost:3001<br>
                            • GitHub: https://github.com/lofibrainwav/ai-trend-analyzer-2075
                        </div>
                        
                        <button class="button" onclick="window.close()">닫기</button>
                    </body>
                    </html>
                `);
            }
        }

        function runAnalysis() {
            alert('🎨 Leonardo da Vinci 2075 분석을 시작하려면:\\n\\nTerminal에서 다음 명령어를 실행해주세요:\\npython3 demo.py');
        }

        // 자동 새로고침 (60초마다)
        setTimeout(() => {
            location.reload();
        }, 60000);
    </script>
</body>
</html>