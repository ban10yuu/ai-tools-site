import Link from 'next/link';
import { tools } from '@/data/tools';
import { TOOL_CATEGORY_LABELS } from '@/lib/types';

export default function Footer() {
  const categories = Object.entries(TOOL_CATEGORY_LABELS);

  return (
    <footer className="border-t border-[#252540] bg-[#0a0a14] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="text-lg font-black mb-3">
              <span className="text-[#7c3aed]">AI</span>
              <span className="text-white"> Tools Lab</span>
            </div>
            <p className="text-sm text-[#6a7090] leading-relaxed">
              最新AIツールのレビュー・比較・活用テクニックを発信する日本語メディア。
              {tools.length}以上のAIツールを徹底解説。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-[#c8cce0] mb-3">カテゴリ</h3>
            <ul className="space-y-1.5">
              {categories.map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/category/${key}/`}
                    className="text-sm text-[#6a7090] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* All Tools */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#c8cce0] mb-3">AIツール一覧</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {tools.map(tool => (
                <li key={tool.slug} className="list-none">
                  <Link
                    href={`/tool/${tool.slug}/`}
                    className="text-sm text-[#6a7090] hover:text-white transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>

        {/* Sister Sites */}
        <div className="mt-8 pt-6 border-t border-[#1a1a2e]">
          <h3 className="text-xs font-bold text-[#4a5070] mb-3">関連サイト</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <a href="https://manga-matome-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-[#6a7090] hover:text-white transition-colors">マンガ考察ラボ</a>
            <a href="https://anime-review-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-[#6a7090] hover:text-white transition-colors">Anime Review Lab</a>
            <a href="https://vod-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-[#6a7090] hover:text-white transition-colors">動画配信ナビ</a>
            <a href="https://fukusen-lab.vercel.app" target="_blank" rel="noopener" className="text-xs text-[#6a7090] hover:text-white transition-colors">伏線回収ラボ</a>
            <a href="https://joseikin-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-[#6a7090] hover:text-white transition-colors">助成金ナビ</a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#1a1a2e] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4a5070]">
            &copy; 2026 AI Tools Lab. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/privacy/" className="text-[#6a7090] hover:text-white transition-colors">プライバシーポリシー</Link>
            <span className="text-[#252540]">|</span>
            <Link href="/contact/" className="text-[#6a7090] hover:text-white transition-colors">お問い合わせ</Link>
          </div>
          <p className="text-xs text-[#4a5070]">
            ※ 当サイトはアフィリエイトプログラムに参加しています
          </p>
        </div>
      </div>
    </footer>
  );
}
