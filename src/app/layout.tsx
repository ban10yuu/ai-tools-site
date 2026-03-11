import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-tools-site-ten.vercel.app'),
  title: {
    default: 'AI Tools Lab（AIツールラボ）｜最新AIツール徹底レビュー・比較2026',
    template: '%s｜AI Tools Lab',
  },
  description:
    'ChatGPT・Claude・Gemini・Midjourney・Cursor・Copilot等20以上の最新AIツールを徹底レビュー・比較。使い方ガイド、活用テクニック、料金比較、おすすめランキングなど、AIツール選びに役立つ情報を網羅的に発信する日本語メディア。2026年最新版。',
  keywords: [
    // ---- ツール名 単体 ----
    'ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'Stable Diffusion',
    'DALL-E 3', 'GitHub Copilot', 'Cursor', 'Notion AI', 'Canva AI',
    'Runway ML', 'ElevenLabs', 'Dify', 'Perplexity', 'Adobe Firefly',
    'Suno AI', 'Kling AI', 'DeepL', 'Gamma AI', 'v0 Vercel',
    // ---- ツール名 + レビュー ----
    'ChatGPT レビュー', 'Claude レビュー', 'Gemini レビュー', 'Midjourney レビュー',
    'Cursor レビュー', 'Copilot レビュー', 'Perplexity レビュー',
    // ---- ツール名 + 使い方 ----
    'ChatGPT 使い方', 'Claude 使い方', 'Gemini 使い方', 'Midjourney 使い方',
    'Stable Diffusion 使い方', 'Cursor 使い方', 'Copilot 使い方', 'Notion AI 使い方',
    // ---- ツール名 + 料金 ----
    'ChatGPT 料金', 'Claude 料金', 'Gemini 料金', 'Midjourney 料金',
    'Cursor 料金', 'Copilot 料金',
    // ---- ツール名 + 評判 ----
    'ChatGPT 評判', 'Claude 評判', 'Cursor 評判', 'Midjourney 評判',
    // ---- ツール名 + 比較 ----
    'ChatGPT Claude 比較', 'ChatGPT Gemini 比較', 'Midjourney Stable Diffusion 比較',
    'Cursor Copilot 比較', 'AI チャット 比較',
    // ---- ジェネリック ----
    'AIツール', 'AIツール レビュー', 'AIツール 比較', 'AIツール おすすめ',
    'AIツール ランキング', 'AIツール 2026', 'AIツール 最新',
    'AI 比較', 'AI 活用', 'AI 使い方', 'AI 活用術', 'AI 料金比較',
    'AI おすすめ', 'AI 最新', 'AI 2026',
    // ---- カテゴリ ----
    'AI チャット', 'AI チャットボット', 'AIチャット おすすめ',
    'AI 画像生成', 'AI 画像生成 おすすめ', '画像生成AI 比較',
    'AI コーディング', 'AIコード補完', 'AI プログラミング', 'AI エディタ',
    'AI ライティング', 'AI 文章作成', 'AI 翻訳',
    'AI 動画生成', 'AI 音声合成', 'AI 音楽生成',
    'AI ビジネス', 'AI プレゼン', 'AI デザイン',
    // ---- トレンド ----
    '生成AI', '生成AI ツール', '生成AI おすすめ', '生成AI 比較 2026',
    'LLM 比較', 'GPT-5', 'Claude 4',
    'AI 副業', 'AI 業務効率化', 'AI 自動化',
    'プロンプトエンジニアリング', 'プロンプト 書き方',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'AI Tools Lab',
    title: 'AI Tools Lab（AIツールラボ）｜最新AIツール徹底レビュー・比較2026',
    description: 'ChatGPT・Claude・Gemini・Midjourney等20以上のAIツールを徹底レビュー・比較。活用テクニック・料金比較・おすすめランキング。',
    url: 'https://ai-tools-site-ten.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Lab｜最新AIツール徹底レビュー・比較',
    description: '20以上のAIツールを徹底レビュー・比較・活用テクニック。ChatGPT・Claude・Midjourney・Cursor等の最新情報を発信。',
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
    canonical: 'https://ai-tools-site-ten.vercel.app',
  },
  verification: {
    google: 'QNT_EwkmJ039_aVzqr1sKc_hySyn-ZpgLZDtAgxtsNo',
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V11MKY0X3F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-V11MKY0X3F');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AI Tools Lab',
              alternateName: 'AIツールラボ',
              url: 'https://ai-tools-site-ten.vercel.app',
              description: 'ChatGPT・Claude・Gemini・Midjourney・Cursor等20以上のAIツールを徹底レビュー・比較する日本語メディア',
              publisher: {
                '@type': 'Organization',
                name: 'AI Tools Lab',
                url: 'https://ai-tools-site-ten.vercel.app',
              },
              inLanguage: 'ja',
            }),
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
