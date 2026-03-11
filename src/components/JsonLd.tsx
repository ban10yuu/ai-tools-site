import { Article, ToolInfo, TOOL_CATEGORY_LABELS } from '@/lib/types';

const BASE_URL = 'https://ai-tools-site-ten.vercel.app';
const SITE_NAME = 'AI Tools Lab';
const PUBLISHER = {
  '@type': 'Organization' as const,
  name: SITE_NAME,
  url: BASE_URL,
};

// --- Article JSON-LD ---
export function ArticleJsonLd({ article, toolName }: { article: Article; toolName?: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: PUBLISHER,
    publisher: PUBLISHER,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/article/${article.slug}/`,
    },
    keywords: article.tags.join(', '),
    ...(toolName && { about: { '@type': 'SoftwareApplication', name: toolName } }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Breadcrumb JSON-LD ---
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- FAQ JSON-LD (from article sections) ---
export function FaqJsonLd({ questions }: { questions: { question: string; answer: string }[] }) {
  if (questions.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Build FAQ from article sections ---
export function buildFaqFromSections(
  sections: { heading: string; content: string }[]
): { question: string; answer: string }[] {
  return sections
    .filter(s => {
      const h = s.heading;
      // Convert headings to Q&A style for FAQ schema
      return (
        h.includes('とは') ||
        h.includes('比較') ||
        h.includes('違い') ||
        h.includes('おすすめ') ||
        h.includes('選び方') ||
        h.includes('使い方') ||
        h.includes('料金') ||
        h.includes('メリット') ||
        h.includes('デメリット') ||
        h.includes('注意') ||
        h.includes('まとめ') ||
        h.includes('？') ||
        h.includes('?')
      );
    })
    .slice(0, 5)
    .map(s => {
      const heading = s.heading;
      // If the heading is already a question, use as-is; otherwise convert to question form
      const question = heading.includes('？') || heading.includes('?')
        ? heading
        : `${heading}について教えてください`;
      // Use first 300 chars of content as answer
      const answer = s.content
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\n/g, ' ')
        .slice(0, 300);
      return { question, answer };
    });
}

// --- Tool Page (CollectionPage) JSON-LD ---
export function ToolPageJsonLd({ tool, articleCount }: { tool: ToolInfo; articleCount: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tool.name}のレビュー・使い方・比較`,
    description: tool.description,
    url: `${BASE_URL}/tool/${tool.slug}/`,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: 'AI Tool',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: tool.pricing,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tool.rating,
        bestRating: 5,
        worstRating: 1,
        ratingCount: Math.floor(tool.rating * 100),
      },
      featureList: tool.features.join(', '),
      author: { '@type': 'Organization', name: tool.company },
    },
    numberOfItems: articleCount,
    publisher: PUBLISHER,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Category Page JSON-LD ---
export function CategoryPageJsonLd({
  categoryLabel,
  categorySlug,
  articleCount,
  toolCount,
}: {
  categoryLabel: string;
  categorySlug: string;
  articleCount: number;
  toolCount: number;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryLabel}AIツールのレビュー・比較・活用法`,
    description: `${categoryLabel}カテゴリのAIツール${toolCount}件を徹底レビュー・比較。${articleCount}件の記事を掲載中。`,
    url: `${BASE_URL}/category/${categorySlug}/`,
    publisher: PUBLISHER,
    numberOfItems: articleCount,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Tag Page JSON-LD ---
export function TagPageJsonLd({
  tag,
  articleCount,
}: {
  tag: string;
  articleCount: number;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `「${tag}」のAIツール記事一覧`,
    description: `「${tag}」に関するAIツールのレビュー・比較・活用記事${articleCount}件。`,
    url: `${BASE_URL}/tag/${encodeURIComponent(tag)}/`,
    publisher: PUBLISHER,
    numberOfItems: articleCount,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
