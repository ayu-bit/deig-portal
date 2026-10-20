
import React, { useState, useEffect } from 'react';
import '../types';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getIndustryById, getIndustries } from '../services/api';
import type { Industry } from '../types';
import { AnimatedSection } from '../components/AnimatedComponents';
import Loader from '../components/Loader';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../contexts/ToastContext';
import { ThreeDContainer, Industry3D, TechShape } from '../components/ThreeDComponents';

// --- Utility Components ---

const BlueprintGrid = () => (
    <div className="absolute inset-0 pointer-events-none z-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(16, 117, 187, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 117, 187, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
    }}></div>
);

const SectionTitle: React.FC<{ title: string; subtitle?: string; dark?: boolean }> = ({ title, subtitle, dark = false }) => (
    <div className={`mb-12 border-l-4 ${dark ? 'border-white' : 'border-[#1075BB]'} pl-6`}>
        <h2 className={`text-4xl font-black font-montserrat uppercase tracking-tight ${dark ? 'text-white' : 'text-[#1075BB]'}`}>
            {title}
        </h2>
        {subtitle && <p className={`mt-2 text-lg font-roboto-condensed ${dark ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>}
    </div>
);

const TechCard: React.FC<{ title: string; desc: string; index: number }> = ({ title, desc, index }) => (
    <div className="group relative h-full bg-white dark:bg-[#1075BB] border border-gray-200 dark:border-white/20 p-8 transition-all duration-300 hover:border-[#1075BB] dark:hover:border-white hover:shadow-xl overflow-hidden">
        {/* Technical Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-200 group-hover:border-[#1075BB] dark:group-hover:border-white transition-colors"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-200 group-hover:border-[#1075BB] dark:group-hover:border-white transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-200 group-hover:border-[#1075BB] dark:group-hover:border-white transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-200 group-hover:border-[#1075BB] dark:group-hover:border-white transition-colors"></div>

        <div className="flex items-baseline justify-between mb-4">
            <span className="text-4xl font-black text-[#1075BB]/20 dark:text-white/20 group-hover:text-[#1075BB] dark:group-hover:text-white transition-colors">
                {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-grow bg-blue-100 dark:bg-white/20 mx-4 group-hover:bg-[#1075BB] dark:group-hover:bg-white"></div>
        </div>
        
        <h3 className="text-xl font-bold font-montserrat text-[#1075BB] dark:text-white mb-3 group-hover:translate-x-1 transition-transform">
            {title}
        </h3>
        <p className="text-gray-600 dark:text-white/80 font-lato leading-relaxed">
            {desc}
        </p>
    </div>
);

const WorkflowStep: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
    <div className="relative flex flex-col items-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-[#0E62A1] border-2 border-white flex items-center justify-center text-xl font-bold text-white font-mono mb-4 z-10 shadow-lg">
            {number}
        </div>
        <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2">{title}</h4>
        <p className="text-sm text-white/70 font-lato max-w-xs">{desc}</p>
        
        {/* Connector Line (hidden on last item via CSS in parent) */}
        <div className="hidden md:block absolute top-14 left-1/2 w-full h-0.5 bg-white/20 -z-0 step-connector"></div>
    </div>
);

const ProductModal: React.FC<{ product: any; onClose: () => void }> = ({ product, onClose }) => {
    if (!product) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-[#1075BB] w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-white/20" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <div className="w-full md:w-1/2 bg-black relative min-h-[300px]">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <span className="inline-block px-2 py-1 bg-[#1075BB] text-white text-[10px] font-bold uppercase tracking-widest mb-2">
                            Deployment Ready
                        </span>
                    </div>
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-3xl font-black text-[#1075BB] dark:text-white font-montserrat uppercase">{product.name}</h3>
                        <div className="h-1 w-20 bg-[#1075BB] dark:bg-white mt-2"></div>
                    </div>
                    
                    <div className="flex-grow">
                        <h4 className="text-sm font-bold text-gray-500 dark:text-white/70 uppercase tracking-wider mb-2">System Description</h4>
                        <p className="text-gray-700 dark:text-white font-lato leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <h4 className="text-sm font-bold text-gray-500 dark:text-white/70 uppercase tracking-wider mb-2">Technical Specifications</h4>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-3 bg-gray-100 dark:bg-white/10 border-l-2 border-[#1075BB] dark:border-white">
                                <span className="block text-[10px] text-gray-500 dark:text-white/60 uppercase">Operational Range</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Classified</span>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-white/10 border-l-2 border-[#1075BB] dark:border-white">
                                <span className="block text-[10px] text-gray-500 dark:text-white/60 uppercase">Service Life</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">20+ Years</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-[#1075BB] dark:bg-white hover:bg-[#0E62A1] dark:hover:bg-gray-100 text-white dark:text-[#1075BB] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Request Technical Datasheet
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---

const IndustryDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [industry, setIndustry] = useState<Industry | null>(null);
    const [relatedIndustries, setRelatedIndustries] = useState<Industry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('overview');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const { t } = useLanguage();
    const { addToast } = useToast();

    useEffect(() => {
        if (id) {
            const fetchIndustry = async () => {
                try {
                    setLoading(true);
                    const data = await getIndustryById(id);
                    setIndustry(data);
                    
                    // Fetch all industries to filter for related ones
                    const allIndustries = await getIndustries();
                    // Just filtering out the current one and taking first 3 for demo
                    setRelatedIndustries(allIndustries.filter(ind => ind.id !== id).slice(0, 3));
                    
                    window.scrollTo(0, 0);
                } catch (err) {
                    setError('Failed to load industry data.');
                } finally {
                    setLoading(false);
                }
            };
            fetchIndustry();
        }
    }, [id]);

    // Scroll Spy Logic
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150; // Offset for header
            
            const sections = ['overview', 'capabilities', 'products', 'innovation', 'leadership', 'contact'];
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Height of sticky nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addToast('Secure inquiry transmitted to division HQ.', 'success');
        (e.target as HTMLFormElement).reset();
    };

    if (loading) return <div className="flex justify-center items-center h-screen bg-[#1075BB]"><Loader /></div>;
    if (error || !industry) return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#1075BB] text-white">
            <h1 className="text-3xl font-black mb-4 font-montserrat">DIVISION NOT FOUND</h1>
            <button onClick={() => navigate('/industry')} className="px-6 py-2 border border-white hover:bg-white hover:text-[#1075BB] rounded uppercase font-bold transition-all">Return to Hub</button>
        </div>
    );

    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'capabilities', label: 'Capabilities' },
        { id: 'products', label: 'Systems' },
        { id: 'innovation', label: 'R&D' },
        { id: 'leadership', label: 'Command' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 font-lato overflow-x-hidden">
            
            {/* 1. CINEMATIC HERO SECTION */}
            <header className="relative h-screen min-h-[600px] w-full overflow-hidden flex flex-col justify-end pb-20 z-10 bg-[#1075BB]">
                <div className="absolute inset-0 z-0">
                    {industry.video ? (
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
                            <source src={industry.video} type="video/mp4" />
                        </video>
                    ) : (
                        <img src={industry.gallery?.[0] || 'https://images.pexels.com/photos/2569839/pexels-photo-2569839.jpeg'} alt={industry.name} className="w-full h-full object-cover opacity-50" />
                    )}
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1075BB] via-transparent to-black/40"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                    
                    {/* Animated Grid Overlay */}
                    <div className="absolute inset-0 blueprint-overlay opacity-30"></div>

                    {/* Floating 3D Elements */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <ThreeDContainer cameraPos={[0, 0, 8]}>
                            <group position={[5, 2, 0]}>
                                <Industry3D industryId={industry.id} color="#ffffff" />
                            </group>
                            <group position={[-5, -2, -2]}>
                                <TechShape type="octahedron" color="#ffffff" />
                            </group>
                        </ThreeDContainer>
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <AnimatedSection>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-px w-12 bg-white"></div>
                                <span className="text-white font-bold uppercase tracking-[0.3em] text-xs font-roboto-condensed">Strategic Division</span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-black text-white font-montserrat tracking-tighter leading-none mb-2">
                                {industry.acronym}
                            </h1>
                            <h2 className="text-xl md:text-3xl text-white/90 font-light font-roboto-condensed max-w-3xl border-l-4 border-white/20 pl-6">
                                {t(`industries.${industry.id}.name`, industry.name)}
                            </h2>
                            
                            {/* Hero Stats */}
                            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                                <div>
                                    <span className="block text-xs text-white/70 uppercase tracking-widest mb-1">HQ Location</span>
                                    <span className="block text-lg font-bold text-white font-mono">{industry.facilityInfo?.location?.split(',')?.[0] || 'Unknown'}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-white/70 uppercase tracking-widest mb-1">Facility Size</span>
                                    <span className="block text-lg font-bold text-white font-mono">{industry.facilityInfo?.area || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-white/70 uppercase tracking-widest mb-1">Status</span>
                                    <span className="flex items-center text-lg font-bold text-white font-mono gap-2">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </header>

            {/* 2. STICKY COMMAND BAR */}
            <div className="sticky top-[72px] z-40 bg-white/95 dark:bg-[#1075BB]/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-md">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <div className="hidden md:block font-black text-xl text-[#1075BB] dark:text-white font-montserrat">{industry.acronym}</div>
                        <div className="flex gap-1 overflow-x-auto w-full md:w-auto">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-4 ${
                                        activeSection === item.id 
                                        ? 'border-[#1075BB] dark:border-white text-[#1075BB] dark:text-white bg-gray-50 dark:bg-white/10' 
                                        : 'border-transparent text-gray-500 dark:text-white/60 hover:text-[#1075BB] dark:hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <Link to="/contact" className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1075BB] dark:text-white hover:underline transition-colors">
                            <span className="w-2 h-2 bg-current rounded-full"></span> Secure Comms
                        </Link>
                    </div>
                </div>
            </div>

            {/* 3. CONTENT SECTIONS */}
            <main className="relative">
                <BlueprintGrid />

                {/* OVERVIEW */}
                <section id="overview" className="py-24 relative">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <AnimatedSection>
                                <SectionTitle title="Strategic Mandate" subtitle="Operational Scope & Mission" />
                                <p className="text-xl text-gray-700 dark:text-white/90 leading-relaxed font-lato mb-8 text-justify whitespace-pre-wrap">
                                    {t(`industries.${industry.id}.description`, industry.description)}
                                </p>
                                
                                <div className="bg-[#1075BB] text-white p-8 rounded-none border-l-4 border-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
                                        <svg width="200" height="200" viewBox="0 0 200 200" fill="white"><path d="M100 0L200 100L100 200L0 100L100 0Z" /></svg>
                                    </div>
                                    <h4 className="text-white/70 font-bold uppercase text-xs tracking-widest mb-4">Core Focus</h4>
                                    <p className="text-xl font-montserrat font-bold italic relative z-10">
                                        "{t(`industries.${industry.id}.focus`, industry.focus)}"
                                    </p>
                                </div>
                            </AnimatedSection>
                            
                            <AnimatedSection delay={200}>
                                <div className="relative group">
                                    {/* Tech Border */}
                                    <div className="absolute -inset-2 border-2 border-blue-100 dark:border-white/20 z-0"></div>
                                    <div className="absolute -inset-2 border-2 border-[#1075BB] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-105"></div>
                                    
                                    <div className="relative h-[500px] overflow-hidden bg-[#1075BB] z-10">
                                        <img src={industry.gallery?.[1] || industry.gallery?.[0] || 'https://images.pexels.com/photos/2569839/pexels-photo-2569839.jpeg'} alt="Facility" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                                        <div className="absolute inset-0 bg-[#1075BB]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                        
                                        {/* Overlay Stats */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-6 border-t border-white/20">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-xs text-white/70 uppercase">Establishment</div>
                                                    <div className="text-white font-mono">2010</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-white/70 uppercase">Workforce</div>
                                                    <div className="text-white font-mono">1,200+</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* WORKFLOW (New Section) */}
                <section className="py-20 bg-[#1075BB] border-t border-white/10">
                    <div className="container mx-auto px-6">
                        <AnimatedSection>
                            <h3 className="text-2xl font-bold text-white text-center mb-12 uppercase tracking-widest font-roboto-condensed">Operational Workflow</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <WorkflowStep number="01" title="R&D Phase" desc="Concept design and simulation testing in virtual environments." />
                                <WorkflowStep number="02" title="Prototyping" desc="Rapid fabrication of initial units for stress testing." />
                                <WorkflowStep number="03" title="Production" desc="Mass manufacturing using automated CNC and assembly lines." />
                                <WorkflowStep number="04" title="QA & Delivery" desc="Rigorous ballistics testing and final deployment logistics." />
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* CAPABILITIES */}
                <section id="capabilities" className="py-24 bg-gray-50 dark:bg-gray-800 relative border-y border-gray-200 dark:border-white/10">
                    <div className="container mx-auto px-6 relative z-10">
                        <AnimatedSection>
                            <div className="max-w-4xl mb-16">
                                <SectionTitle title="Engineering Capabilities" subtitle="Specialized Competencies & Infrastructure" />
                            </div>
                        </AnimatedSection>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {(industry.capabilities || []).map((cap, idx) => (
                                <AnimatedSection key={idx} delay={idx * 100}>
                                    <TechCard title={cap.name} desc={cap.description} index={idx} />
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRODUCTS */}
                <section id="products" className="py-24 bg-white dark:bg-[#1075BB] relative">
                    <div className="container mx-auto px-6">
                        <AnimatedSection>
                            <SectionTitle title="Systems Portfolio" subtitle="Deployed Assets & Solutions" dark={true} />
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(industry.products || []).map((product, idx) => (
                                <AnimatedSection key={idx} delay={idx * 100}>
                                    <div 
                                        className="group bg-gray-100 dark:bg-[#0E62A1] rounded-sm overflow-hidden border border-gray-200 dark:border-white/10 hover:border-[#1075BB] dark:hover:border-white transition-all cursor-pointer relative"
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        <div className="h-64 relative overflow-hidden">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
                                            <div className="absolute inset-0 bg-[#1075BB]/20 group-hover:bg-transparent transition-colors"></div>
                                            
                                            {/* Hover Reveal Overlay */}
                                            <div className="absolute inset-0 bg-[#1075BB]/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="text-white font-bold uppercase tracking-widest border-2 border-white px-6 py-2">
                                                    Access Data
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 relative">
                                            {/* Decorative Corner */}
                                            <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-[#1075BB] dark:border-t-white border-l-[20px] border-l-transparent"></div>
                                            
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-montserrat mb-2">{product.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-white/80 line-clamp-2">{product.description}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                    {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
                </section>

                {/* INNOVATION & R&D */}
                <section id="innovation" className="py-24 bg-gray-900 relative text-white overflow-hidden">
                    {/* Background Tech Elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1075BB]/20 transform skew-x-12 translate-x-20"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            <div className="lg:col-span-1 space-y-10">
                                <AnimatedSection>
                                    <h2 className="text-4xl font-black font-montserrat text-[#1075BB] mb-6">FUTURE SYSTEMS LAB</h2>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Pioneering the next generation of defense technologies through advanced research in materials, AI, and autonomous systems.
                                    </p>
                                </AnimatedSection>

                                <div className="space-y-6">
                                    {(industry.technicalHighlights || []).map((tech, idx) => (
                                        <AnimatedSection key={idx} delay={idx * 150}>
                                            <div className="border-l-2 border-[#1075BB] pl-6 py-2 hover:border-white transition-colors">
                                                <h4 className="text-lg font-bold font-roboto-condensed text-white mb-1">{tech.title}</h4>
                                                <p className="text-sm text-gray-500">{tech.description}</p>
                                            </div>
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                <AnimatedSection delay={300}>
                                    <div className="bg-[#1075BB]/50 rounded-xl border border-[#1075BB] p-1 relative shadow-2xl backdrop-blur-sm">
                                        {/* Viewer Header */}
                                        <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
                                            <span className="text-white text-xs font-mono px-2 py-1 border border-white/30 bg-black/60 rounded">LIVE PREVIEW</span>
                                            <span className="text-[#1075BB] text-xs font-mono animate-pulse bg-white px-2 py-0.5 rounded">Connection Stable</span>
                                        </div>

                                        <div className="h-[600px] w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1075BB] to-black rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 blueprint-overlay opacity-20"></div>
                                            <ThreeDContainer cameraPos={[0, 0, 4]} interactive={true}>
                                                <Industry3D industryId={industry.id} color="#ffffff" />
                                            </ThreeDContainer>
                                        </div>
                                        
                                        {/* Viewer Footer */}
                                        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                            <span className="text-[10px] text-white uppercase tracking-[0.3em]">Interactive 3D Model Visualization</span>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </section>

                {/* LEADERSHIP (New Section) */}
                <section id="leadership" className="py-24 bg-gray-50 dark:bg-[#1075BB] border-t border-gray-200 dark:border-white/10">
                    <div className="container mx-auto px-6">
                        <AnimatedSection>
                            <SectionTitle title="Command Structure" subtitle="Divisional Leadership & Management" dark={true} />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-white dark:bg-[#0E62A1] border border-gray-200 dark:border-white/10 p-6 flex items-center gap-6 shadow-lg">
                                    <div className="w-24 h-24 bg-gray-200 dark:bg-white/10 rounded-full flex-shrink-0 overflow-hidden">
                                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" alt={industry.contactPerson} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white font-montserrat">{industry.contactPerson}</h4>
                                        <p className="text-[#1075BB] dark:text-white/80 font-bold text-xs uppercase tracking-wider mb-2">Director General</p>
                                        <p className="text-gray-500 dark:text-white/60 text-sm">Strategic operations oversight.</p>
                                    </div>
                                </div>
                                {/* Placeholder Officers */}
                                <div className="bg-white dark:bg-[#0E62A1] border border-gray-200 dark:border-white/10 p-6 flex items-center gap-6 shadow-lg opacity-80">
                                    <div className="w-24 h-24 bg-gray-200 dark:bg-white/10 rounded-full flex-shrink-0 flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-white">
                                        ?
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white font-montserrat">Head of R&D</h4>
                                        <p className="text-[#1075BB] dark:text-white/80 font-bold text-xs uppercase tracking-wider mb-2">Chief Engineer</p>
                                        <p className="text-gray-500 dark:text-white/60 text-sm">Innovation and development lead.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* CONTACT FOOTER */}
                <section id="contact" className="py-24 bg-[#1075BB] border-t border-white/10">
                    <div className="container mx-auto px-6">
                        <AnimatedSection>
                            <div className="bg-[#0E62A1] rounded-lg p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl border border-white/10">
                                <div>
                                    <h3 className="text-3xl font-black text-white font-montserrat mb-2">Initiate Secure Channel</h3>
                                    <p className="text-white/80">Direct communication line to {industry.acronym} operational command.</p>
                                    
                                    <div className="mt-8 flex flex-col sm:flex-row gap-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1075BB]">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-white/70 uppercase font-bold">Secure Line</div>
                                                <div className="text-white font-mono text-lg">{industry.contact?.phone || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1075BB]">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-white/70 uppercase font-bold">Official Email</div>
                                                <div className="text-white font-mono text-lg">{industry.contact?.email || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-auto">
                                    <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4 w-full md:w-96">
                                        <input type="text" placeholder="Subject / Clearance Code" className="bg-[#1075BB] border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-white placeholder-white/50" required />
                                        <button type="submit" className="bg-white hover:bg-gray-100 text-[#1075BB] font-bold py-4 px-8 rounded shadow-lg transition-all uppercase tracking-widest text-sm">
                                            Transmit Inquiry
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* RELATED INDUSTRIES (New Section) */}
                <section className="py-20 bg-[#1075BB] border-t border-white/10">
                    <div className="container mx-auto px-6">
                        <h3 className="text-xl font-bold text-white mb-8 font-roboto-condensed uppercase tracking-wider">Related Strategic Divisions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedIndustries.map(ind => (
                                <Link key={ind.id} to={`/industry/${ind.id}`} className="group block bg-[#0E62A1] border border-white/10 hover:bg-white hover:text-[#1075BB] p-6 rounded-lg transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-2xl font-black text-white group-hover:text-[#1075BB] font-montserrat">{ind.acronym}</h4>
                                        <span className="text-[#1075BB] opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/80 group-hover:text-gray-600 line-clamp-2">{ind.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default IndustryDetailPage;
