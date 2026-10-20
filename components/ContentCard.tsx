import React from 'react';

interface ContentCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, subtitle, children }) => (
  <div className="bg-surface dark:bg-surfaceDark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transform transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full group">
    <h3 className="text-xl font-bold text-textDark dark:text-textLight mb-3 font-display group-hover:text-primary transition-colors">{title}</h3>
    {subtitle && <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">{subtitle}</p>}
    <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex flex-col flex-grow">{children}</div>
  </div>
);

export default ContentCard;