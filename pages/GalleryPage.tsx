
import React, { useState, useMemo, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import Lightbox from '../components/Lightbox';
import { MediaFile, MediaFolder } from '../types';
import { MEDIA_FOLDERS } from '../constants'; // Keeping folder structure static for organization, could be API too
import { useLanguage } from '../contexts/LanguageContext';
import { fetchMediaFiles } from '../services/apiService';

const GalleryPage: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [mainTab, setMainTab] = useState<'Productions' | 'General'>('Productions');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev' | 'fade'>('fade');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
        try {
            const files = await fetchMediaFiles();
            setMediaFiles(files.filter(f => f.type === 'Image'));
            setFolders(MEDIA_FOLDERS); 
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, []);

  useEffect(() => {
    setActiveCategory('All');
  }, [mainTab]);

  const productionParentFolderId = 'f1'; 
  const generalFolderIds = ['f5', 'f6', 'f7']; 

  const categories = useMemo(() => {
    if (mainTab === 'Productions') {
      const productionFolders = folders.filter(f => f.parentId === productionParentFolderId);
      return ['All', ...productionFolders.map(f => f.name)];
    }
    if (mainTab === 'General') {
      const generalFolders = folders.filter(f => generalFolderIds.includes(f.id));
      return ['All', ...generalFolders.map(f => f.name)];
    }
    return ['All'];
  }, [folders, mainTab]);
  
  const folderNameToIdMap = useMemo(() => {
      return folders.reduce((acc, folder) => {
          acc[folder.name] = folder.id;
          return acc;
      }, {} as Record<string, string>);
  }, [folders]);

  const filteredImages = useMemo(() => {
    // In a real app with dynamic folders, logic might differ. 
    // Here we assume uploads via Admin allow selecting these predefined folders or fallback to "General".
    // For simplicity, we just show all images if folder logic doesn't strictly match static constants.
    if (mediaFiles.length === 0) return [];
    
    // Simplification for demo: If API returns flat list, just show them. 
    // Real implementation would require folderID management in Admin Upload.
    return mediaFiles; 
  }, [mediaFiles]);


  const openLightbox = (index: number) => {
    setAnimationDirection('fade');
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const goToNext = () => {
    if (filteredImages.length === 0) return;
    setAnimationDirection('next');
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const goToPrev = () => {
    if (filteredImages.length === 0) return;
    setAnimationDirection('prev');
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-surfaceDark/50">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-surfaceDark">
          <div className="absolute inset-0 z-0">
              <img 
                  src="https://images.unsplash.com/photo-1574944994993-97875e11f44e?q=80&w=1920&auto=format&fit=crop" 
                  alt="Gallery Background" 
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
                          {t('gallery_title')}
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                          {t('gallery_subtitle')}
                      </p>
                      <div className="mt-12 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                  </div>
              </AnimatedSection>
          </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <AnimatedSection className="mb-20">
          <div className="flex justify-center p-2 bg-surface dark:bg-surfaceDark rounded-full border border-gray-100 dark:border-white/5 max-w-md mx-auto shadow-xl shadow-primary/5">
            <button
              onClick={() => setMainTab('Productions')}
              className={`flex-1 px-8 py-3 text-sm font-bold rounded-full transition-all duration-300 ${mainTab === 'Productions' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-primary dark:text-gray-400'}`}
            >
              {t('gallery_tab_productions')}
            </button>
            <button
              onClick={() => setMainTab('General')}
              className={`flex-1 px-8 py-3 text-sm font-bold rounded-full transition-all duration-300 ${mainTab === 'General' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-primary dark:text-gray-400'}`}
            >
              {t('gallery_tab_general')}
            </button>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
            <p className="text-xl text-gray-400 font-medium">Loading Gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <AnimatedSection key={image.id} delay={`${(index % 4) * 100}ms`}>
                  <div
                    onClick={() => openLightbox(index)}
                    className="group relative block w-full aspect-square bg-surface dark:bg-surfaceDark rounded-[2rem] overflow-hidden shadow-lg cursor-pointer border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
                  >
                    <img
                      src={image.url.startsWith('http') ? image.url : `http://localhost:5000${image.url}`}
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-500">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            ) : (
              <div className="col-span-full text-center py-32 bg-surface dark:bg-surfaceDark rounded-[3rem] border border-dashed border-gray-200 dark:border-white/10">
                <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-textDark dark:text-textLight mb-2 font-display">No images found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg">The gallery is currently empty.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <Lightbox
          images={filteredImages.map(img => img.url.startsWith('http') ? img.url : `http://localhost:5000${img.url}`)}
          selectedIndex={selectedImageIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrev}
          animationDirection={animationDirection}
        />
      )}
    </div>
  );
};

export default GalleryPage;
