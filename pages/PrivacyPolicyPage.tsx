
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

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="bg-transparent">
            <header className="bg-brand-blue-900/40 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-black text-white font-montserrat">Privacy Policy</h1>
                    <p className="mt-2 text-lg text-brand-blue-50/80 font-roboto-condensed">
                        Last Updated: October 27, 2023
                    </p>
                </div>
            </header>

            <main className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <AnimatedSection>
                        <LegalSection title="1. Introduction">
                            <p>
                                Welcome to the Defense Industry Engineering Group (DEIG). We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This privacy policy sets out how we collect, use, and safeguard the information you provide to us through our website.
                            </p>
                        </LegalSection>

                        <LegalSection title="2. Information We Collect">
                            <p>
                                We may collect personal information that you voluntarily provide to us when you use our website, such as when you fill out a contact form, apply for a vacancy, or register as a supplier. This information may include:
                            </p>
                            <ul className="list-disc list-inside ml-4">
                                <li>Your full name, email address, and phone number.</li>
                                <li>Professional information, such as your CV, cover letter, and company details.</li>
                                <li>Any other information you choose to provide in your communications with us.</li>
                            </ul>
                        </LegalSection>

                        <LegalSection title="3. How We Use Your Information">
                            <p>
                                The information we collect is used for the following purposes:
                            </p>
                             <ul className="list-disc list-inside ml-4">
                                <li>To respond to your inquiries and provide you with the information you have requested.</li>
                                <li>To process your job applications and manage our recruitment processes.</li>
                                <li>To manage our supplier and procurement databases.</li>
                                <li>To improve our website and services.</li>
                                <li>To comply with legal and regulatory obligations.</li>
                            </ul>
                        </LegalSection>

                        <LegalSection title="4. Data Security">
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. We are committed to ensuring that your information is secure.
                            </p>
                        </LegalSection>

                        <LegalSection title="5. Your Rights">
                            <p>
                                You have the right to access, correct, or request the deletion of your personal data held by us. If you wish to exercise any of these rights, please contact us using the details provided on our contact page.
                            </p>
                        </LegalSection>

                        <LegalSection title="6. Changes to This Policy">
                            <p>
                                We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                            </p>
                        </LegalSection>
                    </AnimatedSection>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
