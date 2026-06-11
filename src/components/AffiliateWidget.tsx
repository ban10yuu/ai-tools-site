import { toolAffiliates } from '@/data/affiliates';
import { getToolBySlug } from '@/data/tools';

interface AffiliateWidgetProps {
  toolSlug: string;
}

export default function AffiliateWidget({ toolSlug }: AffiliateWidgetProps) {
  const affiliates = toolAffiliates[toolSlug];
  const tool = getToolBySlug(toolSlug);

  if (!affiliates || !tool) return null;

  return (
    <div className="surface-card p-6 my-6">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0">
          {tool.name.charAt(0)}
        </span>
        <h3 className="text-sm font-bold text-slate-900">
          {tool.name} を始めよう
        </h3>
      </div>

      <p className="text-xs text-slate-500 mb-4">
        {tool.pricing}
      </p>

      {affiliates.map(aff => (
        <a
          key={aff.service}
          href={aff.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-center gap-2 w-full text-center py-3 px-4 rounded-xl text-sm font-bold mb-2 bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/25 transition-all duration-200"
        >
          {aff.label}
          {aff.badge && (
            <span className="text-[0.65rem] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">
              {aff.badge}
            </span>
          )}
          <span className="text-[0.75rem] opacity-80">→</span>
        </a>
      ))}

      <p className="text-[0.6rem] text-slate-400 mt-2 text-center">
        ※ 外部サイトへ遷移します
      </p>
    </div>
  );
}
