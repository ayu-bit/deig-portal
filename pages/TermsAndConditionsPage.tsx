
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../types';
import { AnimatedSection } from '../components/AnimatedComponents';

const LegalSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 font-roboto-condensed border-l-4 border-[#1075BB] pl-4">{title}</h2>
        <div className="space-y-4 text-brand-blue-50/90 font-lato leading-relaxed">
            {children}
        </div>
    </div>
);

const TermsAndConditionsPage: React.FC = () => {
    return (
        <div className="bg-transparent">
            <header className="bg-brand-blue-900/40 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-black text-white font-montserrat">Terms & Conditions</h1>
                     <p className="mt-2 text-lg text-brand-blue-50/80 font-roboto-condensed">
                        Last Updated: October 27, 2023
                    </p>
                </div>
            </header>

            <main className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <AnimatedSection>
                        <LegalSection title="1. Agreement to Terms">
                            <p>
                                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
                            </p>
                        </LegalSection>

                        <LegalSection title="2. Intellectual Property">
                            <p>
                                The site and its original content, features, and functionality are owned by the Defense Industry Engineering Group (DEIG) and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                            </p>
                        </LegalSection>

                        <LegalSection title="3. Use of Website">
                            <p>
                                You are granted a limited license to access and use the website for your personal, non-commercial use. You agree not to use the site for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the site in any way that could damage the site, the services, or the general business of DEIG.
                            </p>
                        </LegalSection>

                        <LegalSection title="4. Disclaimer of Liability">
                            <p>
                                The information on this website is provided "as is" without any representations or warranties, express or implied. DEIG makes no representations or warranties in relation to this website or the information and materials provided. We do not warrant that the website will be constantly available, or available at all.
                            </p>
                        </LegalSection>

                        <LegalSection title="5. Governing Law">
                            <p>
                                Any claim relating to DEIG's website shall be governed by the laws of Ethiopia without regard to its conflict of law provisions.
                            </p>
                        </LegalSection>
                        
                        <LegalSection title="6. Changes to Terms">
                            <p>
                                We reserve the right to modify these terms and conditions at any time. We do so by posting and drawing attention to the updated terms on the site. Your decision to continue to visit and make use of the site after such changes have been made constitutes your formal acceptance of the new terms.
                            </p>
                        </LegalSection>
                    </AnimatedSection>
                </div>
            </main>
        </div>
    );
};

export default TermsAndConditionsPage;
