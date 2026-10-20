import React, { useState, useRef, useEffect } from 'react';
import { CurrentView, Industry } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface InteractiveMapProps {
    industries: Industry[];
    setCurrentView: (view: CurrentView) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ industries, setCurrentView }) => {
    const [activePinId, setActivePinId] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const { language, t } = useLanguage();

    const handlePinClick = (e: React.MouseEvent, industryId: string) => {
        e.stopPropagation();
        setActivePinId(currentId => (currentId === industryId ? null : industryId));
    };
    
    const handleExploreClick = (industryId: string) => {
        setCurrentView({ page: 'Industry', industryId });
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mapRef.current && !mapRef.current.contains(event.target as Node)) {
                setActivePinId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div 
            ref={mapRef}
            className="relative aspect-video max-w-4xl mx-auto bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-2xl"
            onClick={() => setActivePinId(null)}
        >
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Blank_map_of_Ethiopia_%28regions%29.svg" 
                alt="Map of Ethiopia" 
                className="w-full h-full object-contain filter grayscale brightness-105 contrast-125 dark:brightness-75 dark:contrast-100"
            />
            
            {industries.map(industry => {
                const isActive = activePinId === industry.id;
                return (
                    <div 
                        key={industry.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top: industry.coordinates.top, left: industry.coordinates.left }}
                    >
                        <button 
                            onClick={(e) => handlePinClick(e, industry.id)}
                            className="relative w-5 h-5 bg-accentStrong rounded-full map-pin border-2 border-white focus:outline-none"
                            aria-label={`Location of ${industry.fullName[language]}`}
                        />
                        <div 
                            className={`absolute bottom-full mb-3 w-48 p-3 bg-primaryDark/90 backdrop-blur-sm border border-textLight/20 rounded shadow-lg text-left transition-all duration-300 transform -translate-x-1/2 left-1/2 z-10 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h4 className="font-bold text-textLight text-sm">{industry.shortName}</h4>
                            <p className="text-textLight/80 text-xs mb-2">{industry.fullName[language]}</p>
                            <button onClick={() => handleExploreClick(industry.id)} className="text-textLight text-xs font-semibold hover:text-white transition-colors duration-200">
                                {t('learn_more')} &rarr;
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default InteractiveMap;