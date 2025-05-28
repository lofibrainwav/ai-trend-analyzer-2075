'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Youtube, 
  Search, 
  Zap, 
  TrendingUp, 
  Database,
  Globe,
  Sparkles,
  BarChart3,
  Activity
} from 'lucide-react'

export default function HomePage() {
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const runQuickAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    // 진행률 시뮬레이션
    const intervals = [20, 40, 60, 80, 100]
    for (const progress of intervals) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setAnalysisProgress(progress)
    }
    
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI 트렌드 분석기 2075
            </h1>
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            🎨 Leonardo da Vinci Edition
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            레오나르도 다 빈치의 창의력과 2075년 미래 기술이 만난 
            최고급 AI 트렌드 분석 시스템
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-green-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" />
                <CardTitle className="text-sm">데이터베이스</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <p className="text-xs text-gray-500">MySQL 연결됨</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-blue-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-600" />
                <CardTitle className="text-sm">YouTube 분석</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">3개</div>
              <p className="text-xs text-gray-500">영상 분석됨</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-purple-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-sm">리서치 소스</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">3개</div>
              <p className="text-xs text-gray-500">고급 소스 분석</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-orange-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <CardTitle className="text-sm">트렌드 점수</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">0.82</div>
              <p className="text-xs text-gray-500">신뢰도 높음</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Section */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              대시보드
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              YouTube 분석
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              멀티 리서치
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              트렌드 예측
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    실시간 분석 현황
                  </CardTitle>
                  <CardDescription>
                    Leonardo da Vinci 2075 AI 시스템이 실시간으로 분석 중
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">데이터 수집 상태</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        활성화
                      </Badge>
                    </div>
                    
                    {isAnalyzing && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>분석 진행률</span>
                          <span>{analysisProgress}%</span>
                        </div>
                        <Progress value={analysisProgress} className="h-2" />
                      </div>
                    )}

                    <Button 
                      onClick={runQuickAnalysis} 
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {isAnalyzing ? '분석 중...' : '즉시 분석 실행'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur">
                <CardHeader>
                  <CardTitle>🔥 상위 AI 트렌드</CardTitle>
                  <CardDescription>최신 분석 결과 기반</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { keyword: 'ChatGPT vs Claude', score: 87 },
                      { keyword: '멀티모달 AI', score: 79 },
                      { keyword: 'AI 안전성', score: 73 },
                      { keyword: 'LLM 발전', score: 68 },
                      { keyword: '컴퓨터 비전', score: 65 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-medium text-blue-600">
                            {index + 1}.
                          </span>
                          <span className="text-sm font-medium">{item.keyword}</span>
                        </div>
                        <Badge variant="secondary">{item.score}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="youtube">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  YouTube AI 트렌드 분석
                </CardTitle>
                <CardDescription>
                  자막 추출 + AI 요약 + 트렌드 점수 계산
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    YouTube 분석 인터페이스는 개발 중입니다
                  </p>
                  <Button variant="outline">
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube 분석기로 이동
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  20+ 소스 멀티 리서치
                </CardTitle>
                <CardDescription>
                  Playwright 스텔스 크롤링 (0.3초 간격)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    'MIT Tech Review',
                    'Stanford AI Report', 
                    'OpenAI Research',
                    'DeepMind Blog',
                    'TechCrunch AI',
                    'Anthropic News',
                    'VentureBeat',
                    'The Verge AI'
                  ].map((source, index) => (
                    <Badge key={index} variant="outline" className="justify-center p-2">
                      {source}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  스텔스 크롤링 시작
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  2025년 AI 트렌드 예측
                </CardTitle>
                <CardDescription>
                  Leonardo da Vinci 수준의 미래 통찰력
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      trend: '대규모 언어 모델 경쟁 심화',
                      confidence: 87,
                      timeline: '2025년 상반기',
                      impact: '매우 높음'
                    },
                    {
                      trend: '멀티모달 AI 시스템 주류화', 
                      confidence: 79,
                      timeline: '2025년 하반기',
                      impact: '높음'
                    },
                    {
                      trend: 'AI 안전성 연구 가속화',
                      confidence: 72,
                      timeline: '지속적',
                      impact: '중간-높음'
                    }
                  ].map((prediction, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-2">
                      <h4 className="font-medium">{prediction.trend}</h4>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>신뢰도: {prediction.confidence}%</span>
                        <span>시기: {prediction.timeline}</span>
                        <span>영향도: {prediction.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            🎨 AI Trend Analyzer 2075 - Leonardo da Vinci Edition
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
            "Curiosity is the engine of achievement" - Leonardo da Vinci
          </p>
        </div>
      </div>
    </div>
  )
}