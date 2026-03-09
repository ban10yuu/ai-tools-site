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
    <Link href={`/article/${article.slug}/`} className="cyber-panel block p-4 group">
      <div className="flex items-center gap-2 mb-2">
        <span className={`category-pill ${ARTICLE_CATEGORY_COLORS[article.category]}`}>
          {ARTICLE_CATEGORY_LABELS[article.category]}
        </span>
        {showTool && tool && (
          <span className="text-xs text-[#6a7090]">{tool.name}</span>
        )}
      </div>

      <h3 className="text-sm font-bold text-[#e0e4f0] mb-2 group-hover:text-[#00ff88] transition-colors leading-snug line-clamp-2">
        {article.title}
      </h3>

      <p className="text-xs text-[#6a7090] line-clamp-2 leading-relaxed mb-3">
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {article.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[0.65rem] text-[#4a5070] bg-[#1a1a2e] px-1.5 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <time className="text-[0.65rem] text-[#4a5070]">{article.publishedAt}</time>
      </div>
    </Link>
  );
}
