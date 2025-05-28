import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { analysisType = 'demo' } = await request.json()
    
    // Python 스크립트 경로
    const projectRoot = '/Users/Jadaking/DataLab/projects/ai_trend_analyzer'
    let scriptPath = ''
    
    switch (analysisType) {
      case 'demo':
        scriptPath = path.join(projectRoot, 'demo.py')
        break
      case 'advanced':
        scriptPath = path.join(projectRoot, 'scripts/advanced_analyzer.py')
        break
      case 'stealth':
        scriptPath = path.join(projectRoot, 'scripts/stealth_crawler.py')
        break
      default:
        scriptPath = path.join(projectRoot, 'demo.py')
    }

    return new Promise((resolve) => {
      const pythonProcess = spawn('python3', [scriptPath], {
        cwd: projectRoot,
        stdio: ['pipe', 'pipe', 'pipe']
      })

      let output = ''
      let error = ''

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString()
      })

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString()
      })

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(NextResponse.json({
            success: true,
            message: '분석 완료!',
            output: output,
            analysisType
          }))
        } else {
          resolve(NextResponse.json({
            success: false,
            message: '분석 중 오류 발생',
            error: error,
            code
          }, { status: 500 }))
        }
      })

      // 30초 타임아웃
      setTimeout(() => {
        pythonProcess.kill()
        resolve(NextResponse.json({
          success: false,
          message: '분석 시간 초과',
          timeout: true
        }, { status: 408 }))
      }, 30000)
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '요청 처리 중 오류 발생',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI 트렌드 분석 API',
    version: '2075.1.0',
    author: 'Leonardo da Vinci Edition',
    endpoints: {
      'POST /api/analysis': 'AI 트렌드 분석 실행',
      'GET /api/status': '시스템 상태 확인'
    }
  })
}