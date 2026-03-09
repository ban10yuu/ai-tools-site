import Link from 'next/link';
import { TOOL_CATEGORY_LABELS } from '@/lib/types';

export default function Footer() {
  const categories = Object.entries(TOOL_CATEGORY_LABELS);

  return (
    <footer className="relative z-10 border-t border-[#252540] bg-[#0a0a14] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-black mb-3">
              <span className="text-[#00ff88]">AI</span>
              <span className="text-white"> Tools </span>
              <span className="text-[#7c3aed]">Lab</span>
            </div>
            <p className="text-sm text-[#6a7090] leading-relaxed">
              最新AIツールのレビュー・比較・活用テクニックを発信する日本語メディア。
              ChatGPT、Claude、Midjourney等20以上のAIツールを徹底解説。
            </p>
          </div>

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

          <div>
            <h3 className="text-sm font-bold text-[#c8cce0] mb-3">人気ツール</h3>
            <ul className="space-y-1.5">
              {['chatgpt', 'claude', 'midjourney', 'cursor', 'perplexity'].map(slug => (
                <li key={slug}>
                  <Link
                    href={`/tool/${slug}/`}
                    className="text-sm text-[#6a7090] hover:text-[#00ff88] transition-colors capitalize"
                  >
                    {slug === 'chatgpt' ? 'ChatGPT' : slug === 'claude' ? 'Claude' : slug === 'midjourney' ? 'Midjourney' : slug === 'cursor' ? 'Cursor' : 'Perplexity'}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1a1a2e] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4a5070]">
            &copy; 2026 AI Tools Lab. All rights reserved.
          </p>
          <p className="text-xs text-[#4a5070]">
            ※ 当サイトはアフィリエイトプログラムに参加しています
          </p>
        </div>
      </div>
    </footer>
  );
}
