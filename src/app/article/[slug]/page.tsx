import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles, getArticlesByTool } from '@/lib/articles';
import { getToolBySlug } from '@/data/tools';
import { ARTICLE_CATEGORY_LABELS, ARTICLE_CATEGORY_COLORS, TOOL_CATEGORY_LABELS } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import AffiliateWidget from '@/components/AffiliateWidget';
import AdBanner from '@/components/AdBanner';
import Sidebar from '@/components/Sidebar';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd, buildFaqFromSections } from '@/components/JsonLd';
import AuthorBox from '@/components/AuthorBox';

const BASE_URL = 'https://ai-tools-site-dusky.vercel.app';

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const tool = getToolBySlug(article.toolSlug);
  const toolName = tool?.name || '';
  const categoryLabel = tool ? TOOL_CATEGORY_LABELS[tool.category] : '';

  const description = article.metaDescription
    || `${toolName}の${ARTICLE_CATEGORY_LABELS[article.category]}。${article.excerpt}`;

  return {
    title: article.metaTitle || article.title,
    description,
    keywords: [
      ...article.tags,
      ...(toolName ? [`${toolName} レビュー`, `${toolName} 使い方`, `${toolName} 料金`] : []),
      ...(categoryLabel ? [categoryLabel, `${categoryLabel} AI`] : []),
      'AIツール',
    ],
    openGraph: {
      title: article.metaTitle || article.title,
      description,
      type: 'article',
      publishedTime: article.publishedAt,
      section: categoryLabel,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/article/${slug}/`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const tool = getToolBySlug(article.toolSlug);
  const relatedArticles = getRelatedArticles(article, 4);

  // Recommended articles from same tool (different from related)
  const sameToolArticles = getArticlesByTool(article.toolSlug)
    .filter(a => a.slug !== article.slug && !relatedArticles.some(r => r.slug === a.slug))
    .slice(0, 2);

  // Build breadcrumbs
  const breadcrumbItems = [
    { name: 'TOP', url: `${BASE_URL}/` },
    ...(tool ? [
      { name: TOOL_CATEGORY_LABELS[tool.category], url: `${BASE_URL}/category/${tool.category}/` },
      { name: tool.name, url: `${BASE_URL}/tool/${tool.slug}/` },
    ] : []),
    { name: article.title, url: `${BASE_URL}/article/${article.slug}/` },
  ];

  // Build FAQ from sections
  const faqItems = buildFaqFromSections(article.sections);

  return (
    <>
      <ArticleJsonLd article={article} toolName={tool?.name} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {faqItems.length > 0 && <FaqJsonLd questions={faqItems} />}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="text-xs text-[#6a7090] mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#00ff88] transition-colors">TOP</Link>
              <span>/</span>
              {tool && (
                <>
                  <Link href={`/category/${tool.category}/`} className="hover:text-[#00ff88] transition-colors">
                    {TOOL_CATEGORY_LABELS[tool.category]}
                  </Link>
                  <span>/</span>
                  <Link href={`/tool/${tool.slug}/`} className="hover:text-[#00ff88] transition-colors">
                    {tool.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-[#4a5070] truncate">{article.title}</span>
            </nav>

            {/* Header */}
            <div className="cyber-panel p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`category-pill ${ARTICLE_CATEGORY_COLORS[article.category]}`}>
                  {ARTICLE_CATEGORY_LABELS[article.category]}
                </span>
                {tool && (
                  <Link href={`/tool/${tool.slug}/`} className="text-xs text-[#6a7090] hover:text-[#00ff88]">
                    {tool.name}
                  </Link>
                )}
                <time className="text-xs text-[#4a5070] ml-auto">{article.publishedAt}</time>
              </div>

              <h1 className="text-xl md:text-2xl font-black text-[#e0e4f0] leading-tight mb-3">
                {article.title}
              </h1>

              <p className="text-sm text-[#8890a8] leading-relaxed">
                {article.excerpt}
              </p>

              {/* Tags - now clickable links */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}/`}
                    className="text-[0.65rem] text-[#4a5070] bg-[#1a1a2e] px-2 py-0.5 rounded hover:text-[#00ff88] hover:bg-[#00ff8810] transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* TOC */}
            <div className="cyber-panel p-4 mb-6">
              <h2 className="text-xs font-bold text-[#c8cce0] mb-2 flex items-center gap-2">
                <span className="w-1 h-3 bg-[#00d4ff] rounded-full" />
                目次
              </h2>
              <ol className="space-y-1">
                {article.sections.map((section, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className="text-xs text-[#6a7090] hover:text-[#00ff88] transition-colors flex items-center gap-2 py-0.5"
                    >
                      <span className="text-[0.6rem] text-[#4a5070] font-mono w-4">{i + 1}.</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Ad after TOC */}
            <AdBanner />

            {/* Content */}
            <div className="article-content">
              {article.sections.map((section, i) => (
                <section key={i} id={`section-${i}`}>
                  <h2>{section.heading}</h2>
                  {section.content.split('\n\n').map((paragraph, j) => (
                    <p key={j} dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />')
                    }} />
                  ))}
                  {i === 1 && <AffiliateWidget toolSlug={article.toolSlug} />}
                  {i === 2 && <AdBanner />}
                </section>
              ))}
            </div>

            {/* Bottom Affiliate */}
            <AffiliateWidget toolSlug={article.toolSlug} />

            {/* Author Box */}
            <AuthorBox />

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-lg font-bold text-[#e0e4f0] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#00ff88] rounded-full" />
                  関連記事
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommended (same tool, not in related) */}
            {sameToolArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-[#e0e4f0] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#7c3aed] rounded-full" />
                  {tool?.name}のその他の記事
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sameToolArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {/* Category Navigation */}
            {tool && (
              <div className="mt-8 cyber-panel p-4">
                <h3 className="text-sm font-bold text-[#c8cce0] mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#00d4ff] rounded-full" />
                  カテゴリから探す
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/category/${tool.category}/`}
                    className="text-xs text-[#00ff88] bg-[#00ff8810] px-3 py-1.5 rounded-full border border-[#00ff8830] hover:bg-[#00ff8820] transition-colors"
                  >
                    {TOOL_CATEGORY_LABELS[tool.category]}の記事をもっと見る
                  </Link>
                  <Link
                    href={`/tool/${tool.slug}/`}
                    className="text-xs text-[#7c3aed] bg-[#7c3aed10] px-3 py-1.5 rounded-full border border-[#7c3aed30] hover:bg-[#7c3aed20] transition-colors"
                  >
                    {tool.name}の全記事を見る
                  </Link>
                  <Link
                    href="/tags/"
                    className="text-xs text-[#8890a8] bg-[#1a1a2e] px-3 py-1.5 rounded-full border border-[#252540] hover:text-[#00ff88] transition-colors"
                  >
                    タグ一覧
                  </Link>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
