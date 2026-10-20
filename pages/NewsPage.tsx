
import React, { useState, useMemo, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { NewsArticle, NewsCategory, CurrentView, MediaFile } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchMediaFiles } from '../services/apiService';

interface NewsPageProps {
  setCurrentView: (view: CurrentView) => void;
  allNews: NewsArticle[];
}

const CategoryBadge: React.FC<{ category: NewsCategory }> = ({ category }) => {
  const { t } = useLanguage();
  
  const categoryStyles: Record<NewsCategory, string> = {
    'Press Releases': 'bg-primaryDark text-white',
    'Announcements': 'bg-accentStrong text-white',
    'Headquarters Updates': 'bg-blue-600 text-white',
    'Industry News': 'bg-green-600 text-white',
    'Projects': 'bg-yellow-500 text-textDark',
    'Events & Exhibitions': 'bg-pink-500 text-white',
    'Innovation & Technology': 'bg-teal-500 text-white',
  };
  
  const categoryKey = category.replace(/ & /g, '_and_').replace(/\s+/g, '_');
  const translatedCategory = t(`news_filter_${categoryKey.toLowerCase()}`);

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${categoryStyles[category] || 'bg-gray-400 text-white'}`}>
      {translatedCategory}
    </span>
  );
};


const NewsPage: React.FC<NewsPageProps> = ({ setCurrentView, allNews }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'All'>('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [galleryImages, setGalleryImages] = useState<MediaFile[]>([]);
  
  // State for reading article
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const { language, t } = useLanguage();

  const filterCategories: (NewsCategory | 'All')[] = ['All', 'Headquarters Updates', 'Industry News', 'Projects', 'Events & Exhibitions', 'Announcements', 'Innovation & Technology', 'Press Releases'];

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const media = await fetchMediaFiles();
        setGalleryImages(media.filter(f => f.type === 'Image').slice(0, 4));
      } catch (error) {
        console.error("Failed to load media for news page:", error);
      }
    };
    loadMedia();
  }, []);

  const articles = useMemo(() => {
    return [...allNews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allNews]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
        const categoryMatch = activeCategory === 'All' || article.category === activeCategory;
        const searchMatch = searchTerm === '' ||
            article.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content[language].toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });
  }, [articles, activeCategory, searchTerm, language]);

  const featuredArticle = useMemo(() => filteredArticles.length > 0 ? filteredArticles[0] : null, [filteredArticles]);
  const latestFeedArticles = useMemo(() => filteredArticles.length > 1 ? filteredArticles.slice(1) : [], [filteredArticles]);
  const pressReleases = useMemo(() => articles.filter(a => a.category === 'Press Releases'), [articles]);
  const events = useMemo(() => articles.filter(a => a.category === 'Events & Exhibitions'), [articles]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
    }, 5000);
  }

  // View switch handlers
  const handleReadMore = (article: NewsArticle) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToNews = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- DETAIL VIEW RENDER ---
  if (selectedArticle) {
    return (
      <div className="bg-lightBg dark:bg-gray-900 min-h-screen animate-fadeIn">
        {/* Article Hero */}
        <div className="relative h-[50vh] w-full">
            <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title[language]} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
            
            <div className="absolute top-6 left-6 z-20">
                <button 
                    onClick={handleBackToNews}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full transition-all duration-300 border border-white/20 group"
                >
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to News</span>
                </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full container mx-auto px-6 pb-12">
                <div className="max-w-4xl">
                    <div className="mb-4">
                        <CategoryBadge category={selectedArticle.category} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat leading-tight text-shadow-lg mb-4">
                        {selectedArticle.title[language]}
                    </h1>
                    <p className="text-white/90 text-lg font-medium">
                        {new Date(selectedArticle.date).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 relative -mt-20 z-10">
                    <div className="prose dark:prose-invert max-w-none prose-lg text-textDark/80 dark:text-textLight/80 leading-relaxed">
                        {selectedArticle.content[language].split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-6 last:mb-0">{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-textDark/60 dark:text-textLight/60">
                            Article ID: <span className="font-mono">{selectedArticle.id}</span>
                        </div>
                        <div className="flex gap-3">
                            <button className="text-primaryDark dark:text-goldAccent hover:text-accentStrong font-semibold flex items-center gap-2 transition-colors" onClick={() => alert("Share feature coming soon!")}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                Share Article
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button 
                        onClick={handleBackToNews}
                        className="text-primaryDark dark:text-goldAccent font-bold hover:underline"
                    >
                        &larr; Return to News List
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW RENDER ---
  return (
    <div className="min-h-screen bg-lightBg dark:bg-surfaceDark/50">
      {/* 1. Hero Section */}
      <section className="relative py-32 overflow-hidden bg-surfaceDark">
          <div className="absolute inset-0 z-0">
              <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop" 
                  alt="News Background" 
                  className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-surfaceDark/80 via-surfaceDark to-surfaceDark"></div>
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              
              {/* Animated Grid Effect */}
              <div className="absolute inset-0 opacity-20" 
                   style={{
                       backgroundImage: `linear-gradient(to right, #1075BB 1px, transparent 1px), linear-gradient(to bottom, #1075BB 1px, transparent 1px)`,
                       backgroundSize: '60px 60px'
                   }}>
              </div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection>
                  <div className="max-w-4xl mx-auto text-center">
                      <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-display tracking-tight">
                          {t('news_page_title')}
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                          {t('news_page_subtitle')}
                      </p>
                      <div className="mt-12 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                  </div>
              </AnimatedSection>
          </div>
      </section>
      
      <div className="container mx-auto px-6 py-24 space-y-32">
        {/* 2. Featured News */}
        {featuredArticle && (
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-textDark dark:text-textLight font-display">{t('news_featured_story')}</h2>
                <div className="hidden md:block w-1/3 h-px bg-gray-200 dark:bg-white/10"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-surface dark:bg-surfaceDark p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100 dark:border-white/5 group">
              <div className="relative overflow-hidden rounded-3xl aspect-video cursor-pointer" onClick={() => handleReadMore(featuredArticle)}>
                <img src={featuredArticle.image} alt={featuredArticle.title[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="space-y-6">
                <CategoryBadge category={featuredArticle.category} />
                <p className="text-sm text-primary font-bold uppercase tracking-widest">{new Date(featuredArticle.date).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-textDark dark:text-textLight font-display leading-tight cursor-pointer hover:text-primary transition-colors" onClick={() => handleReadMore(featuredArticle)}>{featuredArticle.title[language]}</h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed line-clamp-3">{featuredArticle.content[language]}</p>
                <button 
                    onClick={() => handleReadMore(featuredArticle)}
                    className="inline-flex items-center space-x-3 font-bold text-primary group-hover:translate-x-2 transition-transform"
                >
                    <span className="text-lg">{t('read_more')}</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </button>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* 3, 4, 5. Latest News, Filters, Search */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-textDark dark:text-textLight mb-6 font-display">{t('news_latest_feed')}</h2>
                <div className="flex flex-wrap items-center gap-3">
                    {filterCategories.map(category => (
                        <button 
                            key={category} 
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${activeCategory === category ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface dark:bg-surfaceDark text-textDark dark:text-textLight hover:bg-primary/10 border border-gray-100 dark:border-white/5'}`}
                        >
                            {t(category === 'All' ? 'news_filter_all' : `news_filter_${category.replace(/ & /g, '_and_').replace(/\s+/g, '_').toLowerCase()}`)}
                        </button>
                    ))}
                </div>
            </div>
            <div className="relative w-full md:w-80">
                <input 
                    type="text" 
                    placeholder={t('news_search_placeholder')} 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-surface dark:bg-surfaceDark border border-gray-100 dark:border-white/5 rounded-2xl focus:border-primary/30 focus:ring-0 text-textDark dark:text-textLight pl-12 pr-6 py-4 outline-none shadow-sm transition-all"
                />
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          {latestFeedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {latestFeedArticles.map((article, index) => (
                    <AnimatedSection key={article.id} delay={`${(index % 3) * 100}ms`}>
                        <div className="group bg-surface dark:bg-surfaceDark rounded-[2rem] shadow-sm overflow-hidden h-full flex flex-col border border-gray-100 dark:border-white/5 cursor-pointer hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2" onClick={() => handleReadMore(article)}>
                            <div className="relative overflow-hidden h-64">
                                <img src={article.image} alt={article.title[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="mb-4"><CategoryBadge category={article.category} /></div>
                                <p className="text-xs text-primary font-bold uppercase tracking-widest mb-3">{new Date(article.date).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <h3 className="text-xl font-bold text-textDark dark:text-textLight mb-4 font-display leading-tight group-hover:text-primary transition-colors">{article.title[language]}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">{article.content[language]}</p>
                                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                    <button className="font-bold text-primary group-hover:translate-x-2 transition-transform flex items-center space-x-2">
                                        <span>{t('read_more')}</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-surface dark:bg-surfaceDark rounded-[2.5rem] border border-dashed border-gray-200 dark:border-white/10">
                <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <p className="text-xl text-gray-400 font-medium">{t('news_no_articles_found')}</p>
            </div>
          )}
        </AnimatedSection>

        {/* 6. Press Releases */}
        <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-textDark dark:text-textLight mb-4 font-display">{t('news_press_releases_title')}</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">{t('news_press_releases_subtitle')}</p>
                </div>
                <button className="bg-primary/5 text-primary font-bold px-8 py-3 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300">View Archive</button>
            </div>
            <div className="bg-surface dark:bg-surfaceDark rounded-[2.5rem] shadow-xl shadow-primary/5 border border-gray-100 dark:border-white/5 overflow-hidden">
                {pressReleases.map((pr, idx) => (
                    <div 
                        key={pr.id} 
                        className={`p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-primary/5 transition-all duration-300 group ${idx !== pressReleases.length - 1 ? 'border-b border-gray-100 dark:border-white/5' : ''}`} 
                        onClick={() => handleReadMore(pr)}
                    >
                         <div className="flex items-center space-x-8">
                            <div className="hidden md:flex flex-col items-center justify-center w-20 h-20 bg-lightBg dark:bg-surfaceDark/50 rounded-2xl border border-gray-100 dark:border-white/5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <span className="text-2xl font-bold">{new Date(pr.date).getDate()}</span>
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">{new Date(pr.date).toLocaleString(language, { month: 'short' })}</span>
                            </div>
                            <div>
                                <p className="md:hidden text-xs text-primary font-bold uppercase tracking-widest mb-2">{new Date(pr.date).toLocaleDateString()}</p>
                                <h3 className="text-xl font-bold text-textDark dark:text-textLight group-hover:text-primary transition-colors font-display">{pr.title[language]}</h3>
                            </div>
                         </div>
                         <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                         </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>
        
        {/* 7. Events & Media Coverage */}
        <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-textDark dark:text-textLight mb-4 font-display">{t('news_events_title')}</h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">{t('news_events_subtitle')}</p>
                <div className="mt-8 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {events.map(event => (
                    <div key={event.id} className="group bg-surface dark:bg-surfaceDark rounded-[2rem] shadow-sm flex items-center gap-8 p-8 border border-gray-100 dark:border-white/5 cursor-pointer hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1" onClick={() => handleReadMore(event)}>
                        <div className="text-center bg-primary/5 dark:bg-white/5 p-6 rounded-2xl border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                           <p className="text-4xl font-bold font-display">{new Date(event.date).getDate()}</p>
                           <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-60">{new Date(event.date).toLocaleString(language, { month: 'short' })}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-textDark dark:text-textLight group-hover:text-primary transition-colors font-display leading-tight">{event.title[language]}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mt-3">{event.content[language]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>

        {/* 8. Media Gallery */}
        <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-textDark dark:text-textLight mb-4 font-display">{t('news_gallery_title')}</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">{t('news_gallery_subtitle')}</p>
                </div>
                <button 
                    onClick={() => setCurrentView({ page: 'Gallery' })} 
                    className="inline-flex items-center space-x-3 font-bold text-primary group"
                >
                    <span className="text-lg">{t('news_gallery_cta')}</span>
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryImages.map(img => (
                    <div key={img.id} className="group relative overflow-hidden rounded-3xl aspect-video shadow-lg cursor-pointer">
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                ))}
            </div>
        </AnimatedSection>
        
        {/* 9. Newsletter */}
        <AnimatedSection>
            <div className="bg-surfaceDark text-white p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-primary/20 text-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                 
                 <div className="relative z-10">
                     <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">{t('news_newsletter_title')}</h2>
                     <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">{t('news_newsletter_subtitle')}</p>
                     
                     {isSubscribed ? (
                        <div className="bg-primary/20 border border-primary/30 p-8 rounded-3xl inline-block animate-in fade-in zoom-in duration-500">
                            <p className="text-2xl font-bold text-white flex items-center justify-center space-x-4">
                                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                                <span>{t('news_newsletter_success')}</span>
                            </p>
                        </div>
                     ) : (
                        <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder={t('news_newsletter_placeholder')} 
                                value={newsletterEmail} 
                                onChange={e => setNewsletterEmail(e.target.value)} 
                                required 
                                className="flex-grow bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-5 text-white placeholder-gray-400 outline-none focus:border-primary transition-all text-lg" 
                            />
                            <button 
                                type="submit" 
                                className="bg-primary hover:bg-primaryDark text-white rounded-2xl px-10 py-5 font-bold text-lg shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-105"
                            >
                                {t('news_newsletter_button')}
                            </button>
                        </form>
                     )}
                 </div>
            </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default NewsPage;
