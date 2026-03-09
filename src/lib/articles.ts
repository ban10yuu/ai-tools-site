import { Article, ArticleCategory, ToolCategory } from './types';
import { tools } from '@/data/tools';

import { articles as chatgptArticles } from '@/data/articles/chatgpt';
import { articles as claudeArticles } from '@/data/articles/claude';
import { articles as geminiArticles } from '@/data/articles/gemini';
import { articles as midjourneyArticles } from '@/data/articles/midjourney';
import { articles as stableDiffusionArticles } from '@/data/articles/stable-diffusion';
import { articles as dallE3Articles } from '@/data/articles/dall-e-3';
import { articles as githubCopilotArticles } from '@/data/articles/github-copilot';
import { articles as cursorArticles } from '@/data/articles/cursor';
import { articles as notionAiArticles } from '@/data/articles/notion-ai';
import { articles as canvaAiArticles } from '@/data/articles/canva-ai';
import { articles as runwayMlArticles } from '@/data/articles/runway-ml';
import { articles as elevenlabsArticles } from '@/data/articles/elevenlabs';
import { articles as difyArticles } from '@/data/articles/dify';
import { articles as perplexityArticles } from '@/data/articles/perplexity';
import { articles as adobeFireflyArticles } from '@/data/articles/adobe-firefly';
import { articles as sunoAiArticles } from '@/data/articles/suno-ai';
import { articles as klingAiArticles } from '@/data/articles/kling-ai';
import { articles as deeplArticles } from '@/data/articles/deepl';
import { articles as gammaAiArticles } from '@/data/articles/gamma-ai';
import { articles as v0VercelArticles } from '@/data/articles/v0-vercel';

const allArticles: Article[] = [
  ...chatgptArticles,
  ...claudeArticles,
  ...geminiArticles,
  ...midjourneyArticles,
  ...stableDiffusionArticles,
  ...dallE3Articles,
  ...githubCopilotArticles,
  ...cursorArticles,
  ...notionAiArticles,
  ...canvaAiArticles,
  ...runwayMlArticles,
  ...elevenlabsArticles,
  ...difyArticles,
  ...perplexityArticles,
  ...adobeFireflyArticles,
  ...sunoAiArticles,
  ...klingAiArticles,
  ...deeplArticles,
  ...gammaAiArticles,
  ...v0VercelArticles,
];

export function getAllArticles(): Article[] {
  return allArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug);
}

export function getArticlesByTool(toolSlug: string): Article[] {
  return allArticles
    .filter(a => a.toolSlug === toolSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return allArticles
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticlesByToolCategory(toolCategory: ToolCategory): Article[] {
  const toolSlugs = tools.filter(t => t.category === toolCategory).map(t => t.slug);
  return allArticles
    .filter(a => toolSlugs.includes(a.toolSlug))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRelatedArticles(article: Article, limit = 5): Article[] {
  const sameTool = allArticles.filter(
    a => a.toolSlug === article.toolSlug && a.slug !== article.slug
  );
  const sameCategory = allArticles.filter(
    a =>
      a.category === article.category &&
      a.toolSlug !== article.toolSlug &&
      a.slug !== article.slug
  );
  const related = [...sameTool, ...sameCategory];
  return related.slice(0, limit);
}

export function getPopularArticles(limit = 10): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getAllSlugs(): string[] {
  return allArticles.map(a => a.slug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return allArticles.filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
  );
}
