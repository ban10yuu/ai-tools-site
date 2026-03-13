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
    <article className="bg-[#12121e] border border-[#252540] rounded p-4 hover:border-[#353560] transition-colors group">
      <Link href={`/article/${article.slug}/`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`category-pill ${ARTICLE_CATEGORY_COLORS[article.category]}`}>
            {ARTICLE_CATEGORY_LABELS[article.category]}
          </span>
          {showTool && tool && (
            <span className="text-xs text-[#6a7090]">{tool.name}</span>
          )}
        </div>

        <h3 className="text-sm font-bold text-[#e0e4f0] mb-2 group-hover:text-[#c8b0ff] transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>

        <p className="text-xs text-[#6a7090] line-clamp-2 leading-relaxed mb-3">
          {article.excerpt}
        </p>
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {article.tags.slice(0, 2).map(tag => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}/`}
              className="text-[0.65rem] text-[#4a5070] bg-[#1a1a2e] px-1.5 py-0.5 rounded hover:text-[#8890a8] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <time className="text-[0.65rem] text-[#4a5070]">{article.publishedAt}</time>
      </div>
    </article>
  );
}
