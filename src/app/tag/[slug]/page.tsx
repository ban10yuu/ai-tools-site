import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getArticlesByTag } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd, TagPageJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://ai-tools-site-dusky.vercel.app';

export function generateStaticParams() {
  return getAllTags().map(tag => ({ slug: tag }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const articles = getArticlesByTag(tag);
  if (articles.length === 0) return {};

  return {
    title: `「${tag}」に関するAIツール記事一覧`,
    description: `「${tag}」に関するAIツールのレビュー・比較・活用テクニック記事${articles.length}件。最新のAIツール情報をお届けします。`,
    keywords: [tag, 'AIツール', 'AI レビュー', 'AI 比較', `${tag} 使い方`, `${tag} レビュー`],
    alternates: {
      canonical: `${BASE_URL}/tag/${encodeURIComponent(tag)}/`,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const articles = getArticlesByTag(tag);
  if (articles.length === 0) notFound();

  const breadcrumbs = [
    { name: 'TOP', url: `${BASE_URL}/` },
    { name: 'タグ一覧', url: `${BASE_URL}/tags/` },
    { name: `#${tag}`, url: `${BASE_URL}/tag/${encodeURIComponent(tag)}/` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <TagPageJsonLd tag={tag} articleCount={articles.length} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="text-xs text-[#6a7090] mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#00ff88] transition-colors">TOP</Link>
              <span>/</span>
              <Link href="/tags/" className="hover:text-[#00ff88] transition-colors">タグ一覧</Link>
              <span>/</span>
              <span className="text-[#4a5070]">#{tag}</span>
            </nav>

            {/* Tag Header */}
            <div className="cyber-panel p-6 mb-6">
              <h1 className="text-xl md:text-2xl font-black text-[#e0e4f0] mb-2 flex items-center gap-3">
                <span className="text-[#00ff88]">#</span>
                {tag}
              </h1>
              <p className="text-sm text-[#8890a8]">
                「{tag}」に関するAIツールのレビュー・比較・活用記事{articles.length}件を掲載中。
              </p>
            </div>

            {/* Articles */}
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
