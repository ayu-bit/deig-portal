
import React from 'react';
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied correctly.
import './types';
// Fix: Use named imports for react-router-dom to resolve module export errors and for consistency.
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import IndustryHubPage from './pages/IndustryHubPage';
import IndustryDetailPage from './pages/IndustryDetailPage';
import VacancyPage from './pages/VacancyPage';
import ContactPage from './pages/ContactPage';
import ScrollToTopButton from './components/ScrollToTopButton';
import EntranceLoader from './components/EntranceLoader';
import BackgroundAnimation from './components/BackgroundAnimation';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ProcurementPage from './pages/ProcurementPage';
import TendersPage from './pages/TendersPage';
import SupplierRegistrationPage from './pages/SupplierRegistrationPage';
import PresentationTemplatePage from './pages/PresentationTemplatePage';
import AdminPage from './pages/admin/AdminPage';
import LoginPage from './pages/admin/LoginPage';
import { AuthProvider } from './components/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { LanguageProvider } from './contexts/LanguageProvider';
import { ThemeProvider } from './contexts/ThemeProvider';
import { ToastProvider } from './components/ToastProvider';
import ProductionPage from './pages/ProductionPage';


const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const hasLoaded = sessionStorage.getItem('deig-session-loaded');
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingFinished = () => {
    setIsLoading(false);
    sessionStorage.setItem('deig-session-loaded', 'true');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-brand-blue-900">
      {isLoading && <EntranceLoader onFinished={handleLoadingFinished} />}
      <BackgroundAnimation />
      <Header />
      <ScrollToTop />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <div className="bg-brand-blue-50">
                      <AdminPage />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/*"
                element={
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/industry" element={<IndustryHubPage />} />
                      <Route path="/industry/:id" element={<IndustryDetailPage />} />
                      <Route path="/production" element={<ProductionPage />} />
                      <Route path="/news" element={<NewsPage />} />
                      <Route path="/news/:id" element={<NewsDetailPage />} />
                      <Route path="/vacancy" element={<VacancyPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                      <Route path="/terms" element={<TermsAndConditionsPage />} />
                      <Route path="/procurement" element={<ProcurementPage />} />
                      <Route path="/tenders" element={<TendersPage />} />
                      <Route path="/supplier-registration" element={<SupplierRegistrationPage />} />
                      <Route path="/presentation-template" element={<PresentationTemplatePage />} />
                    </Routes>
                  </MainLayout>
                }
              />
            </Routes>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
