import { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = 'https://ai-tools-site-dusky.vercel.app';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'AI Tools Labへのお問い合わせページ。記事内容の修正、ご意見・ご感想、広告掲載のご相談など、お気軽にご連絡ください。',
  alternates: { canonical: `${BASE_URL}/contact/` },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      <nav className="text-xs text-[#6a7090] mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#00ff88] transition-colors">TOP</Link>
        <span>/</span>
        <span className="text-[#4a5070]">お問い合わせ</span>
      </nav>

      <h1 className="text-xl md:text-2xl font-black text-[#e0e4f0] mb-8">
        お問い合わせ
      </h1>

      <div className="cyber-panel p-6 md:p-8 space-y-6 text-[0.9375rem] leading-relaxed text-[#b0b8d0]">
        <p>
          AI Tools Labをご利用いただきありがとうございます。
          記事内容に関するご質問・ご指摘、ご意見・ご感想、広告掲載のご相談など、
          お気軽に下記メールアドレスまでご連絡ください。
        </p>

        <div className="bg-[#1a1a2e] border border-[#252540] rounded-lg p-6">
          <h2 className="text-lg font-bold text-[#e0e4f0] mb-4 border-l-3 border-[#7c3aed] pl-3">
            メールアドレス
          </h2>
          <p className="mb-2">
            <a
              href="mailto:ban10yuu@icloud.com"
              className="text-[#00ff88] hover:underline font-mono text-base"
            >
              ban10yuu@icloud.com
            </a>
          </p>
          <p className="text-sm text-[#6a7090]">
            通常3〜5営業日以内にご返信いたします。
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#e0e4f0] mb-3 border-l-3 border-[#00ff88] pl-3">
            お問い合わせの際のお願い
          </h2>
          <ul className="list-disc list-inside space-y-2 text-[#b0b8d0]">
            <li>記事内容の修正をご依頼の場合は、該当記事のURLと具体的な修正箇所をお知らせください。</li>
            <li>著作権に関するお問い合わせは、権利者であることを証明する情報と対象コンテンツをお示しください。</li>
            <li>広告掲載・ビジネスに関するご相談は、会社名とご提案内容をお書き添えください。</li>
            <li>ゲスト記事の寄稿や相互リンクのご依頼はお受けしておりません。</li>
          </ul>
        </div>

        <p className="text-sm text-[#6a7090] pt-4 border-t border-[#252540]">
          お送りいただいた個人情報は、
          <Link href="/privacy/" className="text-[#00ff88] hover:underline">
            プライバシーポリシー
          </Link>
          に基づき適切に管理いたします。
        </p>
      </div>
    </div>
  );
}
