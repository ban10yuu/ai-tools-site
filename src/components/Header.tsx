import Link from 'next/link';
import { TOOL_CATEGORY_LABELS } from '@/lib/types';

export default function Header() {
  const categories = Object.entries(TOOL_CATEGORY_LABELS);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-sm font-extrabold shadow-sm shadow-emerald-500/30 group-hover:bg-emerald-600 transition-colors">
              AI
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Tools Lab
              <span className="ml-2 hidden sm:inline text-[0.65rem] font-semibold text-slate-400 tracking-wide align-middle">
                AIツールラボ
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {categories.map(([key, label]) => (
              <Link
                key={key}
                href={`/category/${key}/`}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-full"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/tags/"
              className="ml-1 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors rounded-full"
            >
              タグ
            </Link>
          </nav>
        </div>

        {/* Mobile category nav */}
        <nav className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-2.5 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className="flex-shrink-0 px-3 py-1 text-[0.7rem] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/tags/"
            className="flex-shrink-0 px-3 py-1 text-[0.7rem] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full"
          >
            タグ
          </Link>
        </nav>
      </div>
    </header>
  );
}
