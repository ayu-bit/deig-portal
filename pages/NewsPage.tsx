
import * as React from 'react';
// FIX: Import `types.ts` after React to ensure global JSX namespace augmentation is applied correctly.
import '../types';
import { AnimatedSection } from '../components/AnimatedComponents';
import { useLanguage } from '../hooks/useLanguage';
import { getNews } from '../services/api';
import type { NewsArticle, NewsCategory } from '../types';
import Loader from '../components/Loader';
import { GALLERY_ITEMS } from '../constants';
import { Link } from 'react-router-dom';

// FIX: Corrected typo from "Press Releases" to "Press Release" to match the type definition.
const categories: NewsCategory[] = ['Headquarters Updates', 'Industry News', 'Projects', 'Events & Exhibitions', 'Innovation & Technology', 'Press Release'];

// --- Section Components ---
const Section: React.FC<{ title: string; subtitle?: string; id: string; children: React.ReactNode; className?: string; darkText?: boolean }> = ({ title, subtitle, id, children, className = '', darkText = false }) => (
    <section aria-labelledby={id} className={`py-20 ${className}`}>
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h2 id={id} className={`text-3xl font-bold font-roboto-condensed ${darkText ? 'text-[#1075BB]' : 'text-white'}`}>{title}</h2>
                    {subtitle && <p className={`mt-2 font-lato ${darkText ? 'text-gray-600' : 'text-white/80'}`}>{subtitle}</p>}
                </div>
            </AnimatedSection>
            {children}
        </div>
    </section>
);

const FeaturedNewsSlider: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    const { t, language } = useLanguage();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);

    // Auto-slide functionality
    React.useEffect(() => {
        if (!articles || articles.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
        }, 6000); // 6 Seconds per slide

        return () => clearInterval(interval);
    }, [articles, isPaused]);

    const hasArticles = articles && articles.length > 0;
    const currentArticle = hasArticles ? articles[currentIndex] : null;

    const goToNext = () => {
        if (hasArticles) setCurrentIndex((prev) => (prev + 1) % articles.length);
    };

    const goToPrev = () => {
        if (hasArticles) setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    };

    // Helper to get localized content
    const getTitle = (article: NewsArticle) => (language === 'am' && article.titleAm) ? article.titleAm : article.title;
    const getExcerpt = (article: NewsArticle) => (language === 'am' && article.excerptAm) ? article.excerptAm : article.excerpt;

    return (
        <div className="relative pt-24 pb-12 bg-[#1075BB]">
             <div className="container mx-auto px-6">
                <AnimatedSection>
                    {/* Header for the Slider Section */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-white font-montserrat">{t('newsPage.title', 'News & Updates')}</h1>
                        <p className="mt-2 text-lg text-white/80 font-roboto-condensed">
                            {t('newsPage.subtitle', 'Latest announcements, press releases, and industrial updates.')}
                        </p>
                    </div>

                    {hasArticles && currentArticle && (
                        <div 
                            className="relative group bg-white rounded-md shadow-2xl overflow-hidden border border-white/20 min-h-[500px]"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Content Container - Uses Key to Trigger Animation on Change */}
                            <div key={currentArticle.id} className="grid grid-cols-1 lg:grid-cols-2 h-full animate-fade-in">
                                {/* Image Side */}
                                <div className="h-64 lg:h-full min-h-[300px] image-container blueprint-overlay relative">
                                    <img 
                                        src={currentArticle.imageUrl} 
                                        alt={getTitle(currentArticle)} 
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#1075BB] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                            {currentArticle.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Side */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center h-full relative bg-white">
                                    <div className="mb-4 text-gray-500 font-roboto-condensed text-sm font-bold">
                                        {new Date(currentArticle.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    
                                    <h3 className="text-3xl lg:text-4xl font-bold text-[#1075BB] font-montserrat leading-tight mb-6">
                                        {getTitle(currentArticle)}
                                    </h3>
                                    
                                    {/* Article Excerpt with proper formatting */}
                                    <div 
                                        className="text-gray-600 font-lato text-lg line-clamp-4 whitespace-pre-line prose prose-blue max-w-none mb-8"
                                        dangerouslySetInnerHTML={{ __html: getExcerpt(currentArticle) }}
                                    />

                                    <Link 
                                        to={`/news/${currentArticle.id}`}
                                        className="inline-block bg-[#1075BB] hover:bg-[#0E62A1] text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 font-roboto-condensed self-start shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        {t('newsPage.readMore', 'Read Full Story →')}
                                    </Link>
                                </div>
                            </div>

                            {/* Navigation Arrows (Visible on hover or mobile) */}
                            <button 
                                onClick={goToPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-[#1075BB] hover:text-white text-[#1075BB] p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 z-10 focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
                                aria-label="Previous Slide"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button 
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-[#1075BB] hover:text-white text-[#1075BB] p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 z-10 focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
                                aria-label="Next Slide"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>

                            {/* Dots Navigation */}
                            <div className="absolute bottom-4 lg:bottom-8 left-0 right-0 flex justify-center space-x-2 z-10 pointer-events-none">
                                {articles.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm pointer-events-auto ${
                                            index === currentIndex 
                                            ? 'bg-[#1075BB] w-8' 
                                            : 'bg-gray-300 hover:bg-[#1075BB]'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </AnimatedSection>
            </div>
        </div>
    );
};

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
    const { t, language } = useLanguage();
    const title = (language === 'am' && article.titleAm) ? article.titleAm : article.title;
    const excerpt = (language === 'am' && article.excerptAm) ? article.excerptAm : article.excerpt;

    return (
        <div className="bg-white text-[#1075BB] rounded-md overflow-hidden shadow-lg card-hover-effect flex flex-col h-full border border-gray-200 hover:border-[#1075BB]">
            <div className="relative h-56 image-container blueprint-overlay">
                <img src={article.imageUrl} alt={title} loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-[#1075BB] text-white text-xs font-bold px-2 py-1 rounded-md font-roboto-condensed">{article.category}</span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 font-roboto-condensed">{new Date(article.date).toLocaleDateString()}</p>
                <h3 className="mt-2 text-xl font-bold text-[#1075BB] font-montserrat card-title flex-grow">{title}</h3>
                
                {/* Fix: Clamp text and preserve basic formatting */}
                <div className="mt-2 text-gray-600 text-sm font-lato line-clamp-3 whitespace-pre-line">
                    {excerpt.replace(/<[^>]*>?/gm, '') /* Strip HTML for cards to ensure clean text preview */}
                </div>

                <Link 
                    to={`/news/${article.id}`}
                    className="inline-block mt-4 text-[#1075BB] font-semibold hover:text-[#0E62A1] transition-colors duration-300 font-roboto-condensed self-start"
                >
                    {t('newsPage.readMore', 'Read More →')}
                </Link>
            </div>
        </div>
    );
};

const PressReleaseItem: React.FC<{ article: NewsArticle }> = ({ article }) => {
    const { language } = useLanguage();
    const title = (language === 'am' && article.titleAm) ? article.titleAm : article.title;
    
    return (
        <Link 
            to={`/news/${article.id}`}
            className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-md hover:bg-white transition-colors border-b border-gray-200 last:border-0"
        >
            <div>
                <h4 className="font-bold text-gray-800 group-hover:text-[#1075BB] font-roboto-condensed transition-colors">{title}</h4>
                <p className="text-sm text-gray-500 font-lato">{new Date(article.date).toLocaleDateString()}</p>
            </div>
            <span className="text-sm font-semibold text-[#1075BB] mt-2 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Read More &rarr;
            </span>
        </Link>
    );
};

const EventCard: React.FC<{ titleKey: string; descKey: string; image: string; }> = ({ titleKey, descKey, image }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white text-[#1075BB] rounded-md overflow-hidden shadow-lg flex flex-col h-full card-hover-effect border border-transparent hover:border-[#1075BB]">
            <div className="h-48 image-container blueprint-overlay">
                <img src={image} alt={t(titleKey)} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-grow">
                <h4 className="font-bold text-[#1075BB] font-roboto-condensed">{t(titleKey)}</h4>
                <p className="mt-1 text-sm text-gray-600 font-lato">{t(descKey)}</p>
            </div>
        </div>
    );
}

const NewsPage: React.FC = () => {
    const { t, language } = useLanguage();
    const [articles, setArticles] = React.useState<NewsArticle[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState<NewsCategory | 'All'>('All');

    React.useEffect(() => {
        const fetchNewsData = async () => {
            try {
                setLoading(true);
                const data = await getNews();
                setArticles(data);
            } catch (err) {
                setError('Failed to load news articles.');
            } finally {
                setLoading(false);
            }
        };
        fetchNewsData();
    }, []);

    const filteredArticles = React.useMemo(() => {
        return articles.filter(article => {
            const title = (language === 'am' && article.titleAm) ? article.titleAm : article.title;
            const excerpt = (language === 'am' && article.excerptAm) ? article.excerptAm : article.excerpt;
            
            const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
            const matchesSearch = searchTerm === '' ||
                title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [articles, searchTerm, selectedCategory, language]);
    
    // Get top 5 articles for the slider
    const featuredArticles = articles.slice(0, 5);
    const pressReleases = articles.filter(a => a.category === 'Press Release').slice(0, 4);

    return (
        <div className="bg-gray-50">
            {loading ? <div className="py-20 flex justify-center"><Loader /></div> :
             error ? <p className="py-20 text-center text-red-400">{error}</p> :
             <>
                {/* Featured News Slider acting as Hero Section */}
                <FeaturedNewsSlider articles={featuredArticles} />

                <Section id="latest-news-feed" title={t('newsPage.latestNewsTitle', 'Latest News Feed')} className="bg-gray-50" darkText={true}>
                    <div className="max-w-7xl mx-auto">
                        {/* Filters and Search */}
                        <AnimatedSection>
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                                <div className="flex-grow w-full md:w-auto">
                                    <input 
                                        type="search" 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder={t('newsPage.searchPlaceholder', 'Search news articles...')}
                                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB] shadow-sm"
                                    />
                                </div>
                                 <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                                    <button onClick={() => setSelectedCategory('All')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shadow-sm border ${selectedCategory === 'All' ? 'bg-[#1075BB] text-white border-[#1075BB]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{t('newsPage.allCategories', 'All')}</button>
                                    {categories.map(cat => (
                                         <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shadow-sm border ${selectedCategory === cat ? 'bg-[#1075BB] text-white border-[#1075BB]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{cat}</button>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                        
                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article, index) => (
                                    <AnimatedSection key={article.id} delay={index * 100}>
                                        <NewsCard article={article} />
                                    </AnimatedSection>
                                ))
                            ) : (
                                <div className="md:col-span-2 lg:col-span-3 text-center py-16 bg-white rounded-md border border-gray-200">
                                    <h3 className="text-2xl font-bold text-[#1075BB] font-montserrat">{t('newsPage.noArticles', 'No Articles Found')}</h3>
                                    <p className="mt-2 text-gray-600 font-lato">{t('newsPage.noArticlesDesc', 'There are no news articles matching your search or filter criteria. Please try again.')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Section>
                
                <Section id="press-releases" title={t('newsPage.pressReleasesTitle', 'Official Press Releases')} subtitle={t('newsPage.pressReleasesSubtitle', 'Formal statements and announcements from the DEIG corporate office.')} className="bg-[#F0F7FC]" darkText={true}>
                    <div className="max-w-4xl mx-auto bg-white rounded-md shadow-lg p-2 border border-gray-200">
                        {pressReleases.length > 0 ? (
                            pressReleases.map((article, index) => (
                                <AnimatedSection key={article.id} delay={index * 100}>
                                    <PressReleaseItem article={article} />
                                </AnimatedSection>
                            ))
                        ) : (
                            <p className="text-center py-4 text-gray-500">No recent press releases.</p>
                        )}
                    </div>
                </Section>

                 <Section id="events-media" title={t('newsPage.eventsTitle', 'Events & Media Coverage')} subtitle={t('newsPage.eventsSubtitle', "Find out where we've been and what's next on our agenda.")} className="bg-white" darkText={true}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <AnimatedSection>
                            <EventCard titleKey="newsPage.event1_title" descKey="newsPage.event1_desc" image="https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg" />
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                             <EventCard titleKey="newsPage.event2_title" descKey="newsPage.event2_desc" image="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg" />
                        </AnimatedSection>
                     </div>
                </Section>

                <Section id="media-gallery" title={t('newsPage.galleryTitle', 'Media Gallery')} subtitle={t('newsPage.gallerySubtitle', 'A glimpse into our operations, events, and achievements.')} className="bg-gray-50" darkText={true}>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {GALLERY_ITEMS.slice(0, 8).map((item, index) => (
                            <AnimatedSection key={item.id} delay={index * 100}>
                                <div className="group relative aspect-video rounded-md shadow-lg overflow-hidden image-container">
                                    <img src={item.imageUrl} alt={t(item.titleKey)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"/>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </Section>

                <Section id="newsletter" title={t('newsPage.newsletterTitle', 'Stay Updated')} subtitle={t('newsPage.newsletterSubtitle', 'Subscribe to our newsletter to receive the latest news and updates directly in your inbox.')} className="bg-[#1075BB]">
                    <AnimatedSection>
                        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
                            <input type="email" placeholder={t('newsPage.newsletterPlaceholder', 'Enter your email address')} className="flex-grow bg-white border border-white/30 rounded-md py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50" />
                            <button type="submit" className="bg-[#0E62A1] hover:bg-[#0A4D7F] text-white border border-white/20 font-bold py-3 px-6 rounded-md transition-colors font-roboto-condensed shadow-lg">
                                {t('newsPage.newsletterButton', 'Subscribe')}
                            </button>
                        </form>
                    </AnimatedSection>
                </Section>
             </>
            }
        </div>
    );
};

export default NewsPage;
