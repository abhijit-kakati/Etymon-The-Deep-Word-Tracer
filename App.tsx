
import React, { useState, useEffect } from 'react';
import { LANGUAGES } from './constants';
import { EtymologyResult } from './types';
import { fetchEtymology, fetchRandomEtymology } from './services/geminiService';
import HistoryItem from './components/HistoryItem';

type Tab = 'search' | 'lucky';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('search');
  const [word, setWord] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<(EtymologyResult & { modernWord?: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchEtymology(word, language);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("We encountered an error tracing that word. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFeelingLucky = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchRandomEtymology(language);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("The linguistic engine failed to pick a word. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Navigation / Top Bar */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-slate-900 font-bold serif">E</span>
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white serif tracking-tight">Etymon</span>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.929 7.929l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-8 pb-24">
        {/* Hero Section */}
        <header className="mb-16 text-center sm:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white serif tracking-tight">
            Word Ancestry <span className="text-slate-400 dark:text-slate-600 font-normal">Tracer</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
            Discover the origins of language. Every word tells a story of migration, 
            culture, and thousands of years of human history.
          </p>
        </header>

        {/* Tab Selection */}
        <div className="flex gap-2 mb-4 px-1">
          <button 
            onClick={() => { setActiveTab('search'); setResult(null); setError(null); }}
            className={`px-6 py-2 text-sm font-bold tracking-widest uppercase transition-all rounded-t-xl border-b-2 ${activeTab === 'search' ? 'text-slate-900 dark:text-white border-slate-900 dark:border-white' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
          >
            Search
          </button>
          <button 
            onClick={() => { setActiveTab('lucky'); setResult(null); setError(null); }}
            className={`px-6 py-2 text-sm font-bold tracking-widest uppercase transition-all rounded-t-xl border-b-2 ${activeTab === 'lucky' ? 'text-slate-900 dark:text-white border-slate-900 dark:border-white' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
          >
            Feeling Lucky
          </button>
        </div>

        {/* Action Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none mb-16">
          {activeTab === 'search' ? (
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6">
                <label htmlFor="word" className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">
                  Target Word
                </label>
                <input
                  id="word"
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="e.g. Dialogue, Music, Terra"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 outline-none transition-all text-xl text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
              </div>
              <div className="md:col-span-4">
                <label htmlFor="language" className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">
                  Input Language
                </label>
                <div className="relative">
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 outline-none appearance-none transition-all text-xl text-slate-900 dark:text-white"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.name}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[62px] bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-500 border-t-white dark:border-slate-400 dark:border-t-slate-900 rounded-full animate-spin mx-auto" />
                  ) : (
                    "Trace"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="flex-1 w-full">
                <label htmlFor="lucky-language" className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">
                  Select Language
                </label>
                <div className="relative">
                  <select
                    id="lucky-language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 outline-none appearance-none transition-all text-xl text-slate-900 dark:text-white"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.name}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <button
                onClick={handleFeelingLucky}
                disabled={loading}
                className="w-full md:w-auto h-[62px] px-10 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-slate-500 border-t-white dark:border-slate-400 dark:border-t-slate-900 rounded-full animate-spin mx-auto" />
                ) : (
                  "Feeling Lucky"
                )}
              </button>
            </div>
          )}
        </section>

        {/* Error Message */}
        {error && (
          <div className="mb-12 p-5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-center font-medium animate-in fade-in duration-300">
            {error}
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Context for Lucky */}
            {result.modernWord && (
              <div className="text-center mb-[-40px]">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-4 block">
                  Random Selection
                </span>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white serif italic mb-2">
                  "{result.modernWord}"
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tracing back the lineage of this interesting word...</p>
              </div>
            )}

            {/* The Root Card */}
            <div className="bg-slate-900 dark:bg-white rounded-[40px] p-12 text-center relative overflow-hidden mt-12">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>
              
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-6 block">
                  The Ancient Seed
                </span>
                <h2 className="text-7xl md:text-8xl font-bold text-white dark:text-slate-900 italic serif mb-6 tracking-tighter">
                  *{result.rootWord}
                </h2>
                <div className="flex flex-col items-center gap-1 mb-10">
                  <p className="text-xl text-slate-200 dark:text-slate-600 font-semibold">
                    {result.rootLanguage}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    ({result.simplifiedRootLanguage})
                  </p>
                </div>
                <div className="max-w-xl mx-auto">
                  <div className="h-px bg-slate-800 dark:bg-slate-200 mb-8" />
                  <p className="text-2xl text-slate-300 dark:text-slate-700 italic serif leading-relaxed">
                    "{result.originalMeaning}"
                  </p>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-12 gap-12">
              <aside className="md:col-span-4 space-y-10">
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                  <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                    Evolution Summary
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                    {result.evolutionSummary}
                  </p>
                </div>
                
                <div className="px-2">
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                    About the timeline
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
                    Linguistic reconstruction uses the comparative method to trace words back through sound changes and historical records. 
                    <br/><br/>
                    Dates and locations are best estimates based on archaeological and philological data.
                  </p>
                </div>
              </aside>

              <div className="md:col-span-8">
                <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                  Timeline of Descent
                </h3>
                <div className="space-y-0">
                  {result.timeline.map((step, idx) => (
                    <HistoryItem 
                      key={idx} 
                      step={step} 
                      isFirst={idx === 0}
                      isLast={idx === result.timeline.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial Empty State */}
        {!result && !loading && !error && (
          <div className="mt-20 text-center py-20 animate-in fade-in duration-1000">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-200 dark:border-slate-800">
              <svg className="w-10 h-10 text-slate-300 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-slate-400 dark:text-slate-600 font-medium text-lg italic serif">Start your journey into the deep past of language</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="w-6 h-6 rounded bg-slate-300 dark:bg-slate-700" />
            <div className="w-6 h-6 rounded bg-slate-400 dark:bg-slate-600" />
          </div>
          <p className="text-slate-400 dark:text-slate-600 text-xs tracking-widest uppercase mb-2">Etymon Linguistic Engine</p>
          <p className="text-slate-500 dark:text-slate-500 text-xs">&copy; {new Date().getFullYear()} — Built with Deep AI Contextual Philology</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
