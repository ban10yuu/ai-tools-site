import Link from 'next/link';
import { tools } from '@/data/tools';
import { generalAffiliates } from '@/data/affiliates';

export default function Sidebar() {
  const topTools = tools.slice(0, 10);

  return (
    <aside className="space-y-6">
      {/* Tool Ranking */}
      <div className="cyber-panel p-4">
        <h2 className="text-sm font-bold text-[#e0e4f0] mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#00ff88] rounded-full" />
          AIツールランキング
        </h2>
        <ul className="space-y-2">
          {topTools.map((tool, i) => (
            <li key={tool.slug}>
              <Link
                href={`/tool/${tool.slug}/`}
                className="flex items-center gap-2.5 py-1.5 group"
              >
                <span className={`rank-badge ${i < 1 ? 'rank-1' : i < 2 ? 'rank-2' : i < 3 ? 'rank-3' : 'rank-other'}`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-[#c8cce0] group-hover:text-[#00ff88] transition-colors">
                    {tool.name}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={`text-[0.5rem] ${star <= Math.round(tool.rating) ? 'star-filled' : 'star-empty'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-[0.6rem] text-[#6a7090] ml-0.5">{tool.rating}</span>
                  </div>
                </div>
                <span className="text-[0.6rem] text-[#4a5070]">{tool.company}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Affiliate Widget */}
      <div className="cyber-panel p-4">
        <h2 className="text-sm font-bold text-[#e0e4f0] mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#7c3aed] rounded-full" />
          おすすめAIツール
        </h2>
        <ul className="space-y-2">
          {generalAffiliates.slice(0, 5).map(aff => (
            <li key={aff.service}>
              <a
                href={aff.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-between py-1.5 group"
              >
                <div>
                  <span className="text-xs font-medium text-[#c8cce0] group-hover:text-[#00ff88] transition-colors">
                    {aff.label}
                  </span>
                  {aff.badge && (
                    <span className="ml-1.5 text-[0.6rem] text-[#00ff88] bg-[#00ff8815] px-1.5 py-0.5 rounded-full">
                      {aff.badge}
                    </span>
                  )}
                </div>
                <span className="text-[0.65rem] text-[#6a7090]">{aff.price}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
