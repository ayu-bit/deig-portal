
import '../types';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedSection, AnimatedCounter } from '../components/AnimatedComponents';
import { useLanguage } from '../hooks/useLanguage';
import { getIndustries } from '../services/api';
import type { Industry } from '../types';
import Loader from '../components/Loader';
import { ThreeDContainer, EngineeringGear, TechShape } from '../components/ThreeDComponents';

// --- Helper Components ---
const SectionTitle: React.FC<{ title: string; subtitle?: string; dark?: boolean }> = ({ title, subtitle, dark = false }) => (
    <div className="text-center mb-16">
        <h2 className={`text-3xl md:text-4xl font-black font-montserrat uppercase tracking-tight mb-3 ${dark ? 'text-white' : 'text-[#1075BB]'}`}>
            {title}
        </h2>
        <div className={`h-1 w-20 mx-auto ${dark ? 'bg-white' : 'bg-[#1075BB]'} mb-4`}></div>
        {subtitle && <p className={`text-lg font-lato max-w-2xl mx-auto ${dark ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>}
    </div>
);

const TechCard: React.FC<{ icon: React.ReactNode; title: string; description: string; index: number }> = ({ icon, title, description, index }) => (
    <div className="relative group bg-white dark:bg-[#1075BB] p-8 rounded-xl shadow-lg border border-gray-100 dark:border-white/20 hover:border-[#1075BB] dark:hover:border-white transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="text-6xl font-black font-montserrat text-[#1075BB] dark:text-white">{`0${index + 1}`}</span>
        </div>
        <div className="relative z-10">
            <div className="w-14 h-14 rounded-lg bg-blue-50 dark:bg-white/10 flex items-center justify-center text-[#1075BB] dark:text-white mb-6 group-hover:bg-[#1075BB] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#1075BB] transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-[#1075BB] dark:text-white font-montserrat mb-3">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-white/80 font-lato leading-relaxed">{description}</p>
        </div>
    </div>
);

const ProcessStep: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
    <div className="relative flex flex-col items-center text-center">
        {/* Connector Line */}
        <div className="absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 dark:bg-white/20 -z-10 hidden md:block step-connector last:hidden"></div>
        
        <div className="w-16 h-16 rounded-full bg-white dark:bg-[#1075BB] border-4 border-[#1075BB] dark:border-white flex items-center justify-center text-2xl font-bold text-[#1075BB] dark:text-white font-montserrat shadow-lg mb-6 z-10">
            {number}
        </div>
        <h4 className="text-lg font-bold text-[#1075BB] dark:text-white uppercase tracking-wider mb-2 font-roboto-condensed">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-white/70 font-lato max-w-xs">{description}</p>
    </div>
);

// --- Page Component ---
const ProductionPage: React.FC = () => {
    const { t } = useLanguage();
    const [industries, setIndustries] = React.useState<Industry[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const industriesData = await getIndustries();
                setIndustries(industriesData);
            } catch (error) {
                console.error("Failed to fetch industries:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const processSteps = ['s1', 's2', 's3', 's4', 's5', 's6'];
    const techItems = ['cnc', 'robotics', 'cadcam'];

    return (
        <div className="bg-gray-50 dark:bg-[#0E62A1]">
            
            {/* 1. Hero Section */}
            <header className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.pexels.com/photos/5824497/pexels-photo-5824497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Advanced Manufacturing" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#1075BB]/70 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1075BB]/90 via-transparent to-[#1075BB]/90"></div>
                    
                    {/* Floating 3D Elements */}
                    <div className="absolute inset-0 pointer-events-none opacity-30">
                        <ThreeDContainer cameraPos={[0, 0, 15]}>
                            <group position={[-8, 4, 0]}>
                                <EngineeringGear color="#ffffff" />
                            </group>
                            <group position={[8, -4, -2]}>
                                <TechShape type="torus" color="#ffffff" />
                            </group>
                            <group position={[0, -8, -5]}>
                                <EngineeringGear color="#ffffff" />
                            </group>
                        </ThreeDContainer>
                    </div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-7xl font-black text-white font-montserrat mb-6 tracking-tight drop-shadow-lg">
                            {t('productionPage.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-lato font-light leading-relaxed mb-10">
                            {t('productionPage.subtitle')}
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="#process-flow" className="px-8 py-3 bg-white text-[#1075BB] hover:bg-gray-100 font-bold rounded shadow-lg transition-all font-roboto-condensed uppercase tracking-wider">
                                Our Process
                            </a>
                            <a href="#capacity" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded hover:bg-white hover:text-[#1075BB] transition-all font-roboto-condensed uppercase tracking-wider">
                                Capacity Stats
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </header>

            {/* 2. Intro & Philosophy */}
            <section className="py-24 bg-white dark:bg-[#1075BB]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection>
                            <h2 className="text-3xl font-bold text-[#1075BB] dark:text-white font-montserrat mb-6">
                                Precision Engineering at Scale
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-white/90 leading-relaxed font-lato mb-6 text-justify">
                                {t('productionPage.overview.p1')}
                            </p>
                            <ul className="space-y-3">
                                {['ISO 9001 Certified Processes', 'Automated Quality Control', 'Lean Manufacturing Principles'].map((item, i) => (
                                    <li key={i} className="flex items-center text-[#1075BB] dark:text-white font-bold font-roboto-condensed">
                                        <svg className="w-5 h-5 text-[#1075BB] dark:text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>
                        <AnimatedSection delay={200}>
                            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-[#1075BB] dark:border-white">
                                <img src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Factory Floor" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-[#1075BB]/10"></div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* 3. Production Process (Horizontal Timeline) */}
            <section id="process-flow" className="py-24 bg-gray-50 dark:bg-[#0E62A1] overflow-hidden">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <SectionTitle 
                            title={t('productionPage.process.title')} 
                            subtitle="From raw material sourcing to final delivery, every step is optimized for quality and efficiency." 
                            dark={true} // In dark context (which is now Blue #0E62A1)
                        />
                    </AnimatedSection>
                    
                    <div className="mt-16 relative">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                            {processSteps.map((stepKey, index) => (
                                <AnimatedSection key={stepKey} delay={index * 100}>
                                    <ProcessStep 
                                        number={index + 1} 
                                        title={t(`productionPage.process.${stepKey}.title`)} 
                                        description={t(`productionPage.process.${stepKey}.desc`)} 
                                    />
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Technologies */}
            <section id="technologies" className="py-24 bg-[#1075BB] relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <AnimatedSection>
                        <SectionTitle 
                            title={t('productionPage.tech.title')} 
                            dark={true}
                        />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {techItems.map((item, index) => (
                            <AnimatedSection key={item} delay={index * 150}>
                                <TechCard
                                    index={index}
                                    icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
                                    title={t(`productionPage.tech.${item}.title`)}
                                    description={t(`productionPage.tech.${item}.desc`)}
                                />
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Stats Parallax */}
            <section id="capacity" className="py-32 bg-fixed bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.pexels.com/photos/5825576/pexels-photo-5825576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-[#1075BB]/80"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
                        <AnimatedSection>
                            <div className="text-6xl font-black font-montserrat mb-2 text-white">
                                <AnimatedCounter end={5} />M+
                            </div>
                            <p className="text-xl uppercase tracking-widest font-roboto-condensed opacity-80">{t('productionPage.capacity.area')} (m²)</p>
                        </AnimatedSection>
                        <AnimatedSection delay={200}>
                            <div className="text-6xl font-black font-montserrat mb-2 text-white">
                                <AnimatedCounter end={12} />+
                            </div>
                            <p className="text-xl uppercase tracking-widest font-roboto-condensed opacity-80">{t('productionPage.capacity.lines')}</p>
                        </AnimatedSection>
                        <AnimatedSection delay={400}>
                            <div className="text-6xl font-black font-montserrat mb-2 text-white">
                                <AnimatedCounter end={5000} />+
                            </div>
                            <p className="text-xl uppercase tracking-widest font-roboto-condensed opacity-80">{t('productionPage.capacity.staff')}</p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* 6. Production Divisions Grid */}
            <section className="py-24 bg-white dark:bg-[#1075BB]">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <SectionTitle title={t('productionPage.divisions.title')} subtitle="Specialized manufacturing units driving our industrial output." dark={true} />
                    </AnimatedSection>

                    {loading ? <div className="flex justify-center"><Loader /></div> :
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {industries.slice(0, 6).map((industry, index) => (
                                <AnimatedSection key={industry.id} delay={index * 100}>
                                    <Link to={`/industry/${industry.id}`} className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#1075BB]">
                                        <div className="h-48 relative overflow-hidden">
                                            <img src={industry.gallery[0]} alt={industry.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-[#1075BB]/20 group-hover:bg-transparent transition-colors"></div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-[#1075BB] font-montserrat mb-2">{industry.acronym}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">{industry.name}</p>
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    }
                </div>
            </section>
        </div>
    );
};

export default ProductionPage;
