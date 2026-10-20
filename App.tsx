import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import IndustryPage from './pages/IndustryPage';
import IndustryDetailPage from './pages/IndustryDetailPage';
import VacancyPage from './pages/VacancyPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ProcurementPage from './pages/ProcurementPage';
import TendersPage from './pages/TendersPage';
import SupplierRegistrationPage from './pages/SupplierRegistrationPage';
import ProductionPage from './pages/ProductionPage';
import { CurrentView, Industry, NewsArticle } from './types';
import Loader from './components/Loader';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { fetchIndustries, fetchNews } from './services/apiService';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<CurrentView>({ page: 'Home' });
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [nextView, setNextView] = useState<CurrentView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [globalError, setGlobalError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); // Loader duration
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadGlobalData = async () => {
      try {
        setGlobalError(null);
        const [industriesData, newsData] = await Promise.all([
          fetchIndustries(),
          fetchNews(),
        ]);
        setIndustries(industriesData);
        setNews(newsData.filter(n => n.status === 'Published'));
      } catch (error) {
        console.error("Failed to load global data:", error);
        setGlobalError("Could not connect to the server. Please check your connection and try again.");
      }
    };
    loadGlobalData();
  }, []);

  const handleSetCurrentView = (view: CurrentView) => {
    if (view.page === currentView.page && view.industryId === currentView.industryId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setNextView(view);
    setIsAnimatingOut(true);
  };

  useEffect(() => {
    if (isAnimatingOut) {
      const timer = setTimeout(() => {
        if (nextView) {
          setCurrentView(nextView);
          window.scrollTo({ top: 0, behavior: 'auto' });
          setNextView(null);
        }
        setIsAnimatingOut(false);
      }, 300); // Duration should match CSS transition
      return () => clearTimeout(timer);
    }
  }, [isAnimatingOut, nextView]);

  const renderPage = () => {
    if (globalError) {
      return (
        <div className="text-center py-40 px-6">
          <h2 className="text-2xl text-danger font-semibold">Connection Error</h2>
          <p className="text-textDark dark:text-textLight mt-4">{globalError}</p>
        </div>
      );
    }

    switch (currentView.page) {
      case 'Home':
        return <HomePage setCurrentView={handleSetCurrentView} industries={industries} news={news} />;
      case 'About':
        return <AboutPage setCurrentView={handleSetCurrentView} industries={industries} />;
      case 'Industry':
        if (currentView.industryId) {
            return <IndustryDetailPage industryId={currentView.industryId} setCurrentView={handleSetCurrentView} />;
        }
        return <IndustryPage setCurrentView={handleSetCurrentView} industries={industries} />;
      case 'Production':
        return <ProductionPage setCurrentView={handleSetCurrentView} />;
      case 'Gallery':
        return <GalleryPage />;
      case 'News':
        return <NewsPage setCurrentView={handleSetCurrentView} allNews={news} />;
      case 'Vacancy':
        return <VacancyPage />;
      case 'Contact':
        return <ContactPage setCurrentView={handleSetCurrentView} industries={industries} />;
      case 'PrivacyPolicy':
        return <PrivacyPolicyPage />;
      case 'Terms':
        return <TermsPage />;
      case 'Procurement':
        return <ProcurementPage setCurrentView={handleSetCurrentView} />;
      case 'Tenders':
        return <TendersPage />;
      case 'SupplierRegistration':
        return <SupplierRegistrationPage />;
      default:
        return <HomePage setCurrentView={handleSetCurrentView} industries={industries} news={news} />;
    }
  };
  
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-lightBg text-textDark dark:bg-gray-900 dark:text-textLight min-h-screen flex flex-col animate-fadeIn animated-grid-bg">
      <Header currentView={currentView} setCurrentView={handleSetCurrentView} industries={industries} />
      <main className="flex-grow pt-20">
        <div className={`transition-opacity duration-300 ease-in-out ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`}>
            {renderPage()}
        </div>
      </main>
      <Footer setCurrentView={handleSetCurrentView} industries={industries} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;