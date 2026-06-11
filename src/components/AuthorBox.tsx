export default function AuthorBox() {
  return (
    <div className="surface-card p-6 my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-indigo-500 flex items-center justify-center text-white font-extrabold text-xl shadow-sm flex-shrink-0">
          AI
        </div>
        <div>
          <p className="font-bold text-lg text-slate-900">AIツールラボ編集部</p>
          <p className="text-sm text-slate-500">50以上のAIツールを実際に使用・検証</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        ChatGPT、Claude、Gemini、Midjourney等の主要AIツールを実際に使用し、機能・料金・使いやすさを徹底比較。エンジニア・デザイナー・ライター向けの実践的なレビューを提供しています。
      </p>
    </div>
  );
}
