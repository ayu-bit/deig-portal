import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider font-montserrat">{title}</h1>
    <p className="mt-4 text-lg text-textLight/80 max-w-3xl mx-auto">{subtitle}</p>
  </div>
);

export default SectionHeader;