import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { getAllArticles } from '@/lib/articles';
import { tools } from '@/data/tools';
import { TOOL_CATEGORY_LABELS, TOOL_CATEGORY_COLORS } from '@/lib/types';

export default function Home() {
  const articles = getAllArticles();
  const latestArticles = articles.slice(0, 12);
  const categories = Object.entries(TOOL_CATEGORY_LABELS);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient border-b border-[#252540]">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-[#00ff88] glitch-text">最新AIツール</span>
            <span className="text-white">徹底レビュー・比較</span>
            <span className="text-[#7c3aed]">2026</span>
          </h1>
          <p className="text-sm md:text-base text-[#8890a8] mb-6 max-w-2xl mx-auto">
            ChatGPT・Claude・Gemini・Midjourney・Cursor等{tools.length}以上のAIツールを
            <br className="hidden md:block" />
            徹底レビュー・比較。使い方・料金・活用テクニックを完全解説するAIツール専門メディア。
          </p>

          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(([key, label]) => (
              <Link
                key={key}
                href={`/category/${key}/`}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: TOOL_CATEGORY_COLORS[key as keyof typeof TOOL_CATEGORY_COLORS] + '15',
                  color: TOOL_CATEGORY_COLORS[key as keyof typeof TOOL_CATEGORY_COLORS],
                  border: `1px solid ${TOOL_CATEGORY_COLORS[key as keyof typeof TOOL_CATEGORY_COLORS]}30`,
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-black text-[#00ff88]">{tools.length}</div>
              <div className="text-xs text-[#6a7090]">AIツール</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#7c3aed]">{articles.length}</div>
              <div className="text-xs text-[#6a7090]">レビュー記事</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#00d4ff]">6</div>
              <div className="text-xs text-[#6a7090]">カテゴリ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#e0e4f0] mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#00ff88] rounded-full" />
              最新のAIツールレビュー・比較記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Category Sections */}
            <div className="mt-12 space-y-10">
              {categories.map(([key, label]) => {
                const categoryTools = tools.filter(t => t.category === key);
                const categoryArticles = articles
                  .filter(a => categoryTools.some(t => t.slug === a.toolSlug))
                  .slice(0, 4);

                return (
                  <section key={key}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-[#e0e4f0] flex items-center gap-2">
                        <span
                          className="w-1 h-5 rounded-full"
                          style={{ backgroundColor: TOOL_CATEGORY_COLORS[key as keyof typeof TOOL_CATEGORY_COLORS] }}
                        />
                        {label}AIツール（{categoryTools.length}件）
                      </h2>
                      <Link
                        href={`/category/${key}/`}
                        className="text-xs text-[#00ff88] hover:underline"
                      >
                        もっと見る →
                      </Link>
                    </div>

                    {/* Tool chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categoryTools.map(tool => (
                        <Link
                          key={tool.slug}
                          href={`/tool/${tool.slug}/`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#12122a] border border-[#252540] hover:border-[#00ff8840] hover:text-[#00ff88] transition-all"
                        >
                          <span
                            className="w-5 h-5 rounded flex items-center justify-center text-[0.6rem] font-black"
                            style={{
                              backgroundColor: tool.accentColor + '20',
                              color: tool.accentColor,
                            }}
                          >
                            {tool.name.charAt(0)}
                          </span>
                          <span className="text-[#c8cce0]">{tool.name}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Category articles */}
                    {categoryArticles.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryArticles.map(article => (
                          <ArticleCard key={article.slug} article={article} />
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Tool Grid */}
            <h2 className="text-lg font-bold text-[#e0e4f0] mt-12 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#7c3aed] rounded-full" />
              AIツール一覧 - 全{tools.length}ツール
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tools.map(tool => (
                <Link
                  key={tool.slug}
                  href={`/tool/${tool.slug}/`}
                  className="cyber-panel p-3 text-center group"
                >
                  <div
                    className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-lg font-black"
                    style={{
                      backgroundColor: tool.accentColor + '20',
                      color: tool.accentColor,
                    }}
                  >
                    {tool.name.charAt(0)}
                  </div>
                  <div className="text-xs font-bold text-[#c8cce0] group-hover:text-[#00ff88] transition-colors">
                    {tool.name}
                  </div>
                  <div className="text-[0.6rem] text-[#4a5070] mt-0.5">{tool.company}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
