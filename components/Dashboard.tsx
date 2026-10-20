
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../types';
import { useInView } from '../hooks/useInView';
import { AnimatedSection, AnimatedCounter } from './AnimatedComponents';

const ProgressBar: React.FC<{ label: string; percentage: number; delay?: number }> = ({ label, percentage, delay = 0 }) => {
    const [ref, isInView] = useInView({ threshold: 0.5 });
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
        if (isInView) {
            setTimeout(() => setWidth(percentage), delay);
        }
    }, [isInView, percentage, delay]);

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>}>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-white font-lato">{label}</span>
                <span className="text-sm font-medium text-white font-roboto-condensed">{width}%</span>
            </div>
            <div className="w-full bg-[#04253D] rounded-full h-2.5">
                <div className="bg-white h-2.5 rounded-full progress-bar-fg" style={{ width: `${width}%` }}></div>
            </div>
        </div>
    );
};

const RadialProgress: React.FC<{ label: string; percentage: number }> = ({ label, percentage }) => {
    const [ref, isInView] = useInView({ threshold: 0.5 });
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        if (isInView) {
            setProgress(percentage);
        }
    }, [isInView, percentage]);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col items-center">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                <circle className="text-[#04253D]" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                <circle
                    className="text-white radial-chart-fg"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
            </svg>
            <span className="absolute text-3xl font-bold text-white mt-[52px] font-montserrat">{progress}%</span>
            <p className="mt-2 text-white font-roboto-condensed text-lg">{label}</p>
        </div>
    );
};


const KPICard: React.FC<{ title: string; value: number; unit: string; decimals?: number }> = ({ title, value, unit, decimals = 0 }) => (
    <div className="text-center">
        <h4 className="text-3xl md:text-4xl font-bold text-white font-montserrat">
            <AnimatedCounter end={value} duration={1500} decimals={decimals} />{unit}
        </h4>
        <p className="mt-1 text-sm text-white/80 font-roboto-condensed">{title}</p>
    </div>
);

export const Dashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#1075BB] p-8 rounded-md card-hover-effect border border-white/10">
                <AnimatedSection>
                    <h3 className="text-2xl font-bold text-white mb-6 font-roboto-condensed">Divisional Readiness</h3>
                    <div className="space-y-6">
                        <ProgressBar label="HAEI Production Output" percentage={85} />
                        <ProgressBar label="GAEI R&D Progress" percentage={70} delay={200} />
                        <ProgressBar label="BVEIG Operational Readiness" percentage={92} delay={400} />
                        <ProgressBar label="LEEIG Systems Integration Status" percentage={78} delay={600} />
                        <ProgressBar label="RIG Innovation Pipeline" percentage={88} delay={800} />
                        <ProgressBar label="AEI Avionics Readiness" percentage={81} delay={1000} />
                        <ProgressBar label="NSEI Maritime Systems Online" percentage={76} delay={1200} />
                    </div>
                </AnimatedSection>
            </div>
            <div className="space-y-8">
                <AnimatedSection>
                    <div className="bg-[#1075BB] p-8 rounded-md card-hover-effect border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-6 font-roboto-condensed text-center">Key Metrics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                            <KPICard title="Projects in Development" value={42} unit="" />
                            <KPICard title="System Uptime" value={99.8} unit="%" decimals={1} />
                            <KPICard title="QA Pass Rate" value={97.5} unit="%" decimals={1} />
                        </div>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                    <div className="bg-[#1075BB] p-8 rounded-md card-hover-effect flex justify-center border border-white/10">
                       <RadialProgress label="Overall R&D Progress" percentage={75} />
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};
