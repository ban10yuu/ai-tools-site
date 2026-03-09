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
    <div className="cyber-panel p-5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: tool.accentColor }}
        />
        <h3 className="text-sm font-bold text-[#e0e4f0]">
          {tool.name} を始めよう
        </h3>
      </div>

      <p className="text-xs text-[#6a7090] mb-4">
        {tool.pricing}
      </p>

      {affiliates.map(aff => (
        <a
          key={aff.service}
          href={aff.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block w-full text-center py-2.5 px-4 rounded-md text-sm font-bold transition-all duration-200 mb-2"
          style={{
            backgroundColor: tool.accentColor + '20',
            color: tool.accentColor,
            border: `1px solid ${tool.accentColor}40`,
          }}
        >
          {aff.label}
          {aff.badge && (
            <span className="ml-2 text-[0.65rem] bg-[#00ff8820] text-[#00ff88] px-2 py-0.5 rounded-full">
              {aff.badge}
            </span>
          )}
          <span className="ml-2 text-[0.65rem] opacity-70">→</span>
        </a>
      ))}

      <p className="text-[0.6rem] text-[#4a5070] mt-2 text-center">
        ※ 外部サイトへ遷移します
      </p>
    </div>
  );
}
