import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { getToolBySlug } from '@/data/tools';
import { ARTICLE_CATEGORY_LABELS, ARTICLE_CATEGORY_COLORS } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import AffiliateWidget from '@/components/AffiliateWidget';
import Sidebar from '@/components/Sidebar';

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
    },
    alternates: {
      canonical: `https://ai-tools-lab.vercel.app/article/${slug}/`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const tool = getToolBySlug(article.toolSlug);
  const relatedArticles = getRelatedArticles(article, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'AI Tools Lab',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Tools Lab',
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
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="text-xs text-[#6a7090] mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#00ff88] transition-colors">TOP</Link>
              <span>/</span>
              {tool && (
                <>
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

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {article.tags.map(tag => (
                  <span key={tag} className="text-[0.65rem] text-[#4a5070] bg-[#1a1a2e] px-2 py-0.5 rounded">
                    #{tag}
                  </span>
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
                </section>
              ))}
            </div>

            {/* Bottom Affiliate */}
            <AffiliateWidget toolSlug={article.toolSlug} />

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
