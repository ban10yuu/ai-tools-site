export type ArticleCategory = 'review' | 'comparison' | 'tips' | 'usecase' | 'news';

export type ToolCategory = 'chatbot' | 'image' | 'video' | 'coding' | 'writing' | 'business';

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  toolSlug: string;
  category: ArticleCategory;
  excerpt: string;
  sections: ArticleSection[];
  tags: string[];
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  relatedSlugs?: string[];
}

export interface ToolInfo {
  slug: string;
  name: string;
  nameJa: string;
  company: string;
  category: ToolCategory;
  description: string;
  officialUrl: string;
  pricing: string;
  rating: number; // 1-5
  accentColor: string;
  features: string[];
}

export interface AffiliateLink {
  service: string;
  label: string;
  url: string;
  badge?: string;
  price?: string;
}

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  review: '徹底レビュー',
  comparison: '比較・検証',
  tips: '活用テクニック',
  usecase: '活用事例',
  news: '最新ニュース',
};

export const ARTICLE_CATEGORY_COLORS: Record<ArticleCategory, string> = {
  review: 'bg-emerald-900/50 text-emerald-300 border-emerald-500/30',
  comparison: 'bg-purple-900/50 text-purple-300 border-purple-500/30',
  tips: 'bg-cyan-900/50 text-cyan-300 border-cyan-500/30',
  usecase: 'bg-amber-900/50 text-amber-300 border-amber-500/30',
  news: 'bg-rose-900/50 text-rose-300 border-rose-500/30',
};

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  chatbot: 'AIチャット',
  image: '画像生成',
  video: '動画・音声',
  coding: 'コーディング',
  writing: 'ライティング',
  business: 'ビジネス',
};

export const TOOL_CATEGORY_COLORS: Record<ToolCategory, string> = {
  chatbot: '#00ff88',
  image: '#ff6b9d',
  video: '#00d4ff',
  coding: '#7c3aed',
  writing: '#fbbf24',
  business: '#f97316',
};
