import Link from 'next/link';
import { TOOL_CATEGORY_LABELS } from '@/lib/types';

export default function Header() {
  const categories = Object.entries(TOOL_CATEGORY_LABELS);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a14]/90 backdrop-blur-md border-b border-[#252540]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight">
              <span className="text-[#00ff88] neon-glow">AI</span>
              <span className="text-white"> Tools </span>
              <span className="text-[#7c3aed] neon-glow-purple">Lab</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {categories.map(([key, label]) => (
              <Link
                key={key}
                href={`/category/${key}/`}
                className="px-3 py-1.5 text-xs font-medium text-[#8890a8] hover:text-[#00ff88] transition-colors rounded-md hover:bg-[#00ff8810]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/tags/"
              className="px-3 py-1.5 text-xs font-medium text-[#6a7090] hover:text-[#00ff88] transition-colors rounded-md hover:bg-[#00ff8810]"
            >
              タグ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
