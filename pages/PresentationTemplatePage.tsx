
import * as React from 'react';
import '../types';
import { AnimatedSection, AnimatedCounter } from '../components/AnimatedComponents';
import Logo from '../components/Logo';

// --- Components for specific slide types ---

const SlideWrapper: React.FC<{ children: React.ReactNode; title: string; subtitle?: string; dark?: boolean }> = ({ children, title, subtitle, dark = false }) => (
    <div className={`w-full aspect-video min-h-[500px] mb-12 rounded-xl shadow-2xl overflow-hidden border-2 border-white/20 relative group ${dark ? 'bg-[#04253D]' : 'bg-white'}`}>
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 blueprint-overlay opacity-10 pointer-events-none"></div>
        
        {/* Slide Header */}
        <div className={`p-8 border-b ${dark ? 'border-white/10' : 'border-gray-100'} flex justify-between items-end relative z-10`}>
            <div>
                <h2 className={`text-3xl font-black font-montserrat uppercase tracking-tight ${dark ? 'text-white' : 'text-[#1075BB]'}`}>{title}</h2>
                {subtitle && <p className={`text-sm font-roboto-condensed ${dark ? 'text-white/60' : 'text-gray-500'}`}>{subtitle}</p>}
            </div>
            <Logo showText={false} className="w-12 h-12 opacity-50 grayscale contrast-125" />
        </div>

        {/* Slide Body */}
        <div className="p-12 relative z-10 h-full">
            {children}
        </div>

        {/* Slide Footer */}
        <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase opacity-40">
            <span className={dark ? 'text-white' : 'text-gray-900'}>Confidential // DEIG Strategic Command</span>
            <span className={dark ? 'text-white' : 'text-gray-900'}>ET-2024-DOC-X</span>
        </div>
    </div>
);

const PresentationTemplatePage: React.FC = () => {
    return (
        <div className="bg-[#1075BB] min-h-screen py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white font-montserrat uppercase tracking-tighter mb-4">Corporate Deck Template</h1>
                    <p className="text-xl text-white/80 font-lato">Official visual guidelines for DEIG presentations and strategic briefings.</p>
                </AnimatedSection>

                {/* SLIDE 1: TITLE SLIDE */}
                <AnimatedSection delay={100}>
                    <div className="w-full aspect-video min-h-[500px] mb-12 rounded-xl shadow-2xl overflow-hidden relative bg-[#04253D]">
                        <div className="absolute inset-0">
                            <img src="https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover opacity-20" alt="Background" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#04253D] via-[#04253D]/80 to-transparent"></div>
                            <div className="absolute inset-0 blueprint-overlay opacity-30"></div>
                        </div>
                        <div className="relative z-10 h-full p-16 flex flex-col justify-center">
                            <Logo className="w-24 h-24 mb-10" textClassName="text-5xl font-black text-white" />
                            <div className="h-2 w-32 bg-[#1075BB] mb-8"></div>
                            <h1 className="text-6xl font-black text-white font-montserrat uppercase leading-none mb-6">
                                Strategic <br />Engineering <br />Roadmap
                            </h1>
                            <p className="text-2xl text-white/60 font-roboto-condensed tracking-[0.2em] uppercase">National Defense Capability // 2024-2030</p>
                        </div>
                        <div className="absolute bottom-10 right-10 flex gap-4 opacity-50">
                            <div className="h-12 w-1 bg-white"></div>
                            <div className="h-12 w-1 bg-white opacity-50"></div>
                            <div className="h-12 w-1 bg-white opacity-20"></div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* SLIDE 2: MISSION & VISION */}
                <AnimatedSection delay={200}>
                    <SlideWrapper title="Core Mandate" subtitle="Defining Our National Responsibility">
                        <div className="grid grid-cols-2 gap-12 mt-8">
                            <div className="space-y-6">
                                <div className="border-l-4 border-[#1075BB] pl-6">
                                    <h3 className="text-xl font-black text-[#1075BB] uppercase mb-2">Our Mission</h3>
                                    <p className="text-gray-600 font-lato leading-relaxed">
                                        To architect and deploy indigenous defense engineering solutions that guarantee national sovereignty and drive Ethiopia's industrial transformation.
                                    </p>
                                </div>
                                <div className="border-l-4 border-[#1075BB] pl-6">
                                    <h3 className="text-xl font-black text-[#1075BB] uppercase mb-2">Our Vision</h3>
                                    <p className="text-gray-600 font-lato leading-relaxed">
                                        To emerge as Africa's premier defense industrial complex, recognized for technological innovation and engineering self-reliance by 2030.
                                    </p>
                                </div>
                            </div>
                            <div className="relative rounded-lg overflow-hidden shadow-xl">
                                <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover" alt="Strategic Meeting" />
                                <div className="absolute inset-0 bg-[#1075BB]/20 mix-blend-overlay"></div>
                            </div>
                        </div>
                    </SlideWrapper>
                </AnimatedSection>

                {/* SLIDE 3: DIVISIONAL HUB */}
                <AnimatedSection delay={300}>
                    <SlideWrapper title="Integrated Infrastructure" subtitle="8 Specialized Engineering Divisions" dark={true}>
                        <div className="grid grid-cols-4 gap-6 mt-10">
                            {['GAEI', 'HAEI', 'BVEIG', 'BPIG', 'LEEIG', 'RIG', 'AEI', 'NSEI'].map((acronym) => (
                                <div key={acronym} className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-[#1075BB] hover:scale-105 transition-all cursor-pointer">
                                    <span className="block text-2xl font-black text-white font-montserrat mb-2">{acronym}</span>
                                    <div className="h-0.5 w-8 bg-[#1075BB] group-hover:bg-white mb-3"></div>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Operational Status: Green</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 p-6 bg-[#1075BB]/20 rounded border border-[#1075BB]/50 text-center">
                            <p className="text-white/80 font-mono text-sm tracking-tighter">TOTAL COORDINATED WORKFORCE: 5,000+ ELITE PERSONNEL</p>
                        </div>
                    </SlideWrapper>
                </AnimatedSection>

                {/* SLIDE 4: KEY STATS & DATA */}
                <AnimatedSection delay={400}>
                    <SlideWrapper title="Performance Metrics" subtitle="Annual Growth & Production Output">
                        <div className="grid grid-cols-3 gap-10 mt-10">
                            <div className="text-center p-10 bg-gray-50 rounded-xl">
                                <div className="text-5xl font-black text-[#1075BB] font-montserrat mb-2">
                                    <AnimatedCounter end={94} />%
                                </div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Efficiency Rating</p>
                            </div>
                            <div className="text-center p-10 bg-gray-50 rounded-xl border-b-4 border-[#1075BB]">
                                <div className="text-5xl font-black text-[#1075BB] font-montserrat mb-2">
                                    <AnimatedCounter end={12} />
                                </div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Complexes</p>
                            </div>
                            <div className="text-center p-10 bg-gray-50 rounded-xl">
                                <div className="text-5xl font-black text-[#1075BB] font-montserrat mb-2">
                                    <AnimatedCounter end={250} />+
                                </div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Patents Pending</p>
                            </div>
                        </div>
                        <div className="mt-12 flex justify-between items-center text-sm font-bold uppercase tracking-widest text-[#1075BB]">
                            <div className="flex gap-4 items-center">
                                <div className="w-3 h-3 bg-[#1075BB] rounded-full"></div>
                                <span>Export Expansion</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                <span>Domestic Reliance</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="w-3 h-3 bg-[#04253D] rounded-full"></div>
                                <span>R&D Allocation</span>
                            </div>
                        </div>
                    </SlideWrapper>
                </AnimatedSection>

                {/* SLIDE 5: CAPABILITIES (GRID VIEW) */}
                <AnimatedSection delay={500}>
                    <SlideWrapper title="Engineering Pillars" subtitle="Technological Strengths" dark={true}>
                        <div className="grid grid-cols-2 gap-8 mt-4">
                            {[
                                { t: 'Precision Munitions', d: 'Advanced chemical synthesis and ballistic precision engineering.' },
                                { t: 'Autonomous Systems', d: 'Pioneering UAV flight controls and robotic assembly lines.' },
                                { t: 'Armored Mobility', d: 'Heavy hull fabrication and modular blast-resistant systems.' },
                                { t: 'Cyber & Comms', d: 'Quantum-resistant encryption and secure tactical radio networks.' }
                            ].map(pill => (
                                <div key={pill.t} className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white/10 rounded flex-shrink-0 flex items-center justify-center text-[#1075BB]">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white font-montserrat">{pill.t}</h4>
                                        <p className="text-white/40 text-sm leading-relaxed mt-2">{pill.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute right-0 bottom-0 p-12 opacity-5 translate-x-10 translate-y-10">
                            <Logo className="w-96 h-96" showText={false} />
                        </div>
                    </SlideWrapper>
                </AnimatedSection>

                {/* SLIDE 6: CLOSING / Q&A */}
                <AnimatedSection delay={600}>
                    <div className="w-full aspect-video min-h-[500px] mb-12 rounded-xl shadow-2xl overflow-hidden relative bg-[#1075BB] flex flex-col items-center justify-center text-center p-16">
                         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                         <Logo className="w-32 h-32 mb-8" showText={false} />
                         <h2 className="text-5xl font-black text-white font-montserrat uppercase mb-4 tracking-tighter">Powering National Strength</h2>
                         <div className="h-1 w-20 bg-white mb-10"></div>
                         <p className="text-2xl text-white/90 font-roboto-condensed uppercase tracking-widest">Questions & Strategic Alignment</p>
                         <div className="mt-12 flex gap-8 text-sm text-white/60 font-mono">
                            <span>contact@deig.gov.et</span>
                            <span>|</span>
                            <span>www.deig.gov.et</span>
                         </div>
                    </div>
                </AnimatedSection>

                <div className="text-center py-10">
                    <button 
                        onClick={() => window.print()} 
                        className="px-8 py-3 bg-white text-[#1075BB] font-bold rounded-full shadow-lg hover:scale-105 transition-transform font-roboto-condensed uppercase tracking-widest"
                    >
                        Export to PDF
                    </button>
                    <p className="mt-4 text-white/50 text-xs uppercase tracking-widest font-mono">This template is optimized for 16:9 Aspect Ratio briefings.</p>
                </div>
            </div>
        </div>
    );
};

export default PresentationTemplatePage;
