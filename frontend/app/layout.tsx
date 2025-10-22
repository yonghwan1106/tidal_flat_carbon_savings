import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '갯벌 탄소예금 | Tidal Flat Carbon Savings',
  description: '나의 환경 활동이 자산이 됩니다. 화성시 갯벌 보전 활동에 참여하고 탄소 포인트를 적립하세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
