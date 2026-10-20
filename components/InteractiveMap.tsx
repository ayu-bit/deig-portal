
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../types';
import { getIndustries } from '../services/api';
import type { Industry } from '../types';
import { Link } from 'react-router-dom';

export const InteractiveMap: React.FC = () => {
    const [industries, setIndustries] = React.useState<Industry[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const data = await getIndustries();
                setIndustries(data);
            } catch (error) {
                console.error("Failed to fetch industries for map:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchIndustries();
    }, []);

    // Approximate center of Addis Ababa in the SVG coordinate space (based on the path)
    const ADDIS_COORDS = { x: 325, y: 300 }; // Guessing center of 650x600 viewBox

    // Helper to calculate line coordinates
    const getLineCoordinates = (ind: Industry) => {
        if (!ind.location) return null;
        // Parse "top: 50%, left: 45%" format
        const top = parseFloat(ind.location.top);
        const left = parseFloat(ind.location.left);
        
        // Convert % to viewBox units (650 width, 600 height)
        const x = (left / 100) * 650;
        const y = (top / 100) * 600;
        
        return { x, y };
    };

    if (loading) {
        return <div className="text-center text-gray-500 p-8">Loading strategic map data...</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Map Container */}
            <div className="relative w-full lg:w-2/3 aspect-[4/3] bg-[#04253D] rounded-xl overflow-hidden shadow-2xl border border-[#1075BB]/30 group">
                
                {/* Background Grid & Scanline */}
                <div className="absolute inset-0 pointer-events-none opacity-20" 
                     style={{ 
                         backgroundImage: 'linear-gradient(#1075BB 1px, transparent 1px), linear-gradient(90deg, #1075BB 1px, transparent 1px)', 
                         backgroundSize: '40px 40px' 
                     }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1075BB]/10 to-transparent opacity-30 animate-scanline pointer-events-none"></div>

                {/* Map SVG */}
                <div className="relative w-full h-full p-8">
                    <svg viewBox="0 0 650 600" className="w-full h-full drop-shadow-lg">
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        
                        {/* Connection Lines */}
                        {industries.map(ind => {
                            const coords = getLineCoordinates(ind);
                            if(!coords) return null;
                            const isHovered = hoveredId === ind.id;
                            return (
                                <g key={`line-${ind.id}`}>
                                    <line 
                                        x1={ADDIS_COORDS.x} y1={ADDIS_COORDS.y} 
                                        x2={coords.x} y2={coords.y} 
                                        stroke="#1075BB" 
                                        strokeWidth={isHovered ? "2" : "1"}
                                        strokeOpacity={isHovered ? "0.8" : "0.3"}
                                        strokeDasharray="5,5"
                                    />
                                    {isHovered && <circle cx={coords.x} cy={coords.y} r="3" fill="#fff" className="animate-ping" />}
                                </g>
                            );
                        })}

                        {/* Ethiopia Map Path */}
                        <path 
                            d="M413.43,599.92,159,516.43,0,400.32,18.84,286.29,48.23,171.1,106.46,95.5,188,38.3,281.18,0,387.1,20.4,466,61.19,541.6,128.26,589.65,225.26,621.14,332.25,650,457.6,606.2,551,529.74,591.08Z" 
                            fill="#0F3854" 
                            stroke="#1075BB" 
                            strokeWidth="2"
                            filter="url(#glow)"
                            className="transition-colors duration-300"
                        />
                    </svg>

                    {/* Pins (HTML Overlay for easier interaction/tooltips) */}
                    {industries.map(industry => (
                        industry.location && (
                            <Link 
                                key={industry.id} 
                                to={`/industry/${industry.id}`}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin z-10"
                                style={{ top: industry.location.top, left: industry.location.left }}
                                onMouseEnter={() => setHoveredId(industry.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className="relative flex items-center justify-center">
                                    <div className={`absolute w-8 h-8 bg-[#1075BB] rounded-full opacity-30 animate-ping ${hoveredId === industry.id ? 'animation-duration-500' : ''}`}></div>
                                    <div className={`relative w-3 h-3 bg-[#1075BB] border-2 border-white rounded-full transition-transform duration-300 ${hoveredId === industry.id ? 'scale-150 bg-white border-[#1075BB]' : ''}`}></div>
                                    
                                    {/* Tooltip */}
                                    <div className={`absolute left-6 top-1/2 -translate-y-1/2 ml-2 bg-[#04253D]/90 backdrop-blur-md border border-[#1075BB] px-3 py-2 rounded shadow-xl text-left w-max transition-all duration-300 ${hoveredId === industry.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`}>
                                        <div className="text-white text-xs font-bold font-montserrat">{industry.acronym}</div>
                                        <div className="text-blue-200 text-[10px] uppercase tracking-wider">Operational</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    ))}
                </div>

                {/* Map UI Decorations */}
                <div className="absolute top-4 left-4 text-white/50 text-[10px] font-mono">
                    <div>LAT: 9.1450° N</div>
                    <div>LON: 40.4897° E</div>
                    <div>STATUS: ACTIVE</div>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-[#1075BB] rounded-full animate-pulse" style={{ animationDelay: `${i*200}ms` }}></div>)}
                </div>
            </div>

            {/* Sidebar List */}
            <div className="w-full lg:w-1/3 space-y-4">
                <div className="bg-white dark:bg-[#04253D] border border-gray-200 dark:border-[#1075BB]/30 rounded-xl p-6 shadow-lg h-full max-h-[600px] overflow-y-auto custom-scrollbar">
                    <h3 className="text-xl font-black text-[#1075BB] dark:text-white font-montserrat mb-4 border-b border-[#1075BB]/20 pb-2">
                        Strategic Sites
                    </h3>
                    <div className="space-y-3">
                        {industries.map(industry => (
                            <Link 
                                key={industry.id}
                                to={`/industry/${industry.id}`}
                                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                                    hoveredId === industry.id 
                                    ? 'bg-[#1075BB] border-[#1075BB] text-white shadow-md transform -translate-x-1' 
                                    : 'bg-gray-50 dark:bg-transparent border-gray-200 dark:border-white/10 hover:border-[#1075BB]/50 hover:bg-blue-50 dark:hover:bg-[#1075BB]/10'
                                }`}
                                onMouseEnter={() => setHoveredId(industry.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border ${
                                    hoveredId === industry.id 
                                    ? 'bg-white text-[#1075BB] border-white' 
                                    : 'bg-white dark:bg-[#1075BB]/20 text-[#1075BB] dark:text-white border-[#1075BB]/30'
                                }`}>
                                    {industry.acronym}
                                </div>
                                <div>
                                    <h4 className={`font-bold font-roboto-condensed text-sm ${hoveredId === industry.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                        {industry.name}
                                    </h4>
                                    <p className={`text-xs mt-0.5 ${hoveredId === industry.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {industry.facilityInfo?.location || 'Unknown Location'}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
