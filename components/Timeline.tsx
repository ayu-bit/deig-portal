
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../types';
import { MILESTONES } from '../constants';
import { AnimatedSection } from './AnimatedComponents';

export const Timeline: React.FC = () => {
    return (
        <div className="relative w-full overflow-x-auto pb-12">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-blue-900 -translate-y-1/2"></div>
            <div className="relative flex w-max px-12 space-x-24">
                {MILESTONES.map((milestone, index) => (
                    <AnimatedSection key={index} delay={index * 200} className="w-64">
                        <div className="relative">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-blue-500 rounded-full border-4 border-brand-blue-900"></div>
                            <div className="bg-brand-blue-800 p-6 rounded-md shadow-lg text-center card-hover-effect">
                                <h3 className="text-2xl font-black text-brand-blue-200 font-montserrat card-title">{milestone.year}</h3>
                                <h4 className="mt-2 text-lg font-bold text-white font-roboto-condensed">{milestone.event}</h4>
                                <p className="mt-2 text-sm text-brand-blue-100 font-lato">{milestone.details}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
};
