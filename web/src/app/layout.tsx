import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Trend Analyzer 2075 | Leonardo da Vinci Edition",
  description: "레오나르도 다 빈치가 2075년에 만들었을 법한 AI 트렌드 분석기. YouTube, GitHub, 웹 크롤링을 통한 종합 분석 플랫폼.",
  keywords: "AI, 트렌드 분석, YouTube, GitHub, 웹 크롤링, 데이터 분석, Leonardo da Vinci",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          {children}
        </div>
      </body>
    </html>
  )
}
