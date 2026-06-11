import { Metadata } from 'next';
import Link from 'next/link';
import { getTagsWithCount } from '@/lib/articles';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://ai-tools-site-dusky.vercel.app';

export const metadata: Metadata = {
  title: 'タグ一覧｜AIツールのキーワード検索',
  description:
    'AI Tools Labの全タグ一覧。ChatGPT、Claude、Midjourney、画像生成、コーディング等のキーワードからAIツールのレビュー・比較記事を探せます。',
  keywords: ['AIツール タグ', 'AI キーワード', 'AIツール 検索', 'AI レビュー カテゴリ'],
  alternates: {
    canonical: `${BASE_URL}/tags/`,
  },
};

export default function TagsPage() {
  const tagsWithCount = getTagsWithCount();
  const maxCount = tagsWithCount.length > 0 ? tagsWithCount[0].count : 1;

  const breadcrumbs = [
    { name: 'TOP', url: `${BASE_URL}/` },
    { name: 'タグ一覧', url: `${BASE_URL}/tags/` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-emerald-600 transition-colors">TOP</Link>
              <span>/</span>
              <span className="text-slate-400">タグ一覧</span>
            </nav>

            {/* Header */}
            <div className="surface-card p-6 mb-6">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
                タグ一覧
              </h1>
              <p className="text-sm text-slate-500">
                AIツールに関する全{tagsWithCount.length}タグ。気になるキーワードをクリックして関連記事を読めます。
              </p>
            </div>

            {/* Tag Cloud */}
            <div className="surface-card p-6">
              <div className="flex flex-wrap gap-2">
                {tagsWithCount.map(({ tag, count }) => {
                  const ratio = count / maxCount;
                  const size = ratio > 0.7 ? 'text-base' : ratio > 0.4 ? 'text-sm' : 'text-xs';
                  const opacity = ratio > 0.7 ? 'text-emerald-600' : ratio > 0.4 ? 'text-slate-700' : 'text-slate-500';

                  return (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}/`}
                      className={`${size} ${opacity} bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 px-3 py-1.5 rounded-full border border-slate-200 hover:border-emerald-200 transition-all`}
                    >
                      #{tag}
                      <span className="text-[0.6rem] text-slate-400 ml-1">({count})</span>
                    </Link>
                  );
                })}
              </div>
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
