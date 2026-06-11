import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools, getToolBySlug } from '@/data/tools';
import { getArticlesByTool } from '@/lib/articles';
import { toolAffiliates } from '@/data/affiliates';
import { TOOL_CATEGORY_LABELS } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { ToolPageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://ai-tools-site-dusky.vercel.app';

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const categoryLabel = TOOL_CATEGORY_LABELS[tool.category];

  return {
    title: `${tool.name}のレビュー・使い方・料金比較【2026年最新】`,
    description: `${tool.name}（${tool.company}）を徹底レビュー。${categoryLabel}カテゴリのAIツール。${tool.description} 料金: ${tool.pricing}`,
    keywords: [
      tool.name,
      `${tool.name} レビュー`,
      `${tool.name} 使い方`,
      `${tool.name} 料金`,
      `${tool.name} 評判`,
      `${tool.name} 比較`,
      categoryLabel,
      `${categoryLabel} AI`,
      'AIツール',
    ],
    openGraph: {
      title: `${tool.name}のレビュー・使い方・比較｜AI Tools Lab`,
      description: tool.description,
    },
    alternates: {
      canonical: `${BASE_URL}/tool/${slug}/`,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const articles = getArticlesByTool(slug);
  const affiliates = toolAffiliates[slug] || [];

  const breadcrumbItems = [
    { name: 'TOP', url: `${BASE_URL}/` },
    { name: TOOL_CATEGORY_LABELS[tool.category], url: `${BASE_URL}/category/${tool.category}/` },
    { name: tool.name, url: `${BASE_URL}/tool/${tool.slug}/` },
  ];

  return (
    <>
      <ToolPageJsonLd tool={tool} articleCount={articles.length} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-emerald-600 transition-colors">TOP</Link>
              <span>/</span>
              <Link href={`/category/${tool.category}/`} className="hover:text-emerald-600 transition-colors">
                {TOOL_CATEGORY_LABELS[tool.category]}
              </Link>
              <span>/</span>
              <span className="text-slate-400">{tool.name}</span>
            </nav>

            {/* Tool Header */}
            <div className="surface-card p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-black flex-shrink-0 shadow-sm">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-black text-slate-900 mb-1">
                    {tool.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-slate-500">{tool.company}</span>
                    <Link
                      href={`/category/${tool.category}/`}
                      className="text-[0.65rem] px-2.5 py-0.5 rounded-full font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                    >
                      {TOOL_CATEGORY_LABELS[tool.category]}
                    </Link>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={`text-sm ${star <= Math.round(tool.rating) ? 'star-filled' : 'star-empty'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm font-bold text-amber-500 ml-1">{tool.rating}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.features.map(feature => (
                  <span
                    key={feature}
                    className="text-[0.65rem] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Info Row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span>料金: {tool.pricing}</span>
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-emerald-600 hover:underline"
                >
                  公式サイト →
                </a>
              </div>

              {/* Affiliate CTAs */}
              {affiliates.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {affiliates.map(aff => (
                    <a
                      key={aff.service}
                      href={aff.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/25 transition-all"
                    >
                      {aff.label}
                      {aff.badge && (
                        <span className="text-[0.6rem] font-semibold bg-white/20 text-white px-1.5 py-0.5 rounded-full ml-1">
                          {aff.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Articles */}
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-emerald-500 rounded-full" />
              {tool.name}の記事一覧（{articles.length}件）
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} showTool={false} />
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
