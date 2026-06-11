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
  review: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  comparison: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  tips: 'bg-sky-50 text-sky-700 border-sky-200',
  usecase: 'bg-amber-50 text-amber-700 border-amber-200',
  news: 'bg-rose-50 text-rose-700 border-rose-200',
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
  chatbot: '#10b981',
  image: '#ec4899',
  video: '#0ea5e9',
  coding: '#6366f1',
  writing: '#f59e0b',
  business: '#f97316',
};
