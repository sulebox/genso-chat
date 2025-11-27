'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

export default function GensoChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `**シュール:**\nやあ！元素騎士オンラインのことなら何でも聞いてね。\n\n---\n**シフペン:**\nおなかすいた\n\n**ネコ:**\nにゃー`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // オートスクロール
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Next.jsのAPIルートへリクエスト
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "**シュール:**\nごめん、ちょっと通信エラーみたいだ。\n\n---\n**シフペン:**\n電波たべたい\n\n**ネコ:**\n・・・" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // チョコミントカラー定義
  // 背景: ミントグリーン (#e0f7fa), アクセント: チョコレートブラウン (#4e342e)
  
  return (
    <div className="flex flex-col h-screen bg-[#e0f7fa] font-sans text-[#4e342e]">
      
      {/* --- ヘッダー＆キャラクターエリア --- */}
      <div className="bg-[#b2ebf2] border-b-4 border-[#4e342e] p-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          {/* タイトル */}
          <h1 className="text-center font-bold text-xl mb-4 tracking-widest text-[#4e342e]">
            GENSO GUIDE TEAM
          </h1>
          
          {/* キャラクター横並び (左から: シュール, シフペン, ネコ) */}
          <div className="flex justify-center items-end gap-4 sm:gap-8">
            
            {/* シュール */}
            <div className="flex flex-col items-center group">
              {/* 画像コンテナ */}
              <div className="w-20 h-24 sm:w-24 sm:h-32 relative flex items-end justify-center transition-transform duration-300 group-hover:-translate-y-2">
                 {/* 実際のアプリではここに <img src="/sule.gif" /> を入れます */}
                 <img 
                   src="/sule.gif" 
                   alt="シュール" 
                   className="object-contain h-full w-full drop-shadow-lg"
                   onError={(e) => {
                     e.target.onerror = null; 
                     e.target.src="https://placehold.co/100x150/4e342e/e0f7fa?text=Sule";
                   }}
                 />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-bold bg-[#4e342e] text-[#e0f7fa] px-3 py-1 rounded-full shadow-sm">
                シュール
              </span>
            </div>

            {/* シフペン */}
            <div className="flex flex-col items-center group">
              <div className="w-20 h-24 sm:w-24 sm:h-32 relative flex items-end justify-center transition-transform duration-300 group-hover:-translate-y-2 delay-100">
                 <img 
                   src="/shifpen.gif" 
                   alt="シフペン" 
                   className="object-contain h-full w-full drop-shadow-lg"
                   onError={(e) => {
                     e.target.onerror = null; 
                     e.target.src="https://placehold.co/100x120/4e342e/e0f7fa?text=Shifpen";
                   }}
                 />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-bold bg-[#4e342e] text-[#e0f7fa] px-3 py-1 rounded-full shadow-sm">
                シフペン
              </span>
            </div>

            {/* ネコ */}
            <div className="flex flex-col items-center group">
              <div className="w-16 h-20 sm:w-20 sm:h-28 relative flex items-end justify-center transition-transform duration-300 group-hover:-translate-y-2 delay-200">
                 <img 
                   src="/neko.gif" 
                   alt="ネコ" 
                   className="object-contain h-full w-full drop-shadow-lg"
                   onError={(e) => {
                     e.target.onerror = null; 
                     e.target.src="https://placehold.co/80x100/4e342e/e0f7fa?text=Neko";
                   }}
                 />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-bold bg-[#4e342e] text-[#e0f7fa] px-3 py-1 rounded-full shadow-sm">
                ネコ
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* --- チャットエリア --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-[#4e342e] scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm whitespace-pre-wrap leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#4e342e] text-[#e0f7fa] rounded-tr-none' // ユーザー：チョコ背景
                    : 'bg-white text-[#4e342e] border-2 border-[#b2ebf2] rounded-tl-none' // Bot：白背景
                }`}
              >
                {msg.role === 'assistant' ? (
                   /* キャラクターごとのスタイル分け（簡易的） */
                   msg.content.split('---').map((part, i) => (
                     <div key={i} className={i > 0 ? "mt-4 pt-4 border-t border-[#b2ebf2] border-dashed" : ""}>
                       {part.trim()}
                     </div>
                   ))
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white border-2 border-[#b2ebf2] rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2 text-[#4e342e]">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">3人が相談中...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* --- 入力エリア --- */}
      <div className="p-4 bg-white border-t-2 border-[#b2ebf2]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="知りたいことを聞いてみてね！"
              className="flex-1 p-3 rounded-xl border-2 border-[#b2ebf2] bg-[#f0fbfd] text-[#4e342e] placeholder-[#a1887f] focus:outline-none focus:border-[#4e342e] focus:ring-1 focus:ring-[#4e342e] transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#4e342e] text-[#e0f7fa] p-3 rounded-xl hover:bg-[#3e2723] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center min-w-[3rem]"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-center text-xs text-[#a1887f] mt-2">
            AIは間違いを言うことがあります。重要な情報は公式Wikiも確認してね。
          </p>
        </div>
      </div>
    </div>
  );
}
