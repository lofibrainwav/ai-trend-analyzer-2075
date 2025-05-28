"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Github, 
  Star, 
  GitFork, 
  Eye, 
  Code, 
  Calendar,
  TrendingUp,
  Search,
  Filter,
  ArrowLeft,
  ExternalLink,
  RefreshCw
} from "lucide-react"
import Link from "next/link"
import { formatNumber } from "@/lib/utils"

interface GitHubRepo {
  id: string
  name: string
  fullName: string
  description: string
  language: string
  stars: number
  forks: number
  watchers: number
  openIssues: number
  createdAt: string
  updatedAt: string
  url: string
  topics: string[]
  trendScore: number
}

export default function GitHubHunter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [repositories, setRepositories] = useState<GitHubRepo[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [sortBy, setSortBy] = useState("stars")

  // 샘플 데이터
  const sampleRepos: GitHubRepo[] = [
    {
      id: "1",
      name: "awesome-ai-tools",
      fullName: "microsoft/awesome-ai-tools",
      description: "A curated list of AI tools and resources for developers and researchers",
      language: "Python",
      stars: 45600,
      forks: 8200,
      watchers: 1200,
      openIssues: 89,
      createdAt: "2023-01-15",
      updatedAt: "2024-12-15",
      url: "https://github.com/microsoft/awesome-ai-tools",
      topics: ["ai", "machine-learning", "deep-learning", "tools"],
      trendScore: 0.92
    },
    {
      id: "2", 
      name: "claude-api-wrapper",
      fullName: "anthropic/claude-api-wrapper",
      description: "Official Python wrapper for Claude API with advanced features",
      language: "Python",
      stars: 23400,
      forks: 3200,
      watchers: 890,
      openIssues: 45,
      createdAt: "2023-06-20",
      updatedAt: "2024-12-10",
      url: "https://github.com/anthropic/claude-api-wrapper",
      topics: ["claude", "ai", "api", "chatbot"],
      trendScore: 0.87
    },
    {
      id: "3",
      name: "next-ai-dashboard",
      fullName: "vercel/next-ai-dashboard",
      description: "Modern AI dashboard built with Next.js 15 and React 19",
      language: "TypeScript",
      stars: 18900,
      forks: 2100,
      watchers: 650,
      openIssues: 32,
      createdAt: "2024-03-10",
      updatedAt: "2024-12-12",
      url: "https://github.com/vercel/next-ai-dashboard",
      topics: ["nextjs", "react", "ai", "dashboard", "typescript"],
      trendScore: 0.84
    },
    {
      id: "4",
      name: "llm-comparison-tool",
      fullName: "openai/llm-comparison-tool",
      description: "Compare performance of different large language models",
      language: "JavaScript",
      stars: 31200,
      forks: 4500,
      watchers: 980,
      openIssues: 67,
      createdAt: "2023-09-05",
      updatedAt: "2024-12-08",
      url: "https://github.com/openai/llm-comparison-tool",
      topics: ["llm", "comparison", "ai", "benchmarks"],
      trendScore: 0.79
    },
    {
      id: "5",
      name: "multimodal-ai-toolkit",
      fullName: "google/multimodal-ai-toolkit",
      description: "Toolkit for building multimodal AI applications with text, image, and audio",
      language: "Python",
      stars: 27800,
      forks: 3800,
      watchers: 1100,
      openIssues: 78,
      createdAt: "2023-11-12",
      updatedAt: "2024-12-14",
      url: "https://github.com/google/multimodal-ai-toolkit",
      topics: ["multimodal", "ai", "computer-vision", "nlp"],
      trendScore: 0.88
    }
  ]

  const languages = ["all", "Python", "JavaScript", "TypeScript", "Go", "Rust", "Java"]

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    
    // 실제로는 GitHub API 호출
    setTimeout(() => {
      const filteredRepos = sampleRepos.filter(repo => 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      
      let sortedRepos = filteredRepos.length > 0 ? filteredRepos : sampleRepos
      
      // 언어 필터링
      if (selectedLanguage !== "all") {
        sortedRepos = sortedRepos.filter(repo => repo.language === selectedLanguage)
      }
      
      // 정렬
      sortedRepos.sort((a, b) => {
        switch (sortBy) {
          case "stars": return b.stars - a.stars
          case "forks": return b.forks - a.forks
          case "updated": return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          case "trend": return b.trendScore - a.trendScore
          default: return 0
        }
      })
      
      setRepositories(sortedRepos)
      setIsSearching(false)
    }, 1500)
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      Python: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-600",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
      Java: "bg-red-500"
    }
    return colors[language] || "bg-gray-500"
  }

  const getTrendScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600"
    if (score >= 0.6) return "text-blue-600"
    if (score >= 0.4) return "text-yellow-600"
    return "text-red-600"
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
          <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg">
            <Github className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">GitHub 트렌드 헌터</h1>
            <p className="text-muted-foreground">인기 프로젝트 분석 및 기술 스택 트렌드</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 검색 및 필터 패널 */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                프로젝트 검색
              </CardTitle>
              <CardDescription>
                AI 관련 프로젝트를 검색하고 분석하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="ai, machine-learning, chatbot..."
                  className="w-full px-3 py-2 border border-input rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full gap-2"
                >
                  {isSearching ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  검색
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>💡 추천 키워드:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["ai", "llm", "chatbot", "machine-learning"].map((keyword) => (
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

          {/* 필터 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                필터 및 정렬
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">언어</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === "all" ? "모든 언어" : lang}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">정렬 기준</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md"
                >
                  <option value="stars">스타 수</option>
                  <option value="forks">포크 수</option>
                  <option value="updated">최근 업데이트</option>
                  <option value="trend">트렌드 점수</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 통계 */}
          {repositories.length > 0 && (
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
                    <span className="text-sm text-muted-foreground">프로젝트 수</span>
                    <span className="font-semibold">{repositories.length}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">총 스타 수</span>
                    <span className="font-semibold">
                      {formatNumber(repositories.reduce((sum, repo) => sum + repo.stars, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">평균 트렌드 점수</span>
                    <span className="font-semibold">
                      {(repositories.reduce((sum, repo) => sum + repo.trendScore, 0) / repositories.length).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 레포지토리 목록 */}
        <div className="lg:col-span-3">
          {isSearching ? (
            <Card className="p-12 text-center">
              <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">GitHub 프로젝트 분석 중...</h3>
              <p className="text-muted-foreground">인기 프로젝트를 검색하고 트렌드를 분석하고 있습니다.</p>
            </Card>
          ) : repositories.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">트렌드 프로젝트</h2>
                <div className="text-sm text-muted-foreground">
                  {repositories.length}개 프로젝트 발견
                </div>
              </div>
              
              <div className="grid gap-4">
                {repositories.map((repo) => (
                  <Card key={repo.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                              {repo.name}
                            </h3>
                            <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                            <span className="text-sm text-muted-foreground">{repo.language}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{repo.fullName}</p>
                          <p className="text-sm mb-3">{repo.description}</p>
                          
                          {/* 토픽 태그 */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {repo.topics.map((topic) => (
                              <span
                                key={topic}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className={`text-lg font-bold ${getTrendScoreColor(repo.trendScore)}`}>
                            {repo.trendScore}
                          </div>
                          <Link href={repo.url} target="_blank">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      {/* 통계 */}
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <Star className="h-3 w-3" />
                            <span>Stars</span>
                          </div>
                          <div className="font-semibold">{formatNumber(repo.stars)}</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <GitFork className="h-3 w-3" />
                            <span>Forks</span>
                          </div>
                          <div className="font-semibold">{formatNumber(repo.forks)}</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <Eye className="h-3 w-3" />
                            <span>Watchers</span>
                          </div>
                          <div className="font-semibold">{formatNumber(repo.watchers)}</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <Calendar className="h-3 w-3" />
                            <span>Updated</span>
                          </div>
                          <div className="text-sm">
                            {new Date(repo.updatedAt).toLocaleDateString('ko-KR', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
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
              <Github className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">GitHub 트렌드 분석 시작</h3>
              <p className="text-muted-foreground">
                왼쪽 패널에서 키워드를 입력하고 검색을 시작하세요.<br />
                인기 AI 프로젝트들의 트렌드를 분석해드립니다.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
