import { NextResponse } from 'next/server'
import { spawn } from 'child_process'

export async function GET() {
  try {
    // MySQL 상태 확인
    const checkDatabase = () => {
      return new Promise((resolve) => {
        const mysqlProcess = spawn('/Applications/XAMPP/xamppfiles/bin/mysql', [
          '-h', 'localhost',
          '-P', '24',
          '-u', 'root',
          '-e', 'USE ai_trends_db; SELECT COUNT(*) as youtube_count FROM youtube_videos; SELECT COUNT(*) as research_count FROM research_sources; SELECT COUNT(*) as analysis_count FROM trend_analysis;'
        ])

        let output = ''
        let error = ''

        mysqlProcess.stdout.on('data', (data) => {
          output += data.toString()
        })

        mysqlProcess.stderr.on('data', (data) => {
          error += data.toString()
        })

        mysqlProcess.on('close', (code) => {
          if (code === 0) {
            // 출력 파싱
            const lines = output.split('\n').filter(line => line.trim())
            const counts = {
              youtube_videos: 0,
              research_sources: 0,
              trend_analysis: 0
            }

            // 숫자만 추출
            const numbers = output.match(/\d+/g) || []
            if (numbers.length >= 3) {
              counts.youtube_videos = parseInt(numbers[0])
              counts.research_sources = parseInt(numbers[1])
              counts.trend_analysis = parseInt(numbers[2])
            }

            resolve({
              database: {
                connected: true,
                counts
              }
            })
          } else {
            resolve({
              database: {
                connected: false,
                error: error
              }
            })
          }
        })

        setTimeout(() => {
          mysqlProcess.kill()
          resolve({
            database: {
              connected: false,
              error: 'Database connection timeout'
            }
          })
        }, 5000)
      })
    }

    const dbStatus = await checkDatabase()

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      system: {
        name: 'AI Trend Analyzer 2075',
        version: 'Leonardo da Vinci Edition',
        status: 'operational'
      },
      ...dbStatus,
      services: {
        web_server: 'running',
        python_backend: 'ready',
        mysql_database: (dbStatus as any).database.connected ? 'connected' : 'disconnected'
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Status check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}