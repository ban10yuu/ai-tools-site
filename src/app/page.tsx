import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { getAllArticles } from '@/lib/articles';
import { tools } from '@/data/tools';
import { TOOL_CATEGORY_LABELS, TOOL_CATEGORY_COLORS } from '@/lib/types';

export default function Home() {
  const articles = getAllArticles();
  const latestArticles = articles.slice(0, 8);
  const categories = Object.entries(TOOL_CATEGORY_LABELS);

  // Pick the first tool as the featured spotlight
  const spotlightTool = tools[0];
  const spotlightArticles = articles
    .filter(a => a.toolSlug === spotlightTool.slug)
    .slice(0, 2);

  return (
    <>
      {/* Hero: Single Tool Spotlight */}
      <section className="bg-[#0c0c14] border-b border-[#1e1e30]">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Spotlight Left */}
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold text-[#7c3aed] tracking-wide uppercase mb-3">
                注目ツール
              </p>
              <h1 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight">
                {spotlightTool.name}
              </h1>
              <p className="text-sm text-[#8890a8] leading-relaxed mb-5 max-w-xl">
                {spotlightTool.company} が提供する{spotlightTool.name}を徹底解説。
                料金プラン・使い方・他ツールとの比較まで、導入検討に必要な情報をまとめています。
              </p>
              <Link
                href={`/tool/${spotlightTool.slug}/`}
                className="inline-block bg-[#7c3aed] text-white text-sm font-bold px-6 py-2.5 rounded hover:bg-[#6d28d9] transition-colors"
              >
                {spotlightTool.name}のレビューを読む
              </Link>
            </div>

            {/* Spotlight Right: related articles */}
            <div className="lg:col-span-2 space-y-3">
              {spotlightArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}/`}
                  className="block bg-[#12121e] border border-[#252540] rounded p-4 hover:border-[#353560] transition-colors"
                >
                  <h3 className="text-sm font-bold text-[#e0e4f0] leading-snug line-clamp-2 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#6a7090] line-clamp-2">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool Comparison Strip */}
      <section className="bg-[#0a0a14] border-b border-[#1e1e30] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <span className="text-xs text-[#6a7090] font-semibold flex-shrink-0">ツール一覧:</span>
            {tools.slice(0, 12).map(tool => (
              <Link
                key={tool.slug}
                href={`/tool/${tool.slug}/`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-[#c8cce0] bg-[#12121e] border border-[#252540] hover:border-[#353560] transition-colors flex-shrink-0"
              >
                <span
                  className="w-4 h-4 rounded flex items-center justify-center text-[0.5rem] font-black"
                  style={{
                    backgroundColor: tool.accentColor + '20',
                    color: tool.accentColor,
                  }}
                >
                  {tool.name.charAt(0)}
                </span>
                {tool.name}
              </Link>
            ))}
            {tools.length > 12 && (
              <span className="text-xs text-[#4a5070] flex-shrink-0">+{tools.length - 12}件</span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Articles */}
          <div className="flex-1 min-w-0">
            {/* Latest Articles */}
            <h2 className="text-base font-bold text-[#e0e4f0] mb-5">
              最新のレビュー・比較記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {latestArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Category Sections -- varied layouts */}
            {categories.map(([key, label], catIdx) => {
              const categoryTools = tools.filter(t => t.category === key);
              const categoryArticles = articles
                .filter(a => categoryTools.some(t => t.slug === a.toolSlug))
                .slice(0, catIdx === 0 ? 3 : 4);

              if (categoryArticles.length === 0) return null;

              return (
                <section key={key} className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-[#e0e4f0] flex items-center gap-2">
                      <span
                        className="w-1 h-5 rounded-full"
                        style={{ backgroundColor: TOOL_CATEGORY_COLORS[key as keyof typeof TOOL_CATEGORY_COLORS] }}
                      />
                      {label}
                    </h2>
                    <Link
                      href={`/category/${key}/`}
                      className="text-xs text-[#7c3aed] hover:underline"
                    >
                      もっと見る
                    </Link>
                  </div>

                  {catIdx === 0 ? (
                    /* First category: 1 large + 2 small list */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <ArticleCard article={categoryArticles[0]} />
                      </div>
                      <div className="space-y-3">
                        {categoryArticles.slice(1, 3).map(article => (
                          <Link
                            key={article.slug}
                            href={`/article/${article.slug}/`}
                            className="block bg-[#12121e] border border-[#252540] rounded p-3 hover:border-[#353560] transition-colors"
                          >
                            <h3 className="text-xs font-bold text-[#c8cce0] line-clamp-2 leading-snug">
                              {article.title}
                            </h3>
                            <p className="text-[0.65rem] text-[#4a5070] mt-1 line-clamp-1">{article.excerpt}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Other categories: standard 2-col grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryArticles.map(article => (
                        <ArticleCard key={article.slug} article={article} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            {/* All Tools -- compact list, not a flashy grid */}
            <section className="mt-4">
              <h2 className="text-base font-bold text-[#e0e4f0] mb-4">
                全{tools.length}ツール一覧
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {tools.map(tool => (
                  <Link
                    key={tool.slug}
                    href={`/tool/${tool.slug}/`}
                    className="flex items-center gap-2 bg-[#12121e] border border-[#252540] rounded px-3 py-2 hover:border-[#353560] transition-colors"
                  >
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center text-[0.55rem] font-black flex-shrink-0"
                      style={{
                        backgroundColor: tool.accentColor + '15',
                        color: tool.accentColor,
                      }}
                    >
                      {tool.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-medium text-[#c8cce0] truncate block">{tool.name}</span>
                      <span className="text-[0.6rem] text-[#4a5070]">{tool.company}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
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
