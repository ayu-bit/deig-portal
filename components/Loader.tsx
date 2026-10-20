import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader fixed inset-0 z-[100] flex items-center justify-center bg-lightBg dark:bg-gray-900">
      <div className="loader-logo flex items-center space-x-3">
        <svg className="w-20 h-20 text-primaryDark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="currentColor" strokeWidth="5">
                <path className="logo-path" style={{animationDelay: '0s'}} d="M50 5 L95 27.5 V72.5 L50 95 L5 72.5 V27.5 L50 5 Z" />
                <path className="logo-path" style={{animationDelay: '0.2s'}} d="M50 17 L83 34.5 V65.5 L50 83 L17 65.5 V34.5 L50 17 Z" />
                <path className="logo-path" style={{animationDelay: '0.4s'}} d="M50 29 L71 40.5 V59.5 L50 71 L29 59.5 V40.5 L50 29 Z" />
            </g>
        </svg>
        <span className="text-4xl font-extrabold tracking-wider text-textDark dark:text-textLight font-montserrat">DEIG</span>
      </div>
    </div>
  );
};

export default Loader;