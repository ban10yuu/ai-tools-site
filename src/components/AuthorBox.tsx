export default function AuthorBox() {
  return (
    <div className="border border-cyan-800/30 rounded-lg p-6 bg-gray-900/50 my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-green-500 flex items-center justify-center text-black font-bold text-xl">AI</div>
        <div>
          <p className="font-bold text-lg text-white">AIツールラボ編集部</p>
          <p className="text-sm text-gray-400">50以上のAIツールを実際に使用・検証</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        ChatGPT、Claude、Gemini、Midjourney等の主要AIツールを実際に使用し、機能・料金・使いやすさを徹底比較。エンジニア・デザイナー・ライター向けの実践的なレビューを提供しています。
      </p>
    </div>
  );
}
