import React from 'react';
import { Milestone } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TimelineProps {
    milestones: Milestone[];
}

const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
    const { language } = useLanguage();
    return (
        <div className="timeline-container pb-4 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing">
            <div className="flex space-x-8 px-4 w-max">
                {milestones.map((milestone, index) => (
                    <div key={index} className="flex-shrink-0 w-72 bg-primaryDark p-6 rounded-lg shadow-xl border-t-4 border-goldAccent">
                        <p className="text-3xl font-bold text-white font-montserrat mb-3">{milestone.year}</p>
                        <p className="text-textLight/80">{milestone.event[language]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;