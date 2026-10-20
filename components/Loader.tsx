
import React from 'react';
import '../types';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-10 h-10 border-4 border-brand-blue-100 border-t-brand-blue-600 rounded-full animate-spin" role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
