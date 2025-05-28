<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎨 AI 트렌드 분석기 2075 - Leonardo da Vinci Edition</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    animation: {
                        'gradient': 'gradient 15s ease infinite',
                    },
                    keyframes: {
                        'gradient': {
                            '0%, 100%': {
                                'background-size': '200% 200%',
                                'background-position': 'left center'
                            },
                            '50%': {
                                'background-size': '200% 200%',
                                'background-position': 'right center'
                            },
                        },
                    },
                }
            }
        }
    </script>
</head>
<body class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-12">
        <!-- Hero Section -->
        <div class="text-center mb-12">
            <div class="flex justify-center items-center gap-3 mb-6">
                <div class="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI 트렌드 분석기 2075
                </h1>
                <div class="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                </div>
            </div>
            
            <p class="text-xl text-gray-600 mb-2">🎨 Leonardo da Vinci Edition</p>
            <p class="text-lg text-gray-500 max-w-2xl mx-auto">
                레오나르도 다 빈치의 창의력과 2075년 미래 기술이 만난 최고급 AI 트렌드 분석 시스템
            </p>
        </div>

        <!-- Status Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <?php
            // MySQL 연결 설정
            $host = 'localhost';
            $port = 3306;
            $username = 'root';
            $password = '';
            $database = 'ai_trends_db';

            $youtube_count = 0;
            $research_count = 0;
            $analysis_count = 0;
            $db_connected = false;

            try {
                $pdo = new PDO("mysql:host=$host;port=$port;dbname=$database", $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $db_connected = true;

                // 데이터 개수 조회
                $stmt = $pdo->query("SELECT COUNT(*) FROM youtube_videos");
                $youtube_count = $stmt->fetchColumn();

                $stmt = $pdo->query("SELECT COUNT(*) FROM research_sources");
                $research_count = $stmt->fetchColumn();

                $stmt = $pdo->query("SELECT COUNT(*) FROM trend_analysis");
                $analysis_count = $stmt->fetchColumn();

            } catch(PDOException $e) {
                $db_connected = false;
            }
            ?>

            <div class="bg-white/80 backdrop-blur border border-<?php echo $db_connected ? 'green' : 'red'; ?>-200 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 1.79 4 4 4h8c0-2.21-1.79-4-4-4H4z"></path>
                    </svg>
                    <h3 class="text-sm font-semibold">데이터베이스</h3>
                    <?php if ($db_connected): ?>
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    <?php else: ?>
                        <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    <?php endif; ?>
                </div>
                <div class="text-2xl font-bold text-green-600">
                    <?php echo $db_connected ? '연결됨' : '연결 실패'; ?>
                </div>
                <p class="text-xs text-gray-500">MySQL XAMPP</p>
            </div>

            <div class="bg-white/80 backdrop-blur border border-blue-200 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 class="text-sm font-semibold">YouTube 분석</h3>
                </div>
                <div class="text-2xl font-bold text-blue-600"><?php echo $youtube_count; ?>개</div>
                <p class="text-xs text-gray-500">영상 분석됨</p>
            </div>

            <div class="bg-white/80 backdrop-blur border border-purple-200 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <h3 class="text-sm font-semibold">리서치 소스</h3>
                </div>
                <div class="text-2xl font-bold text-purple-600"><?php echo $research_count; ?>개</div>
                <p class="text-xs text-gray-500">고급 소스 분석</p>
            </div>

            <div class="bg-white/80 backdrop-blur border border-orange-200 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <h3 class="text-sm font-semibold">트렌드 분석</h3>
                </div>
                <div class="text-2xl font-bold text-orange-600"><?php echo $analysis_count; ?>개</div>
                <p class="text-xs text-gray-500">분석 완료</p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- 최신 YouTube 분석 -->
            <div class="bg-white/90 backdrop-blur rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    최신 YouTube 분석
                </h2>
                <?php if ($db_connected): ?>
                    <?php
                    $stmt = $pdo->query("SELECT title, trend_score, published_at FROM youtube_videos ORDER BY published_at DESC LIMIT 5");
                    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    ?>
                    <div class="space-y-3">
                        <?php foreach ($videos as $video): ?>
                            <div class="border-l-4 border-blue-500 pl-4">
                                <h4 class="font-medium text-sm"><?php echo htmlspecialchars($video['title']); ?></h4>
                                <div class="flex gap-4 text-xs text-gray-600">
                                    <span>점수: <?php echo number_format($video['trend_score'], 2); ?></span>
                                    <span>날짜: <?php echo date('m-d', strtotime($video['published_at'])); ?></span>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <p class="text-gray-500">데이터베이스 연결이 필요합니다.</p>
                <?php endif; ?>
            </div>

            <!-- 최신 트렌드 예측 -->
            <div class="bg-white/90 backdrop-blur rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    🔥 상위 AI 트렌드
                </h2>
                <div class="space-y-3">
                    <?php
                    $trends = [
                        ['keyword' => 'ChatGPT vs Claude', 'score' => 87],
                        ['keyword' => '멀티모달 AI', 'score' => 79],
                        ['keyword' => 'AI 안전성', 'score' => 73],
                        ['keyword' => 'LLM 발전', 'score' => 68],
                        ['keyword' => '컴퓨터 비전', 'score' => 65]
                    ];
                    
                    foreach ($trends as $index => $trend): ?>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="text-lg font-medium text-blue-600"><?php echo $index + 1; ?>.</span>
                                <span class="text-sm font-medium"><?php echo $trend['keyword']; ?></span>
                            </div>
                            <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                                <?php echo $trend['score']; ?>%
                            </span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="text-center mt-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a href="http://localhost:3001" target="_blank" 
                   class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
                    🌐 Next.js 대시보드
                </a>
                <button onclick="runPythonDemo()" 
                        class="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all">
                    🐍 Python 데모 실행
                </button>
                <a href="https://github.com/lofibrainwav/ai-trend-analyzer-2075" target="_blank"
                   class="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-700 hover:to-gray-900 transition-all">
                    📚 GitHub 저장소
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 py-8 border-t border-gray-200">
            <p class="text-gray-500 text-sm">🎨 AI Trend Analyzer 2075 - Leonardo da Vinci Edition</p>
            <p class="text-gray-400 text-xs mt-2">"Curiosity is the engine of achievement" - Leonardo da Vinci</p>
            <div class="flex justify-center gap-4 mt-4">
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">System Active</span>
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Real-time Analysis</span>
                <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">AI Powered</span>
            </div>
        </div>
    </div>

    <script>
        function runPythonDemo() {
            alert('Python 데모를 실행하려면 터미널에서 다음 명령어를 실행하세요:\n\ncd /Users/Jadaking/DataLab/projects/ai_trend_analyzer\npython3 demo.py');
        }

        // 자동 새로고침 (30초마다)
        setTimeout(() => {
            location.reload();
        }, 30000);
    </script>
</body>
</html>