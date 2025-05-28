"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Video, 
  Search, 
  Play, 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  Clock,
  TrendingUp,
  Download,
  RefreshCw,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { formatNumber, calculateTrendScore, getColorByScore } from "@/lib/utils"

interface YouTubeVideo {
  id: string
  title: string
  channelName: string
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt: string
  duration: string
  thumbnail: string
  transcript?: string
  summary?: string
  trendScore?: number
}

export default function YouTubeAnalyzer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)

  // 샘플 데이터 (실제로는 API에서 가져옴)
  const sampleVideos: YouTubeVideo[] = [
    {
      id: "sample1",
      title: "AI 트렌드 2025: ChatGPT vs Claude vs Gemini 완벽 비교",
      channelName: "AI Tech Review",
      viewCount: 1250000,
      likeCount: 45000,
      commentCount: 3200,
      publishedAt: "2024-12-01",
      duration: "18:42",
      thumbnail: "https://i.ytimg.com/vi/sample1/maxresdefault.jpg",
      transcript: "AI 기술이 급속도로 발전하고 있습니다. 2025년에는 ChatGPT, Claude, Gemini 등 대규모 언어 모델들이 더욱 정교해질 것으로 예상됩니다...",
      summary: "2025년 AI 트렌드를 분석하고 주요 LLM들의 성능을 비교 분석한 영상",
      trendScore: 0.87
    },
    {
      id: "sample2", 
      title: "멀티모달 AI의 혁신: 텍스트, 이미지, 음성 통합 분석",
      channelName: "Future AI Lab",
      viewCount: 890000,
      likeCount: 32000,
      commentCount: 2100,
      publishedAt: "2024-11-28",
      duration: "22:15",
      thumbnail: "https://i.ytimg.com/vi/sample2/maxresdefault.jpg",
      transcript: "멀티모달 AI 기술이 텍스트, 이미지, 음성을 통합 처리하며 새로운 가능성을 열고 있습니다...",
      summary: "멀티모달 AI 기술의 현재와 미래, 실제 적용 사례 분석",
      trendScore: 0.79
    },
    {
      id: "sample3",
      title: "AI 안전성과 윤리: 2025년 해결해야 할 핵심 과제들",
      channelName: "AI Ethics Today", 
      viewCount: 650000,
      likeCount: 28000,
      commentCount: 1800,
      publishedAt: "2024-11-25",
      duration: "16:30",
      thumbnail: "https://i.ytimg.com/vi/sample3/maxresdefault.jpg",
      transcript: "AI 기술 발전과 함께 안전성과 윤리 문제가 중요한 이슈로 대두되고 있습니다...",
      summary: "AI 안전성 연구 동향과 윤리적 고려사항에 대한 전문가 분석",
      trendScore: 0.72
    }
  ]

  const handleAnalyze = async () => {
    if (!searchQuery.trim()) return
    
    setIsAnalyzing(true)
    
    // 실제로는 API 호출
    setTimeout(() => {
      const filteredVideos = sampleVideos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channelName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setVideos(filteredVideos.length > 0 ? filteredVideos : sampleVideos)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleVideoSelect = (video: YouTubeVideo) => {
    setSelectedVideo(video)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            뒤로가기
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
            <Video className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">YouTube 트렌드 분석기</h1>
            <p className="text-muted-foreground">AI 영상 자막 분석 및 트렌드 예측</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 검색 및 분석 패널 */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                키워드 검색
              </CardTitle>
              <CardDescription>
                분석하고 싶은 AI 트렌드 키워드를 입력하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="예: AI 트렌드, ChatGPT, 머신러닝..."
                  className="flex-1 px-3 py-2 border border-input rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="gap-2"
                >
                  {isAnalyzing ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  분석
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>💡 추천 키워드:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["AI 트렌드", "ChatGPT", "멀티모달 AI", "AI 안전성"].map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => setSearchQuery(keyword)}
                      className="px-2 py-1 bg-muted rounded text-xs hover:bg-muted/80"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 분석 통계 */}
          {videos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  분석 통계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">총 영상 수</span>
                    <span className="font-semibold">{videos.length}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">총 조회수</span>
                    <span className="font-semibold">
                      {formatNumber(videos.reduce((sum, v) => sum + v.viewCount, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">평균 트렌드 점수</span>
                    <span className="font-semibold">
                      {(videos.reduce((sum, v) => sum + (v.trendScore || 0), 0) / videos.length).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 영상 목록 */}
        <div className="lg:col-span-2">
          {isAnalyzing ? (
            <Card className="p-12 text-center">
              <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">YouTube 영상 분석 중...</h3>
              <p className="text-muted-foreground">영상 검색, 자막 추출, AI 분석을 진행하고 있습니다.</p>
            </Card>
          ) : videos.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">분석 결과</h2>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  리포트 다운로드
                </Button>
              </div>
              
              <div className="grid gap-4">
                {videos.map((video) => (
                  <Card 
                    key={video.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedVideo?.id === video.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleVideoSelect(video)}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-32 h-20 bg-muted rounded-lg flex items-center justify-center">
                          <Play className="h-6 w-6 text-muted-foreground" />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">{video.channelName}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatNumber(video.viewCount)}
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {formatNumber(video.likeCount)}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {formatNumber(video.commentCount)}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {new Date(video.publishedAt).toLocaleDateString('ko-KR')}
                              </span>
                            </div>
                            {video.trendScore && (
                              <div className={`text-sm font-semibold ${getColorByScore(video.trendScore)}`}>
                                트렌드 점수: {video.trendScore}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">YouTube 트렌드 분석 시작</h3>
              <p className="text-muted-foreground">
                왼쪽 패널에서 키워드를 입력하고 분석을 시작하세요.<br />
                AI가 자동으로 영상을 분석하고 트렌드를 예측합니다.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* 선택된 영상 상세 정보 */}
      {selectedVideo && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              상세 분석 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">영상 정보</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>제목:</strong> {selectedVideo.title}</p>
                  <p><strong>채널:</strong> {selectedVideo.channelName}</p>
                  <p><strong>게시일:</strong> {new Date(selectedVideo.publishedAt).toLocaleDateString('ko-KR')}</p>
                  <p><strong>재생 시간:</strong> {selectedVideo.duration}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">AI 분석 결과</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>요약:</strong> {selectedVideo.summary}</p>
                  <p><strong>트렌드 점수:</strong> 
                    <span className={`ml-1 font-semibold ${getColorByScore(selectedVideo.trendScore || 0)}`}>
                      {selectedVideo.trendScore}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            {selectedVideo.transcript && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">자막 내용 (요약)</h4>
                <div className="p-4 bg-muted rounded-lg text-sm">
                  {selectedVideo.transcript.substring(0, 300)}...
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
