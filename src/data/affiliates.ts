import { AffiliateLink } from '@/lib/types';

export const toolAffiliates: Record<string, AffiliateLink[]> = {
  chatgpt: [
    { service: 'openai', label: 'ChatGPT Plus に登録', url: 'https://chat.openai.com', badge: '人気No.1', price: '$20/月' },
  ],
  claude: [
    { service: 'anthropic', label: 'Claude Pro に登録', url: 'https://claude.ai', badge: '高評価', price: '$20/月' },
  ],
  gemini: [
    { service: 'google', label: 'Gemini Advanced に登録', url: 'https://gemini.google.com', price: '$20/月' },
  ],
  midjourney: [
    { service: 'midjourney', label: 'Midjourney に登録', url: 'https://midjourney.com', badge: 'クリエイター人気', price: '$10/月〜' },
  ],
  'stable-diffusion': [
    { service: 'stability', label: 'Stability AI 公式サイト', url: 'https://stability.ai', price: '無料〜' },
  ],
  'dall-e-3': [
    { service: 'openai', label: 'ChatGPT Plus で利用', url: 'https://chat.openai.com', price: '$20/月' },
  ],
  'github-copilot': [
    { service: 'github', label: 'GitHub Copilot に登録', url: 'https://github.com/features/copilot', badge: '開発者必須', price: '$10/月' },
  ],
  cursor: [
    { service: 'cursor', label: 'Cursor Pro に登録', url: 'https://cursor.com', badge: '急成長', price: '$20/月' },
  ],
  'notion-ai': [
    { service: 'notion', label: 'Notion AI を始める', url: 'https://notion.so', price: '$10/月〜' },
  ],
  'canva-ai': [
    { service: 'canva', label: 'Canva Pro に登録', url: 'https://canva.com', badge: 'デザイン定番', price: '1,000円/月〜' },
  ],
  'runway-ml': [
    { service: 'runway', label: 'Runway に登録', url: 'https://runwayml.com', price: '$12/月〜' },
  ],
  elevenlabs: [
    { service: 'elevenlabs', label: 'ElevenLabs に登録', url: 'https://elevenlabs.io', price: '$5/月〜' },
  ],
  dify: [
    { service: 'dify', label: 'Dify を始める', url: 'https://dify.ai', price: '無料〜' },
  ],
  perplexity: [
    { service: 'perplexity', label: 'Perplexity Pro に登録', url: 'https://perplexity.ai', price: '$20/月' },
  ],
  'adobe-firefly': [
    { service: 'adobe', label: 'Adobe Creative Cloud', url: 'https://adobe.com', badge: 'プロ向け', price: '月額制' },
  ],
  'suno-ai': [
    { service: 'suno', label: 'Suno AI に登録', url: 'https://suno.com', price: '$10/月〜' },
  ],
  'kling-ai': [
    { service: 'kling', label: 'Kling AI に登録', url: 'https://klingai.com', price: '$5.99/月〜' },
  ],
  deepl: [
    { service: 'deepl', label: 'DeepL Pro に登録', url: 'https://deepl.com/pro', badge: '翻訳最高精度', price: '750円/月〜' },
  ],
  'gamma-ai': [
    { service: 'gamma', label: 'Gamma AI を始める', url: 'https://gamma.app', price: '$10/月〜' },
  ],
  'v0-vercel': [
    { service: 'vercel', label: 'v0 を始める', url: 'https://v0.dev', price: '無料〜' },
  ],
};

export const generalAffiliates: AffiliateLink[] = [
  { service: 'openai', label: 'ChatGPT Plus', url: 'https://chat.openai.com', badge: '人気No.1', price: '$20/月' },
  { service: 'anthropic', label: 'Claude Pro', url: 'https://claude.ai', badge: '高評価', price: '$20/月' },
  { service: 'midjourney', label: 'Midjourney', url: 'https://midjourney.com', price: '$10/月〜' },
  { service: 'cursor', label: 'Cursor Pro', url: 'https://cursor.com', price: '$20/月' },
  { service: 'notion', label: 'Notion AI', url: 'https://notion.so', price: '$10/月〜' },
  { service: 'canva', label: 'Canva Pro', url: 'https://canva.com', price: '1,000円/月〜' },
  { service: 'adobe', label: 'Adobe Creative Cloud', url: 'https://adobe.com', price: '月額制' },
  { service: 'github', label: 'GitHub Copilot', url: 'https://github.com/features/copilot', price: '$10/月' },
];
