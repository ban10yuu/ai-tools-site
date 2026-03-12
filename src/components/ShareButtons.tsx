'use client';

import { useState } from 'react';

type Props = {
  title?: string;
};

export default function ShareButtons({ title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = title || document.title;

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cyber-panel p-4 my-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-bold text-[#8890a8] tracking-wider">共有:</span>

        {/* X (Twitter) */}
        <button
          onClick={() => handleShare('twitter')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]"
          style={{ backgroundColor: '#000', border: '1px solid #333' }}
          aria-label="Xで共有"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(24,119,242,0.4)]"
          style={{ backgroundColor: '#1877f2' }}
          aria-label="Facebookで共有"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.044 1.592.131v3.294a7.7 7.7 0 0 0-1.013-.044c-1.436 0-1.992.543-1.992 1.958v2.219h2.836l-.487 3.667h-2.35v8.152C18.396 22.932 22 18.9 22 14c0-5.523-4.477-10-10-10S2 8.477 2 14c0 4.41 2.862 8.15 6.831 9.468a9 9 0 0 0 .27.223z" />
          </svg>
        </button>

        {/* LINE */}
        <button
          onClick={() => handleShare('line')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(6,199,85,0.4)]"
          style={{ backgroundColor: '#06c755' }}
          aria-label="LINEで共有"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596a.625.625 0 0 1-.209.035.618.618 0 0 1-.509-.263l-2.391-3.254v2.886c0 .345-.282.629-.631.629-.345 0-.627-.284-.627-.629V8.108c0-.271.172-.509.43-.595a.64.64 0 0 1 .722.228l2.388 3.254V8.108c0-.345.282-.63.63-.63.346 0 .63.285.63.63v4.771zm-5.741 0c0 .345-.282.629-.631.629-.345 0-.627-.284-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.284-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.079l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
        </button>

        {/* Link Copy */}
        <button
          onClick={handleCopy}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(0,212,255,0.4)]"
          style={{ backgroundColor: '#1a1a2e', border: '1px solid #00d4ff50' }}
          aria-label="リンクをコピー"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>

        {copied && (
          <span className="text-xs text-[#00ff88] animate-pulse">コピーしました!</span>
        )}
      </div>
    </div>
  );
}
