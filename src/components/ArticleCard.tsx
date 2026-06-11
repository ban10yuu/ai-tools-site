import Link from 'next/link';
import { Article, ARTICLE_CATEGORY_LABELS, ARTICLE_CATEGORY_COLORS } from '@/lib/types';
import { getToolBySlug } from '@/data/tools';

interface ArticleCardProps {
  article: Article;
  showTool?: boolean;
}

export default function ArticleCard({ article, showTool = true }: ArticleCardProps) {
  const tool = getToolBySlug(article.toolSlug);

  return (
    <article className="surface-card p-5 group">
      <Link href={`/article/${article.slug}/`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`category-pill ${ARTICLE_CATEGORY_COLORS[article.category]}`}>
            {ARTICLE_CATEGORY_LABELS[article.category]}
          </span>
          {showTool && tool && (
            <span className="text-xs text-slate-500">{tool.name}</span>
          )}
        </div>

        <h3 className="text-[0.9375rem] font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {article.excerpt}
        </p>
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {article.tags.slice(0, 2).map(tag => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}/`}
              className="text-[0.65rem] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <time className="text-[0.65rem] text-slate-400">{article.publishedAt}</time>
      </div>
    </article>
  );
}
