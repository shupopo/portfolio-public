import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shupopo - 自動化・効率化エンジニア',
  description: 'ビジネス課題を技術で解決し、業務効率化を実現するフリーランスエンジニア。Spring Boot、AWS、自動化ツール開発。',
  keywords: ['Shupopo', 'フリーランスエンジニア', '自動化', '効率化', 'Spring Boot', 'AWS', 'Java'],
  authors: [{ name: 'Shupopo' }],
  openGraph: {
    title: 'Shupopo - 自動化・効率化エンジニア',
    description: 'ビジネス課題を技術で解決し、業務効率化を実現するフリーランスエンジニア',
    type: 'website',
    locale: 'ja_JP',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}