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
            <span className="text-[#00ff88] glitch-text">AI Tools</span>
            <span className="text-white"> Lab</span>
          </h1>
          <p className="text-sm md:text-base text-[#8890a8] mb-6 max-w-2xl mx-auto">
            最新AIツールの徹底レビュー・比較・活用テクニック。
            <br className="hidden md:block" />
            ChatGPT、Claude、Midjourney等{tools.length}以上のAIツールを完全解説。
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
              最新記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Tool Grid */}
            <h2 className="text-lg font-bold text-[#e0e4f0] mt-12 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#7c3aed] rounded-full" />
              AIツール一覧
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
