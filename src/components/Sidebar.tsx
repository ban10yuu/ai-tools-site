import Link from 'next/link';
import { tools } from '@/data/tools';
import { generalAffiliates } from '@/data/affiliates';
import { getPopularArticles } from '@/lib/articles';
import { TOOL_CATEGORY_LABELS, TOOL_CATEGORY_COLORS } from '@/lib/types';
import GoogleAd from './GoogleAd';

export default function Sidebar() {
  const topTools = tools.slice(0, 10);
  const popularArticles = getPopularArticles(10);
  const categories = Object.entries(TOOL_CATEGORY_LABELS);

  return (
    <aside className="space-y-6">
      {/* Popular Articles */}
      <div className="cyber-panel p-4">
        <h2 className="text-sm font-bold text-[#e0e4f0] mb-3">
          人気記事ランキング
        </h2>
        <ul className="space-y-2">
          {popularArticles.map((article, i) => (
            <li key={article.slug}>
              <Link
                href={`/article/${article.slug}/`}
                className="flex items-start gap-2.5 py-1.5 group"
              >
                <span className={`rank-badge flex-shrink-0 mt-0.5 ${i < 1 ? 'rank-1' : i < 2 ? 'rank-2' : i < 3 ? 'rank-3' : 'rank-other'}`}>
                  {i + 1}
                </span>
                <span className="text-xs text-[#c8cce0] group-hover:text-[#00ff88] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Category Links */}
      <div className="cyber-panel p-4">
        <h2 className="text-sm font-bold text-[#e0e4f0] mb-3">
          カテゴリ
        </h2>
        <ul className="space-y-1.5">
          {categories.map(([key, label]) => (
            <li key={key}>
              <Link
                href={`/category/${key}/`}
                className="flex items-center gap-2 py-1 group"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: TOOL_CATEGORY_COLORS[key as keyof typeof TOOL_CATEGORY_COLORS] }}
                />
                <span className="text-xs text-[#c8cce0] group-hover:text-[#00ff88] transition-colors">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tool Ranking */}
      <div className="cyber-panel p-4">
        <h2 className="text-sm font-bold text-[#e0e4f0] mb-3">
          AIツールランキング
        </h2>
        <ul className="space-y-2">
          {topTools.map((tool, i) => (
            <li key={tool.slug}>
              <Link
                href={`/tool/${tool.slug}/`}
                className="flex items-center gap-2.5 py-1.5 group"
              >
                <span className={`rank-badge ${i < 1 ? 'rank-1' : i < 2 ? 'rank-2' : i < 3 ? 'rank-3' : 'rank-other'}`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-[#c8cce0] group-hover:text-[#00ff88] transition-colors">
                    {tool.name}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={`text-[0.5rem] ${star <= Math.round(tool.rating) ? 'star-filled' : 'star-empty'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-[0.6rem] text-[#6a7090] ml-0.5">{tool.rating}</span>
                  </div>
                </div>
                <span className="text-[0.6rem] text-[#4a5070]">{tool.company}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Affiliate Widget */}
      <div className="cyber-panel p-4">
        <h2 className="text-sm font-bold text-[#e0e4f0] mb-3">
          おすすめAIツール
        </h2>
        <ul className="space-y-2">
          {generalAffiliates.slice(0, 5).map(aff => (
            <li key={aff.service}>
              <a
                href={aff.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-between py-1.5 group"
              >
                <div>
                  <span className="text-xs font-medium text-[#c8cce0] group-hover:text-[#00ff88] transition-colors">
                    {aff.label}
                  </span>
                  {aff.badge && (
                    <span className="ml-1.5 text-[0.6rem] text-[#00ff88] bg-[#00ff8815] px-1.5 py-0.5 rounded">
                      {aff.badge}
                    </span>
                  )}
                </div>
                <span className="text-[0.65rem] text-[#6a7090]">{aff.price}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Ad placement */}
      <div className="cyber-panel p-4">
        <p className="text-[0.6rem] text-[#4a5070] mb-1 text-center">ADVERTISEMENT</p>
        <GoogleAd format="rectangle" />
      </div>

      {/* Tags Quick Access */}
      <div className="cyber-panel p-4">
        <h2 className="text-sm font-bold text-[#e0e4f0] mb-3">
          人気タグ
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {['ChatGPT', 'Claude', 'Midjourney', 'Cursor', 'AI 比較', 'レビュー', 'AI 使い方', '料金', '画像生成', 'コーディング'].map(tag => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}/`}
              className="text-[0.6rem] text-[#6a7090] bg-[#1a1a2e] px-2 py-1 rounded hover:text-[#00ff88] hover:bg-[#00ff8810] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <Link href="/tags/" className="block text-[0.65rem] text-[#00ff88] mt-2 hover:underline">
          タグ一覧を見る →
        </Link>
      </div>
    </aside>
  );
}
