import { MetadataRoute } from 'next';
import { getAllArticles, getAllTags } from '@/lib/articles';
import { tools } from '@/data/tools';
import { TOOL_CATEGORY_LABELS, ToolCategory } from '@/lib/types';

export const dynamic = 'force-static';

const BASE_URL = 'https://ai-tools-site-ten.vercel.app';
const TODAY = new Date().toISOString().slice(0, 10);

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const categories = Object.keys(TOOL_CATEGORY_LABELS) as ToolCategory[];
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: TODAY,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tags/`,
      lastModified: TODAY,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map(t => ({
    url: `${BASE_URL}/tool/${t.slug}/`,
    lastModified: TODAY,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${BASE_URL}/category/${cat}/`,
    lastModified: TODAY,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE_URL}/article/${a.slug}/`,
    lastModified: a.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map(tag => ({
    url: `${BASE_URL}/tag/${encodeURIComponent(tag)}/`,
    lastModified: TODAY,
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...articlePages, ...tagPages];
}
