import Link from 'next/link';
import { tools } from '@/data/tools';
import { TOOL_CATEGORY_LABELS } from '@/lib/types';

export default function Footer() {
  const categories = Object.entries(TOOL_CATEGORY_LABELS);

  return (
    <footer className="relative z-10 border-t border-[#252540] bg-[#0a0a14] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="text-lg font-black mb-3">
              <span className="text-[#00ff88]">AI</span>
              <span className="text-white"> Tools </span>
              <span className="text-[#7c3aed]">Lab</span>
            </div>
            <p className="text-sm text-[#6a7090] leading-relaxed mb-3">
              最新AIツールのレビュー・比較・活用テクニックを発信する日本語メディア。
              ChatGPT・Claude・Gemini・Midjourney・Cursor等{tools.length}以上のAIツールを徹底解説。
              使い方ガイド、料金比較、おすすめランキングを掲載中。
            </p>
            <Link href="/tags/" className="text-xs text-[#00ff88] hover:underline">
              タグ一覧を見る →
            </Link>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-[#c8cce0] mb-3">カテゴリ</h3>
            <ul className="space-y-1.5">
              {categories.map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/category/${key}/`}
                    className="text-sm text-[#6a7090] hover:text-[#00ff88] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* All Tools (2 columns) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#c8cce0] mb-3">AIツール一覧（全{tools.length}ツール）</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {tools.map(tool => (
                <li key={tool.slug} className="list-none">
                  <Link
                    href={`/tool/${tool.slug}/`}
                    className="text-sm text-[#6a7090] hover:text-[#00ff88] transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>

        {/* Keyword Tags */}
        <div className="mt-8 pt-6 border-t border-[#1a1a2e]">
          <h3 className="text-xs font-bold text-[#4a5070] mb-3">人気キーワード</h3>
          <div className="flex flex-wrap gap-1.5">
            {[
              'ChatGPT レビュー', 'Claude 使い方', 'Midjourney 比較', 'Cursor 料金',
              'AI画像生成', 'AIコーディング', 'AI翻訳', 'AIチャット 比較',
              'プロンプト 書き方', '生成AI おすすめ', 'AI 業務効率化', 'AI 2026',
              'Copilot 使い方', 'Perplexity 評判', 'Stable Diffusion 使い方',
              'DeepL 料金', 'Notion AI 活用', 'Runway 動画生成', 'ElevenLabs 音声',
            ].map(keyword => (
              <span
                key={keyword}
                className="text-[0.6rem] text-[#4a5070] bg-[#12122a] px-2 py-0.5 rounded border border-[#1a1a2e]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#1a1a2e] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4a5070]">
            &copy; 2026 AI Tools Lab. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/privacy/" className="text-[#6a7090] hover:text-[#00ff88] transition-colors">プライバシーポリシー</Link>
            <span className="text-[#252540]">|</span>
            <Link href="/contact/" className="text-[#6a7090] hover:text-[#00ff88] transition-colors">お問い合わせ</Link>
          </div>
          <p className="text-xs text-[#4a5070]">
            ※ 当サイトはアフィリエイトプログラムに参加しています
          </p>
        </div>
      </div>
    </footer>
  );
}
