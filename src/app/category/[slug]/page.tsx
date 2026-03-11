import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools } from '@/data/tools';
import { getArticlesByToolCategory } from '@/lib/articles';
import { TOOL_CATEGORY_LABELS, TOOL_CATEGORY_COLORS, ToolCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { CategoryPageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://ai-tools-site-ten.vercel.app';
const validCategories: ToolCategory[] = ['chatbot', 'image', 'video', 'coding', 'writing', 'business'];

export function generateStaticParams() {
  return validCategories.map(slug => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!validCategories.includes(slug as ToolCategory)) return {};

  const label = TOOL_CATEGORY_LABELS[slug as ToolCategory];
  const categoryTools = tools.filter(t => t.category === slug);
  const toolNames = categoryTools.map(t => t.name).join('・');

  return {
    title: `${label}AIツールのレビュー・比較・活用法【2026年最新】`,
    description: `${label}カテゴリのAIツール（${toolNames}）を徹底レビュー・比較。使い方ガイド、活用テクニック、料金比較などを掲載。`,
    keywords: [
      `${label} AI`, `${label} AIツール`, `${label} 比較`, `${label} おすすめ`,
      ...categoryTools.map(t => t.name),
      'AIツール', 'AI レビュー',
    ],
    alternates: {
      canonical: `${BASE_URL}/category/${slug}/`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  if (!validCategories.includes(slug as ToolCategory)) notFound();

  const category = slug as ToolCategory;
  const label = TOOL_CATEGORY_LABELS[category];
  const color = TOOL_CATEGORY_COLORS[category];
  const categoryTools = tools.filter(t => t.category === category);
  const articles = getArticlesByToolCategory(category);

  const breadcrumbItems = [
    { name: 'TOP', url: `${BASE_URL}/` },
    { name: label, url: `${BASE_URL}/category/${slug}/` },
  ];

  return (
    <>
      <CategoryPageJsonLd
        categoryLabel={label}
        categorySlug={slug}
        articleCount={articles.length}
        toolCount={categoryTools.length}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="text-xs text-[#6a7090] mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#00ff88] transition-colors">TOP</Link>
              <span>/</span>
              <span className="text-[#4a5070]">{label}</span>
            </nav>

            {/* Category Header */}
            <div className="cyber-panel p-6 mb-6">
              <h1 className="text-xl md:text-2xl font-black text-[#e0e4f0] mb-2 flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {label}AIツール
              </h1>
              <p className="text-sm text-[#8890a8]">
                {label}カテゴリの最新AIツールを徹底レビュー・比較。{categoryTools.length}ツール、{articles.length}記事を掲載中。
              </p>
            </div>

            {/* Tools in this category */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {categoryTools.map(tool => (
                <Link
                  key={tool.slug}
                  href={`/tool/${tool.slug}/`}
                  className="cyber-panel p-4 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black flex-shrink-0"
                      style={{
                        backgroundColor: tool.accentColor + '20',
                        color: tool.accentColor,
                      }}
                    >
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#c8cce0] group-hover:text-[#00ff88] transition-colors">
                        {tool.name}
                      </div>
                      <div className="text-[0.6rem] text-[#4a5070]">{tool.company}</div>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={`text-[0.5rem] ${star <= Math.round(tool.rating) ? 'star-filled' : 'star-empty'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Articles */}
            <h2 className="text-lg font-bold text-[#e0e4f0] mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{ backgroundColor: color }} />
              {label}の記事一覧（{articles.length}件）
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
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
