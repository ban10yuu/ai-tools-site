import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-tools-lab.vercel.app'),
  title: {
    default: 'AI Tools Lab（AIツールラボ）｜最新AIツール徹底レビュー・比較',
    template: '%s｜AI Tools Lab',
  },
  description:
    'ChatGPT、Claude、Midjourney、Cursor等20以上の最新AIツールを徹底レビュー・比較。使い方ガイド、活用テクニック、料金比較など、AIツール選びに役立つ情報を発信。',
  keywords: [
    'AIツール',
    'AI レビュー',
    'ChatGPT',
    'Claude',
    'Midjourney',
    'Stable Diffusion',
    'GitHub Copilot',
    'Cursor',
    'AI 比較',
    'AI 活用',
    'AI 使い方',
    'AI チャット',
    'AI 画像生成',
    'AI コーディング',
    'AI ライティング',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'AI Tools Lab',
    title: 'AI Tools Lab（AIツールラボ）｜最新AIツール徹底レビュー・比較',
    description: 'ChatGPT、Claude、Midjourney等20以上のAIツールを徹底レビュー・比較。活用テクニック・料金比較。',
    url: 'https://ai-tools-lab.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Lab',
    description: '最新AIツールの徹底レビュー・比較・活用テクニックを発信',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ai-tools-lab.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1611624572831066"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
