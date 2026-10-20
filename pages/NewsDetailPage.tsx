
import React from 'react';
import '../types';
import { useParams, Link } from 'react-router-dom';
import { getNewsById, getNews } from '../services/api';
import type { NewsArticle } from '../types';
import Loader from '../components/Loader';
import { useLanguage } from '../hooks/useLanguage';
import { AnimatedSection } from '../components/AnimatedComponents';

const NewsDetailPage: React.FC = () => {
    const { id } = useParams();
    const [article, setArticle] = React.useState<NewsArticle | null>(null);
    const [recentNews, setRecentNews] = React.useState<NewsArticle[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const { t, language } = useLanguage();

    React.useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                
                // Fetch the specific article
                const data = await getNewsById(id);
                if (!data) throw new Error("Article not found");
                setArticle(data);

                // Fetch recent news for sidebar (separate try-catch to not block main content)
                try {
                    const allNews = await getNews();
                    if(allNews && Array.isArray(allNews)) {
                        const others = allNews.filter(a => a.id.toString() !== id).slice(0, 5);
                        setRecentNews(others);
                    }
                } catch (e) {
                    console.warn("Failed to load recent news sidebar", e);
                }
                
                // Scroll to top
                window.scrollTo(0, 0);
            } catch (err) {
                console.error(err);
                setError('Failed to load article.');
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-brand-blue-900"><Loader /></div>;
    }

    if (error || !article) {
        return (
            <div className="container mx-auto px-6 py-20 text-center bg-gray-50 dark:bg-brand-blue-900 min-h-screen">
                <h1 className="text-4xl font-bold text-brand-blue-900 dark:text-white font-montserrat">{t('newsPage.errorTitle', 'Article Not Found')}</h1>
                <p className="mt-4 text-brand-blue-900/80 dark:text-brand-blue-50 font-lato">{t('newsPage.errorText', 'The article you are looking for does not exist or has been removed.')}</p>
                <Link to="/news" className="mt-8 inline-block bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-3 px-8 rounded-md btn-hover-effect font-roboto-condensed">
                    {t('newsPage.backButton', 'Back to News')}
                </Link>
            </div>
        );
    }

    // Determine localized fields
    const title = (language === 'am' && article.titleAm) ? article.titleAm : article.title;
    
    // Resolve Excerpt
    const currentExcerpt = (language === 'am' && article.excerptAm) ? article.excerptAm : article.excerpt;

    // Resolve Main Content (Body)
    // We try to get specific body content for the language.
    let bodyContent = article.content;
    if (language === 'am') {
        // If Amharic is selected, prefer Amharic content. 
        // If Amharic content is missing, we might either show nothing, English content, or Amharic excerpt.
        // Here, we check if specific Amharic content exists.
        if (article.contentAm) {
            bodyContent = article.contentAm;
        } else {
            // If Amharic body is missing, reset bodyContent so we fallback to excerpt later
            bodyContent = undefined;
        }
    }

    // Logic: If bodyContent exists, we show Excerpt (Lead) + Body. 
    // If bodyContent DOES NOT exist, we show Excerpt as the Body (and no Lead to avoid duplication).
    const finalDisplayContent = bodyContent || currentExcerpt;
    const showLeadParagraph = !!(currentExcerpt && bodyContent);

    return (
        <div className="bg-gray-50 dark:bg-brand-blue-900 min-h-screen">
            {/* Hero Image Section */}
            <div className="w-full h-[50vh] md:h-[60vh] relative">
                <img src={article.imageUrl} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
                    <AnimatedSection>
                        <span className="inline-block bg-brand-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                            {article.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white font-montserrat leading-tight shadow-sm max-w-4xl">
                            {title}
                        </h1>
                        <p className="text-white/80 font-roboto-condensed mt-4 text-lg">
                            {new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </AnimatedSection>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2">
                        <AnimatedSection delay={100}>
                            <div className="bg-white dark:bg-brand-blue-800 rounded-lg p-8 shadow-lg">
                                {/* Lead Paragraph / Excerpt (Only shown if distinct from main content) */}
                                {showLeadParagraph && (
                                    <p className="text-xl font-bold text-brand-blue-900 dark:text-brand-blue-100 font-lato mb-8 leading-relaxed border-l-4 border-brand-blue-500 pl-4">
                                        {currentExcerpt}
                                    </p>
                                )}
                                
                                {/* Full Rich Content */}
                                <div className="prose dark:prose-invert max-w-none text-justify font-lato text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                                    {finalDisplayContent ? (
                                        <div dangerouslySetInnerHTML={{ __html: finalDisplayContent }} />
                                    ) : (
                                        // Fallback text if no content provided at all
                                        <div className="space-y-4">
                                            <p className="italic text-gray-500">No content available for this article.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </AnimatedSection>
                        
                        <div className="mt-8 flex justify-between items-center">
                            <Link to="/news" className="text-brand-blue-600 dark:text-brand-blue-300 font-bold hover:underline flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                {t('newsPage.backButton', 'Back to News')}
                            </Link>
                            {/* Share Buttons Placeholder */}
                            <div className="flex space-x-3">
                                <span className="text-gray-500 text-sm font-semibold uppercase">Share:</span>
                                <button className="text-brand-blue-500 hover:text-brand-blue-700"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></button>
                                <button className="text-blue-700 hover:text-blue-900"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Latest News Widget */}
                        <div className="bg-white dark:bg-brand-blue-800 rounded-lg p-6 shadow-lg border border-brand-blue-100 dark:border-brand-blue-700">
                            <h3 className="text-xl font-bold text-brand-blue-900 dark:text-white mb-4 font-roboto-condensed border-b border-brand-blue-500 pb-2">Recent News</h3>
                            <div className="space-y-4">
                                {recentNews.length > 0 ? (
                                    recentNews.map(item => {
                                        const itemTitle = (language === 'am' && item.titleAm) ? item.titleAm : item.title;
                                        return (
                                            <Link key={item.id} to={`/news/${item.id}`} className="block group">
                                                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue-500 transition-colors line-clamp-2">{itemTitle}</h4>
                                                <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500">No other recent news.</p>
                                )}
                            </div>
                        </div>

                        {/* Categories Widget */}
                        <div className="bg-white dark:bg-brand-blue-800 rounded-lg p-6 shadow-lg border border-brand-blue-100 dark:border-brand-blue-700">
                            <h3 className="text-xl font-bold text-brand-blue-900 dark:text-white mb-4 font-roboto-condensed border-b border-brand-blue-500 pb-2">Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Industry News', 'Projects', 'Innovation', 'Events', 'Press Release'].map(cat => (
                                    <span key={cat} className="bg-gray-100 dark:bg-brand-blue-900 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;
