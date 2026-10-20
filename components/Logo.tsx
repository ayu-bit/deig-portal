
import React, { useState, useEffect } from 'react';
import { getSettings } from '../services/api';

interface LogoProps {
    className?: string;
    showText?: boolean;
    textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", showText = true, textClassName = "text-2xl font-black text-gray-800 dark:text-white" }) => {
    const [imageError, setImageError] = useState(false);
    const [logoUrl, setLogoUrl] = useState('/images/deiglogo.png');

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const settings = await getSettings();
                if (settings && settings.logoUrl && settings.logoUrl !== '/images/deiglogo.png') {
                    setLogoUrl(settings.logoUrl);
                }
            } catch (error) {
                console.error('Failed to fetch logo from settings', error);
            }
        };
        fetchLogo();
    }, []);

    return (
        <div className="flex items-center gap-3">
            {!imageError ? (
                /* 
                   INSTRUCTION: Place your logo image file named 'deiglogo.png' 
                   inside the 'public/images' folder of your project root. 
                */
                <img 
                    src={logoUrl} 
                    alt="DEIG Logo" 
                    className={`${className} object-contain`}
                    onError={() => setImageError(true)}
                />
            ) : (
                /* Fallback SVG if /logo.png is not found in the public folder */
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    {/* Main Blue Square */}
                    <rect width="100" height="100" rx="18" fill="#1075BB" />
                    
                    {/* Diagonal Lines (White) */}
                    <path d="M-10 110 L55 45" stroke="white" strokeWidth="8" strokeLinecap="round" />
                    <path d="M10 110 L75 45" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
                    <path d="M30 110 L95 45" stroke="white" strokeWidth="8" strokeLinecap="round" />
                    
                    {/* Arrow pointing up-right */}
                    <path d="M60 40 L90 10 L95 40" fill="white" />
                    <path d="M90 10 L60 15" fill="white" />
                </svg>
            )}
            
            {showText && (
                <span className={`uppercase tracking-wider font-montserrat ${textClassName}`}>
                    DEIG
                </span>
            )}
        </div>
    );
};

export default Logo;
