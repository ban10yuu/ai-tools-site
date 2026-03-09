import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools, getToolBySlug } from '@/data/tools';
import { getArticlesByTool } from '@/lib/articles';
import { toolAffiliates } from '@/data/affiliates';
import { TOOL_CATEGORY_LABELS } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.name}のレビュー・使い方・比較`,
    description: tool.description,
    openGraph: {
      title: `${tool.name}のレビュー・使い方・比較｜AI Tools Lab`,
      description: tool.description,
    },
    alternates: {
      canonical: `https://ai-tools-lab.vercel.app/tool/${slug}/`,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const articles = getArticlesByTool(slug);
  const affiliates = toolAffiliates[slug] || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'AI Tool',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: Math.floor(tool.rating * 100),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="text-xs text-[#6a7090] mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#00ff88] transition-colors">TOP</Link>
              <span>/</span>
              <Link href={`/category/${tool.category}/`} className="hover:text-[#00ff88] transition-colors">
                {TOOL_CATEGORY_LABELS[tool.category]}
              </Link>
              <span>/</span>
              <span className="text-[#4a5070]">{tool.name}</span>
            </nav>

            {/* Tool Header */}
            <div className="cyber-panel p-6 mb-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black flex-shrink-0"
                  style={{
                    backgroundColor: tool.accentColor + '20',
                    color: tool.accentColor,
                  }}
                >
                  {tool.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-black text-[#e0e4f0] mb-1">
                    {tool.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-[#6a7090]">{tool.company}</span>
                    <span
                      className="text-[0.65rem] px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: tool.accentColor + '15',
                        color: tool.accentColor,
                        border: `1px solid ${tool.accentColor}30`,
                      }}
                    >
                      {TOOL_CATEGORY_LABELS[tool.category]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={`text-sm ${star <= Math.round(tool.rating) ? 'star-filled' : 'star-empty'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm font-bold text-[#fbbf24] ml-1">{tool.rating}</span>
                  </div>
                  <p className="text-sm text-[#8890a8] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.features.map(feature => (
                  <span
                    key={feature}
                    className="text-[0.65rem] px-2 py-0.5 rounded bg-[#1a1a2e] text-[#8890a8] border border-[#252540]"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Info Row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#6a7090]">
                <span>料金: {tool.pricing}</span>
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-[#00ff88] hover:underline"
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
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-md text-xs font-bold transition-all"
                      style={{
                        backgroundColor: tool.accentColor + '20',
                        color: tool.accentColor,
                        border: `1px solid ${tool.accentColor}40`,
                      }}
                    >
                      {aff.label}
                      {aff.badge && (
                        <span className="text-[0.6rem] bg-[#00ff8820] text-[#00ff88] px-1.5 py-0.5 rounded-full ml-1">
                          {aff.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Articles */}
            <h2 className="text-lg font-bold text-[#e0e4f0] mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#00ff88] rounded-full" />
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
