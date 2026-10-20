
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../types';
// Fix: Use named imports for react-router-dom to resolve module export errors and for consistency.
import { Link } from 'react-router-dom';
import { AnimatedSection, AnimatedCheckmark } from '../components/AnimatedComponents';
import { useLanguage } from '../hooks/useLanguage';
import { ThreeDContainer, TechShape } from '../components/ThreeDComponents';

const Section: React.FC<{ title: string; id: string; children: React.ReactNode; className?: string; }> = ({ title, id, children, className = '' }) => (
    <section aria-labelledby={id} className={`py-20 ${className}`}>
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <h2 id={id} className={`text-3xl font-bold text-white text-center mb-12 font-roboto-condensed`}>{title}</h2>
            </AnimatedSection>
            {children}
        </div>
    </section>
);

const ProcurementPage: React.FC = () => {
    const { t } = useLanguage();
    const guidelines = [
        t('procurementPage.guideline1'),
        t('procurementPage.guideline2'),
        t('procurementPage.guideline3'),
        t('procurementPage.guideline4'),
        t('procurementPage.guideline5')
    ];

    return (
        <div className="bg-transparent">
            <header className="relative bg-brand-blue-900/60 py-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <ThreeDContainer cameraPos={[0, 0, 8]}>
                        <group position={[6, 2, 0]}>
                            <TechShape type="sphere" color="#ffffff" />
                        </group>
                        <group position={[-6, -2, -2]}>
                            <TechShape type="octahedron" color="#ffffff" />
                        </group>
                    </ThreeDContainer>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl font-black text-white font-montserrat">{t('procurementPage.title', 'Procurement & Tenders')}</h1>
                    <p className="mt-2 text-lg text-brand-blue-50/80 font-roboto-condensed">
                        {t('procurementPage.subtitle', 'Partnering with industry leaders to build a robust national defense supply chain.')}
                    </p>
                </div>
            </header>
            
            <Section id="procurement-guidelines" title={t('procurementPage.guidelinesTitle', 'Our Procurement Guidelines')} className="bg-brand-blue-900">
                <div className="max-w-4xl mx-auto bg-brand-blue-800 p-8 rounded-md shadow-lg border border-brand-blue-700">
                    <AnimatedSection>
                        <ul className="space-y-4 text-brand-blue-50 font-lato">
                            {guidelines.map((guideline, index) => (
                                <li key={index} className="flex items-start text-lg">
                                    <AnimatedCheckmark className="text-brand-blue-400" /> 
                                    <span>{guideline}</span>
                                </li>
                            ))}
                        </ul>
                    </AnimatedSection>
                </div>
            </Section>

            <Section id="procurement-actions" title={t('procurementPage.getInvolvedTitle', 'Get Involved')} className="bg-brand-blue-800/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <AnimatedSection>
                        <Link to="/tenders" className="block p-8 bg-brand-blue-50 text-brand-blue-900 rounded-md shadow-lg h-full card-hover-effect text-center border-2 border-transparent hover:border-brand-blue-500">
                             <h3 className="text-2xl font-bold text-brand-blue-900 font-montserrat card-title">{t('procurementPage.tendersTitle', 'View Open Tenders')}</h3>
                             <p className="mt-2 text-brand-blue-900/80 font-lato">{t('procurementPage.tendersDesc', 'Explore current procurement opportunities and find detailed information on active tenders.')}</p>
                             <span className="inline-block mt-6 text-brand-blue-600 font-semibold hover:text-opacity-80 transition-colors duration-300 font-roboto-condensed">
                                 {t('procurementPage.tendersBtn', 'Browse Tenders')} &rarr;
                            </span>
                        </Link>
                    </AnimatedSection>
                     <AnimatedSection delay={150}>
                        <Link to="/supplier-registration" className="block p-8 bg-brand-blue-50 text-brand-blue-900 rounded-md shadow-lg h-full card-hover-effect text-center border-2 border-transparent hover:border-brand-blue-500">
                             <h3 className="text-2xl font-bold text-brand-blue-900 font-montserrat card-title">{t('procurementPage.supplierTitle', 'Supplier Registration')}</h3>
                             <p className="mt-2 text-brand-blue-900/80 font-lato">{t('procurementPage.supplierDesc', 'Register your company to be considered for future procurement needs and partnership opportunities.')}</p>
                             <span className="inline-block mt-6 text-brand-blue-600 font-semibold hover:text-opacity-80 transition-colors duration-300 font-roboto-condensed">
                                {t('procurementPage.supplierBtn', 'Register Now')} &rarr;
                            </span>
                        </Link>
                    </AnimatedSection>
                </div>
            </Section>
        </div>
    );
};

export default ProcurementPage;
