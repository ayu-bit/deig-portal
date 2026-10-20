
import React from 'react';
import '../types';
import { AnimatedSection } from '../components/AnimatedComponents';
import { getPages, getSettings } from '../services/api';
import type { Leader, Page } from '../types';
import { LEADERSHIP_TEAM, PARTNERS, MILESTONES } from '../constants';
import { useLanguage } from '../hooks/useLanguage';
import Loader from '../components/Loader';
import { ThreeDContainer, CyberNetwork, TechShape } from '../components/ThreeDComponents';

// --- Helper Components ---
const SectionTitle: React.FC<{ title: string; subtitle?: string; darkText?: boolean }> = ({ title, subtitle, darkText = false }) => (
    <div className="text-center mb-16">
        <h2 className={`text-3xl md:text-4xl font-black font-montserrat uppercase tracking-tight mb-4 ${darkText ? 'text-[#1075BB]' : 'text-white'}`}>{title}</h2>
        {subtitle && <p className={`max-w-2xl mx-auto font-lato text-lg ${darkText ? 'text-gray-600' : 'text-brand-blue-100'}`}>{subtitle}</p>}
    </div>
);

const VerticalTimeline: React.FC = () => {
    return (
        <div className="relative container mx-auto px-6 py-12">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-[#1075BB]/20 md:-ml-0.5"></div>
            <div className="space-y-12">
                {MILESTONES.map((milestone, index) => (
                    <AnimatedSection key={index} delay={index * 100}>
                        <div className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 w-full"></div>
                            <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-white rounded-full border-4 border-[#1075BB] md:-translate-x-1/2 z-10 shadow-lg"></div>
                            <div className={`flex-1 w-full pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                <div className="bg-[#0D629E] p-6 rounded-lg shadow-lg border border-white/10 hover:border-white transition-colors relative">
                                    <span className="text-4xl font-black text-white/10 absolute top-2 right-4 z-0">{milestone.year}</span>
                                    <h3 className="text-2xl font-black text-white font-montserrat mb-2 relative z-10">{milestone.year}</h3>
                                    <h4 className="text-lg font-bold text-white font-roboto-condensed mb-2 relative z-10">{milestone.event}</h4>
                                    <p className="text-brand-blue-100 font-lato text-sm relative z-10">{milestone.details}</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
};

const IntroductionSection: React.FC<{ info?: any }> = ({ info }) => {
    const { t } = useLanguage();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
                <h2 className="text-4xl font-black text-white font-montserrat mb-6 leading-tight">
                    {info?.introTitle || 'Engineering Sovereignty & National Strength.'}
                </h2>
                <div className="space-y-6">
                    <p className="text-lg text-brand-blue-50 leading-relaxed font-lato text-justify">
                        {info?.introP1 || t('aboutPage.introduction.p1')}
                    </p>
                    <p className="text-lg text-brand-blue-50/80 font-lato text-justify">
                        {info?.introP2 || t('aboutPage.introduction.p2')}
                    </p>
                </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
                <div className="relative group">
                    <div className="absolute inset-0 bg-white/20 rounded-lg transform translate-x-4 translate-y-4"></div>
                    <img 
                        src={info?.introImageUrl || "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                        alt="National Engineering" 
                        className="relative rounded-lg shadow-2xl z-10 w-full object-cover aspect-video lg:aspect-auto" 
                    />
                    
                    {/* 3D Overlay for Image */}
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-brand-blue-900/40 rounded-lg backdrop-blur-sm">
                        <ThreeDContainer cameraPos={[0, 0, 3]}>
                            <TechShape type="torus" color="#ffffff" />
                        </ThreeDContainer>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};

const LeadershipCard: React.FC<{ leader: Leader }> = ({ leader }) => (
    <div className="group bg-[#0D629E] rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-white transition-all duration-300">
        <div className="relative h-64 overflow-hidden">
            <img src={leader.imageUrl} alt={`Portrait of ${leader.name}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D629E] to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white font-montserrat">{leader.name}</h3>
                <p className="text-brand-blue-200 font-semibold text-xs uppercase tracking-widest">{leader.title}</p>
            </div>
        </div>
        <div className="p-6">
            <p className="text-brand-blue-100 text-sm leading-relaxed mb-4">{leader.bio}</p>
        </div>
    </div>
);

const AboutPage: React.FC = () => {
    const [dynamicPage, setDynamicPage] = React.useState<Page | null>(null);
    const [settings, setSettings] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const { t } = useLanguage();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [pages, siteSettings] = await Promise.all([getPages(), getSettings()]);
                setSettings(siteSettings);
                
                const aboutPage = pages.find(p => p.slug === '/about' || p.id === 'p-about');
                if (aboutPage && aboutPage.status === 'Published') {
                    setDynamicPage(aboutPage);
                }
            } catch (error) {
                console.error("Error fetching about page data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const info = settings?.aboutInfo;

    return (
        <div className="bg-[#1075BB] dark:bg-brand-blue-900 min-h-screen transition-colors duration-500">
            <header className="relative py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url('${info?.heroImageUrl || 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}')` }}>
                <div className="absolute inset-0 bg-[#1075BB]/90 mix-blend-multiply"></div>
                
                {/* Floating 3D Background */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <ThreeDContainer cameraPos={[0, 0, 8]}>
                        <group position={[-5, 2, 0]}>
                            <CyberNetwork color="#ffffff" />
                        </group>
                    </ThreeDContainer>
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-7xl font-black text-white font-montserrat mb-4 tracking-tight drop-shadow-lg">
                            {info?.heroTitle || t('aboutPage.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-brand-blue-100 font-light font-lato">
                            {info?.heroSubtitle || t('aboutPage.subtitle')}
                        </p>
                    </AnimatedSection>
                </div>
            </header>
            
            {loading ? <div className="py-20 text-center text-white"><Loader /></div> : dynamicPage ? (
                <section className="py-24 bg-white text-gray-800">
                    <div className="container mx-auto px-6 prose prose-lg max-w-4xl whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: dynamicPage.content || '' }} />
                </section>
            ) : (
                <>
                    <section className="py-24 bg-[#1075BB]">
                        <div className="container mx-auto px-6"><IntroductionSection info={info} /></div>
                    </section>
                    <section className="py-24 bg-white"><div className="container mx-auto px-6"><VerticalTimeline /></div></section>
                </>
            )}

            <section className="py-24 bg-[#1075BB]">
                <div className="container mx-auto px-6">
                    <SectionTitle title={t('aboutPage.leadership.title')} subtitle="Guided by experienced professionals dedicated to national service." />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {LEADERSHIP_TEAM.map((leader, index) => (
                            <AnimatedSection key={leader.name} delay={index * 150}><LeadershipCard leader={leader} /></AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {PARTNERS.map((partner, index) => (
                            <AnimatedSection key={partner.name} delay={index * 100}>
                                <img src={partner.logoUrl} alt={partner.name} className="h-12 w-auto object-contain" />
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
